import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Heart,
  Gamepad2,
  Flower2,
  Music,
  Mail,
  Stars,
  Volume2,
  VolumeX,
  Award,
} from 'lucide-react';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

const NAV_ITEMS = [
  { id: 'section-hero', label: 'Welcome', icon: Sparkles },
  { id: 'section-memories', label: 'Memories', icon: BookOpen },
  { id: 'section-reasons', label: 'Why You', icon: Heart },
  { id: 'section-games', label: 'Games', icon: Gamepad2 },
  { id: 'section-garden', label: 'Garden', icon: Flower2 },
  { id: 'section-music', label: 'Our Song', icon: Music },
  { id: 'section-letter', label: 'Letter', icon: Mail },
  { id: 'section-finale', label: 'Finale', icon: Stars },
];

export const FloatingNavigation: React.FC<{
  onOpenPassport: () => void;
}> = ({ onOpenPassport }) => {
  const { discoveryPercentage } = useWorld();
  const [activeSection, setActiveSection] = useState('section-hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [audioState, setAudioState] = useState(soundEngine.getState());

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setAudioState(soundEngine.getState());
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      setScrollProgress(pct);

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.42) {
            setActiveSection(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundEngine.playChime('flip');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Subtle Top Journey Progress Thread */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-[#392D40]/5">
        <div
          style={{ width: `${scrollProgress}%` }}
          className="h-full bg-gradient-to-r from-[#D98F9B] via-[#C9B8E8] to-[#F4D88B] transition-all duration-150"
        />
      </div>

      {/* Floating Glassmorphic Bottom Pill Dock */}
      <nav
        aria-label="Little world chapter navigation"
        className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 px-3 w-full max-w-fit"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-[#392D40]/12 bg-[#FFFDF9]/88 px-2.5 py-2 shadow-[0_18px_45px_-10px_rgba(57,45,64,0.22)] backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                title={item.label}
                className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#392D40] text-[#FFF9F3] shadow-xs'
                    : 'text-[#74647D] hover:bg-[#D98F9B]/15 hover:text-[#392D40]'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px]">{item.label}</span>
              </button>
            );
          })}

          <div className="mx-1 h-4 w-px bg-[#392D40]/12" />

          {/* Keepsake Passport / Achievements Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playChime('sparkle');
              onOpenPassport();
            }}
            title="Open Keepsake Passport & Achievements"
            className="flex items-center gap-1 rounded-full bg-[#F4D88B]/40 px-2.5 py-1.5 text-xs font-semibold text-[#392D40] transition hover:bg-[#F4D88B]/70 cursor-pointer"
          >
            <Award className="h-3.5 w-3.5 text-[#D98F9B]" />
            <span className="font-mono-code text-[10px]">{discoveryPercentage}%</span>
          </button>

          {/* Audio Mute / Unmute Toggle */}
          <button
            type="button"
            onClick={() => soundEngine.toggleMute()}
            title={audioState.isMuted ? 'Unmute background music' : 'Mute background music'}
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition cursor-pointer ${
              !audioState.isMuted && audioState.isPlaying
                ? 'border-[#D98F9B] bg-[#D98F9B]/15 text-[#D98F9B]'
                : 'border-[#392D40]/10 bg-white text-[#74647D]'
            }`}
          >
            {audioState.isMuted ? (
              <VolumeX className="h-3.5 w-3.5" />
            ) : (
              <Volume2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
