/* Myanmar (Burmese) lunar calendar — exact traditional calculation.
 *
 * Algorithm: Yan Naing Aye (2013), "Algorithm, Program and Calculation of
 * Myanmar Calendar" (cool-emerald.blogspot.com, June 2013), building on
 * Irwin (1909) "The Burmese & Arakanese Calendars". Constants SY / LM / MO
 * and the era tables below are the published values from that paper.
 * The math here is re-implemented from the paper's published formulas
 * (excess days, watat check, Tagu-1 anchoring on the 2nd Waso full moon);
 * it is not a copy of any existing library's source code.
 *
 * How it works, in brief:
 *  - A Myanmar year starts at the "atat" time ja = SY*my + MO (Julian Date).
 *  - Excess days ed = (SY*(my+3739)) mod LM measure how far the lunar
 *    months have drifted from the solar year. In the current (3rd) era
 *    (1312 ME / 1950 CE onwards, per the Myanmar Calendar Advisory Board)
 *    a year is a watat (intercalary-month) year when ed >= TW after the
 *    TA adjustment (NM = 8 months).
 *  - The full moon of 2nd Waso, w = round(SY*my + MO - ed + 4.5*LM + WO),
 *    is the anchor: it is the most consistent day in the calendar. The
 *    first day of Tagu is derived from the nearest earlier watat year's
 *    2nd Waso full moon: tg1 = w1 + 354*yd - 102.
 *  - A watat year is "little" (384 days: + First Waso, 30 days) or "big"
 *    (385 days: + First Waso and + 1 day at the end of Nayon), decided by
 *    the gap between consecutive 2nd Waso full moons: remainder 30 or 31
 *    when divided by 354.
 *  - Months alternate 29/30 days (Tagu 29, Kason 30, Nayon 29, Waso 30,
 *    Wagaung 29, Tawthalin 30, Thadingyut 29, Tazaungmon 30, Nadaw 29,
 *    Pyatho 30, Tabodwe 29, Tabaung 30). Days 1-15 are waxing (day 15 is
 *    the full moon); the rest are waning (last day is the new moon).
 *
 * KNOWN LIMITS (do not silently ignore these):
 *  - Big watat (intercalary day) years have NO fixed rule in the tradition;
 *    the Myanmar Calendar Advisory Board announces them. Since
 *    independence (1948) only one has been declared: 1377 ME (2015 CE).
 *    This code predicts big watat from the published remainder rule, which
 *    reproduces 1377 correctly, but any FUTURE big watat year it predicts
 *    is provisional until the Board announces it.
 *  - The paper lists historical exceptions (fme/wte tables below) that
 *    correct single years where the formula disagrees with the printed
 *    calendars (e.g. 1344 ME has the intercalary month instead of 1345 ME;
 *    1377 ME's 2nd Waso full moon falls a day later than calculated).
 *    Those exceptions are included verbatim from the paper.
 *  - The Myanmar new year day is the day AFTER the atat day, so the first
 *    days of Tagu (and sometimes Kason) before it belong to the OLD year
 *    ("Hnaung Tagu"). toMyanmar() already returns the correct year for the
 *    date; the extra `isHnaung` flag tells you the date is in that
 *    old-year part of the month.
 *  - Dates are treated as Asia/Yangon wall time: toMyanmar() reads the
 *    Date's local calendar fields (getFullYear/getMonth/getDate), so call
 *    it with a Date constructed in the device's Yangon timezone.
 *
 * Accuracy: verified against the paper's worked examples and against
 * official Myanmar public-holiday full moons for 2015-2027 (see the
 * verification report). Covers 1900-2100 CE (ME ~1262-1462) and, via the
 * era tables, earlier years as far back as 0 ME.
 */
