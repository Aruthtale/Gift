import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  X,
  CheckCircle2,
  Heart,
  RotateCcw,
  UserPen,
  KeyRound,
} from 'lucide-react';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const LOVE_SEQUENCE = ['l', 'o', 'v', 'e'];

export const EasterEggManager: React.FC<{
  isPassportOpen: boolean;
  onClosePassport: () => void;
}> = ({ isPassportOpen, onClosePassport }) => {
  const {
    activeToasts,
    dismissToast,
    unlockEasterEgg,
    quizCompleted,
    catchHeartCompleted,
    secretFinderCompleted,
    allGamesCompleted,
    flippedCardIds,
    plantedFlowers,
    letterOpened,
    easterEggsFound,
    discoveryPercentage,
    senderName,
    recipientName,
    updateNames,
    resetProgress,
  } = useWorld();

  const [editSender, setEditSender] = useState(senderName);
  const [editRecipient, setEditRecipient] = useState(recipientName);
  const [secretCodeInput, setSecretCodeInput] = useState('');

  useEffect(() => {
    setEditSender(senderName);
    setEditRecipient(recipientName);
  }, [senderName, recipientName]);

  // Listen for Konami Code or typing "love" anywhere on the page
  useEffect(() => {
    let konamiBuffer: string[] = [];
    let loveBuffer: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      konamiBuffer = [...konamiBuffer, e.key].slice(-KONAMI_SEQUENCE.length);
      if (
        konamiBuffer.length === KONAMI_SEQUENCE.length &&
        konamiBuffer.every((k, i) => k.toLowerCase() === KONAMI_SEQUENCE[i].toLowerCase())
      ) {
        confetti({
          particleCount: 70,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
        });
        unlockEasterEgg(
          'konami-secret',
          'Konami Love Code Activated! 🎮✨',
          'You unlocked the secret gamer romance badge: Unlimited Extra Lives & Infinite Hugs!'
        );
        konamiBuffer = [];
      }

      loveBuffer = [...loveBuffer, e.key.toLowerCase()].slice(-LOVE_SEQUENCE.length);
      if (
        loveBuffer.length === LOVE_SEQUENCE.length &&
        loveBuffer.every((k, i) => k === LOVE_SEQUENCE[i])
      ) {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.55 },
          colors: ['#D98F9B', '#F4D88B', '#C9B8E8'],
        });
        unlockEasterEgg(
          'typed-love',
          'Secret Keyword "LOVE" Typed! 💌',
          'Even your keyboard knows the secret password to this little world.'
        );
        loveBuffer = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockEasterEgg]);

  // Unlock master achievement when all 3 mini-games are finished
  useEffect(() => {
    if (allGamesCompleted && !easterEggsFound.includes('all-games-master')) {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#F4D88B', '#D98F9B', '#9AB89F'],
      });
      unlockEasterEgg(
        'all-games-master',
        'Grand Champion of My Heart 🏆',
        'You completed all 3 mini games! A special Starlight Time Capsule is now unlocked in the Finale.'
      );
    }
  }, [allGamesCompleted, easterEggsFound, unlockEasterEgg]);

  const handleSaveNames = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime('unlock');
    updateNames(editSender, editRecipient);
  };

  const handleTriggerSecretCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = secretCodeInput.trim().toLowerCase();
    if (!cleaned) return;
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
    });
    unlockEasterEgg(
      'konami-secret',
      'Secret Passcode Accepted! ✨',
      `"${secretCodeInput.trim()}" unlocked a shower of starlight just for ${recipientName}!`
    );
    setSecretCodeInput('');
  };

  const milestones = [
    {
      label: 'Read at least 3 Love Cards',
      done: flippedCardIds.length >= 3,
      detail: `${flippedCardIds.length}/12 flipped`,
    },
    {
      label: 'Complete "How Well Do You Know Me?" Quiz',
      done: quizCompleted,
      detail: quizCompleted ? 'Completed' : 'In Mini Games',
    },
    {
      label: 'Catch Floating Hearts in "Catch My Heart"',
      done: catchHeartCompleted,
      detail: catchHeartCompleted ? 'Completed' : 'In Mini Games',
    },
    {
      label: 'Find All 5 Hidden Keepsakes',
      done: secretFinderCompleted,
      detail: secretFinderCompleted ? '5/5 Found' : 'In Mini Games',
    },
    {
      label: 'Grow 6 Blooms in The Little Garden',
      done: plantedFlowers.length >= 6,
      detail: `${plantedFlowers.length} blooms`,
    },
    {
      label: 'Break the Wax Seal on The Secret Letter',
      done: letterOpened,
      detail: letterOpened ? 'Unfolded' : 'In Chapter VI',
    },
  ];

  return (
    <>
      {/* Floating Whisper & Achievement Toast Stack (Top Right) */}
      <div className="pointer-events-none fixed top-5 right-5 z-50 flex max-w-sm flex-col gap-2.5">
        <AnimatePresence>
          {activeToasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.92 }}
              className="pointer-events-auto relative flex items-start gap-3 rounded-2xl border border-[#D98F9B]/45 bg-[#FFFDF9]/95 p-4 shadow-[0_18px_40px_-10px_rgba(57,45,64,0.18)] backdrop-blur-md"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F4D88B]/40 text-[#D98F9B]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="pr-5">
                {toast.badge && (
                  <span className="font-mono-code text-[10px] font-bold uppercase tracking-wider text-[#D98F9B]">
                    {toast.badge}
                  </span>
                )}
                <h5 className="font-serif-display text-sm font-semibold text-[#392D40]">
                  {toast.title}
                </h5>
                <p className="mt-0.5 text-xs text-[#74647D] leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="absolute top-3 right-3 text-[#74647D] hover:text-[#392D40] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Keepsake Passport & Personalizer Modal */}
      <AnimatePresence>
        {isPassportOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClosePassport}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#392D40]/55 p-4 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#392D40]/15 bg-[#FFFDF9] p-6 sm:p-8 shadow-2xl"
            >
              <button
                type="button"
                onClick={onClosePassport}
                aria-label="Close keepsake passport"
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#392D40]/10 bg-white text-[#392D40] hover:bg-[#D98F9B] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4D88B]/40 text-[#D98F9B]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
                    WORLD EXPLORATION PASSPORT
                  </span>
                  <h3 className="font-serif-display text-2xl font-medium text-[#392D40]">
                    {recipientName}&rsquo;s Keepsake Journal
                  </h3>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-6 rounded-2xl border border-[#392D40]/10 bg-[#FFF9F3] p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#392D40]">
                  <span>Little World Discovery</span>
                  <span className="font-mono-code text-[#D98F9B]">
                    {discoveryPercentage}% Explored
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#E5D4C8]/60">
                  <div
                    style={{ width: `${discoveryPercentage}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D98F9B] via-[#C9B8E8] to-[#9AB89F] transition-all duration-500"
                  />
                </div>
                <p className="mt-2 text-xs text-[#74647D]">
                  Easter Eggs Found: <strong className="text-[#392D40]">{easterEggsFound.length}</strong> (Try double-clicking the Hero characters, clicking floating stars, or typing <code className="rounded bg-white px-1.5 py-0.5 font-mono-code text-[#D98F9B]">love</code> on your keyboard!)
                </p>
              </div>

              {/* Milestones List */}
              <div className="mt-5 space-y-2">
                {milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs ${
                      m.done
                        ? 'border-[#9AB89F]/50 bg-[#9AB89F]/10 text-[#392D40]'
                        : 'border-[#392D40]/10 bg-white text-[#74647D]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {m.done ? (
                        <CheckCircle2 className="h-4 w-4 text-[#588561]" />
                      ) : (
                        <Heart className="h-3.5 w-3.5 text-[#D98F9B]/50" />
                      )}
                      <span className={m.done ? 'font-medium' : ''}>{m.label}</span>
                    </div>
                    <span className="font-mono-code text-[11px]">{m.detail}</span>
                  </div>
                ))}
              </div>

              {/* Secret Code Box (Mobile-friendly Konami Trigger) */}
              <form onSubmit={handleTriggerSecretCode} className="mt-6 rounded-2xl border border-[#C9B8E8]/50 bg-[#C9B8E8]/10 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#392D40]">
                  <KeyRound className="h-4 w-4 text-[#D98F9B]" />
                  <span>Whisper a Secret Code (or use Konami Code ↑↑↓↓←→←→BA)</span>
                </div>
                <div className="mt-2.5 flex gap-2">
                  <input
                    type="text"
                    value={secretCodeInput}
                    onChange={(e) => setSecretCodeInput(e.target.value)}
                    placeholder="Type 'love' or 'forever'..."
                    className="flex-1 rounded-xl border border-[#392D40]/15 bg-white px-3.5 py-2 text-xs text-[#392D40] focus:border-[#D98F9B] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#392D40] px-4 py-2 text-xs font-medium text-[#FFF9F3] hover:bg-[#4e3d57] cursor-pointer"
                  >
                    Unlock
                  </button>
                </div>
              </form>

              {/* Personalize Names Form */}
              <form
                onSubmit={handleSaveNames}
                className="mt-6 rounded-2xl border border-[#392D40]/10 bg-[#FFF9F3] p-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#392D40]">
                  <UserPen className="h-4 w-4 text-[#D98F9B]" />
                  <span>Personalize Sender &amp; Recipient Names</span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] text-[#74647D]">
                      Recipient (Your Partner)
                    </label>
                    <input
                      type="text"
                      value={editRecipient}
                      onChange={(e) => setEditRecipient(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#392D40]/15 bg-white px-3 py-2 text-xs text-[#392D40] focus:border-[#D98F9B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#74647D]">
                      Sender (Your Name)
                    </label>
                    <input
                      type="text"
                      value={editSender}
                      onChange={(e) => setEditSender(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#392D40]/15 bg-white px-3 py-2 text-xs text-[#392D40] focus:border-[#D98F9B] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetProgress}
                    className="inline-flex items-center gap-1 text-xs text-[#74647D] hover:text-[#D98F9B] cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset World Progress</span>
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#D98F9B] px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[#c87b88] cursor-pointer"
                  >
                    Save Names
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
