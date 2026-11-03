import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gamepad2, Sparkles, Award, Heart, Volume2, VolumeX } from 'lucide-react';
import { WorldProvider, useWorld } from './context/WorldContext';
import { features } from './config/features';
import { giftConfig, fillText } from './config/giftConfig';
import { BackgroundEffects } from './components/BackgroundEffects';
import { EntranceScreen } from './components/EntranceScreen';
import { HeroSection } from './components/HeroSection';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveReasons } from './components/LoveReasons';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { CatchMyHeart } from './components/CatchMyHeart';
import { SecretFinder } from './components/SecretFinder';
import { VirtualGarden } from './components/VirtualGarden';
import { MusicPlayer } from './components/MusicPlayer';
import { DigitalLetter } from './components/DigitalLetter';
import { FinalSurprise } from './components/FinalSurprise';
import { FloatingNavigation } from './components/FloatingNavigation';
import { EasterEggManager } from './components/EasterEggManager';
import { soundEngine } from './utils/soundEngine';

const LittleWorldContent: React.FC = () => {
  const {
    isWorldOpened,
    senderName,
    recipientName,
    quizCompleted,
    catchHeartCompleted,
    secretFinderCompleted,
    allGamesCompleted,
    discoveryPercentage,
  } = useWorld();

  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [audioState, setAudioState] = useState(soundEngine.getState());

  React.useEffect(() => {
    return soundEngine.subscribe(() => {
      setAudioState(soundEngine.getState());
    });
  }, []);

  // Judul tab browser mengikuti giftConfig.title
  React.useEffect(() => {
    document.title = fillText(giftConfig.title, { sender: senderName, recipient: recipientName });
  }, [senderName, recipientName]);

  const audioMuted = audioState.isMuted;
  const audioPlaying = audioState.isPlaying;

  const handleAudioButton = () => {
    if (!audioPlaying) {
      soundEngine.play();
      return;
    }
    soundEngine.toggleMute();
  };

  const gamesDoneCount =
    (quizCompleted ? 1 : 0) +
    (catchHeartCompleted ? 1 : 0) +
    (secretFinderCompleted ? 1 : 0);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#FFF9F3] text-[#392D40]">
      <BackgroundEffects />

      <EasterEggManager
        isPassportOpen={isPassportOpen}
        onClosePassport={() => setIsPassportOpen(false)}
      />

      <AnimatePresence mode="wait">
        {features.entrance && !isWorldOpened ? (
          <EntranceScreen key="entrance-screen" />
        ) : (
          <motion.div
            key="main-world"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 pb-20"
          >
            {/* Subtle Floating Top Utility Bar */}
            <header
              className={`mx-auto flex max-w-6xl items-center px-4 pt-6 sm:px-6 lg:px-8 ${
                features.headerPill ? 'justify-between' : 'justify-end'
              }`}
            >
              {features.headerPill && (
                <div className="flex items-center gap-2 rounded-full border border-[#392D40]/10 bg-white/75 px-3.5 py-1.5 text-xs text-[#74647D] shadow-xs backdrop-blur-md">
                  <Heart className="h-3.5 w-3.5 fill-[#D98F9B] text-[#D98F9B]" />
                  <span className="font-serif-display italic text-[#392D40]">
                    {fillText(giftConfig.ui.headerPill, { sender: senderName, recipient: recipientName })}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                {features.passport && (
                  <button
                    type="button"
                    onClick={() => setIsPassportOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#392D40]/12 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#392D40] shadow-xs backdrop-blur-md transition hover:border-[#D98F9B] cursor-pointer"
                  >
                    <Award className="h-3.5 w-3.5 text-[#D98F9B]" />
                    <span>Keepsake Passport ({discoveryPercentage}%)</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleAudioButton}
                  aria-label="Toggle music"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#392D40]/12 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#392D40] shadow-xs backdrop-blur-md transition hover:border-[#D98F9B] cursor-pointer"
                >
                  {audioMuted ? (
                    <VolumeX className="h-3.5 w-3.5 text-[#74647D]" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 text-[#D98F9B]" />
                  )}
                  <span className="hidden sm:inline">
                    {audioMuted
                      ? giftConfig.ui.musicOff
                      : audioPlaying
                        ? giftConfig.ui.musicPlaying
                        : giftConfig.ui.musicPlay}
                  </span>
                </button>
              </div>
            </header>

            {/* B. Main Hero — Welcome to Your Little World */}
            {features.hero && <HeroSection />}

            {/* Soft Ornamental Divider */}
            <div className="mx-auto flex max-w-xs items-center justify-center gap-3 py-2 opacity-60">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#D98F9B]" />
              <Sparkles className="h-4 w-4 text-[#D98F9B]" />
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#D98F9B]" />
            </div>

            {/* C. Our Little Memories (Scrapbook & Timeline) */}
            {features.memories && <MemoryGallery />}

            {/* D. Reasons Why I Love You (12 Flip Cards) */}
            {features.reasons && <LoveReasons />}

            {/* E. Interactive Mini Games Section */}
            {features.games && (
            <section
              id="section-games"
              className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
            >
              <div className="mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D88B]/40 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
                  <Gamepad2 className="h-3.5 w-3.5 text-[#D98F9B]" />
                  Chapter III • Playful Quests
                </span>
                <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
                  Little Games Made For Us
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#74647D]">
                  Three tiny quests hidden inside this world. Complete all three to earn a special keepsake badge and unlock the secret Starlight Time Capsule at the end.
                </p>

                {/* Mini-Games Completion Pill */}
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#392D40]/10 bg-white/80 px-4 py-1.5 text-xs font-medium text-[#392D40] shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-[#D98F9B]" />
                  <span>
                    Quests Completed: <strong>{gamesDoneCount} / 3</strong>
                  </span>
                  {allGamesCompleted && (
                    <span className="ml-1 rounded-full bg-[#9AB89F]/30 px-2.5 py-0.5 text-[11px] font-semibold text-[#392D40]">
                      ★ All Quests Mastered!
                    </span>
                  )}
                </div>
              </div>

              {/* Game 1 & Game 2 Side by Side */}
              <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <InteractiveQuiz />
                <CatchMyHeart />
              </div>

              {/* Game 3 Full Width */}
              <SecretFinder />
            </section>
            )}

            {/* F. The Little Garden */}
            {features.garden && <VirtualGarden />}

            {/* G. Our Song */}
            {features.music && <MusicPlayer />}

            {/* H. The Secret Letter */}
            {features.letter && <DigitalLetter />}

            {/* I. Final Surprise — One Last Thing */}
            {features.finale && <FinalSurprise />}

            {/* Footer */}
            <footer
              className={`bg-[#16101C] pt-6 text-center text-xs text-[#C9B8E8]/60 ${
                features.navigation ? 'pb-28' : 'pb-10'
              }`}
            >
              <p className="font-handwriting text-xl text-[#F4D88B]/90">
                {fillText(giftConfig.footer.signature, { sender: senderName, recipient: recipientName })}
              </p>
              {features.footerTagline && (
                <p className="mt-1 font-mono-code text-[11px]">
                  {giftConfig.footer.tagline}
                </p>
              )}
            </footer>

            {/* Floating Bottom Navigation Dock */}
            {features.navigation && (
              <FloatingNavigation onOpenPassport={() => setIsPassportOpen(true)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function App() {
  return (
    <WorldProvider>
      <LittleWorldContent />
    </WorldProvider>
  );
}

export default App;