(function (root) {
  'use strict';

  /* ---- Astronomical constants (Irwin 1909 / Yan Naing Aye 2013) ---- */
  var SY = 1577917828 / 4320000;   /* solar year, 365.2587565 days */
  var LM = 1577917828 / 53433336;  /* lunar month, 29.53058795 days */
  var MO = 1954168.050623;         /* Julian Date of the start of 0 ME */

  /* ---- Eras: WO = watat offset, NM = months used for the watat test,
     fme = full-moon-day exceptions [year, day-correction],
     wte = watat exceptions [year, 1 = watat / 0 = common]. ---- */
  var ERAS = [
    { begin: -999, end: 797,  wo: -1.1,  nm: -1,
      fme: [[205, 1], [246, 1], [471, 1], [572, -1], [651, 1], [653, 2],
            [656, 1], [672, 1], [729, 1], [767, -1]],
      wte: [] },
    { begin: 798,  end: 1099, wo: -1.1,  nm: -1,
      fme: [[813, -1], [849, -1], [851, -1], [854, -1], [927, -1], [933, -1],
            [936, -1], [938, -1], [949, -1], [952, -1], [963, -1], [968, -1],
            [1039, -1]],
      wte: [] },
    { begin: 1100, end: 1216, wo: -0.85, nm: -1,
      fme: [[1120, 1], [1126, -1], [1150, 1], [1172, -1], [1207, 1]],
      wte: [[1201, 1], [1202, 0]] },
    { begin: 1217, end: 1311, wo: -1,    nm: 4,
      fme: [[1234, 1], [1261, -1]],
      wte: [[1263, 1], [1264, 0]] },
    { begin: 1312, end: 9999, wo: -0.5,  nm: 8,
      fme: [[1377, 1]],
      wte: [[1344, 1], [1345, 0]] }
  ];

  var MONTHS_MY = ['တန်ခူး', 'ကဆုန်', 'နယုန်', 'ဝါဆို', 'ဝါခေါင်',
    'တော်သလင်း', 'သီတင်းကျွတ်', 'တန်ဆောင်မုန်း', 'နတ်တော်', 'ပြာသို',
    'တပို့တွဲ', 'တပေါင်း'];
  var MONTHS_EN = ['Tagu', 'Kason', 'Nayon', 'Waso', 'Wagaung',
    'Tawthalin', 'Thadingyut', 'Tazaungmon', 'Nadaw', 'Pyatho',
    'Tabodwe', 'Tabaung'];

  function eraFor(my) {
    var i;
    for (i = ERAS.length - 1; i > 0; i--) {
      if (my >= ERAS[i].begin) break;
    }
    return ERAS[i];
  }

  function findCorrection(list, year) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i][0] === year) return list[i][1];
    }
    return null;
  }

  /* Check the intercalary month of a Myanmar year.
     Returns { watat: 0/1, fm: JDN of the full moon of 2nd Waso }. */
  function checkWatat(my) {
    var era = eraFor(my);
    var nm = era.nm, wo = era.wo;
    var ta = (SY / 12 - LM) * (12 - nm);      /* adjustment threshold */
    var ed = (SY * (my + 3739)) % LM;         /* excess days */
    if (ed < ta) ed += LM;
    var fm = Math.round(SY * my + MO - ed + 4.5 * LM + wo);
    var watat = 0;
    if (era.begin >= 1217) {                  /* 2nd era onwards: excess-day rule */
      var tw = LM - (SY / 12 - LM) * nm;      /* watat threshold */
      if (ed >= tw) watat = 1;
    } else {                                  /* 1st era: 19-year Metonic cycle.
        watat years are those with my mod 19 in {2,5,7,10,13,15,18};
        (my*7+2) mod 19 maps exactly those remainders to 12..18. */
      var r = (my * 7 + 2) % 19;
      if (r < 0) r += 19;
      watat = Math.floor(r / 12);
    }
    var w = findCorrection(era.wte, my);
    if (w !== null) watat = w;
    if (watat) {
      var f = findCorrection(era.fme, my);
      if (f !== null) fm += f;
    }
    return { watat: watat, fm: fm };
  }

  /* Check a Myanmar year. Returns { myt: 0 common / 1 little watat /
     2 big watat, tg1: JDN of Tagu 1, fm: JDN of (2nd) Waso full moon,
     werr: 1 if the watat gap is inconsistent (should not happen) }. */
  function checkYear(my) {
    var y2 = checkWatat(my);
    var myt = y2.watat;
    var yd = 0, y1, nd = 0, werr = 0, fm = 0;
    do {
      yd++;
      y1 = checkWatat(my - yd);
    } while (y1.watat === 0 && yd < 3);
    if (myt) {
      nd = (y2.fm - y1.fm) % 354;
      myt = Math.floor(nd / 31) + 1;          /* 30 -> little, 31 -> big */
      fm = y2.fm;
      if (nd !== 30 && nd !== 31) werr = 1;
    } else {
      fm = y1.fm + 354 * yd;
    }
    var tg1 = y1.fm + 354 * yd - 102;
    return { myt: myt, tg1: tg1, fm: fm, werr: werr };
  }

  /* Gregorian date -> Julian Day Number (Fliegel-Van Flandern formula,
     as given in the paper). y = full year, m = 1-12, d = 1-31. */
  function gregorianToJdn(y, m, d) {
    var a = Math.floor((14 - m) / 12);
    var yy = y + 4800 - a;
    var mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy +
      Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
  }

  /* JDN -> raw Myanmar date.
     mm: 1 Tagu, 2 Kason, 3 Nayon, 0 First Waso, 4 (2nd) Waso, 5 Wagaung,
         6 Tawthalin, 7 Thadingyut, 8 Tazaungmon, 9 Nadaw, 10 Pyatho,
         11 Tabodwe, 12 Tabaung.
     mmt: 1 = Hnaung (old-year part of the month), 0 = Oo.
     mp: 0 waxing, 1 full moon, 2 waning, 3 new moon. fd: fortnight day 1-15.
     wd: weekday, 0 = Saturday, 1 = Sunday, ... 6 = Friday. */
  function jdnToMyanmar(jdn) {
    var my = Math.floor((jdn - 0.5 - MO) / SY);
    var yo = checkYear(my);
    var dd = jdn - yo.tg1 + 1;
    var b = Math.floor(yo.myt / 2);           /* 1 if big watat */
    var c = Math.floor(1 / (yo.myt + 1));     /* 1 if common year */
    var myl = 354 + (1 - c) * 30 + b;         /* year length */
    var mmt = Math.floor((dd - 1) / myl);
    dd -= mmt * myl;
    var a = Math.floor((dd + 423) / 512);
    var mm = Math.floor((dd - b * a + c * a * 30 + 29.26) / 29.544);
    var e = Math.floor((mm + 12) / 16);
    var f = Math.floor((mm + 11) / 16);
    var md = dd - Math.floor(29.544 * mm - 29.26) - b * e + c * f * 30;
    mm += f * 3 - e * 4;
    var mml = 30 - mm % 2;
    if (mm === 3) mml += b;                   /* Nayon +1 day in big watat */
    var mp = Math.floor((md + 1) / 16) + Math.floor(md / 16) +
      Math.floor(md / mml);
    var fd = md - 15 * Math.floor(md / 16);
    var wd = (jdn + 2) % 7;
    return { my: my, myt: yo.myt, myl: myl, mm: mm, mmt: mmt,
      mml: mml, md: md, mp: mp, fd: fd, wd: wd, werr: yo.werr, tg1: yo.tg1 };
  }

  /* Public API: JS Date (its local fields are read as Asia/Yangon wall
     time) -> Myanmar date object. */
  function toMyanmar(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('MyanmarCal.toMyanmar expects a valid Date');
    }
    var jdn = gregorianToJdn(date.getFullYear(), date.getMonth() + 1,
      date.getDate());
    var r = jdnToMyanmar(jdn);
    var isFirstWaso = (r.mm === 0);
    var monthIndex = isFirstWaso ? 3 : r.mm - 1;
    return {
      myYear: r.my,
      monthIndex: monthIndex,
      monthName: isFirstWaso ? 'ပထမဝါဆို' : MONTHS_MY[monthIndex],
      monthNameEn: isFirstWaso ? 'First Waso' : MONTHS_EN[monthIndex],
      day: r.md,
      moonPhase: (r.mp <= 1) ? 'waxing' : 'waning',
      moonDay: r.fd,
      isFullMoon: r.mp === 1,
      isNewMoon: r.mp === 3,
      isWatatYear: r.myt > 0,
      isWatatMonth: isFirstWaso,
      /* extras (not in the minimal spec, handy for the UI) */
      isHnaung: r.mmt === 1,
      yearType: r.myt,          /* 0 common, 1 little watat, 2 big watat */
      monthLength: r.mml,
      weekday: date.getDay(),   /* 0 Sunday .. 6 Saturday (JS convention) */
      jdn: jdn
    };
  }

  function todayMyanmar() {
    return toMyanmar(new Date());
  }

  var MyanmarCal = {
    toMyanmar: toMyanmar,
    todayMyanmar: todayMyanmar,
    /* internals exposed for testing / diagnostics */
    _raw: jdnToMyanmar,
    _checkWatat: checkWatat,
    _checkYear: checkYear,
    _gregorianToJdn: gregorianToJdn,
    MONTHS_MY: MONTHS_MY,
    MONTHS_EN: MONTHS_EN
  };

  root.MyanmarCal = MyanmarCal;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyanmarCal;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
