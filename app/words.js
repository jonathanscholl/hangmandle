// List of 6-letter words
const SIX_LETTER_WORDS = [
  "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
  "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE", "ALLOW", "ALONE",
  "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY", "ARENA",
  "ARGUE", "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWARD", "AWARE",
  "BADLY", "BAKER", "BASES", "BASIC", "BASIS", "BEACH", "BEGIN", "BEGAN", "BEGUN", "BEING",
  "BELOW", "BENCH", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK", "BLOOD", "BOARD", "BRAIN",
  "BRAND", "BREAD", "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BUILD", "BURST", "CABLE",
  "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST",
  "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLIMB", "CLOCK", "CLOSE", "COAST", "COUNT", "COURT",
  "COVER", "CRAFT", "CRASH", "CREAM", "CRIME", "CROSS", "CROWD", "CURVE", "CYCLE", "DAILY",
  "DANCE", "DEATH", "DEPTH", "DOUBT", "DRAFT", "DRAMA", "DREAM", "DRESS", "DRINK", "DRIVE",
  "EARLY", "EARTH", "EMPTY", "ENEMY", "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT",
  "EXACT", "EXIST", "EXTRA", "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIGHT",
  "FINAL", "FOCUS", "FORCE", "FRAME", "FRANK", "FRONT", "FRUIT", "GLASS", "GRACE", "GRAND",
  "GRASS", "GREAT", "GREEN", "GROSS", "GROUP", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY",
  "HEART", "HEAVY", "HENCE", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INDEX",
  "INNER", "INPUT", "ISSUE", "JOINT", "JUDGE", "KNIFE", "LAUGH", "LAYER", "LEARN", "LEASE",
  "LEAST", "LEAVE", "LEGAL", "LEVEL", "LIGHT", "LIMIT", "LOCAL", "LOGIC", "LOOSE", "LOWER",
  "LUCKY", "LUNCH", "MAGIC", "MAJOR", "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE",
  "MOUTH", "MOVIE", "MUSIC", "NOISE", "NORTH", "NOVEL", "NURSE", "OCCUR", "OCEAN", "OFFER",
  "ORDER", "OUTER", "PANEL", "PAPER", "PARTY", "PEACE", "PHASE", "PHONE", "PHOTO", "PIECE",
  "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER",
  "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE",
  "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE", "RANGE", "RAPID", "RATIO", "REACH",
  "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROUGH", "ROUND", "ROUTE", "SCALE", "SCENE",
  "SCOPE", "SCORE", "SENSE", "SERVE", "SEVEN", "SHADE", "SHAKE", "SHAPE", "SHARE", "SHARP",
  "SHEEP", "SHEER", "SHEET", "SHELF", "SHELL", "SHIFT", "SHIRT", "SHOCK", "SHOOT", "SHOUL",
  "SIGHT", "SINCE", "SKILL", "SLEEP", "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SOLVE",
  "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPLIT", "SPORT",
  "STAFF", "STAGE", "STAND", "START", "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK",
  "STORE", "STORM", "STORY", "STRIP", "STUDY", "STYLE", "SUGAR", "SWEET", "TABLE", "TASTE",
  "TEACH", "THANK", "THEME", "THICK", "THING", "THROW", "TIGHT", "TITLE", "TODAY", "TOUCH",
  "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRUST", "TRUTH",
  "TWICE", "UNDER", "UNITE", "UNITY", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE",
  "VIRUS", "VISIT", "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHERE", "WHITE",
  "WHOLE", "WHOSE", "WOMAN", "WORLD", "WORRY", "WOULD", "WRITE", "WRONG", "YIELD", "YOUNG",
  "YOUTH"
];

// Function to get a word based on the current date
export function getDailyWord() {
  // Get the current date
  const today = new Date();
  // Use the date as seed for consistent word selection
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple deterministic hash function
  let hash = 0;
  for (let i = 0; i < seed.toString().length; i++) {
    hash = ((hash << 5) - hash) + seed.toString().charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use the hash to select a word
  const index = Math.abs(hash) % SIX_LETTER_WORDS.length;
  return SIX_LETTER_WORDS[index];
}

// Function to get a random word
export function getRandomWord() {
  const index = Math.floor(Math.random() * SIX_LETTER_WORDS.length);
  return SIX_LETTER_WORDS[index];
}