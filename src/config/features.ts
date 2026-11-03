/**
 * SECTION SWITCHES
 * -----------------------------------------------------------------------------
 * Every part of the little world is listed here. `true` = rendered, `false` = off.
 *
 * Current build: only the Hero ("Hey, you."), the Digital Letter (wax seal) and
 * the Final Surprise (the gift box under the starlight) are live.
 * The loading / entrance screen and the rest of the chapters are parked for now —
 * flip a flag back to `true` to bring that part online again.
 */
export const features = {
  /** Loading / entrance screen ("Someone made something special for you") */
  entrance: false,

  /** Hero — "Hey, you. ." */
  hero: true,
  /** Scrapbook & timeline of memories */
  memories: false,
  /** 12 flip cards — reasons why */
  reasons: false,
  /** Mini games (quiz, catch my heart, secret finder) */
  games: false,
  /** The little garden */
  garden: false,
  /** Our song / music player */
  music: false,
  /** Digital letter — wax seal */
  letter: true,
  /** Final surprise — the last gift box under the starlight */
  finale: true,

  /** Floating bottom navigation dock (only useful when many chapters are on) */
  navigation: false,
  /** Keepsake passport button in the top bar */
  passport: false,
  /** Pill "A Little World For {recipient}" di kiri atas */
  headerPill: false,
  /** Badge hero "Welcome to {recipient}'s Little World • tanggal" */
  heroBadge: false,
  /** Baris tanggal & koordinat di dalam surat */
  letterMeta: false,
  /** Label "THE HEART OF THIS LITTLE WORLD" di atas kado */
  finaleEyebrow: false,
  /** Baris kecil "A Little World For You • Interactive Digital Keepsake" di footer */
  footerTagline: false,
} as const;

export type FeatureKey = keyof typeof features;

/** First section that is actually rendered, used for the hero's "explore" button. */
export const nextLiveSection = (): string => {
  if (features.memories) return '#section-memories';
  if (features.reasons) return '#section-reasons';
  if (features.games) return '#section-games';
  if (features.garden) return '#section-garden';
  if (features.music) return '#section-music';
  if (features.letter) return '#section-letter';
  return '#section-finale';
};
