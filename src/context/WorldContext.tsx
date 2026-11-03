import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { giftConfig } from '../config/giftConfig';
import { soundEngine } from '../utils/soundEngine';

export interface PlantedFlowerInstance {
  id: string;
  speciesId: string;
  xPercent: number;
  yPercent: number;
  scale: number;
  createdAt: number;
}

export interface WhisperToast {
  id: string;
  title: string;
  message: string;
  badge?: string;
}

interface WorldState {
  senderName: string;
  recipientName: string;
  isWorldOpened: boolean;
  flippedCardIds: number[];
  quizCompleted: boolean;
  quizBestScore: number;
  catchHeartCompleted: boolean;
  catchHeartBestScore: number;
  foundSecretIds: string[];
  secretFinderCompleted: boolean;
  plantedFlowers: PlantedFlowerInstance[];
  letterOpened: boolean;
  finalBoxOpened: boolean;
  easterEggsFound: string[];
}

interface WorldContextValue extends WorldState {
  openWorld: () => void;
  replayWorld: () => void;
  resetProgress: () => void;
  updateNames: (sender: string, recipient: string) => void;
  toggleFlipCard: (id: number) => void;
  completeQuiz: (score: number) => void;
  completeCatchHeart: (score: number) => void;
  markSecretFound: (id: string) => void;
  addPlantedFlower: (flower: PlantedFlowerInstance) => void;
  markLetterOpened: () => void;
  markFinalBoxOpened: () => void;
  unlockEasterEgg: (eggId: string, title: string, message: string) => void;
  triggerToast: (title: string, message: string, badge?: string) => void;
  activeToasts: WhisperToast[];
  dismissToast: (id: string) => void;
  allGamesCompleted: boolean;
  discoveryPercentage: number;
}

const STORAGE_KEY = 'little_world_for_you_state_v1';

const defaultInitialFlowers: PlantedFlowerInstance[] = [
  { id: 'init-1', speciesId: 'fl-rose', xPercent: 22, yPercent: 68, scale: 1, createdAt: 1 },
  { id: 'init-2', speciesId: 'fl-lavender', xPercent: 50, yPercent: 73, scale: 1.08, createdAt: 2 },
  { id: 'init-3', speciesId: 'fl-buttercup', xPercent: 77, yPercent: 66, scale: 0.96, createdAt: 3 },
];

const initialState: WorldState = {
  senderName: giftConfig.sender,
  recipientName: giftConfig.recipient,
  isWorldOpened: false,
  flippedCardIds: [],
  quizCompleted: false,
  quizBestScore: 0,
  catchHeartCompleted: false,
  catchHeartBestScore: 0,
  foundSecretIds: [],
  secretFinderCompleted: false,
  plantedFlowers: defaultInitialFlowers,
  letterOpened: false,
  finalBoxOpened: false,
  easterEggsFound: [],
};

const WorldContext = createContext<WorldContextValue | undefined>(undefined);

