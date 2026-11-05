/* ============================================================================
   Myanmar Baydin — birth chart calculations (ChartCalc)
   ----------------------------------------------------------------------------
   Plain <script> file (no modules). Requires window.Astronomy
   (Astronomy Engine v2, vendored as astronomy.browser.js) to be loaded first.
   No network calls at runtime. All times are Myanmar wall-clock
   (Asia/Yangon, UTC+06:30, no DST) unless a function says otherwise.

   Methods used (documented where they matter):
   - Planet longitudes: GEOCENTRIC apparent ecliptic longitudes of date.
     Astronomy's EclipticLongitude() is HELIOCENTRIC, so planets are computed
     as Astronomy.Ecliptic(Astronomy.GeoVector(body, date, true)).elon
     (geocentric equatorial vector -> ecliptic of date). The Sun is
     (heliocentric longitude of the Earth + 180 deg). The Moon uses the same
     GeoVector path (verified identical to Astronomy.EclipticGeoMoon).
   - Rahu: MEAN lunar north node, Meeus formula
       Ω = 125.04452 − 1934.136261·T + 0.0020708·T² + T³/450000  (degrees)
     with T = Julian centuries since J2000.0. (Traditional jyotish uses the
     mean node; the library's true node oscillates about ±1.5 deg around it.)
     Ketu = Rahu + 180 deg.
   - Ascendant: RAMC from Astronomy.SiderealTime (GMST, hours) + observer
     longitude; mean obliquity of date (Meeus); then the standard formula
       λ_asc = atan2( −cos(RAMC), sin(RAMC)·cos ε + tan φ · sin ε )
     normalised to 0–360 deg. (φ = latitude, RAMC in degrees.)
   - Houses: WHOLE-SIGN — house 1 starts at the ascendant's sign.
   - Vimshottari dasha: 120-year cycle Ketu 7, Venus 20, Sun 6, Moon 10,
     Mars 7, Rahu 18, Jupiter 16, Saturn 19, Mercury 17. The balance at
     birth comes from the Moon's remaining portion in its nakshatra.
     Fractional-year balances are converted at 365.25 days/year; whole
     periods advance by calendar years. Dates are Yangon wall-clock dates.
   ========================================================================== */
