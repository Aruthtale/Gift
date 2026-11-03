import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Smile,
  Coffee,
  Moon,
  Sun,
  CloudRain,
  HandHeart,
  Music,
  Stars,
  Home,
  Gift,
  RotateCcw,
  Check,
} from 'lucide-react';
import { giftConfig, LoveReasonItem } from '../config/giftConfig';
import { useWorld } from '../context/WorldContext';
import { soundEngine } from '../utils/soundEngine';

const ReasonIcon: React.FC<{ type: LoveReasonItem['iconType']; isSurprise?: boolean }> = ({
  type,
  isSurprise,
}) => {
  const cls = isSurprise ? 'h-6 w-6 text-[#392D40]' : 'h-5 w-5 text-[#D98F9B]';
  switch (type) {
    case 'smile':
      return <Smile className={cls} />;
    case 'coffee':
      return <Coffee className={cls} />;
    case 'silence':
      return <Moon className={cls} />;
    case 'laugh':
      return <Sun className={cls} />;
    case 'rain':
      return <CloudRain className={cls} />;
    case 'hand':
      return <HandHeart className={cls} />;
    case 'voice':
      return <Music className={cls} />;
    case 'stars':
      return <Stars className={cls} />;
    case 'kindness':
      return <Heart className={cls} />;
    case 'home':
      return <Home className={cls} />;
    case 'details':
      return <Sparkles className={cls} />;
    case 'surprise':
    default:
      return <Gift className={cls} />;
  }
};

