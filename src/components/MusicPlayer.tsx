import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  Heart,
  Music,
} from 'lucide-react';
import { giftConfig } from '../config/giftConfig';
import { soundEngine } from '../utils/soundEngine';

const formatTime = (secs: number) => {
  const s = Math.max(0, Math.floor(secs));
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
};

export const MusicPlayer: React.FC = () => {
  const [audioState, setAudioState] = useState(soundEngine.getState());

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setAudioState(soundEngine.getState());
    });
  }, []);

  const {
    isPlaying,
    isMuted,
    volume,
    currentTrackIndex,
    currentTrack,
    currentProgress,
    duration,
  } = audioState;

  const [c1, c2, c3] = currentTrack.coverGradient;

  return (
    <section id="section-music" className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4D88B]/35 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
          <Music className="h-3.5 w-3.5 text-[#D98F9B]" />
          Chapter V • Soundtrack
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
          Our Little Playlist
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#74647D]">
          Melodies that sound like our favorite memories. Press play to hear the music box edition of each track and read why it belongs to us.
        </p>
      </div>

      {/* Main Player Deck */}
      <div className="mt-12 grid grid-cols-1 gap-8 rounded-3xl border border-[#392D40]/12 bg-white/85 p-6 sm:p-10 shadow-[0_24px_60px_-15px_rgba(57,45,64,0.1)] backdrop-blur-md lg:grid-cols-12">
        {/* Left Column: Vinyl Sleeve + Spinning Platter + Controls */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Vinyl + Cover Art */}
            <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
              {/* Spinning Vinyl Disc peeking out */}
              <div
                className={`absolute -right-6 h-40 w-40 rounded-full border-4 border-[#2B2230] bg-gradient-to-tr from-[#1E1722] via-[#392D40] to-[#1E1722] shadow-lg ${
                  isPlaying ? 'animate-spin-vinyl' : ''
                }`}
              >
                <div className="absolute inset-3 rounded-full border border-white/10" />
                <div className="absolute inset-7 rounded-full border border-white/10" />
                <div
                  style={{ backgroundColor: c1 }}
                  className="absolute inset-13 flex items-center justify-center rounded-full border-2 border-white/40"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#392D40]" />
                </div>
              </div>

              {/* Front Album Cover Sleeve */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
                }}
                className="relative z-10 flex h-44 w-44 flex-col justify-between rounded-2xl border border-white/40 p-4 text-white shadow-xl"
              >
                <div className="flex items-center justify-between text-[10px] font-mono-code opacity-90">
                  <span>STEREO</span>
                  <Disc3 className="h-4 w-4" />
                </div>

                <div>
                  <span className="rounded-full bg-black/25 px-2.5 py-0.5 text-[10px] backdrop-blur-xs">
                    {currentTrack.memoryTag}
                  </span>
                  <h4 className="mt-1.5 font-serif-display text-lg font-medium leading-tight drop-shadow-xs">
                    {currentTrack.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Track Info & Personal Liner Note */}
            <div className="flex-1 text-center sm:text-left sm:pl-4">
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
                {currentTrack.memoryTag}
              </span>
              <h3 className="mt-1 font-serif-display text-2xl sm:text-3xl font-medium text-[#392D40]">
                {currentTrack.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-[#74647D]">
                {currentTrack.artist}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-4 rounded-2xl border border-[#D98F9B]/25 bg-[#FFF9F3] p-3.5"
                >
                  <p className="text-xs sm:text-sm text-[#392D40]/90 italic leading-relaxed">
                    &ldquo;{currentTrack.reasonNote}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Bar & Transport Controls */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs text-[#74647D] font-mono-code">
              <span>{formatTime(currentProgress)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <input
              type="range"
              min={0}
              max={duration}
              step={0.25}
              value={currentProgress}
              aria-label="Seek track progress"
              onChange={(e) => soundEngine.seek( parseFloat(e.target.value) )}
              className="mt-1.5 h-2 w-full cursor-pointer appearance-none rounded-full bg-[#F6EFE6] accent-[#D98F9B]"
            />

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              {/* Prev / Play / Next */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => soundEngine.prevTrack()}
                  aria-label="Previous track"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#392D40]/12 bg-[#FFF9F3] text-[#392D40] transition hover:border-[#D98F9B] cursor-pointer"
                >
                  <SkipBack className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => soundEngine.togglePlay()}
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                  className="flex h-13 w-13 items-center justify-center rounded-full bg-[#392D40] text-[#FFF9F3] shadow-md transition hover:scale-105 hover:bg-[#4e3d57] cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 translate-x-0.5 fill-[#F4D88B] text-[#F4D88B]" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => soundEngine.nextTrack()}
                  aria-label="Next track"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#392D40]/12 bg-[#FFF9F3] text-[#392D40] transition hover:border-[#D98F9B] cursor-pointer"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2.5 rounded-full border border-[#392D40]/10 bg-[#FFF9F3] px-3.5 py-1.5">
                <button
                  type="button"
                  onClick={() => soundEngine.toggleMute()}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="text-[#392D40] hover:text-[#D98F9B] cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-4 w-4 text-[#74647D]" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-[#D98F9B]" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  aria-label="Volume control"
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    soundEngine.setMuted(v === 0);
                    soundEngine.setVolume(v);
                  }}
                  className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-[#E5D4C8] accent-[#D98F9B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tracklist */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#392D40]/10 bg-[#FFF9F3] p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between border-b border-[#392D40]/10 pb-3">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[#392D40]">
                CURATED TRACKLIST
              </span>
              <span className="text-xs text-[#74647D]">
                {giftConfig.songs.length} Tracks
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {giftConfig.songs.map((song, idx) => {
                const isActive = idx === currentTrackIndex;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => soundEngine.playTrack(idx)}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#D98F9B] bg-white shadow-sm'
                        : 'border-transparent bg-white/55 hover:border-[#392D40]/15 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            background: `linear-gradient(135deg, ${song.coverGradient[0]}, ${song.coverGradient[1]})`,
                          }}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-xs"
                        >
                          {isActive && isPlaying ? '♪' : `0${idx + 1}`}
                        </div>
                        <div>
                          <h5 className="font-serif-display text-sm font-medium text-[#392D40]">
                            {song.title}
                          </h5>
                          <p className="text-[11px] text-[#74647D]">{song.artist}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] text-[#74647D]">
                          {formatTime(song.duration)}
                        </span>
                        <Heart
                          className={`h-3.5 w-3.5 ${
                            isActive
                              ? 'fill-[#D98F9B] text-[#D98F9B]'
                              : 'text-[#74647D]/40'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 text-center font-handwriting text-lg text-[#74647D]">
            Select any song to read its memory note ♡
          </p>
        </div>
      </div>
    </section>
  );
};
