export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  story: string;
  moodNote: string;
  tilt: number;
  tapeStyle: 'butter' | 'rose' | 'lavender';
  sticker: 'star' | 'heart' | 'flower' | 'sparkle' | 'coffee' | 'moon';
  illustrationType: 'rainy-cafe' | 'sunset-train' | 'midnight-walk' | 'rooftop-stars' | 'bookshop' | 'sunday-morning' | 'botanical-park' | 'late-night-drive';
  palette: [string, string, string];
  isExtra?: boolean;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  badge: string;
}

export interface LoveReasonItem {
  id: number;
  numberLabel: string;
  frontPrompt: string;
  backMessage: string;
  whisperNote: string;
  iconType: 'smile' | 'coffee' | 'silence' | 'laugh' | 'rain' | 'hand' | 'voice' | 'stars' | 'kindness' | 'home' | 'details' | 'surprise';
  isSurpriseCard?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    isCorrect: boolean;
    reaction: string;
  }[];
}

export interface SecretObjectItem {
  id: string;
  name: string;
  hint: string;
  message: string;
  xPercent: number;
  yPercent: number;
  icon: 'locket' | 'ticket' | 'origami' | 'key' | 'star-bottle';
}

export interface GardenFlowerSpecies {
  id: string;
  name: string;
  color: string;
  petalSecondary: string;
  centerColor: string;
  message: string;
  meaning: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  coverGradient: [string, string, string];
  reasonNote: string;
  memoryTag: string;
  tempo: number;
  notes: number[]; // Frequencies for the built-in dreamy music box synth
  audioUrl?: string; // Optional external audio URL
}

/* ============================================================================
   ✏️  SEMUA TEKS & NAMA DIUBAH DI FILE INI
   ----------------------------------------------------------------------------
   Hanya ubah isi di dalam tanda kutip ("..."). Jangan ubah nama key, koma,
   atau tanda kutipnya, supaya halaman tetap jalan.

   PANDUAN CEPAT
   • Nama kamu & nama dia ......... `sender` & `recipient` (paling atas)
   • Inisial di segel lilin ....... `waxSealInitials`
   • Judul tab browser ............ `title`
   • Tanggal & koordinat .......... `date`, `coordinates`
   • Bagian 1 — Hero .............. blok `hero`
   • Bagian 2 — Surat ............. blok `letter`
   • Bagian 3 — Kado terakhir ..... blok `finalSurprise`
   • Footer ....................... blok `footer`
   • Label tombol kecil ........... blok `ui`

   TOKEN OTOMATIS — bisa dipakai di teks mana pun, terisi sendiri:
     {sender}            → nama kamu
     {recipient}         → nama dia
     {senderInitial}     → huruf pertama nama kamu
     {recipientInitial}  → huruf pertama nama dia
   Contoh: "Untuk {recipient} ♡" otomatis menjadi "Untuk Achima ♡"
   ========================================================================== */