(function () {
  'use strict';

  var Astronomy = (typeof window !== 'undefined' ? window.Astronomy : null);
  if (!Astronomy) {
    throw new Error('ChartCalc needs window.Astronomy (load astronomy.browser.js first).');
  }

  var DEG = Math.PI / 180;
  var YANGON_OFFSET_MS = 6.5 * 3600 * 1000; /* UTC+06:30, no DST */

  /* ---- small helpers ---------------------------------------------------- */
  function norm360(x) {
    x = x % 360;
    return x < 0 ? x + 360 : x;
  }

  /* Yangon wall-clock components -> UTC Date. */
  function toUTCDate(y, mo, d, hh, mm) {
    return new Date(Date.UTC(y, mo - 1, d, hh || 0, mm || 0) - YANGON_OFFSET_MS);
  }

  /* Geocentric apparent ecliptic longitude of a body (degrees, 0-360). */
  function geoLon(body, date) {
    if (body === 'Sun') {
      /* Sun's geocentric longitude = Earth's heliocentric longitude + 180. */
      return norm360(Astronomy.EclipticLongitude('Earth', date) + 180);
    }
    return norm360(Astronomy.Ecliptic(Astronomy.GeoVector(body, date, true)).elon);
  }

  /* Mean longitude of the Moon's ascending node (Rahu), degrees 0-360. */
  function meanNode(date) {
    var T = (date.getTime() / 86400000 - 10957.5) / 36525; /* centuries since J2000.0 */
    return norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000);
  }

  /* Mean obliquity of the ecliptic for a date (degrees). Meeus. */
  function meanObliquity(date) {
    var T = (date.getTime() / 86400000 - 10957.5) / 36525;
    return 23.4392911111 - (46.8150 * T + 0.00059 * T * T - 0.001813 * T * T * T) / 3600;
  }

  /* ---- zodiac signs (site's Burmese names) ------------------------------ */
  var SIGNS_MY = ['မိဿ', 'ပြိဿ', 'မေထုန်', 'ကရကဋ်', 'သိဟ်', 'ကန်',
                  'တူ', 'ဗြိစ္ဆာ', 'ဓနု', 'မကာရ', 'ကုမ်', 'မိန်'];
  var SIGNS_EN = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  function signOf(lon) {
    var l = norm360(lon);
    var idx = Math.floor(l / 30);
    return { index: idx, nameMy: SIGNS_MY[idx], nameEn: SIGNS_EN[idx], degree: l - idx * 30 };
  }

  /* ---- nakshatras (27 x 13°20') ----------------------------------------- */
  var NAKSHATRA_MY = ['အဿဝဏီ', 'ဘရဏီ', 'ကြတ္တိကာ', 'ရောဟဏီ', 'မိဂသိရ',
    'အာဒြာ', 'ပုန္နဝသု', 'ပုဿျ', 'အဿိလေသာ', 'မဃာ',
    'ပုဗ္ဗာဖလ္ဂုနီ', 'ဥတ္တရဖလ္ဂုနီ', 'ဟတ္ထ', 'စိတ္တ', 'သွာတိ',
    'ဝိသာခါ', 'အနုရာဓာ', 'ဇေဋ္ဌ', 'မူလ', 'ပုဗ္ဗာသာဠ်',
    'ဥတ္တရာသာဠ်', 'သရဝဏ်', 'ဓနိဋ္ဌာ', 'သတ္တဘိသဇ်',
    'ပုဗ္ဗာဘဒြပုဒ်', 'ဥတ္တရဘဒြပုဒ်', 'ရေဝတီ'];
  var DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  var DASHA_YEARS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };
  var NAKSHATRA_SPAN = 360 / 27; /* 13.333... degrees */

  function nakshatra(moonLon) {
    var l = norm360(moonLon);
    var idx = Math.floor(l / NAKSHATRA_SPAN);
    if (idx > 26) idx = 26;
    return { index: idx, nameMy: NAKSHATRA_MY[idx], lord: DASHA_ORDER[idx % 9] };
  }

  /* ---- planets ----------------------------------------------------------- */
  function planetLongitudes(y, mo, d, hh, mm) {
    var date = toUTCDate(y, mo, d, hh, mm);
    var rahu = meanNode(date);
    return {
      Sun: geoLon('Sun', date),
      Moon: geoLon('Moon', date),
      Mercury: geoLon('Mercury', date),
      Venus: geoLon('Venus', date),
      Mars: geoLon('Mars', date),
      Jupiter: geoLon('Jupiter', date),
      Saturn: geoLon('Saturn', date),
      Rahu: rahu,
      Ketu: norm360(rahu + 180)
    };
  }

  /* ---- ascendant --------------------------------------------------------- */
  function ascendant(y, mo, d, hh, mm, lat, lon) {
    var date = toUTCDate(y, mo, d, hh, mm);
    var gmstHours = Astronomy.SiderealTime(date); /* GMST, hours */
    var lstDeg = norm360(gmstHours * 15 + lon); /* local sidereal time, degrees */
    var ramc = lstDeg * DEG;
    var eps = meanObliquity(date) * DEG;
    var phi = lat * DEG;
    var asc = Math.atan2(Math.cos(ramc),
                         -(Math.sin(ramc) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps)));
    return norm360(asc / DEG);
  }

  /* ---- whole-sign houses -------------------------------------------------- */
  function wholeSignHouses(ascLon) {
    var cusp1 = Math.floor(norm360(ascLon) / 30) * 30;
    var cusps = [];
    for (var i = 0; i < 12; i++) cusps.push(norm360(cusp1 + i * 30));
    return cusps;
  }

  function houseOf(lon, ascLon) {
    var cusp1 = Math.floor(norm360(ascLon) / 30) * 30;
    return Math.floor(norm360(norm360(lon) - cusp1) / 30) + 1; /* 1-12 */
  }

  /* ---- Vimshottari dasha -------------------------------------------------- */
  function fmtDate(ms) {
    /* ms = UTC millis; format as Yangon wall-clock YYYY-MM-DD. */
    var d = new Date(ms + YANGON_OFFSET_MS);
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getUTCFullYear() + '-' + p(d.getUTCMonth() + 1) + '-' + p(d.getUTCDate());
  }

  function addYearsMs(ms, years) {
    /* Calendar-year step on the Yangon wall-clock date (Feb 29 -> Feb 28). */
    var d = new Date(ms + YANGON_OFFSET_MS);
    var y = d.getUTCFullYear() + years;
    var mo = d.getUTCMonth();
    var day = d.getUTCDate();
    var last = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
    if (day > last) day = last;
    var hh = d.getUTCHours(), mm = d.getUTCMinutes(), ss = d.getUTCSeconds();
    return Date.UTC(y, mo, day, hh, mm, ss) - YANGON_OFFSET_MS;
  }

  function vimshottariDasha(moonLon, birthY, birthMo, birthD) {
    var n = nakshatra(moonLon);
    var startIdx = DASHA_ORDER.indexOf(n.lord);
    var elapsed = (norm360(moonLon) - n.index * NAKSHATRA_SPAN) / NAKSHATRA_SPAN;
    var balanceYears = (1 - elapsed) * DASHA_YEARS[n.lord];

    /* Birth day at 00:00 Yangon wall-clock. */
    var birthMs = Date.UTC(birthY, birthMo - 1, birthD) - YANGON_OFFSET_MS;

    /* Build the timeline: first period is the fractional balance, then
       whole periods cycling through the 9 lords. */
    var periods = [];
    var cursor = birthMs;
    var idx = startIdx;
    var firstEnd = cursor + balanceYears * 365.25 * 86400000;
    if (firstEnd - cursor < 86400000) firstEnd = cursor + 86400000; /* min 1 day */
    periods.push({ lord: DASHA_ORDER[idx], startMs: cursor, endMs: firstEnd });
    cursor = firstEnd;
    for (var k = 1; k < 40; k++) {
      idx = (startIdx + k) % 9;
      var end = addYearsMs(cursor, DASHA_YEARS[DASHA_ORDER[idx]]);
      periods.push({ lord: DASHA_ORDER[idx], startMs: cursor, endMs: end });
      cursor = end;
    }

    var now = Date.now();
    var cur = periods[0];
    var curPos = 0;
    for (var i = 0; i < periods.length; i++) {
      if (now >= periods[i].startMs && now < periods[i].endMs) { cur = periods[i]; curPos = i; break; }
      if (now < periods[i].startMs) { cur = periods[i]; curPos = i; break; }
    }
    var upcoming = [];
    for (var j = 1; j <= 3; j++) {
      var p = periods[curPos + j];
      upcoming.push({ lord: p.lord, start: fmtDate(p.startMs), end: fmtDate(p.endMs) });
    }
    return {
      current: { lord: cur.lord, start: fmtDate(cur.startMs), end: fmtDate(cur.endMs) },
      upcoming: upcoming
    };
  }

  /* ---- today's transits ---------------------------------------------------- */
  function transitsToday(natalAscLon) {
    var now = new Date();
    /* Current Yangon wall-clock components. */
    var ygn = new Date(now.getTime() + YANGON_OFFSET_MS);
    var pos = planetLongitudes(ygn.getUTCFullYear(), ygn.getUTCMonth() + 1, ygn.getUTCDate(),
                               ygn.getUTCHours(), ygn.getUTCMinutes());
    var out = {};
    Object.keys(pos).forEach(function (k) {
      out[k] = { longitude: pos[k], house: houseOf(pos[k], natalAscLon) };
    });
    return out;
  }

  /* ---- public API ---------------------------------------------------------- */
  window.ChartCalc = {
    planetLongitudes: planetLongitudes,
    ascendant: ascendant,
    wholeSignHouses: wholeSignHouses,
    signOf: signOf,
    nakshatra: nakshatra,
    vimshottariDasha: vimshottariDasha,
    transitsToday: transitsToday
  };
})();
