/* Myanmar Baydin — traditional auspicious / inauspicious day tables + name-letter guide.
   Plain script, no dependencies. Defines the global AUSPICIOUS object.
   Weekday indices: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday,
   5=Friday, 6=Saturday, 7=Rahu (Wednesday afternoon).
   NOTE on Wednesday-afternoon Pyathada: in Waso, Tazaungmon and Tabaung the
   second Pyathada day is Wednesday AFTERNOON (Rahu), encoded as 7, not 3.
   Sources disagree on ရက်ရာဇာ (see NOTES below); ပြဿဒါး is unanimous. */
var AUSPICIOUS = {
  MONTHS: ["တန်ခူး", "ကဆုန်", "နယုန်", "ဝါဆို", "ဝါခေါင်", "တော်သလင်း", "သီတင်းကျွတ်", "တန်ဆောင်မုန်း", "နတ်တော်", "ပြာသို", "တပို့တွဲ", "တပေါင်း"],

  WEEKDAY_NAMES: ["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ", "ရာဟု"],

  /* ရက်ရာဇာ — commonly used လင်္ကာ / printed-calendar version.
     Matches Cool Emerald's calendar implementation and the popular verse
     (Wedding Guide) on 9 of 12 months; see NOTES for the disputed months. */
  MONTH_RAZA: [
    [3, 5], /* တန်ခူး — Wed, Fri */
    [4, 6], /* ကဆုန် — Thu, Sat */
    [2, 4], /* နယုန် — Tue, Thu */
    [0, 3], /* ဝါဆို — Sun, Wed */
    [3, 5], /* ဝါခေါင် — Wed, Fri */
    [4, 6], /* တော်သလင်း — Thu, Sat */
    [2, 4], /* သီတင်းကျွတ် — Tue, Thu */
    [0, 3], /* တန်ဆောင်မုန်း — Sun, Wed */
    [3, 5], /* နတ်တော် — Wed, Fri */
    [4, 6], /* ပြာသို — Thu, Sat */
    [2, 4], /* တပို့တွဲ — Tue, Thu */
    [0, 3]  /* တပေါင်း — Sun, Wed */
  ],

  /* ပြဿဒါး — UNANIMOUS across all sources checked (Wikipedia မူမှန်,
     Cool Emerald, Wedding Guide, and the ပြဿဒါး verse). */
  MONTH_PYATHADA: [
    [4, 6], /* တန်ခူး — Thu, Sat */
    [3, 5], /* ကဆုန် — Wed, Fri */
    [0, 1], /* နယုန် — Sun, Mon */
    [2, 7], /* ဝါဆို — Tue, Wed PM (Rahu) */
    [4, 6], /* ဝါခေါင် — Thu, Sat */
    [3, 5], /* တော်သလင်း — Wed, Fri */
    [0, 1], /* သီတင်းကျွတ် — Sun, Mon */
    [2, 7], /* တန်ဆောင်မုန်း — Tue, Wed PM (Rahu) */
    [4, 6], /* နတ်တော် — Thu, Sat */
    [3, 5], /* ပြာသို — Wed, Fri */
    [0, 1], /* တပို့တွဲ — Sun, Mon */
    [2, 7]  /* တပေါင်း — Tue, Wed PM (Rahu) */
  ],

  /* ရက်ရာဇာ variant — the "မူမှန်" (standard) reconstruction from the Myanmar
     Encyclopedia (Wikipedia ရက်ရာဇာ article). It makes Raza the exact
     complement of Pyathada, but NO printed calendar actually uses it;
     the article itself admits calendars disagree. Kept here for reference. */
  RAZA_VARIANT_STANDARD: [
    [3, 5], /* တန်ခူး — Wed, Fri */
    [4, 6], /* ကဆုန် — Thu, Sat */
    [2, 7], /* နယုန် — Tue, Rahu */
    [0, 1], /* ဝါဆို — Sun, Mon */
    [3, 5], /* ဝါခေါင် — Wed, Fri */
    [4, 6], /* တော်သလင်း — Thu, Sat */
    [2, 7], /* သီတင်းကျွတ် — Tue, Rahu */
    [0, 1], /* တန်ဆောင်မုန်း — Sun, Mon */
    [3, 5], /* နတ်တော် — Wed, Fri */
    [4, 6], /* ပြာသို — Thu, Sat */
    [2, 7], /* တပို့တွဲ — Tue, Rahu */
    [0, 1]  /* တပေါင်း — Sun, Mon */
  ],

  /* Name-letter guide: lucky starting letters = the birth day's own letters
     (traditional နေ့နံ table); avoid = the letters of the birth day's ရန်
     weekday (ရန် pairs: Sun-Tue, Mon-Thu, Fri-Sat, Wed-Rahu). */
  NAME_GUIDE: [
    { day: "တနင်္ဂနွေ", lucky: ["အ", "ဣ", "ဥ", "ဧ", "ဩ"], avoid: ["စ", "ဆ", "ဇ", "ဈ", "ည"], avoidDay: "အင်္ဂါ" },
    { day: "တနင်္လာ", lucky: ["က", "ခ", "ဂ", "ဃ", "င"], avoid: ["ပ", "ဖ", "ဗ", "ဘ", "မ"], avoidDay: "ကြာသပတေး" },
    { day: "အင်္ဂါ", lucky: ["စ", "ဆ", "ဇ", "ဈ", "ည"], avoid: ["အ", "ဣ", "ဥ", "ဧ", "ဩ"], avoidDay: "တနင်္ဂနွေ" },
    { day: "ဗုဒ္ဓဟူး", lucky: ["လ", "ဝ"], avoid: ["ယ", "ရ"], avoidDay: "ရာဟု" },
    { day: "ကြာသပတေး", lucky: ["ပ", "ဖ", "ဗ", "ဘ", "မ"], avoid: ["က", "ခ", "ဂ", "ဃ", "င"], avoidDay: "တနင်္လာ" },
    { day: "သောကြာ", lucky: ["သ", "ဟ"], avoid: ["တ", "ထ", "ဒ", "ဓ", "န"], avoidDay: "စနေ" },
    { day: "စနေ", lucky: ["တ", "ထ", "ဒ", "ဓ", "န"], avoid: ["သ", "ဟ"], avoidDay: "သောကြာ" },
    { day: "ရာဟု", lucky: ["ယ", "ရ"], avoid: ["လ", "ဝ"], avoidDay: "ဗုဒ္ဓဟူး" }
  ],

  NOTES: [
    "ပြဿဒါး is unanimous: Wikipedia (မူမှန်), Cool Emerald, Wedding Guide and the ပြဿဒါး verse all give the same 12-month table.",
    "ရက်ရာဇာ sources disagree — Wikipedia itself warns calendars differ. MONTH_RAZA follows the commonly used လင်္ကာ / printed-calendar version (Cool Emerald implementation + popular verse).",
    "Disputed Raza months: နယုန် and သီတင်းကျွတ် — verse says Tue only, some calendars Tue+Thu, မူမှန် says Tue+Rahu. ဝါဆို — all calendars say Sun+Wed, မူမှန် alone says Sun+Mon. တန်ဆောင်မုန်း — popular verse says Fri+Rahu, calendars mostly Sun+Wed or Wed+Fri, မူမှန် says Sun+Mon. နတ်တော် — popular verse says Mon+Sat, calendars mostly Wed+Fri. တပို့တွဲ — calendars Tue+Thu, မူမှန် Tue+Rahu. တပေါင်း — split between Sun+Wed and Wed+Sat.",
    "In leap years with a second Waso (ဒုဝါဆို), both Waso months use the same Raza/Pyathada days (per Wikipedia)."
  ],

  SOURCES: [
    "https://my.wikipedia.org/wiki/%E1%80%9B%E1%80%80%E1%80%BA%E1%80%9B%E1%80%AC%E1%80%87%E1%80%AC",
    "https://my.wikipedia.org/wiki/%E1%80%95%E1%80%BC%E1%80%BF%E1%80%92%E1%80%AB%E1%80%B8",
    "http://coolemerald.blogspot.com/2013/12/blog-post.html",
    "https://www.weddingguide.com.mm/wedding-plan/news-tips/item/3511-the-best-days-to-date-and-the-best-days-to-get-married.html"
  ]
};
