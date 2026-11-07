/* Myanmar Baydin — English language pack (i18n.js).
   Loaded BEFORE the inline script in index.html.
   - LANG is 'my' (default) or 'en', persisted in localStorage 'baydin_lang'.
   - T(key, args) returns the Burmese string when LANG is 'my', English when 'en'.
     {0} {1} ... in a string are replaced by args.
   - applyEnglishData() swaps the display strings of the data arrays (DAYS,
     MAHABOTE, ZODIAC, NUM_MEANINGS, DAILY_*, PAIR_LABELS, BOTE_PLANET_NAMES,
     LUCKY_COLORS) for English. Called from the inline script after the data
     is defined and before any rendering.
   - applyLangToDom() swaps static [data-en] text in EN mode. */
(function () {
  "use strict";
  var LANG = "my";
  try { LANG = localStorage.getItem("baydin_lang") || "my"; } catch (e) {}
  if (LANG !== "en") LANG = "my";
  window.BAYDIN_LANG = LANG;

  window.BAYDIN_MONTHS_EN = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  window.BAYDIN_DAY_EN = { "တနင်္ဂနွေ": "Sunday", "တနင်္လာ": "Monday", "အင်္ဂါ": "Tuesday", "ဗုဒ္ဓဟူး": "Wednesday", "ကြာသပတေး": "Thursday", "သောကြာ": "Friday", "စနေ": "Saturday", "ရာဟု": "Rahu" };

  /* Nakshatra English names, index 0..26 (Ashwini .. Revati). */
  window.BAYDIN_NAKSHATRA_EN = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
    "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
    "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana",
    "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];

  window.BAYDIN_PLANET_EN = { Sun: "Sun", Moon: "Moon", Mercury: "Mercury",
    Venus: "Venus", Mars: "Mars", Jupiter: "Jupiter", Saturn: "Saturn",
    Rahu: "Rahu", Ketu: "Ketu" };

  /* ---------------- template strings ---------------- */
  var STR = {
    my: {
      siteName: "မြန်မာ ဗေဒင်",
      shareFooter: "မြန်မာ ဗေဒင် — https://luuzoe.github.io/myanmar-baydin/",
      shared: "မျှဝေပြီးပါပြီ", copied: "ကူးယူပြီးပါပြီ",
      copyFail: "ကူးမရပါ", shareUnavailable: "မျှဝေလို့ မရပါ",
      shareBtn: "မျှဝေရန်", imgBtn: "ပုံအဖြစ် မျှဝေရန်",
      imgFail: "ပုံဖန်တီးမရပါ", imgSaved: "ပုံ သိမ်းပြီးပါပြီ",
      imgFooter: "မြန်မာ ဗေဒင်  •  luuzoe.github.io/myanmar-baydin",
      daySuffix: "နေ့", yearSuffix: " ခု",
      waxing: "လဆန်း ", waning: "လဆုတ် ",
      fullMoon: " (လပြည့်)", newMoon: " (လကွယ်)",
      born: "နေ့ဖွား", boteSuffix: "ဘုတ်",
      planetWord: "ဂြိုဟ် -",
      strengthsH: "အားသာချက်", cautionsH: "သတိထားရန်",
      luckyThingsH: "ကံကောင်းစေသော အရာများ",
      colourLabel: "အရောင် — ", numberLabel: "ဂဏန်း — ",
      stoneLabel: "ကျောက် — ", directionLabel: "လားရာ — ",
      numberWord: "ဂဏန်း ",
      yourBote: "သင့်ဘုတ်", meEra: "မြန်မာ သက္ကရာဇ်",
      dayPlanetStat: "နေ့နံ / ဂြိုဟ်", mahaboteStat: "မဟာဘုတ်",
      luckyColourStat: "ကံကောင်း အရောင်", luckyNumberStat: "ကံကောင်း ဂဏန်း",
      luckyStoneStat: "ကံကောင်း ကျောက်", luckyDirectionStat: "ကံကောင်း လားရာ",
      mahaboteChartH: "မဟာဘုတ် ပုံစံ",
      boteForecast: "ဘုတ် အဟော", adviceH: "အကြံပြုချက်",
      bornCharacter: "နေ့ဖွား စရိုက်",
      strengthsCautionsH: "အားသာချက် / သတိထားရန်",
      strengthPrefix: "အားသာချက် — ", cautionPrefix: "သတိထားရန် — ",
      todayLuckH: "ယနေ့ ကံကြမ္မာ ",
      goZodiac: "သင့် ရာသီခွင် ဒီနေ့ ဟောစာတမ်း အပြည့်အစုံ ဖတ်ရန် →",
      saveBtn: "သိမ်းထားရန်", savedMsg: "သိမ်းပြီးပါပြီ",
      methodNote: "တွက်နည်း — မြန်မာနှစ် {0} ကို ၇ နဲ့စားတော့ အကြွင်း {1}၊ {2} ဂြိုဟ် ဘင်္ဂဘုတ်မှာ စပြီး {3}နေ့ဖွား ({4}) က {5}ဘုတ်မှာ ကျပါတယ်။",
      rahuTakes: "ရာဟု — ဗုဒ္ဓဟူး ဘုတ်ကို ယူပါတယ်",
      planetName: "{0} ဂြိုဟ်",
      calcSub: "မြန်မာသက္ကရာဇ် {0} ခုနှစ် ・ အသက် {1} နှစ် ・ ရာသီခွင် {2}",
      calcShare: "{0}နေ့ဖွား ・ {1}ဘုတ် ・ ရာသီခွင် {2} ・ ကံကောင်းအရောင် {3} ・ ဂဏန်း {4}",
      calcImgTitle: "{0}နေ့ဖွား ・ {1}ဘုတ်",
      calcImgL1: "ရာသီခွင် — {0}", calcImgL2: "ကံကောင်းအရောင် — {0}",
      calcImgL3: "ကံကောင်းဂဏန်း — {0}", calcImgL4: "ကျောက် — {0}",
      saveLabel: "{0}နေ့ဖွား ・ {1}ဘုတ် ・ {2}ရာသီ",
      elementSuffix: "ဓာတ်",
      rulerLabel: "အုပ်စိုးဂြိုဟ် — ", elementLabel: "ဓာတ် — ",
      todayForecastH: "ဒီနေ့ အဟော",
      workH: "အလုပ်", moneyH: "ငွေကြေး", loveH: "အချစ်ရေး", healthH: "ကျန်းမာရေး",
      luckLevelsH: "ကံ အဆင့်များ", luckyNumColourH: "ကံကောင်း ဂဏန်း / အရောင်",
      numColourLine: "ဂဏန်း — {0} ・ အရောင် — {1}",
      zodiacShare: "{0} ဒီနေ့ ဟောစာတမ်း — အလုပ် {1}%, ငွေ {2}%, အချစ် {3}%, ကျန်းမာရေး {4}% ・ ကံကောင်းဂဏန်း {5}",
      zodiacImgTitle: "{0} ဒီနေ့ ဟောစာတမ်း",
      zodiacImgL1: "အလုပ် {0}% ・ ငွေကြေး {1}%",
      zodiacImgL2: "အချစ် {0}% ・ ကျန်းမာရေး {1}%",
      zodiacImgL3: "ကံကောင်းဂဏန်း — {0} ・ အရောင် — {1}",
      numGridLabel: "ဂဏန်း {0} — {1}",
      nameFirst: "နာမည် အရင် ထည့်ပါ။",
      noMyLetters: "မြန်မာ အက္ခရာ အခြေခံ စာလုံးတွေ မတွေ့ရပါ။ မြန်မာလို နာမည်အပြည့် ရေးထည့်ပါ (ဥပမာ — မောင်မောင်၊ မအေးအေး)။",
      luckyNumberOf: "“{0}” ရဲ့ ကံဂဏန်း — {1}",
      howCalcH: "တွက်ပုံ", byLetters: "အက္ခရာ အလိုက် — ",
      totalLabel: "စုစုပေါင်း — ", readingH: "အဟော",
      notCounted: "တွက်ချက်ရာတွင် မပါဝင်သော စာလုံး — ",
      nameShare: "“{0}” ရဲ့ ကံဂဏန်း — {1} ({2})",
      loveStrengths: "{0}နေ့ဖွားရဲ့ အားသာချက်က {1} ဖြစ်ပြီး၊ {2}နေ့ဖွားရဲ့ အားသာချက်က {3} ဖြစ်ပါတယ်။ နှစ်ဦးရဲ့ အားသာချက်တွေ ပေါင်းစပ်နိုင်ရင် ဆက်ဆံရေး ပိုမို ခိုင်မာလာပါမယ်။",
      loveShare: "{0}နေ့ဖွား နဲ့ {1}နေ့ဖွား လိုက်ဖက်မှု — {2}% ({3})",
      loveImgTitle: "{0}နေ့ဖွား ♥ {1}နေ့ဖွား",
      compatLabel: "လိုက်ဖက်မှု — {0}%",
      sameDay: "နေ့နံတူ", notTraditional: "ရိုးရာ စာရင်းဝင် မဟုတ်",
      verdict88t: "အလွန် လိုက်ဖက်ပါတယ်",
      verdict88d: "နေ့နံ အရ မိတ်ဖက် ကောင်းတွေ ဖြစ်ပြီး တစ်ဦးကို တစ်ဦး အားဖြည့် ပေးနိုင်ပါတယ်။ ဆက်ဆံရေး ရေရှည် တည်တံ့ဖို့ အခြေခံ ကောင်းပါတယ်။",
      verdict78t: "လိုက်ဖက်မှု ကောင်းပါတယ်",
      verdict78d: "အများအားဖြင့် သဟဇာတ ဖြစ်ပြီး အနည်းငယ် နားလည်မှု လွဲတာလောက်ပဲ ရှိတတ်ပါတယ်။ စကားပြော ဆိုမှု ပွင့်လင်းရင် အဆင်ပြေ ပါမယ်။",
      verdict62t: "အလယ်အလတ် လိုက်ဖက်ပါတယ်",
      verdict62d: "စိတ်သဘာဝ မတူတဲ့ အပိုင်းတွေ ရှိပေမယ့် လေးစား နားလည်မှု ထားရင် ကောင်းမွန်တဲ့ ဆက်ဆံရေး ဖြစ်လာနိုင်ပါတယ်။",
      verdictLowt: "ကြိုးစား နားလည်ဖို့ လိုပါတယ်",
      verdictLowd: "နေ့နံ အရ ရန်ဖက် သဘော ပါတဲ့အတွက် အငြင်းပွားမှု ဖြစ်လွယ်ပြီး ရေရှည် အဆင်မပြေနိုင်ဘူး။ စိတ်ရှည်မှု၊ ခွင့်လွှတ်မှုနဲ့ ဆက်သွယ်မှု ကောင်းကောင်း ထားမှ အဆင်ပြေနိုင်ပါမယ်။",
      ordinaryDay: "သာမန် ရက်", pyathadaDay: "ပြဿဒါး နေ့ ⚠", razaDay: "ရက်ရာဇာ နေ့ ✓",
      pyathadaNote: "ဒီရက်ဟာ {0}လရဲ့ ပြဿဒါး နေ့ ဖြစ်လို့ အရေးကြီး ကိစ္စတွေ ရှောင်တာ ပိုကောင်းပါတယ်။",
      razaNote: "ဒီရက်ဟာ {0}လရဲ့ ရက်ရာဇာ နေ့ ဖြစ်လို့ အရေးကြီး ကိစ္စတွေ လုပ်ဖို့ သင့်တော်ပါတယ်။",
      gooddayTitle: "{0} ရက် — {1}နေ့",
      gooddaySub: "သင့် ({0}နေ့ဖွား) နဲ့ ဆက်နွယ်မှု — {1} ・ လိုက်ဖက်မှု {2}%",
      meDateStat: "မြန်မာ ရက်စွဲ", razaPyathadaStat: "ရက်ရာဇာ / ပြဿဒါး",
      gdVerdictGood: "ဒီရက်ဟာ သင့်အတွက် မိတ်ဖက် သဘော ပါတဲ့ ရက် ဖြစ်လို့ အရေးကြီး ကိစ္စတွေ (ခရီးထွက်တာ၊ စာချုပ် ချုပ်တာ၊ အလုပ်စတာ) လုပ်ဖို့ သင့်တော်ပါတယ်။",
      gdVerdictMid: "ဒီရက်ဟာ သင့်အတွက် သာမန် ရက် ဖြစ်ပါတယ်။ အရေးကြီး ကိစ္စ လုပ်ရင် စာရွက်စာတမ်း သေချာ စစ်ပြီး စိတ်အေးအေး လုပ်ပါ။",
      gdVerdictBad: "ဒီရက်ဟာ သင့်နေ့နံနဲ့ ရန်ဖက် သဘော ပါတဲ့ ရက် ဖြစ်လို့ အရေးကြီး ဆုံးဖြတ်ချက်တွေ၊ ရန်ဖြစ်နိုင်တဲ့ ဆွေးနွေးပွဲတွေကို တတ်နိုင်သမျှ ရှောင်ပါ။ ကုသိုလ် ကောင်းမှု လုပ်ရင် ပိုကောင်းပါတယ်။",
      gooddayFootnote: "မြန်မာ ရက်စွဲ — {0} {1}။ ရက်ရာဇာ အချို့ မူကွဲ ရှိသည်။",
      moonApprox: "လ အခြေအနေ ({0}) က ခန့်မှန်းခြေ ဖြစ်ပါတယ်။",
      fullMoonIn: "နောက် {0} ရက် — {1} လပြည့်",
      skyToday: "ဒီနေ့ လက {0} မှာ၊ နေက {1} မှာ ရှိပါတယ်။",
      aspect0: "လက သင့်ရာသီထဲ ရောက်နေတယ် — စိတ်ခံစားမှု ပြင်းထန်တဲ့နေ့ ဖြစ်ပါတယ်။ ကိုယ့်စိတ်ကို နားထောင်ပြီး အရေးကြီး ကိစ္စ စိတ်အေးအေးနဲ့ ဆုံးဖြတ်ပါ။",
      aspect1: "လက သင့်ရာသီနဲ့ ၃၀° ကွာနေတယ် — သာမန်နေ့ထက် အနည်းငယ် အပြောင်းအလဲ များတဲ့နေ့ ဖြစ်ပါတယ်။",
      aspect2: "လက သင့်ရာသီနဲ့ ၆၀° မှာရှိတယ် — ဆက်ဆံရေး၊ အလုပ်ကိစ္စ အဆင်ပြေတဲ့နေ့ ဖြစ်ပါတယ်။",
      aspect3: "လက သင့်ရာသီနဲ့ ထောင့်မှန်ကျနေတယ် — စိတ်ရှုပ်စရာ၊ အငြင်းပွားစရာ ကြုံရနိုင်တဲ့နေ့ ဖြစ်ပါတယ်။ ဒေါသနဲ့ မဆုံးဖြတ်ပါနဲ့။",
      aspect4: "လက သင့်ရာသီနဲ့ ၁၂၀° မှာရှိတယ် — ကံကောင်းတဲ့နေ့ ဖြစ်ပါတယ်။ အခွင့်အလမ်း လာရင် ရဲရဲ ဖမ်းဆုပ်ပါ။",
      aspect5: "လက သင့်ရာသီနဲ့ ၁၅၀° ကွာနေတယ် — အစီအစဉ် ပြင်ဆင်ရတဲ့နေ့ ဖြစ်ပါတယ်။ မျှော်လင့်ထားသလို မဖြစ်ရင် စိတ်မပျက်ပါနဲ့။",
      aspect6: "လက သင့်ရာသီရဲ့ ဆန့်ကျင်ဘက်မှာ ရှိတယ် — သူများနဲ့ သဘောထား ကွဲလွဲရနိုင်တဲ့နေ့ ဖြစ်ပါတယ်။ စကားကို သေချာ ရွေးပြောပါ။",
      phaseWaxing: "လဆန်းရက်ဖြစ်လို့ အစပြုဖို့ ကောင်းတဲ့နေ့ ဖြစ်ပါတယ်။",
      phaseWaning: "လဆုတ်ရက်ဖြစ်လို့ အပြီးသတ်ဖို့၊ အနားယူဖို့ ကောင်းတဲ့နေ့ ဖြစ်ပါတယ်။",
      phaseFull: "ဒီနေ့ လပြည့်နေ့ ဖြစ်ပါတယ် — စိတ်ခံစားမှု အမြင့်ဆုံးရောက်တဲ့နေ့၊ အရေးကြီး ဆုံးဖြတ်ချက် သတိထားပါ။",
      phaseNew: "ဒီနေ့ လကွယ်နေ့ ဖြစ်ပါတယ် — တိတ်ဆိတ်စွာ ပြင်ဆင်ဖို့ ကောင်းတဲ့နေ့ ဖြစ်ပါတယ်။",
      todayRazaGood: "ဒီနေ့ ရက်ရာဇာ နေ့ ဖြစ်ပါတယ် — ကောင်းတဲ့နေ့ပါ။",
      todayPyathadaWarn: "ဒီနေ့ ပြဿဒါး နေ့ ဖြစ်ပါတယ် — အရေးကြီး ကိစ္စ သတိထားပါ။",
      moonNakshatra: "လရဲ့ နက္ခတ်က {0} ({1} စီမံတယ်)။",
      computedNote: "ဒီဟောစာတမ်းကို ဒီနေ့ လရဲ့ အနေအထား အမှန်နဲ့ တွက်ထားပါတယ်။",
      forecastFallback: "ဒီနေ့ ကောင်းကင် တွက်လို့ မရလို့ အကြံပြုချက် ပေးထားပါတယ်။",
      gooddayShare: "{0} ရက် {1}နေ့ ({2}) — {3}နေ့ဖွားနဲ့ {4}၊ လိုက်ဖက်မှု {5}%",
      gooddayImgL2: "{0}နေ့ဖွားနဲ့ {1} ・ လိုက်ဖက်မှု {2}%",
      nothingSaved: "မသိမ်းထားရသေးပါ။ မဟာဘုတ် တွက်ပြီး “သိမ်းထားရန်” နှိပ်ပါ။",
      viewBtn: "ကြည့်ရန်", delBtn: "ဖျက်ရန်",
      rahuExtra: "ဗုဒ္ဓဟူးနေ့ မွန်းလွဲ (ရာဟု) ဖွားဆိုရင် — ကံကောင်း အက္ခရာ: {0} ・ ရှောင်ရန်: {1} ({2})။",
      suggestFor: "{0}နေ့ဖွား အတွက်",
      luckyLettersLabel: "ကံကောင်း အက္ခရာ — ",
      avoidLettersLabel: "ရှောင်ရန် အက္ခရာ — ",
      avoidDaySuffix: " ({0}နေ့ဖွား အက္ခရာ)",
      suggestTip: "နာမည် အစ စာလုံးကို ကံကောင်း အက္ခရာ ထဲက ရွေးပါ။ ဥပမာ — {0}နေ့ဖွားရဲ့ နာမည်ဟာ “{1}” နဲ့ စရင် ပိုကောင်းတယ်လို့ ရိုးရာ အယူအဆ ရှိပါတယ်။",
      planetPositions: "ဂြိုဟ် နေရာများ",
      calculating: "ဂြိုဟ် နေရာတွေ တွက်နေပါတယ်…",
      badLatLon: "လက်တီကျု / လောင်ဂျီကျု မှားနေပါတယ်။ ဥပမာ — 16.84, 96.15",
      houseSuffix: " ・ ဘုတ် {0}",
      noBirthTime: "မွေးချိန် မသိလို့ တွက်မရ",
      transitsTodayH: "ဒီနေ့ ဂြိုဟ် သွား",
      transitLine: "{0} — {1} (ဘုတ် {2})",
      chartTitle: "ဇာတာ — လဂ် {0}",
      nakshatraLine: "နက္ခတ် — {0} ({1} ဒသာ) ・ လ ရာသီ — {2}",
      dashaH: "ဒသာ (ဝိမရှိုတ္တရီ)",
      dashaCurrent: "လက်ရှိ — {0} ဒသာ ({1} → {2})",
      dashaNext: "နောက်လာမည် — {0}",
      chartLibFail: "ဂြိုဟ် တွက်ချက် library ဖွင့်မရပါ။ အင်တာနက် ချိတ်ပြီး ပြန်ဖွင့်ကြည့်ပါ။",
      chartShare: "ဇာတာ — လဂ် {0} ・ နက္ခတ် {1} ・ ဒသာ {2}",
      chartImgL1: "နက္ခတ် — {0}",
      chartImgL2: "ဒသာ — {0} ({1} → {2})",
      ascendantWord: " လဂ်",
      chartWord: "ဇာတာ"
    },
    en: {
      siteName: "Myanmar Baydin",
      shareFooter: "Myanmar Baydin — https://luuzoe.github.io/myanmar-baydin/",
      shared: "Shared!", copied: "Copied!",
      copyFail: "Copy failed", shareUnavailable: "Sharing not available",
      shareBtn: "Share", imgBtn: "Share as image",
      imgFail: "Could not create the image", imgSaved: "Image saved",
      imgFooter: "Myanmar Baydin  •  luuzoe.github.io/myanmar-baydin",
      daySuffix: "", yearSuffix: "",
      waxing: "waxing ", waning: "waning ",
      fullMoon: " (Full moon)", newMoon: " (New moon)",
      born: " born", boteSuffix: " Bote",
      planetWord: "Planet:",
      strengthsH: "Strengths", cautionsH: "Be careful",
      luckyThingsH: "Lucky things",
      colourLabel: "Colour: ", numberLabel: "Number: ",
      stoneLabel: "Stone: ", directionLabel: "Direction: ",
      numberWord: "Number ",
      yourBote: "Your bote", meEra: "Myanmar Era",
      dayPlanetStat: "Day sign / Planet", mahaboteStat: "Mahabote",
      luckyColourStat: "Lucky colour", luckyNumberStat: "Lucky number",
      luckyStoneStat: "Lucky stone", luckyDirectionStat: "Lucky direction",
      mahaboteChartH: "Mahabote chart",
      boteForecast: " Bote forecast", adviceH: "Advice",
      bornCharacter: " born character",
      strengthsCautionsH: "Strengths / Cautions",
      strengthPrefix: "Strengths: ", cautionPrefix: "Cautions: ",
      todayLuckH: "Today's luck ",
      goZodiac: "Read your full daily forecast →",
      saveBtn: "Save", savedMsg: "Saved",
      methodNote: "Method — Myanmar year {0} divided by 7 leaves remainder {1}; starting from planet {2} in the Binga house, a {3}-born person ({4}) falls in the {5} house.",
      rahuTakes: "Rahu — takes Mercury's house",
      planetName: "planet {0}",
      calcSub: "Myanmar Era {0} · Age {1} · Zodiac sign {2}",
      calcShare: "{0} born · {1} Bote · Zodiac sign {2} · Lucky colour {3} · Number {4}",
      calcImgTitle: "{0} born · {1} Bote",
      calcImgL1: "Zodiac sign — {0}", calcImgL2: "Lucky colour — {0}",
      calcImgL3: "Lucky number — {0}", calcImgL4: "Stone — {0}",
      saveLabel: "{0} born · {1} Bote · {2} sign",
      elementSuffix: " element",
      rulerLabel: "Ruling planet: ", elementLabel: "Element: ",
      todayForecastH: "Today's forecast",
      workH: "Work", moneyH: "Money", loveH: "Love", healthH: "Health",
      luckLevelsH: "Luck levels", luckyNumColourH: "Lucky number / colour",
      numColourLine: "Number: {0} · Colour: {1}",
      zodiacShare: "{0} today's forecast — Work {1}%, Money {2}%, Love {3}%, Health {4}% · Lucky number {5}",
      zodiacImgTitle: "{0} today's forecast",
      zodiacImgL1: "Work {0}% · Money {1}%",
      zodiacImgL2: "Love {0}% · Health {1}%",
      zodiacImgL3: "Lucky number: {0} · Colour: {1}",
      numGridLabel: "Number {0} — {1}",
      nameFirst: "Please enter a name first.",
      noMyLetters: "No Myanmar letters found. Please enter a full name in Myanmar (e.g. Maung Maung, Ma Aye Aye).",
      luckyNumberOf: "Lucky number of “{0}” — {1}",
      howCalcH: "How it's calculated", byLetters: "By letters: ",
      totalLabel: "Total: ", readingH: "Reading",
      notCounted: "Letters not counted: ",
      nameShare: "Lucky number of “{0}” — {1} ({2})",
      loveStrengths: "The strength of a {0}-born person is {1}, and of a {2}-born person is {3}. If both combine their strengths, the relationship becomes stronger.",
      loveShare: "{0} born and {1} born — compatibility {2}% ({3})",
      loveImgTitle: "{0} born ♥ {1} born",
      compatLabel: "Compatibility — {0}%",
      sameDay: "Same birth day", notTraditional: "Not in the traditional list",
      verdict88t: "A wonderful match",
      verdict88d: "By birth day you are good friends who strengthen each other. A solid basis for a lasting relationship.",
      verdict78t: "A good match",
      verdict78d: "Mostly harmonious, with only small misunderstandings. Open communication keeps things smooth.",
      verdict62t: "A moderate match",
      verdict62d: "You differ in some ways, but with respect and understanding this can become a good relationship.",
      verdictLowt: "Needs effort and understanding",
      verdictLowd: "By birth day there is a clashing quality, so arguments come easily and the long term may not work out. Patience, forgiveness and good communication are needed for it to work.",
      ordinaryDay: "Ordinary day", pyathadaDay: "Pyathada day ⚠", razaDay: "Raza day ✓",
      pyathadaNote: "This is a Pyathada day in {0}, so it is better to avoid important matters.",
      razaNote: "This is a Raza day in {0}, so it is a good day for important matters.",
      gooddayTitle: "Day {0} — {1}",
      gooddaySub: "Your connection ({0} born) — {1} · Compatibility {2}%",
      meDateStat: "Myanmar date", razaPyathadaStat: "Raza / Pyathada",
      gdVerdictGood: "This day carries a friendly quality for you, so it suits important matters such as travelling, signing contracts or starting work.",
      gdVerdictMid: "This is an ordinary day for you. For important matters, check the documents carefully and stay calm.",
      gdVerdictBad: "This day clashes with your birth day, so avoid big decisions and arguments as much as you can. Doing good deeds helps.",
      gooddayFootnote: "Myanmar date — {0} {1}. Some calendars differ on Raza days.",
      moonApprox: "The moon phase ({0}) is approximate.",
      fullMoonIn: "In {0} days — {1} full moon",
      skyToday: "Today the Moon is in {0} and the Sun is in {1}.",
      aspect0: "The Moon is in your sign — a day of strong feelings. Listen to yourself and decide important things calmly.",
      aspect1: "The Moon is 30° from your sign — a day with a little more change than usual.",
      aspect2: "The Moon is 60° from your sign — a good day for relationships and work.",
      aspect3: "The Moon is square to your sign — a day when confusion and arguments can arise. Don't decide in anger.",
      aspect4: "The Moon is 120° from your sign — a lucky day. Seize opportunities boldly when they come.",
      aspect5: "The Moon is 150° from your sign — a day for adjusting plans. Don't be discouraged if things don't go as expected.",
      aspect6: "The Moon is opposite your sign — a day when others may disagree with you. Choose your words carefully.",
      phaseWaxing: "It is a waxing Moon — a good day to start things.",
      phaseWaning: "It is a waning Moon — a good day to finish things and rest.",
      phaseFull: "Today is a full moon — feelings run highest; be careful with important decisions.",
      phaseNew: "Today is a new moon — a good day to prepare quietly.",
      todayRazaGood: "Today is a Raza day — a good day.",
      todayPyathadaWarn: "Today is a Pyathada day — be careful with important matters.",
      moonNakshatra: "The Moon's nakshatra is {0} (ruled by {1}).",
      computedNote: "This forecast is computed from today's actual Moon position.",
      forecastFallback: "Today's sky could not be computed, so general advice is shown.",
      gooddayShare: "Day {0}, {1} ({2}) — with {3} born: {4}, compatibility {5}%",
      gooddayImgL2: "With {0} born: {1} · Compatibility {2}%",
      nothingSaved: "Nothing saved yet. Calculate a Mahabote reading and tap “Save”.",
      viewBtn: "View", delBtn: "Delete",
      rahuExtra: "If born Wednesday afternoon (Rahu) — lucky letters: {0} · avoid: {1} ({2}).",
      suggestFor: "For {0}-born",
      luckyLettersLabel: "Lucky letters: ",
      avoidLettersLabel: "Letters to avoid: ",
      avoidDaySuffix: " (letters of {0}-born)",
      suggestTip: "Choose the first letter of the name from the lucky letters. Tradition says a {0}-born person's name starting with “{1}” is especially good.",
      planetPositions: "Planet positions",
      calculating: "Calculating planet positions…",
      badLatLon: "Latitude / longitude is wrong. Example: 16.84, 96.15",
      houseSuffix: " · House {0}",
      noBirthTime: "No birth time — cannot calculate",
      transitsTodayH: "Today's transits",
      transitLine: "{0} — {1} (House {2})",
      chartTitle: "Birth chart — Ascendant {0}",
      nakshatraLine: "Nakshatra — {0} ({1} dasha) · Moon sign — {2}",
      dashaH: "Dasha (Vimshottari)",
      dashaCurrent: "Current — {0} dasha ({1} → {2})",
      dashaNext: "Coming next — {0}",
      chartLibFail: "Could not load the astronomy library. Please connect to the internet and reopen.",
      chartShare: "Birth chart — Ascendant {0} · Nakshatra {1} · Dasha {2}",
      chartImgL1: "Nakshatra — {0}",
      chartImgL2: "Dasha — {0} ({1} → {2})",
      ascendantWord: " Ascendant",
      chartWord: "Chart"
    }
  };

  function T(key, args) {
    var s = (STR[LANG] && STR[LANG][key] != null) ? STR[LANG][key] : STR.my[key];
    if (s == null) return key;
    if (args) {
      for (var i = 0; i < args.length; i++) {
        s = s.split("{" + i + "}").join(String(args[i]));
      }
    }
    return s;
  }
  window.T = T;

  /* Zodiac display: Burmese "မိဿရာသီ (Aries)", English "Aries (မိဿ)". */
  window.zodiacDisplay = function (z) {
    if (LANG === "en") return z.name + " (" + z.en + ")";
    return z.name + "ရာသီ (" + z.en + ")";
  };
  /* Chart sign name: signOf() returns {nameMy, nameEn, ...}. */
  window.chartSignName = function (sg) {
    return LANG === "en" ? sg.nameEn : sg.nameMy;
  };

  /* ---------------- English data overrides ---------------- */
  var DAYS_EN = [
    { name: "Sunday", planet: "Sun", animal: "Garuda", color: "Red and gold", gem: "Ruby", dir: "North-east",
      trait: "People born on Sunday are natural leaders with strong self-confidence. They love starting new things and dislike being ordered around. They value honour and have big ambitions.",
      strength: "Leadership, courage, quick decisions",
      caution: "Keep excessive pride and a quick temper in check." },
    { name: "Monday", planet: "Moon", animal: "Tiger", color: "White and silver", gem: "Pearl", dir: "East",
      trait: "People born on Monday are gentle and helpful, with deep thinking. They love their family, speak sweetly and are liked by many.",
      strength: "Compassion, patience, good with people",
      caution: "Be careful of being easily emotional and indecisive." },
    { name: "Tuesday", planet: "Mars", animal: "Lion", color: "Red", gem: "Coral", dir: "South-east",
      trait: "People born on Tuesday are brave, energetic and competitive. They work hard with great effort, and are honest and open, though sometimes hasty.",
      strength: "Strength, drive, bravery",
      caution: "Avoid harsh words and rushing into danger without thinking." },
    { name: "Wednesday", planet: "Mercury", animal: "Elephant", color: "Green", gem: "Emerald", dir: "South",
      trait: "People born on Wednesday are clever and good speakers. They have business sense, adapt easily and learn fast, and can handle many kinds of work.",
      strength: "Intelligence, speaking skill, business sense",
      caution: "Don't switch to another task before finishing the current one." },
    { name: "Thursday", planet: "Jupiter", animal: "Rat", color: "Yellow", gem: "Topaz", dir: "West",
      trait: "People born on Thursday love learning and sharing knowledge. They seek fairness and often become teachers or elders. They are patient and plan for the future.",
      strength: "Wisdom, fairness, planning",
      caution: "Don't cling to a single opinion too tightly." },
    { name: "Friday", planet: "Venus", animal: "Guinea pig", color: "Pink and light blue", gem: "Diamond", dir: "North",
      trait: "People born on Friday enjoy beauty and art, and are gentle and refined. They are sincere in love, socially graceful and share happiness with others.",
      strength: "Artistic feeling, good nature, popularity",
      caution: "Keep spending and overindulgence in check." },
    { name: "Saturday", planet: "Saturn", animal: "Naga", color: "Black and purple", gem: "Sapphire", dir: "South-west",
      trait: "People born on Saturday have strong willpower and a deep sense of responsibility. They work hard and achieve lasting success. They speak little but are practical and trustworthy.",
      strength: "Willpower, responsibility, lasting stability",
      caution: "Be careful of feeling low and spending too much time alone." },
    { name: "Wednesday (afternoon)", planet: "Rahu", animal: "Tuskless elephant", color: "Grey and brown", gem: "Gomed", dir: "North-west",
      trait: "People born on Wednesday afternoon (Rahu) are rich in ideas and often succeed through unusual paths. They are not afraid of change, seek opportunities and can keep secrets.",
      strength: "Original ideas, adaptability, seeing opportunities",
      caution: "Keep rapid changes of decision in check." }
  ];

  var MAHABOTE_EN = {
    0: { name: "Binga", tag: "Foundation",
      meaning: "Binga-born people build a strong foundation for life. Things may be slow and difficult at first, but as the foundation strengthens, lasting success follows. They are often lucky in marriage and setting up a home.",
      advice: "Don't be discouraged by early difficulties — keep building a solid foundation. Matters of land and property tend to go well." },
    1: { name: "Atun", tag: "Brightness and fame",
      meaning: "Atun-born people see their work flourish and become well known. Good opportunities come often, and they get chances to show their talent.",
      advice: "Seize opportunities boldly when they come. Value your name and reputation." },
    2: { name: "Raza", tag: "Fortune and authority",
      meaning: "Raza-born people have great fortune and the ability to lead and govern others. They carry authority, receive help from elders, and often reach leadership positions.",
      advice: "Use authority in a just way. Respecting elders opens the path further." },
    3: { name: "Adipati", tag: "Highest authority",
      meaning: "Adipati is the highest of the seven botes, and its people often become leaders in their own field. They decide firmly and are relied on and respected by many. Starting their own business tends to succeed.",
      advice: "Take on big responsibilities boldly, but also listen to good advice." },
    4: { name: "Marana", tag: "Change and endings",
      meaning: "Marana-born people experience many changes in life. Tradition counts Marana as the most difficult of the seven botes — work, place and surroundings often change, and health and accidents need special care. But every ending opens the door to a new beginning.",
      advice: "Don't fear change — the new begins only after the old ends. Have regular health check-ups, be careful with risky things. Doing good deeds brings benefit." },
    5: { name: "Thaik", tag: "Wealth and saving",
      meaning: "Thaik-born people can save and accumulate money, and their wealth grows. They have a sharp eye for trade and investment, and become richer over time.",
      advice: "Keep the saving habit. Hold back the urge to take profits too quickly from investments." },
    6: { name: "Puti", tag: "Caution and preparation",
      meaning: "Puti-born people find work easily disrupted, with many obstacles. Tradition counts it among the worst botes, and money and work difficulties are common. But with good preparation they can overcome difficulties, learn from experience and become strong. Doing good deeds brings benefit.",
      advice: "Check documents carefully before starting work, and keep a backup plan. Good deeds and a good heart bring luck back." }
  };

  var ZODIAC_EN = [
    { trait: "Brave, a born leader who loves starting new things.", element: "Fire", ruler: "Mars", dates: "Mar 21 – Apr 19" },
    { trait: "Steady and practical, valuing wealth and comfort.", element: "Earth", ruler: "Venus", dates: "Apr 20 – May 20" },
    { trait: "Quick-witted and a great communicator.", element: "Air", ruler: "Mercury", dates: "May 21 – Jun 20" },
    { trait: "Gentle-hearted, deeply attached to family and home.", element: "Water", ruler: "Moon", dates: "Jun 21 – Jul 22" },
    { trait: "Values honour and often receives attention from others.", element: "Fire", ruler: "Sun", dates: "Jul 23 – Aug 22" },
    { trait: "Systematic and careful, paying attention to details.", element: "Earth", ruler: "Mercury", dates: "Aug 23 – Sep 22" },
    { trait: "Seeks fairness and harmony, socially graceful.", element: "Air", ruler: "Venus", dates: "Sep 23 – Oct 22" },
    { trait: "Intense and decisive, a deep thinker.", element: "Water", ruler: "Mars", dates: "Oct 23 – Nov 21" },
    { trait: "Loves freedom, travel and learning.", element: "Fire", ruler: "Jupiter", dates: "Nov 22 – Dec 21" },
    { trait: "Strong-willed, building success with long-term goals.", element: "Earth", ruler: "Saturn", dates: "Dec 22 – Jan 19" },
    { trait: "Original in thought, caring for society's wellbeing.", element: "Air", ruler: "Saturn", dates: "Jan 20 – Feb 18" },
    { trait: "Highly compassionate, with strong artistic feeling.", element: "Water", ruler: "Jupiter", dates: "Feb 19 – Mar 20" }
  ];

  var NUM_MEANINGS_EN = {
    1: { name: "Sun number", theme: "Leadership and beginnings",
      text: "People with number 1 follow their own path and become leaders. They have strong initiative and value freedom. They are confident, but should also listen to others' advice." },
    2: { name: "Moon number", theme: "Harmony and compassion",
      text: "People with number 2 are gentle and get along well with others. They have good friends and excel at working together. They are rich in feeling but sometimes hesitate in decisions." },
    3: { name: "Mars number", theme: "Creativity and communication",
      text: "People with number 3 speak well and are highly creative. They are liked by many and full of energy. Be careful of scattered attention, and build the habit of finishing one task." },
    4: { name: "Mercury number", theme: "Order and stability",
      text: "People with number 4 are systematic and reliable. They think practically and build on a solid base. Be careful of accepting change too slowly." },
    5: { name: "Jupiter number", theme: "Freedom and change",
      text: "People with number 5 love freedom and are not afraid of change. Travel, learning and new experiences bring them success. Keep haste in check and plan for the long term." },
    6: { name: "Venus number", theme: "Love and responsibility",
      text: "People with number 6 love family and home, with a strong sense of duty. They have good taste in beauty and art, and care for others. Don't forget to give time to yourself too." },
    7: { name: "Saturn number", theme: "Wisdom and reflection",
      text: "People with number 7 think deeply and enjoy quiet reflection alone. They excel in education, research and meditation. Sometimes they need to make an effort to mix with others." },
    8: { name: "Rahu number", theme: "Power and business",
      text: "People with number 8 have sharp business sense and big ambitions. They manage money well and can handle large work. Keep work and rest in balance." },
    9: { name: "Nava number", theme: "Completeness and goodwill",
      text: "People with number 9 are generous and want to serve others. As the complete number of nine, it stands for good luck and fulfilment. They should learn to open their feelings to loved ones." }
  };

  var DAILY_EN = {
    GENERAL: [
      "Today is a good day to start new work. Keep your mind calm and take it step by step.",
      "Today you may receive good advice from an elder or an experienced person. Be ready to listen.",
      "Today you may hear unexpected good news. Don't let the opportunity slip away.",
      "Today don't decide everything too quickly. If you think carefully first, there will be fewer mistakes.",
      "Today your relationships with friends are good, and help may come your way.",
      "Today stay calm and focus on your own work. Don't get troubled by small matters.",
      "Today your hard work will show results. Don't give up.",
      "Today give yourself time to rest too. Less stress means better work.",
      "Today is not a good day for important decisions — better to think it over tomorrow.",
      "Today you may face something upsetting. Stay calm and don't react in anger."
    ],
    WORK: [
      "You may get a new responsibility at work, a chance to show your ability.",
      "Working together with colleagues will finish the job faster.",
      "Check work documents carefully before signing.",
      "In a meeting or discussion, your idea may be accepted.",
      "If you are thinking of changing jobs, gather information today.",
      "A mistake may happen at work today — check twice before submitting."
    ],
    MONEY: [
      "Income and spending are balanced — a good day to save.",
      "Cutting unnecessary expenses will make the end of the month easier.",
      "Don't rush into investments; study them carefully.",
      "You may settle part of a debt.",
      "You may hear news of a new source of income.",
      "Today money may flow out fast — don't buy what you don't need."
    ],
    LOVE: [
      "Understanding with your partner or spouse will grow. Speak sweetly.",
      "For single people, a meeting with someone new is possible.",
      "Don't bring up old matters from the past. Value the present.",
      "Spending time with family will bring happiness.",
      "Speaking your feelings openly will improve the relationship.",
      "Today an argument is possible — don't speak in anger; listen to each other."
    ],
    HEALTH: [
      "Your health is good, but eat regularly and drink plenty of water.",
      "Take care to sleep well; headaches will ease.",
      "A little walking exercise will refresh your mind.",
      "If stress is high, try breathing exercises.",
      "If your eyes are tired from close work, rest them.",
      "Today take care of your health — do less tiring work and rest early."
    ]
  };

  var PAIR_LABELS_EN = {
    "0-4": "Friend (Aung)", "1-3": "Friend (Kular)", "2-5": "Friend (Swe-thar)", "6-7": "Friend (Taw-yin)",
    "0-5": "Marriage friend (U-thar)", "2-4": "Marriage friend (Sein-pan)", "3-6": "Marriage friend (Dan-hla)", "1-7": "Marriage friend (Ko-sha)",
    "0-2": "Rival (U-nyo)", "1-4": "Rival (Khema)", "5-6": "Rival (Thuta)", "3-7": "Rival (We-ri)",
    "4-6": "Marriage rival (Dhamma)", "1-5": "Marriage rival (Thawka)", "0-3": "Marriage rival (Inn-wa)", "2-7": "Marriage rival (Raza)"
  };

  var BOTE_PLANET_NAMES_EN = { 1: "Sun", 2: "Moon", 3: "Mars", 4: "Mercury", 5: "Jupiter", 6: "Venus", 7: "Saturn" };

  var LUCKY_COLORS_EN = ["Red", "Yellow", "Green", "Blue", "Pink", "White", "Gold", "Brown", "Purple", "Orange"];

  function applyEnglishData() {
    if (typeof DAYS !== "undefined") {
      DAYS.forEach(function (d, i) {
        var e = DAYS_EN[i]; if (!e) return;
        ["name", "planet", "animal", "color", "gem", "dir", "trait", "strength", "caution"].forEach(function (k) { d[k] = e[k]; });
      });
    }
    if (typeof MAHABOTE !== "undefined") {
      Object.keys(MAHABOTE_EN).forEach(function (k) {
        var e = MAHABOTE_EN[k], b = MAHABOTE[k];
        if (b) { b.name = e.name; b.tag = e.tag; b.meaning = e.meaning; b.advice = e.advice; }
      });
    }
    if (typeof ZODIAC !== "undefined") {
      ZODIAC.forEach(function (z, i) {
        var e = ZODIAC_EN[i]; if (!e) return;
        var oldName = z.name;
        z.name = z.en; z.en = oldName;
        z.trait = e.trait; z.element = e.element; z.ruler = e.ruler; z.dates = e.dates;
      });
    }
    if (typeof NUM_MEANINGS !== "undefined") {
      Object.keys(NUM_MEANINGS_EN).forEach(function (k) {
        var e = NUM_MEANINGS_EN[k], m = NUM_MEANINGS[k];
        if (m) { m.name = e.name; m.theme = e.theme; m.text = e.text; }
      });
    }
    [["DAILY_GENERAL", "GENERAL"], ["DAILY_WORK", "WORK"], ["DAILY_MONEY", "MONEY"],
     ["DAILY_LOVE", "LOVE"], ["DAILY_HEALTH", "HEALTH"]].forEach(function (pair) {
      var arr = window[pair[0]], en = DAILY_EN[pair[1]];
      if (arr && en) arr.splice.apply(arr, [0, arr.length].concat(en));
    });
    if (typeof PAIR_LABELS !== "undefined") {
      Object.keys(PAIR_LABELS_EN).forEach(function (k) { PAIR_LABELS[k] = PAIR_LABELS_EN[k]; });
    }
    if (typeof BOTE_PLANET_NAMES !== "undefined") {
      Object.keys(BOTE_PLANET_NAMES_EN).forEach(function (k) { BOTE_PLANET_NAMES[k] = BOTE_PLANET_NAMES_EN[k]; });
    }
    if (typeof LUCKY_COLORS !== "undefined") {
      LUCKY_COLORS.splice.apply(LUCKY_COLORS, [0, LUCKY_COLORS.length].concat(LUCKY_COLORS_EN));
    }
  }

  function applyLangToDom() {
    if (LANG !== "en") return;
    document.documentElement.lang = "en";
    document.querySelectorAll("[data-en]").forEach(function (n) {
      n.textContent = n.getAttribute("data-en");
    });
  }

  window.BAYDIN_I18N = {
    applyEnglishData: applyEnglishData,
    applyLangToDom: applyLangToDom
  };
})();