export const WorldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<WorldState>(() => {
    if (typeof window === 'undefined') return initialState;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialState,
          ...parsed,
          // Nama SELALU diambil dari src/config/giftConfig.ts (bukan dari localStorage),
          // supaya setiap kali kamu ubah nama di config, hasilnya langsung kelihatan.
          senderName: giftConfig.sender,
          recipientName: giftConfig.recipient,
          // Always start at the entrance screen on fresh page reload unless user already opened it in this session,
          // OR let's preserve their progress while allowing them to experience the entrance or skip right in!
          plantedFlowers:
            Array.isArray(parsed.plantedFlowers) && parsed.plantedFlowers.length > 0
              ? parsed.plantedFlowers
              : defaultInitialFlowers,
        };
      }
    } catch {
      // ignore storage errors
    }
    return initialState;
  });

  const [activeToasts, setActiveToasts] = useState<WhisperToast[]>([]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const dismissToast = useCallback((id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerToast = useCallback(
    (title: string, message: string, badge?: string) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setActiveToasts((prev) => [...prev.slice(-2), { id, title, message, badge }]);
      window.setTimeout(() => {
        dismissToast(id);
      }, 5200);
    },
    [dismissToast]
  );

  const openWorld = useCallback(() => {
    setState((prev) => ({ ...prev, isWorldOpened: true }));
    soundEngine.playChime('unlock');
    soundEngine.play();
  }, []);

  const replayWorld = useCallback(() => {
    soundEngine.playChime('sparkle');
    setState((prev) => ({
      ...prev,
      isWorldOpened: false,
      finalBoxOpened: false,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetProgress = useCallback(() => {
    soundEngine.playChime('sparkle');
    setState({
      ...initialState,
      isWorldOpened: true,
    });
    triggerToast('Fresh Little World', 'All cards, games, and garden blooms have been gently reset for a brand new journey.', 'Reset');
  }, [triggerToast]);

  const updateNames = useCallback(
    (sender: string, recipient: string) => {
      setState((prev) => ({
        ...prev,
        senderName: sender.trim() || giftConfig.sender,
        recipientName: recipient.trim() || giftConfig.recipient,
      }));
      triggerToast('Keepsake Personalized', `This world is now dedicated to ${recipient.trim() || giftConfig.recipient} from ${sender.trim() || giftConfig.sender}.`, 'Saved');
    },
    [triggerToast]
  );

  const toggleFlipCard = useCallback((id: number) => {
    soundEngine.playChime('flip');
    setState((prev) => {
      const exists = prev.flippedCardIds.includes(id);
      const next = exists
        ? prev.flippedCardIds.filter((item) => item !== id)
        : [...prev.flippedCardIds, id];
      return { ...prev, flippedCardIds: next };
    });
  }, []);

  const completeQuiz = useCallback(
    (score: number) => {
      soundEngine.playChime('unlock');
      setState((prev) => {
        const isFirstTime = !prev.quizCompleted;
        if (isFirstTime) {
          triggerToast('Achievement Unlocked ✨', 'Completed "How Well Do You Know Me?"!', 'Mini Game 1/3');
        }
        return {
          ...prev,
          quizCompleted: true,
          quizBestScore: Math.max(prev.quizBestScore, score),
        };
      });
    },
    [triggerToast]
  );

  const completeCatchHeart = useCallback(
    (score: number) => {
      soundEngine.playChime('unlock');
      setState((prev) => {
        const isFirstTime = !prev.catchHeartCompleted;
        if (isFirstTime) {
          triggerToast('Heart Catcher ✨', 'You caught all the floating hearts!', 'Mini Game 2/3');
        }
        return {
          ...prev,
          catchHeartCompleted: true,
          catchHeartBestScore: Math.max(prev.catchHeartBestScore, score),
        };
      });
    },
    [triggerToast]
  );

  const markSecretFound = useCallback(
    (id: string) => {
      soundEngine.playChime('sparkle');
      setState((prev) => {
        if (prev.foundSecretIds.includes(id)) return prev;
        const nextFound = [...prev.foundSecretIds, id];
        const allFound = nextFound.length >= giftConfig.secretObjects.length;
        if (allFound && !prev.secretFinderCompleted) {
          soundEngine.playChime('unlock');
          triggerToast('Keeper of Secrets ✨', 'You discovered all 5 hidden keepsakes!', 'Mini Game 3/3');
        }
        return {
          ...prev,
          foundSecretIds: nextFound,
          secretFinderCompleted: allFound || prev.secretFinderCompleted,
        };
      });
    },
    [triggerToast]
  );

  const addPlantedFlower = useCallback(
    (flower: PlantedFlowerInstance) => {
      soundEngine.playChime('bloom');
      setState((prev) => {
        const nextFlowers = [...prev.plantedFlowers.slice(-17), flower];
        if (nextFlowers.length === 6 && prev.plantedFlowers.length < 6) {
          triggerToast('Master Gardener 🌸', 'Your little garden is in full bloom! Read the special garden blessing.', 'Garden');
        }
        return {
          ...prev,
          plantedFlowers: nextFlowers,
        };
      });
    },
    [triggerToast]
  );

  const markLetterOpened = useCallback(() => {
    soundEngine.playChime('unlock');
    setState((prev) => ({ ...prev, letterOpened: true }));
  }, []);

  const markFinalBoxOpened = useCallback(() => {
    soundEngine.playChime('unlock');
    setState((prev) => ({ ...prev, finalBoxOpened: true }));
  }, []);

  const unlockEasterEgg = useCallback(
    (eggId: string, title: string, message: string) => {
      soundEngine.playChime('sparkle');
      setState((prev) => {
        const already = prev.easterEggsFound.includes(eggId);
        const nextEggs = already ? prev.easterEggsFound : [...prev.easterEggsFound, eggId];
        return { ...prev, easterEggsFound: nextEggs };
      });
      triggerToast(title, message, 'Secret Whisper');
    },
    [triggerToast]
  );

  const allGamesCompleted =
    state.quizCompleted && state.catchHeartCompleted && state.secretFinderCompleted;

  // Calculate overall world exploration progress
  const totalMilestones = 7;
  const completedMilestones =
    (state.flippedCardIds.length >= 3 ? 1 : 0) +
    (state.quizCompleted ? 1 : 0) +
    (state.catchHeartCompleted ? 1 : 0) +
    (state.secretFinderCompleted ? 1 : 0) +
    (state.plantedFlowers.length >= 6 ? 1 : 0) +
    (state.letterOpened ? 1 : 0) +
    (state.finalBoxOpened ? 1 : 0);

  const discoveryPercentage = Math.min(100, Math.round((completedMilestones / totalMilestones) * 100));

  return (
    <WorldContext.Provider
      value={{
        ...state,
        openWorld,
        replayWorld,
        resetProgress,
        updateNames,
        toggleFlipCard,
        completeQuiz,
        completeCatchHeart,
        markSecretFound,
        addPlantedFlower,
        markLetterOpened,
        markFinalBoxOpened,
        unlockEasterEgg,
        triggerToast,
        activeToasts,
        dismissToast,
        allGamesCompleted,
        discoveryPercentage,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
};

export const useWorld = () => {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
};
