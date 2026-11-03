import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flower2, Sparkles, Wind, Cloud, Heart } from 'lucide-react';
import { giftConfig, GardenFlowerSpecies } from '../config/giftConfig';
import { useWorld, PlantedFlowerInstance } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

export const VirtualGarden: React.FC = () => {
  const { plantedFlowers, addPlantedFlower, recipientName } = useWorld();
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>(
    giftConfig.gardenFlowers[0].id
  );
  const [inspectedFlower, setInspectedFlower] = useState<GardenFlowerSpecies | null>(
    giftConfig.gardenFlowers[0]
  );
  const [breezeBoost, setBreezeBoost] = useState(false);

  const getSpecies = (speciesId: string): GardenFlowerSpecies => {
    return (
      giftConfig.gardenFlowers.find((f) => f.id === speciesId) ||
      giftConfig.gardenFlowers[0]
    );
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Plant in the meadow soil zone (y between 48% and 88%)
    const clampedY = Math.max(52, Math.min(86, clickY));
    const clampedX = Math.max(8, Math.min(92, clickX));

    const newFlower: PlantedFlowerInstance = {
      id: `fl-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
      speciesId: selectedSpeciesId,
      xPercent: clampedX,
      yPercent: clampedY,
      scale: Number((0.88 + Math.random() * 0.28).toFixed(2)),
      createdAt: Date.now(),
    };

    addPlantedFlower(newFlower);
    const sp = getSpecies(selectedSpeciesId);
    setInspectedFlower(sp);

    if (plantedFlowers.length + 1 === 6) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D98F9B', '#C9B8E8', '#F4D88B', '#9AB89F'],
      });
    }
  };

  const handleFlowerClick = (
    e: React.MouseEvent,
    flower: PlantedFlowerInstance
  ) => {
    e.stopPropagation();
    soundEngine.playChime('sparkle');
    setInspectedFlower(getSpecies(flower.speciesId));
  };

  const handleGentleBreeze = () => {
    soundEngine.playChime('bloom');
    setBreezeBoost(true);
    window.setTimeout(() => setBreezeBoost(false), 2600);
  };

  const gardenUnlocked = plantedFlowers.length >= 6;

  return (
    <section id="section-garden" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9AB89F]/25 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
          <Flower2 className="h-3.5 w-3.5 text-[#588561]" />
          Chapter IV • Sanctuary
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
          The Little Garden
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#74647D]">
          Pick a seed below, click anywhere on the sunlit meadow to grow a flower, or tap an existing bloom to read the wish inside its petals.
        </p>
      </div>

      {/* Seed Selector Bar & Breeze Button */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#392D40]/10 bg-white/80 p-4 shadow-xs backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono-code text-xs font-semibold text-[#74647D]">
            CHOOSE SEED:
          </span>
          {giftConfig.gardenFlowers.map((fl) => {
            const isSelected = selectedSpeciesId === fl.id;
            return (
              <button
                key={fl.id}
                type="button"
                onClick={() => {
                  soundEngine.playChime('flip');
                  setSelectedSpeciesId(fl.id);
                  setInspectedFlower(fl);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'border-[#392D40] bg-[#392D40] text-[#FFF9F3] shadow-xs'
                    : 'border-[#392D40]/12 bg-[#FFF9F3] text-[#392D40] hover:border-[#D98F9B]'
                }`}
              >
                <span
                  style={{ backgroundColor: fl.color }}
                  className="h-3 w-3 rounded-full border border-white/60"
                />
                <span>{fl.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleGentleBreeze}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#9AB89F]/50 bg-[#9AB89F]/15 px-3.5 py-1.5 text-xs font-medium text-[#392D40] transition hover:bg-[#9AB89F]/30 cursor-pointer"
          >
            <Wind className="h-3.5 w-3.5 text-[#588561]" />
            <span>Send Gentle Breeze</span>
          </button>

          <span className="font-mono-code text-xs font-semibold text-[#392D40]">
            BLOOMS: {plantedFlowers.length}
          </span>
        </div>
      </div>

      {/* Interactive Virtual Garden Meadow Canvas */}
      <div
        onClick={handleCanvasClick}
        role="button"
        tabIndex={0}
        aria-label="Click anywhere in the meadow to plant a flower"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addPlantedFlower({
              id: `fl-${Date.now()}`,
              speciesId: selectedSpeciesId,
              xPercent: Math.floor(20 + Math.random() * 60),
              yPercent: Math.floor(55 + Math.random() * 28),
              scale: 1,
              createdAt: Date.now(),
            });
          }
        }}
        className="relative mt-6 h-[24rem] sm:h-[27rem] w-full overflow-hidden rounded-3xl border border-[#392D40]/12 bg-gradient-to-b from-[#FAF0E4] via-[#F5E9DC] to-[#DCE8D6] shadow-[0_20px_50px_-12px_rgba(57,45,64,0.1)] cursor-crosshair select-none"
      >
        {/* Warm Sun Glow */}
        <div className="pointer-events-none absolute top-6 right-12 h-24 w-24 rounded-full bg-[#F4D88B]/60 blur-xl" />
        <div className="pointer-events-none absolute top-9 right-15 h-16 w-16 rounded-full bg-[#FFFDF9]/90 shadow-inner" />

        {/* Animated Drifting Clouds */}
        <motion.div
          animate={{ x: [0, 45, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-8 left-[12%] flex items-center text-white/85"
        >
          <Cloud className="h-12 w-12 fill-white/85 text-[#D98F9B]/20" />
        </motion.div>

        <motion.div
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-14 left-[52%] flex items-center text-white/80"
        >
          <Cloud className="h-10 w-10 fill-white/80 text-[#C9B8E8]/20" />
        </motion.div>

        {/* Animated Fluttering Butterflies */}
        <motion.div
          animate={{
            x: [0, 80, 140, 50, 0],
            y: [0, -25, 10, -18, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-28 left-[24%] z-20"
        >
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
            <path
              d="M14 12C10 4 2 4 3 11C4 16 10 15 14 12Z"
              fill="#F4D88B"
              stroke="#392D40"
              strokeWidth="1.2"
            />
            <path
              d="M14 12C18 4 26 4 25 11C24 16 18 15 14 12Z"
              fill="#F4D88B"
              stroke="#392D40"
              strokeWidth="1.2"
            />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            x: [0, -90, -40, 60, 0],
            y: [0, 18, -22, 8, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-24 right-[25%] z-20"
        >
          <svg width="26" height="22" viewBox="0 0 28 24" fill="none">
            <path
              d="M14 12C10 4 2 4 3 11C4 16 10 15 14 12Z"
              fill="#C9B8E8"
              stroke="#392D40"
              strokeWidth="1.2"
            />
            <path
              d="M14 12C18 4 26 4 25 11C24 16 18 15 14 12Z"
              fill="#C9B8E8"
              stroke="#392D40"
              strokeWidth="1.2"
            />
          </svg>
        </motion.div>

        {/* Rolling Botanical Meadow Hills */}
        <svg
          viewBox="0 0 800 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full"
        >
          <path
            d="M0 75C190 25 380 95 580 55C690 35 750 55 800 70V220H0V75Z"
            fill="#C7DBC2"
          />
          <path
            d="M0 115C220 80 450 140 800 90V220H0V115Z"
            fill="#B1CCAAC9"
          />
        </svg>

        {/* Instruction Pill inside Meadow */}
        <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-white/85 px-3.5 py-1 text-xs text-[#392D40] shadow-xs backdrop-blur-xs">
          🌱 Click anywhere on the grass to plant a{' '}
          <strong className="text-[#D98F9B]">{getSpecies(selectedSpeciesId).name}</strong>
        </div>

        {/* Planted Flowers */}
        {plantedFlowers.map((fl) => {
          const sp = getSpecies(fl.speciesId);
          return (
            <motion.button
              key={fl.id}
              type="button"
              initial={{ scale: 0, y: 20 }}
              animate={{
                scale: fl.scale,
                y: 0,
                rotate: breezeBoost ? [0, 12, -8, 10, 0] : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 15,
              }}
              onClick={(e) => handleFlowerClick(e, fl)}
              style={{
                left: `${fl.xPercent}%`,
                top: `${fl.yPercent}%`,
                transform: 'translate(-50%, -100%)',
              }}
              title={`${sp.name} — Click to read message`}
              className="group absolute z-20 origin-bottom cursor-pointer focus:outline-none"
            >
              <div className="animate-sway origin-bottom transition-transform group-hover:scale-125">
                <svg width="56" height="72" viewBox="0 0 56 72" fill="none">
                  {/* Stem & Leaves */}
                  <path
                    d="M28 30C28 45 26 58 28 70"
                    stroke="#588561"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 52C20 48 16 42 22 40C26 39 28 46 28 52Z"
                    fill="#88AD8E"
                    stroke="#392D40"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M28 46C36 42 40 36 34 34C30 33 28 40 28 46Z"
                    fill="#88AD8E"
                    stroke="#392D40"
                    strokeWidth="1.2"
                  />
                  {/* Petals */}
                  <circle cx="28" cy="14" r="8.5" fill={sp.color} stroke="#392D40" strokeWidth="1.4" />
                  <circle cx="39" cy="21" r="8.5" fill={sp.petalSecondary} stroke="#392D40" strokeWidth="1.4" />
                  <circle cx="35" cy="33" r="8.5" fill={sp.color} stroke="#392D40" strokeWidth="1.4" />
                  <circle cx="21" cy="33" r="8.5" fill={sp.petalSecondary} stroke="#392D40" strokeWidth="1.4" />
                  <circle cx="17" cy="21" r="8.5" fill={sp.color} stroke="#392D40" strokeWidth="1.4" />
                  {/* Flower Center */}
                  <circle cx="28" cy="24" r="6.5" fill={sp.centerColor} stroke="#392D40" strokeWidth="1.4" />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Cards: Selected Flower Message + Special Garden Blessing */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="wait">
          {inspectedFlower && (
            <motion.div
              key={inspectedFlower.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col justify-between rounded-2xl border border-[#392D40]/12 bg-[#FFFDF9] p-6 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D98F9B] font-mono-code">
                    <span
                      style={{ backgroundColor: inspectedFlower.color }}
                      className="h-3 w-3 rounded-full"
                    />
                    {inspectedFlower.meaning}
                  </span>
                  <Heart className="h-4 w-4 fill-[#D98F9B] text-[#D98F9B]" />
                </div>

                <h3 className="mt-2 font-serif-display text-2xl font-medium text-[#392D40]">
                  {inspectedFlower.name}
                </h3>
                <p className="mt-2 text-sm text-[#74647D] leading-relaxed">
                  &ldquo;{inspectedFlower.message}&rdquo;
                </p>
              </div>

              <p className="mt-4 font-handwriting text-lg text-[#D98F9B]">
                Tap any flower in the meadow above to read its whisper.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Garden Milestone Card */}
        <div
          className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
            gardenUnlocked
              ? 'border-[#9AB89F] bg-gradient-to-br from-[#FFFDF9] to-[#EDF5EE] shadow-md'
              : 'border-dashed border-[#392D40]/15 bg-white/60'
          }`}
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[#588561]">
                {gardenUnlocked
                  ? '★ GARDEN IN FULL BLOOM ★'
                  : `GARDEN PROGRESS: ${plantedFlowers.length} / 6 BLOOMS`}
              </span>
              <Sparkles className="h-4 w-4 text-[#F4D88B]" />
            </div>

            <h3 className="mt-2 font-serif-display text-2xl font-medium text-[#392D40]">
              {gardenUnlocked
                ? `A Blessing for ${recipientName}'s Garden`
                : 'Grow 6 Flowers to Unlock a Special Blessing'}
            </h3>

            <p className="mt-2 text-sm text-[#74647D] leading-relaxed">
              {gardenUnlocked
                ? giftConfig.gardenCompletionMessage
                : `Plant ${Math.max(0, 6 - plantedFlowers.length)} more ${
                    6 - plantedFlowers.length === 1 ? 'flower' : 'flowers'
                  } by clicking anywhere on the green meadow above to reveal the hidden garden note.`}
            </p>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#392D40]/10">
            <div
              style={{
                width: `${Math.min(100, (plantedFlowers.length / 6) * 100)}%`,
              }}
              className="h-full rounded-full bg-[#9AB89F] transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