export const giftConfig = {
  // ── NAMA ──────────────────────────────────────────────────────────────────
  sender: "Zennn", // nama kamu (pengirim)
  recipient: "Achima", // nama dia (penerima)
  waxSealInitials: "{senderInitial} & {recipientInitial}", // segel lilin: "J & A"
  title: "A Little World For You", // judul tab browser
  date: "2026-11-03", // tanggal di badge hero & di surat
  coordinates: "35.6762° N, 139.6503° E", // koordinat di surat

  entrance: {
    eyebrow: "A PRIVATE DIGITAL KEEPSAKE",
    headline: "Someone made something special for you.",
    subtext: "Take a slow breath, turn up your sound gently, and step inside a tiny world built entirely around you.",
    buttonText: "Open your little surprise",
    stampLabel: "POSTAGE PAID • HEART TO HEART",
  },

  // ── BAGIAN 1: HERO ("Hey, you. Achima.") ──────────────────────────────────
  hero: {
    badge: "Welcome to {recipient}'s Little World", // pill paling atas
    title: "Hey, you.",
    subtitle: "I made a little something, just for you.",
    description:
      "Every corner of this place holds a piece of how I see you—the quiet moments, the inside jokes, the songs that remind me of your laugh, and the things I sometimes forget to say out loud.",
    ctaPrimary: "Explore Our Little World", // tombol gelap
    ctaSecondary: "Play Mini Games", // tombol kedua (hanya muncul kalau bab games aktif)
    characterDoubleClickSecret:
      "You found the secret hug! Even when we're miles apart, my favorite place in the universe is right next to you.",
    characterSecretToastTitle: "Secret Character Hug Unlocked! 🤗",
    characterSecretHint: "(double-click us for a secret)", // di bawah ilustrasi
    characterSecretHintHover: "Hehe, double-click us for a secret!",
    floatingWhispers: [
      "Still thinking about the way your eyes crinkle when you laugh.",
      "You make ordinary Tuesdays feel like a holiday.",
      "Did you drink enough water today, my love?",
      "If I could bottle up your laugh, I'd listen to it every morning.",
      "Every good song reminds me of you lately."
    ]
  },

  memories: [
    {
      id: "mem-1",
      title: "The Rainy Corner Table",
      date: "OCTOBER 14",
      location: "Little Cedar Café",
      caption: "Two lattes & three hours that felt like five minutes.",
      story:
        "It was pouring outside and the windows were completely fogged up. You drew a tiny smiley face on the glass while telling me about your favorite childhood book. That was the exact second I knew I wanted to hear every story you'd ever tell.",
      moodNote: "Smelled like cinnamon, rain & warm wool coats",
      tilt: -2.5,
      tapeStyle: "butter",
      sticker: "coffee",
      illustrationType: "rainy-cafe",
      palette: ["#F3D6C6", "#D98F9B", "#6D566B"]
    },
    {
      id: "mem-2",
      title: "Golden Hour on the Coast Line",
      date: "DECEMBER 02",
      location: "Carriage No. 4",
      caption: "Sharing one pair of headphones as the sun dipped down.",
      story:
        "You fell asleep on my shoulder halfway through the ride with the orange sunset painting the whole train car gold. I didn't dare move an inch for forty-five minutes because I didn't want to wake you.",
      moodNote: "Track #3 on repeat the whole ride home",
      tilt: 2.2,
      tapeStyle: "rose",
      sticker: "star",
      illustrationType: "sunset-train",
      palette: ["#F6D799", "#E29587", "#53425B"]
    },
    {
      id: "mem-3",
      title: "2:00 AM Ice Cream Run",
      date: "JANUARY 19",
      location: "24h Corner Market",
      caption: "Freezing hands, oversized hoodies, uncontrollable giggles.",
      story:
        "Neither of us could sleep, so we walked out into the crisp midnight air wearing three layers of sweaters just to buy pistachio ice cream. We sat on the curb laughing so hard at our own shadows.",
      moodNote: "Temperature: 4°C • Warmth level: 100/100",
      tilt: -1.8,
      tapeStyle: "lavender",
      sticker: "moon",
      illustrationType: "midnight-walk",
      palette: ["#C9B8E8", "#7E7299", "#2E2538"]
    },
    {
      id: "mem-4",
      title: "Lost in the Secondhand Bookshop",
      date: "MARCH 08",
      location: "Paper Lantern Books",
      caption: "You hiding behind a stack of poetry books.",
      story:
        "You found a vintage postcard tucked inside an old novel from 1974 and insisted we buy the book just so the postcard wouldn't be lonely. Your heart is too soft for this world.",
      moodNote: "Dusty paper & vanilla tea",
      tilt: 2.8,
      tapeStyle: "butter",
      sticker: "heart",
      illustrationType: "bookshop",
      palette: ["#E8CFC1", "#C68B77", "#4D3B47"]
    },
    {
      id: "mem-5",
      title: "Stargazing on the Balcony",
      date: "MAY 22",
      location: "Our Favorite Rooftop",
      caption: "We only knew two constellations, so we invented the rest.",
      story:
        "Wrapped in a single plaid blanket, pointing at random clusters of stars and naming them after snacks and inside jokes. I don't remember the constellations, only how bright your eyes looked.",
      moodNote: "Clear skies & chamomile tea",
      tilt: -2.4,
      tapeStyle: "rose",
      sticker: "sparkle",
      illustrationType: "rooftop-stars",
      palette: ["#D9C8F0", "#9581B8", "#2B2235"]
    },
    {
      id: "mem-6",
      title: "Slow Sunday Pancakes",
      date: "JULY 11",
      location: "The Kitchen Counter",
      caption: "Slightly burnt edges, 10/10 company.",
      story:
        "Flour on the tip of your nose, sunlight streaming through the blinds, and you dancing barefoot to an old soul record while flipping pancakes that looked like abstract art.",
      moodNote: "Maple syrup & morning sunshine",
      tilt: 1.9,
      tapeStyle: "lavender",
      sticker: "flower",
      illustrationType: "sunday-morning",
      palette: ["#FCE5B2", "#E6A58E", "#5A4450"]
    },
    {
      id: "mem-7",
      title: "The Botanical Greenhouse",
      date: "AUGUST 29",
      location: "Glass Conservatory",
      caption: "You talking politely to a tiny fern.",
      story:
        "We spent the afternoon wandering among tropical orchids and misty stone paths. You whispered encouragement to a tiny sprouting fern and made me promise we'd have a balcony full of plants one day.",
      moodNote: "Humid air, moss & blooming jasmine",
      tilt: -2.1,
      tapeStyle: "butter",
      sticker: "flower",
      illustrationType: "botanical-park",
      palette: ["#C5DFC9", "#8BAF92", "#394D40"],
      isExtra: true
    },
    {
      id: "mem-8",
      title: "Windows Down, No Destination",
      date: "OCTOBER 03",
      location: "Coastal Highway",
      caption: "Singing every lyric wrong at the top of our lungs.",
      story:
        "We missed our exit twice because we were too busy harmonizing terribly to our favorite playlist. Turns out getting lost with you is better than arriving anywhere else.",
      moodNote: "Sea breeze & twilight horizons",
      tilt: 2.4,
      tapeStyle: "rose",
      sticker: "star",
      illustrationType: "late-night-drive",
      palette: ["#E8B8C8", "#9D7FB0", "#352A40"],
      isExtra: true
    }
  ] as MemoryItem[],

  timeline: [
    {
      id: "tl-1",
      date: "Chapter 01",
      title: "The First 'Hello' That Changed Everything",
      description: "What started as a simple conversation turned into neither of us wanting to say goodnight.",
      badge: "Where it began"
    },
    {
      id: "tl-2",
      date: "Chapter 02",
      title: "Our First Unplanned Adventure",
      description: "Getting caught in the rain, laughing under a tiny awning, and realizing home isn't a place—it's a person.",
      badge: "Core memory"
    },
    {
      id: "tl-3",
      date: "Chapter 03",
      title: "Learning All Your Little Habits",
      description: "How you take your coffee, the songs you hum when you're happy, and the quiet look you get when you're sleepy.",
      badge: "Little details"
    },
    {
      id: "tl-4",
      date: "Chapter 04 • Now",
      title: "Still Falling for You Every Single Day",
      description: "And building this tiny digital universe just to remind you how deeply you are loved.",
      badge: "To infinity"
    }
  ] as TimelineItem[],

  loveReasons: [
    {
      id: 1,
      numberLabel: "No. 01",
      frontPrompt: "The way your smile changes a whole room",
      backMessage: "Your smile makes even the most ordinary, exhausting days feel gentle and worth celebrating.",
      whisperNote: "My favorite sight in the world",
      iconType: "smile"
    },
    {
      id: 2,
      numberLabel: "No. 02",
      frontPrompt: "How you notice the smallest things",
      backMessage: "The way you care about little things—remembering someone's favorite snack, stopping to admire a stray cat, or checking if I got home safe.",
      whisperNote: "Your heart is pure gold",
      iconType: "details"
    },
    {
      id: 3,
      numberLabel: "No. 03",
      frontPrompt: "What happens when neither of us says a word",
      backMessage: "You make silence feel completely comfortable. With you, I never have to perform or pretend—just breathing beside you feels enough.",
      whisperNote: "Peace looks like you",
      iconType: "silence"
    },
    {
      id: 4,
      numberLabel: "No. 04",
      frontPrompt: "That specific laugh you try to hold back",
      backMessage: "When something catches you off guard and your shoulders shake before you burst out laughing—it's an instant cure for any bad mood.",
      whisperNote: "Instant serotonin",
      iconType: "laugh"
    },
    {
      id: 5,
      numberLabel: "No. 05",
      frontPrompt: "How safe the world feels next to you",
      backMessage: "No matter how loud or chaotic life gets outside, holding your hand makes everything slow down to a gentle rhythm.",
      whisperNote: "My safe harbor",
      iconType: "hand"
    },
    {
      id: 6,
      numberLabel: "No. 06",
      frontPrompt: "Your sleepy morning voice",
      backMessage: "Those first five minutes when you wake up and talk in a soft, raspy whisper—I could listen to it forever.",
      whisperNote: "Coziest sound ever",
      iconType: "voice"
    },
    {
      id: 7,
      numberLabel: "No. 07",
      frontPrompt: "The passion in your eyes when you talk",
      backMessage: "Whenever you start rambling about something you love, your whole face lights up like a constellation.",
      whisperNote: "Never stop rambling to me",
      iconType: "stars"
    },
    {
      id: 8,
      numberLabel: "No. 08",
      frontPrompt: "Your quiet, effortless kindness",
      backMessage: "You treat people with so much warmth even when nobody is watching. You inspire me to be softer and kinder every day.",
      whisperNote: "So proud of who you are",
      iconType: "kindness"
    },
    {
      id: 9,
      numberLabel: "No. 09",
      frontPrompt: "How you turn errands into adventures",
      backMessage: "Even a boring grocery store trip feels like a romantic comedy scene when I'm pushing the cart next to you.",
      whisperNote: "Best co-pilot",
      iconType: "coffee"
    },
    {
      id: 10,
      numberLabel: "No. 10",
      frontPrompt: "The way you listen with your whole heart",
      backMessage: "You don't just wait to reply—you actually hear what's underneath my words, even when I struggle to explain it.",
      whisperNote: "You truly see me",
      iconType: "rain"
    },
    {
      id: 11,
      numberLabel: "No. 11",
      frontPrompt: "Because 'home' has your name on it",
      backMessage: "Anywhere we are—a crowded train, a quiet café, or a rainy street corner—feels like home the second you're there.",
      whisperNote: "Always you",
      iconType: "home"
    },
    {
      id: 12,
      numberLabel: "No. 12 • SECRET",
      frontPrompt: "Tap to unlock the 12th hidden card ✨",
      backMessage: "And a million unwritten reasons waiting in our future. Here is a Golden Forever Coupon: Redeemable anytime for one spontaneous midnight treat, a long back massage, & endless hugs.",
      whisperNote: "Valid for eternity • No expiration",
      iconType: "surprise",
      isSurpriseCard: true
    }
  ] as LoveReasonItem[],

  quizQuestions: [
    {
      id: 1,
      question: "What was the very first thing I secretly noticed about you?",
      subtitle: "Think back to the very beginning...",
      options: [
        {
          text: "How warm and genuine your eyes looked when you smiled",
          isCorrect: true,
          reaction: "Bingo! I was honestly a little tongue-tied the first time you smiled at me."
        },
        {
          text: "Your impeccable taste in shoes",
          isCorrect: false,
          reaction: "Very stylish indeed, though my eyes were definitely looking straight at your smile!"
        },
        {
          text: "How fast you could type on your phone",
          isCorrect: false,
          reaction: "Haha, impressive speed, but it was your warm eyes and smile that got me!"
        }
      ]
    },
    {
      id: 2,
      question: "If we have a completely free rainy Sunday with zero plans, what's our ideal scenario?",
      subtitle: "No alarms, nowhere we have to be...",
      options: [
        {
          text: "Running a 10K marathon in the mud",
          isCorrect: false,
          reaction: "Only if the finish line is our couch and a pile of warm blankets!"
        },
        {
          text: "Cozy blankets, warm drinks, good music & talking for hours",
          isCorrect: true,
          reaction: "Yes! Nowhere else I'd rather be than wrapped up in a blanket cocoon with you."
        },
        {
          text: "Doing taxes and organizing spreadsheets",
          isCorrect: false,
          reaction: "Unless 'spreadsheets' is code for 'spreading butter on warm pancakes'!"
        }
      ]
    },
    {
      id: 3,
      question: "What do I always do when you're telling me a story you're excited about?",
      subtitle: "You probably catch me doing this every time...",
      options: [
        {
          text: "Stare at you with a goofy, lovestruck grin without realizing it",
          isCorrect: true,
          reaction: "Guilty as charged. I get completely mesmerized watching how animated you get."
        },
        {
          text: "Take formal stenographer notes",
          isCorrect: false,
          reaction: "Only mental notes of how adorable you look!"
        },
        {
          text: "Check the weather forecast",
          isCorrect: false,
          reaction: "Never! You have 100% of my attention."
        }
      ]
    },
    {
      id: 4,
      question: "Which little moment with you is secretly one of my all-time favorites?",
      subtitle: "It's never about the expensive plans...",
      options: [
        {
          text: "Late-night walks & laughing over the silliest inside jokes",
          isCorrect: true,
          reaction: "Spot on. Those quiet, unscripted midnight walks with you mean everything to me."
        },
        {
          text: "Waiting in traffic at rush hour",
          isCorrect: false,
          reaction: "Though honestly, even traffic is tolerable if you're the DJ!"
        },
        {
          text: "Reading instruction manuals together",
          isCorrect: false,
          reaction: "Close, if you count assembling furniture while giggling!"
        }
      ]
    },
    {
      id: 5,
      question: "Final question: How much do I actually adore you?",
      subtitle: "Choose wisely (though every answer here might be biased)...",
      options: [
        {
          text: "To the moon, past the constellations, and all the way back",
          isCorrect: true,
          reaction: "And even that feels like an understatement."
        },
        {
          text: "More than coffee on a Monday morning & rainy naps combined",
          isCorrect: true,
          reaction: "Which is saying A LOT—you win by a landslide."
        },
        {
          text: "More than words on a screen could ever fully hold",
          isCorrect: true,
          reaction: "That's why I had to build a whole little world just to show a fraction of it."
        }
      ]
    }
  ] as QuizQuestion[],

  catchHeartGame: {
    targetScore: 12,
    durationSeconds: 22,
    secretWinMessage:
      "You caught my heart (again)! Truth is, you didn't even have to try—it's been yours from the very beginning."
  },

  secretObjects: [
    {
      id: "sec-locket",
      name: "Brass Heart Locket",
      hint: "Resting near the warm windowsill lamp",
      message: "Inside the locket is a tiny folded promise: 'I'll always be in your corner, on your brightest days and your quietest ones.'",
      xPercent: 18,
      yPercent: 36,
      icon: "locket"
    },
    {
      id: "sec-ticket",
      name: "Midnight Train Stub",
      hint: "Tucked near the vintage books on the shelf",
      message: "Admit Two — Destination: Anywhere at all, as long as I get the window seat next to you.",
      xPercent: 76,
      yPercent: 28,
      icon: "ticket"
    },
    {
      id: "sec-origami",
      name: "Paper Crane",
      hint: "Perched near the cozy teacup on the desk",
      message: "Legend says folding a thousand cranes grants a wish. Mine already came true the day our paths crossed.",
      xPercent: 48,
      yPercent: 64,
      icon: "origami"
    },
    {
      id: "sec-key",
      name: "Little Keepsake Key",
      hint: "Hidden near the bottom left cushion",
      message: "A tiny brass key that unlocks every secret corner of my heart (you've had the master copy since day one).",
      xPercent: 26,
      yPercent: 78,
      icon: "key"
    },
    {
      id: "sec-bottle",
      name: "Starlight in a Jar",
      hint: "Glowing softly near the lower right botanical pot",
      message: "Saved a little jar of starlight for whenever you have a long day and need a reminder of how brightly you shine.",
      xPercent: 83,
      yPercent: 73,
      icon: "star-bottle"
    }
  ] as SecretObjectItem[],

  secretMasterMessage:
    "You found all five hidden keepsakes! Just like in real life, you notice every gentle detail that everyone else rushes past. Thank you for looking closely at this little world.",

  gardenFlowers: [
    {
      id: "fl-rose",
      name: "Blush Peony",
      color: "#D98F9B",
      petalSecondary: "#F2C6CE",
      centerColor: "#F4D88B",
      meaning: "Warmth & Endless Affection",
      message: "Planted for every time your hug fixed a heavy day without needing a single word."
    },
    {
      id: "fl-lavender",
      name: "Dream Lavender",
      color: "#C9B8E8",
      petalSecondary: "#E3D8F6",
      centerColor: "#FFF3C4",
      meaning: "Serenity & Safe Harbor",
      message: "Planted for the peaceful calm that washes over me whenever I hear your voice."
    },
    {
      id: "fl-buttercup",
      name: "Sunbeam Buttercup",
      color: "#F4D88B",
      petalSecondary: "#FBEBC0",
      centerColor: "#D98F9B",
      meaning: "Pure Joy & Laughter",
      message: "Planted for all the silly inside jokes that make us laugh until our stomachs hurt."
    },
    {
      id: "fl-cosmos",
      name: "Starlight Cosmos",
      color: "#E5A9B8",
      petalSecondary: "#FCE4EC",
      centerColor: "#F4D88B",
      meaning: "Harmony & Wonder",
      message: "Planted for our late-night talks when the rest of the world is fast asleep."
    },
    {
      id: "fl-bluebell",
      name: "Twilight Bluebell",
      color: "#A8C3E8",
      petalSecondary: "#D4E4FA",
      centerColor: "#FFF6D6",
      meaning: "Constancy & Gratitude",
      message: "Planted simply because I am so grateful to exist in the same timeline as you."
    }
  ] as GardenFlowerSpecies[],

  gardenCompletionMessage:
    "Look at what you grew! Every flower in this garden carries a wish I hold for you: may your days always be soft, may your heart always feel held, and may we keep tending to our little world together.",

  songs: [
    {
      id: "song-1",
      title: "Golden Hour in Our Kitchen",
      artist: "Music Box Sessions • For Clara",
      duration: 48,
      coverGradient: ["#F4D88B", "#D98F9B", "#6D546E"],
      reasonNote: "I picked this melody because it sounds exactly like sunlight pouring through the window while we make coffee together on a slow morning.",
      memoryTag: "Track 01 • Morning Warmth",
      tempo: 420,
      // Warm C major / F major7 music box arpeggio
      notes: [523.25, 659.25, 783.99, 987.77, 880.0, 783.99, 659.25, 587.33, 698.46, 880.0, 1046.5, 880.0, 783.99, 659.25, 523.25, 659.25]
    },
    {
      id: "song-2",
      title: "Raindrops on the Café Glass",
      artist: "Velvet Waltz • Little Cedar",
      duration: 52,
      coverGradient: ["#C9B8E8", "#D98F9B", "#392D40"],
      reasonNote: "Every soft note reminds me of sitting across from you while the rain fell outside, completely losing track of time.",
      memoryTag: "Track 02 • Rainy Afternoons",
      tempo: 480,
      // Dreamy A minor9 / F major7 melody
      notes: [440.0, 523.25, 659.25, 783.99, 659.25, 523.25, 493.88, 587.33, 698.46, 880.0, 783.99, 698.46, 659.25, 523.25, 440.0, 523.25]
    },
    {
      id: "song-3",
      title: "Two Constellations & A Blanket",
      artist: "Midnight Lullaby • Rooftop",
      duration: 56,
      coverGradient: ["#8E7AB5", "#C9B8E8", "#221A29"],
      reasonNote: "For the quiet nights when we talk in whispers and the whole universe feels like it belongs just to the two of us.",
      memoryTag: "Track 03 • Starlight",
      tempo: 520,
      // Gentle G major7 lullaby
      notes: [392.0, 493.88, 587.33, 739.99, 783.99, 739.99, 587.33, 493.88, 523.25, 659.25, 783.99, 987.77, 880.0, 739.99, 587.33, 493.88]
    },
    {
      id: "song-4",
      title: "Home Is Wherever You Are",
      artist: "Keepsake Ensemble • Always",
      duration: 45,
      coverGradient: ["#E8A598", "#F4D88B", "#4B384C"],
      reasonNote: "Because no matter where life takes us next, this is the feeling I carry in my chest every time you reach for my hand.",
      memoryTag: "Track 04 • Our Anthem",
      tempo: 390,
      // Uplifting D major / G major melody
      notes: [587.33, 739.99, 880.0, 1174.66, 987.77, 880.0, 739.99, 659.25, 783.99, 987.77, 880.0, 739.99, 659.25, 587.33, 739.99, 880.0]
    }
  ] as SongTrack[],

  // ── BAGIAN 2: SURAT (segel lilin "A Little Letter For You") ───────────────
  letter: {
    eyebrow: "Chapter VI • Heart to Heart",
    title: "A Little Letter For You",
    subtitle:
      "Some feelings deserve ink and quiet paper. Break the wax seal whenever you're ready to read.",
    salutation: "My dearest {recipient},", // pembuka surat
    // ISI SURAT — satu baris = satu paragraf.
    // Tambah/hapus baris bebas, asal setiap baris diakhiri koma.
    paragraphs: [
      // Paragraf 1
      "Alloo sayanggkuu cantikku manisku tuan putriku, Khansa 'Ashimah Qurrotu 'Ainy",
      // Paragraf 2
      "Sebelumnyaa, makasii banyak yaa sayangkuu. Makasii karena udaa mau nerima aku di hidup kamu. Thank you for letting me be a part of your life, sayang. Aku bakal selalu usahain apapun yang aku bisa buat kesayangan aku ini. Dan balik lagi ke apa yang pernah aku bilang sebelumnya, aku bukan seseorang yang bisa ngasih kamu segalanya, bukan juga orang yang selalu bisa keliatan sempurna di depan kamu. Aku juga nggak bisa ngejanjiin banyak hal yang mungkin belum tentu bisa aku tepati. But one thing I can promise, aku bakal selalu berusaha ngasih yang terbaik buat kamu, dalam hal apapun dan dengan segala kemampuan yang aku punya. Aku pengen terus belajar jadi seseorang yang lebih baik, bukan cuma buat diri aku sendiri, tapi juga buat kita.",
      // Paragraf 3
      "Aku nggak pernah punya keinginan buat nyakitin kamu, sayang. Instead, I want to be someone you can always feel safe with. Aku pengen ngejagain kamu, nemenin kamu, dan jadi tempat kamu pulang ketika dunia lagi nggak baik-baik aja. Kalaupun suatu saat nanti kita lagi kurang komunikasi, lagi ada masalah, atau mungkin ada hal-hal yang bikin kita saling nggak ngerti, aku pengen kita tetep bisa jalanin semuanya bareng-bareng. Kita cari solusinya sama-sama, kita obrolin semuanya baik-baik, dan kita saling berbagi isi pikiran tanpa harus takut buat cerita. Aku pengen kita bisa saling ngerti, bukan saling menyalahkan. Jadi, aku bener-bener pengen ngejalanin hubungan ini dengan serius dan sepenuh hati. I want us to grow together, learn together, and stay together through everything. Aku bakal selalu berusaha ngasih kepercayaan ke kamu dengan cara selalu terbuka, jujur, dan nggak nutup-nutupin sesuatu dari kamu. Begitu juga sebaliknya, aku pengen kamu selalu ngerasa punya ruang buat percaya sama aku. Dan kalau suatu saat ada hal yang masih kurang dari aku, please tell me, yaa sayangkuu? Aku mau belajar dan memperbaikinya sama-sama sama kamu. ",
      // Paragraf 4
      "I'm so, so in love with you. Aku seneng banget akhirnya bisa ketemu seseorang yang ternyata jauh lebih dari apa yang selama ini aku harapin. Seseorang yang kehadirannya bisa bikin aku ngerasa seberuntung ini. Bahkan mamah juga setuju-setuju aja, dan itu jadi salah satu hal yang bikin aku makin seneng dan yakin buat ngejalanin semuanya sama kamu. Aku bener-bener pengen ngelewatin banyak hal bareng kamu, mau itu sedih, seneng, capek, bahagia, atau bahkan hari-hari yang mungkin nggak berjalan sesuai harapan kita. I want to experience all of those things with you. Jadi, jangan pernah ngerasa kalau kehadiran kamu itu ganggu aku, atau kalau kamu terlalu banyak minta perhatian aku. You're never a burden to me, sayang. Aku justru seneng bisa punya seseorang yang bisa aku perhatiin, aku sayang, dan aku perjuangin.",

      "And please, never forget how beautiful you are. Kamu cantik, kamu lucu, kamu manis, dan honestly, anything about you is just so adorable to me. Bahkan hal-hal kecil yang mungkin nggak pernah kamu sadari, semuanya punya tempat tersendiri di mata aku. I love your little things, your silly moments, your smile, and every little detail that makes you you.",

      "I don't know what the future holds for us, but I really hope I get to spend it with you. Aku nggak minta semuanya selalu berjalan sempurna, aku cuma berharap kita selalu punya kemauan buat saling bertahan, saling memahami, dan saling memilih satu sama lain, bahkan di hari-hari yang sulit sekalipun.",

      "I love you, my pretty little princess. More than words could ever explain. ♡"
    ],
    sealedFor: "Private correspondence • for {recipient}", // di bawah segel
    noteTitle: "A Handwritten Note From {sender}", // judul di kartu surat
    sealHint: "Tap the wax seal to unfold the letter ♡",
    replayButton: "Replay Letter Reveal",
    fullTextButton: "Show Full Text",
    foldButton: "Fold back into envelope",
    flowerToastTitle: "Pressed Keepsake Flower 🌿",
    flowerToastBody:
      "Tucked inside the margin of this letter so it stays blooming between our pages forever.",
    signOff: "Forever in your corner,",
    signature: "{sender} ♡", // nama penanda tangan di bawah surat
    postscript: "P.S. Look up from your screen for a second—someone is ridiculously in love with you."
  },

  // ── BAGIAN 3: KADO TERAKHIR ("Before You Go, ...") ────────────────────────
  finalSurprise: {
    eyebrow: "THE HEART OF THIS LITTLE WORLD",
    closedHeadline: "Before You Go, {recipient}...", // judul saat kado masih tertutup
    closedSubtext:
      "There is one last little box waiting under the starlight with your name tied to the ribbon.",
    buttonText: "One last thing...",
    preHeadline: "Before you close this box, remember this:",
    mainQuote: "Among all the beautiful things this world has to offer, you will always be my favorite.",
    subMessage:
      "Thank you for being my favorite adventure, my safest place, my calmest harbor, and my best friend. Every little moment with you means more than words could ever explain.",
    signOff: "Forever yours, {sender} ♡",
    capsuleOpen: "Secret Unlocked: Open Starlight Time Capsule ✨",
    capsuleClose: "Hide Starlight Time Capsule",
    capsuleEyebrow: "★ True Explorer Secret Bonus ★",
    capsuleBody:
      "Since you took the time to play the little games, discover the hidden surprises, and explore every tiny corner of this world, here's one last little secret just for yo. Building this little universe made me smile for hours, simply because I kept imagining your face as you clicked through every surprise, And if there's one thing I want you to take with you after leaving this little world, it's this, 'No matter how many stars fill the universe, you'll always be the one I look for'. You are, and always will be, my favorite person in every universe..",
    starlightButton: "Shower More Starlight",
    replayButtonText: "Replay our little world"
  },

  // ── FOOTER ────────────────────────────────────────────────────────────────
  footer: {
    signature: "Handcrafted with love by {sender} for {recipient} ♡",
    tagline: "A Little World For You • Interactive Digital Keepsake",
  },

  // ── LABEL KECIL (bar atas & tombol musik) ─────────────────────────────────
  ui: {
    headerPill: "A Little World For {recipient}",
    musicPlay: "Play Music Box",
    musicPlaying: "Playing Music Box",
    musicOff: "Sound Off",
  },
};

/* ----------------------------------------------------------------------------
   Mesin kecil untuk mengisi token {sender} / {recipient} / inisial.
   Kamu tidak perlu mengubah apa pun di bawah ini.
   -------------------------------------------------------------------------- */

export const initialsOf = (name: string): string => {
  const clean = name.trim();
  return clean.length > 0 ? clean.charAt(0).toUpperCase() : "";
};

export const fillText = (
  template: string,
  names?: { sender?: string; recipient?: string }
): string => {
  const sender = names?.sender ?? giftConfig.sender;
  const recipient = names?.recipient ?? giftConfig.recipient;

  return template
    .replace(/\{sender\}/g, sender)
    .replace(/\{recipient\}/g, recipient)
    .replace(/\{senderInitial\}/g, initialsOf(sender))
    .replace(/\{recipientInitial\}/g, initialsOf(recipient));
};