export const LoveReasons: React.FC = () => {
  const { flippedCardIds, toggleFlipCard, senderName, recipientName, unlockEasterEgg } = useWorld();
  const [couponClaimed, setCouponClaimed] = useState(false);

  const handleCardClick = (card: LoveReasonItem) => {
    const isCurrentlyFlipped = flippedCardIds.includes(card.id);
    toggleFlipCard(card.id);

    if (card.isSurpriseCard && !isCurrentlyFlipped) {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#F4D88B', '#D98F9B', '#C9B8E8'],
      });
      unlockEasterEgg(
        'card-12-surprise',
        '12th Secret Card Revealed! 🎟️',
        'You unlocked the Golden Forever Coupon at the end of the deck!'
      );
    }
  };

  const handleClaimCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playChime('unlock');
    setCouponClaimed(true);
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#F4D88B', '#D98F9B', '#9AB89F'],
    });
  };

  return (
    <section id="section-reasons" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9B8E8]/30 px-3.5 py-1 text-xs font-medium tracking-widest text-[#392D40] uppercase">
          <Heart className="h-3.5 w-3.5 fill-[#D98F9B] text-[#D98F9B]" />
          Chapter II • Little Truths
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl font-medium text-[#392D40]">
          Reasons Why I Love You
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#74647D]">
          Tap each card to turn it over. Don&rsquo;t forget to check the very last card in the deck—it holds a little surprise.
        </p>

        {/* Progress Pill */}
        <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-[#392D40]/10 bg-white/80 px-4 py-1.5 text-xs font-medium text-[#74647D] shadow-xs">
          <span>
            Flipped:{' '}
            <strong className="text-[#392D40]">
              {flippedCardIds.length} / {giftConfig.loveReasons.length}
            </strong>{' '}
            cards
          </span>
          {flippedCardIds.length === giftConfig.loveReasons.length && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#9AB89F]/25 px-2.5 py-0.5 text-[11px] font-semibold text-[#392D40]">
              <Sparkles className="h-3 w-3 text-[#D98F9B]" />
              All reasons discovered!
            </span>
          )}
        </div>
      </div>

      {/* Playful Card Deck Grid */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {giftConfig.loveReasons.map((card, idx) => {
          const isFlipped = flippedCardIds.includes(card.id);
          const tiltAngle = idx % 3 === 0 ? -1.2 : idx % 3 === 1 ? 1.1 : -0.6;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: (idx % 4) * 0.07 }}
              style={{ rotate: `${tiltAngle}deg` }}
              whileHover={{ rotate: 0, y: -6 }}
              onClick={() => handleCardClick(card)}
              className="perspective-1000 h-68 w-full cursor-pointer select-none"
            >
              <div
                className={`transform-style-3d relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT OF CARD */}
                <div
                  className={`backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl border p-6 shadow-[0_16px_36px_-12px_rgba(57,45,64,0.1)] ${
                    card.isSurpriseCard
                      ? 'border-[#F4D88B] bg-gradient-to-br from-[#FFFDF7] via-[#FDF3D7] to-[#F7E3AF]'
                      : 'border-[#392D40]/12 bg-[#FFFDF9] hover:border-[#D98F9B]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono-code text-xs font-semibold tracking-wider ${
                        card.isSurpriseCard ? 'text-[#392D40]' : 'text-[#D98F9B]'
                      }`}
                    >
                      {card.numberLabel}
                    </span>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        card.isSurpriseCard
                          ? 'bg-[#F4D88B] shadow-xs'
                          : 'bg-[#FFF9F3] border border-[#392D40]/8'
                      }`}
                    >
                      <ReasonIcon type={card.iconType} isSurprise={card.isSurpriseCard} />
                    </div>
                  </div>

                  <div className="my-auto py-2">
                    <h3 className="font-serif-display text-xl font-medium text-[#392D40] leading-snug">
                      {card.frontPrompt}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#392D40]/8 pt-3 text-xs text-[#74647D]">
                    <span className="font-handwriting text-base">
                      {card.isSurpriseCard ? 'Special final card ✨' : 'Tap to flip over'}
                    </span>
                    <RotateCcw className="h-3.5 w-3.5 opacity-60" />
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  className={`backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-2xl border p-6 shadow-[0_20px_44px_-12px_rgba(217,143,155,0.28)] ${
                    card.isSurpriseCard
                      ? 'border-[#D98F9B] bg-gradient-to-br from-[#392D40] via-[#4A3B53] to-[#2E2334] text-[#FFF9F3]'
                      : 'border-[#D98F9B]/45 bg-gradient-to-br from-[#FFF9F3] via-[#FFFDF9] to-[#F9ECEF] text-[#392D40]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono-code text-[11px] uppercase tracking-widest ${
                        card.isSurpriseCard ? 'text-[#F4D88B]' : 'text-[#D98F9B]'
                      }`}
                    >
                      {card.numberLabel}
                    </span>
                    <Heart
                      className={`h-4 w-4 ${
                        card.isSurpriseCard
                          ? 'fill-[#F4D88B] text-[#F4D88B]'
                          : 'fill-[#D98F9B] text-[#D98F9B]'
                      }`}
                    />
                  </div>

                  <div className="my-auto">
                    <p
                      className={`text-sm leading-relaxed ${
                        card.isSurpriseCard ? 'text-[#FFF9F3]/95' : 'text-[#392D40]'
                      }`}
                    >
                      &ldquo;{card.backMessage}&rdquo;
                    </p>
                  </div>

                  {card.isSurpriseCard ? (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleClaimCoupon}
                        className=" flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#F4D88B] px-3 py-2 text-xs font-semibold text-[#392D40] shadow-sm transition hover:bg-[#f7e2a4] cursor-pointer"
                      >
                        {couponClaimed ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Redeemed by {recipientName} ♡</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Claim Forever Coupon</span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-[#392D40]/10 pt-2.5">
                      <p className="font-handwriting text-lg text-[#D98F9B]">
                        — {card.whisperNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Claimed Coupon Banner if Surprise Card Claimed */}
      <AnimatePresence>
        {couponClaimed && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-dashed border-[#D98F9B] bg-[#FFFDF9] p-5 text-center shadow-md"
          >
            <p className="font-mono-code text-xs uppercase tracking-widest text-[#D98F9B]">
              ★ OFFICIAL KEEPSAKE VOUCHER • NO EXPIRATION ★
            </p>
            <h4 className="mt-1 font-serif-display text-xl font-medium text-[#392D40]">
              {recipientName}&rsquo;s Golden Forever Pass
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#74647D]">
              Signed &amp; promised by <strong className="text-[#392D40]">{senderName}</strong>. Take a screenshot or simply whisper the secret password: <span className="font-handwriting text-lg text-[#D98F9B]">&ldquo;Little World&rdquo;</span> anytime to redeem!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
