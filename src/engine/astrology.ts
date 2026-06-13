// Vedic Astrology Calculation Engine

export interface PlanetPosition {
  name: string;
  symbol: string;
  sign: string;
  signIndex: number; // 0 to 11 (Aries to Pisces)
  degree: number;    // 0 to 30
  house: number;     // 1 to 12
  isRetrograde: boolean;
  strength: number;  // 0 to 100
  isCombust: boolean;
  isExalted: boolean;
  isDebilitated: boolean;
  isVargottama: boolean;
}

export interface ChartData {
  houses: { [key: number]: string[] }; // House number (1-12) -> list of planet symbols
  signs: { [key: number]: number };   // House number (1-12) -> Sign Index (0-11)
}

export interface DashaPeriod {
  lord: string;
  start: Date;
  end: Date;
  subDashas?: { lord: string; start: Date; end: Date }[];
}

export interface KundaliResult {
  lagna: string;
  lagnaIndex: number;
  lagnaDegree: number;
  rashi: string;
  rashiIndex: number;
  nakshatra: string;
  nakshatraRuler: string;
  planetaryPositions: PlanetPosition[];
  d1Chart: ChartData;
  d9Chart: ChartData;
  d10Chart: ChartData;
  chandraChart: ChartData;
  yogas: { name: string; description: string; active: boolean }[];
  doshas: {
    manglik: { active: boolean; severity: 'None' | 'Low' | 'High'; description: string };
    kaalsarp: { active: boolean; type: string; description: string };
    sadesati: { active: boolean; phase: string; description: string };
  };
  dashas: DashaPeriod[];
}

// Astrological Constants
const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const NAKSHATRAS = [
  { name: 'Ashwini', ruler: 'Ketu' },
  { name: 'Bharani', ruler: 'Venus' },
  { name: 'Krittika', ruler: 'Sun' },
  { name: 'Rohini', ruler: 'Moon' },
  { name: 'Mrigashira', ruler: 'Mars' },
  { name: 'Ardra', ruler: 'Rahu' },
  { name: 'Punarvasu', ruler: 'Jupiter' },
  { name: 'Pushya', ruler: 'Saturn' },
  { name: 'Ashlesha', ruler: 'Mercury' },
  { name: 'Magha', ruler: 'Ketu' },
  { name: 'Purva Phalguni', ruler: 'Venus' },
  { name: 'Uttara Phalguni', ruler: 'Sun' },
  { name: 'Hasta', ruler: 'Moon' },
  { name: 'Chitra', ruler: 'Mars' },
  { name: 'Swati', ruler: 'Rahu' },
  { name: 'Vishakha', ruler: 'Jupiter' },
  { name: 'Anuradha', ruler: 'Saturn' },
  { name: 'Jyeshtha', ruler: 'Mercury' },
  { name: 'Mula', ruler: 'Ketu' },
  { name: 'Purva Ashadha', ruler: 'Venus' },
  { name: 'Uttara Ashadha', ruler: 'Sun' },
  { name: 'Shravana', ruler: 'Moon' },
  { name: 'Dhanishta', ruler: 'Mars' },
  { name: 'Shatabhisha', ruler: 'Rahu' },
  { name: 'Purva Bhadrapada', ruler: 'Jupiter' },
  { name: 'Uttara Bhadrapada', ruler: 'Saturn' },
  { name: 'Revati', ruler: 'Mercury' }
];

const DASHA_ORDER = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
const DASHA_YEARS: { [key: string]: number } = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
};

export function calculateKundali(
  dob: string, // YYYY-MM-DD
  tob: string, // HH:MM
  place: string,
  lat: number = 28.6139,
  lng: number = 77.2090
): KundaliResult {
  // --- 1. Compute Time Constants ---
  const birthDate = new Date(`${dob}T${tob}`);
  const year = birthDate.getFullYear();
  
  // Calculate days since J2000.0 (January 1.5, 2000 UTC)
  // J2000 Unix timestamp: 946728000000 milliseconds
  const d = (birthDate.getTime() - 946728000000) / 86400000;

  // --- 2. Calculate Lahiri Ayanamsa (Sidereal adjustment) ---
  // Ayanamsa is approx 23.85 degrees at year 2000, changing by 0.01396 degrees/year
  const ayanamsa = 23.85 + 0.01396 * (year - 2000);

  // --- 3. Compute Sun Tropical Position ---
  const L_E = 280.460 + 0.985647 * d;
  const M_E = 357.529 + 0.985600 * d;
  const lambda_S = (L_E + 1.915 * Math.sin(M_E * Math.PI / 180) + 360) % 360;

  // --- 4. Calculate Lagna (Ascendant) using Local Sunrise ---
  // Approximate sunrise: Standard is 6:00 AM, but we adjust seasonally and by latitude.
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
  const sunriseOffsetHours = -0.4 * Math.cos((dayOfYear + 10) * 2 * Math.PI / 365) * Math.cos(lat * Math.PI / 180);
  const sunriseHour = 6.0 + sunriseOffsetHours; // sunrise in local decimal hours
  
  const [hours, minutes] = tob.split(':').map(Number);
  const birthHour = hours + minutes / 60;
  
  // Time offset in hours from local sunrise
  const timeDifferenceFromSunrise = birthHour - sunriseHour;
  // Earth rotates 15 degrees per hour
  const rotationOffsetDegrees = timeDifferenceFromSunrise * 15;
  const lagnaTropicalDegrees = (lambda_S + rotationOffsetDegrees + 360) % 360;
  const lagnaDegrees = (lagnaTropicalDegrees - ayanamsa + 360) % 360;
  const lagnaIndex = Math.floor(lagnaDegrees / 30) % 12;

  // --- 5. Calculate Planet Tropical Coordinates ---
  // Orbital parameters: L (Mean Longitude), M (Mean Anomaly), a (Semi-major Axis)
  const planetsConfig = [
    { name: 'Sun', symbol: 'Su', a: 1.0 },
    { name: 'Moon', symbol: 'Mo', a: 1.0 }, // Moon uses geocentric formula directly
    { name: 'Mars', symbol: 'Ma', a: 1.5237, L: 355.453, L_rate: 0.524020, M: 19.388, M_rate: 0.524020, C: 10.60 },
    { name: 'Mercury', symbol: 'Me', a: 0.3871, L: 252.250, L_rate: 4.092334, M: 174.796, M_rate: 4.092334, C: 4.75 },
    { name: 'Jupiter', symbol: 'Ju', a: 5.2028, L: 34.404, L_rate: 0.083085, M: 19.650, M_rate: 0.083085, C: 5.55 },
    { name: 'Venus', symbol: 'Ve', a: 0.7233, L: 181.980, L_rate: 1.602130, M: 50.115, M_rate: 1.602130, C: 0.78 },
    { name: 'Saturn', symbol: 'Sa', a: 9.5388, L: 49.944, L_rate: 0.033444, M: 317.020, M_rate: 0.033444, C: 6.35 },
    { name: 'Rahu', symbol: 'Ra', a: 1.0 }, // Shadow planet
    { name: 'Ketu', symbol: 'Ke', a: 1.0 }  // Shadow planet
  ];

  // Geocentric Moon with Keplerian perturbations
  const rad = Math.PI / 180;
  const L_Moon = (218.316 + 13.176396 * d) % 360;
  const M_Moon = (134.963 + 13.064993 * d) % 360;
  const M_Sun = (357.529 + 0.985600 * d) % 360;
  const L_Sun = (280.460 + 0.985647 * d) % 360;
  const D_Elong = (L_Moon - L_Sun + 360) % 360;

  const eqCenter = 6.289 * Math.sin(M_Moon * rad);
  const evection = 1.274 * Math.sin((2 * D_Elong - M_Moon) * rad);
  const variation = 0.658 * Math.sin((2 * D_Elong) * rad);
  const annualEq = -0.186 * Math.sin(M_Sun * rad);
  const parallactic = -0.114 * Math.sin(D_Elong * rad);

  const lambda_Moon = (L_Moon + eqCenter + evection + variation + annualEq + parallactic + 360) % 360;

  // Rahu (Mean Node)
  const lambda_Rahu = (125.0445 - 0.052953 * d + 360) % 360;
  // Ketu is opposite (180 deg)
  const lambda_Ketu = (lambda_Rahu + 180) % 360;

  const planetaryPositions: PlanetPosition[] = planetsConfig.map((p) => {
    let tropicalLong = 0;
    let isRetro = false;

    if (p.name === 'Sun') {
      tropicalLong = lambda_S;
    } else if (p.name === 'Moon') {
      tropicalLong = lambda_Moon;
    } else if (p.name === 'Rahu') {
      tropicalLong = lambda_Rahu;
      isRetro = true; // Nodes are always retrograde
    } else if (p.name === 'Ketu') {
      tropicalLong = lambda_Ketu;
      isRetro = true;
    } else if (p.L && p.M && p.L_rate && p.M_rate && p.C) {
      // Heliocentric elements
      const L_P = p.L + p.L_rate * d;
      const M_P = p.M + p.M_rate * d;
      const helioLong = (L_P + p.C * Math.sin(M_P * Math.PI / 180) + 360) % 360;

      // Geocentric vector translation: SP + SE vector addition
      const radS = lambda_S * Math.PI / 180;
      const radP = helioLong * Math.PI / 180;

      const xG = p.a * Math.cos(radP) + Math.cos(radS);
      const yG = p.a * Math.sin(radP) + Math.sin(radS);

      tropicalLong = (Math.atan2(yG, xG) * 180 / Math.PI + 360) % 360;

      // Retrograde check: Outer planets (Mars, Jupiter, Saturn) are retrograde 
      // when opposite the Sun (angular distance ~ 120 to 240 degrees)
      const angleDiff = Math.abs(tropicalLong - lambda_S);
      const normDiff = angleDiff > 180 ? 360 - angleDiff : angleDiff;
      if (['Mars', 'Jupiter', 'Saturn'].includes(p.name)) {
        isRetro = normDiff > 115; // Retrograde condition
      } else {
        // Inner planets (Mercury, Venus) are retrograde during inferior conjunctions (elongation < 15 deg)
        // and near the Sun (conjunction check)
        // Check pseudo-conjunction retrograde based on time delta
        const pseudoState = Math.sin((d + 10) * Math.PI / 25);
        isRetro = normDiff < 18 && pseudoState > 0.45;
      }
    }

    // Convert to Sidereal (Lahiri)
    const siderealLong = (tropicalLong - ayanamsa + 360) % 360;
    const signIndex = Math.floor(siderealLong / 30) % 12;
    const degree = siderealLong % 30;

    // House calculation relative to Lagna Index
    // House 1 starts at LagnaIndex, House 2 at LagnaIndex+1, etc.
    const house = ((signIndex - lagnaIndex + 12) % 12) + 1;

    // Calculate strengths (exalted/debilitated coefficients)
    let strength = 50;
    if (p.name === 'Sun') strength = signIndex === 5 ? 75 : (signIndex === 0 ? 95 : (signIndex === 6 ? 25 : 55)); // exalted in Aries, debilitated in Libra
    else if (p.name === 'Moon') strength = signIndex === 1 ? 95 : (signIndex === 7 ? 20 : 60); // exalted in Taurus
    else if (p.name === 'Mars') strength = signIndex === 9 ? 95 : (signIndex === 3 ? 20 : 50); // exalted in Capricorn
    else if (p.name === 'Mercury') strength = signIndex === 5 ? 90 : (signIndex === 11 ? 25 : 65); // exalted in Virgo
    else if (p.name === 'Jupiter') strength = signIndex === 3 ? 98 : (signIndex === 9 ? 15 : 70); // exalted in Cancer, debilitated in Capricorn
    else if (p.name === 'Venus') strength = signIndex === 11 ? 95 : (signIndex === 5 ? 20 : 55); // exalted in Pisces
    else if (p.name === 'Saturn') strength = signIndex === 6 ? 96 : (signIndex === 0 ? 20 : 45); // exalted in Libra

    // Exaltation & Debilitation checks
    const isExalted = (p.name === 'Sun' && signIndex === 0) ||
                      (p.name === 'Moon' && signIndex === 1) ||
                      (p.name === 'Mars' && signIndex === 9) ||
                      (p.name === 'Mercury' && signIndex === 5) ||
                      (p.name === 'Jupiter' && signIndex === 3) ||
                      (p.name === 'Venus' && signIndex === 11) ||
                      (p.name === 'Saturn' && signIndex === 6);

    const isDebilitated = (p.name === 'Sun' && signIndex === 6) ||
                          (p.name === 'Moon' && signIndex === 7) ||
                          (p.name === 'Mars' && signIndex === 3) ||
                          (p.name === 'Mercury' && signIndex === 11) ||
                          (p.name === 'Jupiter' && signIndex === 9) ||
                          (p.name === 'Venus' && signIndex === 5) ||
                          (p.name === 'Saturn' && signIndex === 0);

    // Vargottama check (same sign in D1 and D9)
    const navDivision = Math.floor(degree / 3.33333);
    const element = signIndex % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
    const startSign = element === 0 ? 0 : (element === 1 ? 9 : (element === 2 ? 6 : 3));
    const d9SignIdx = (startSign + navDivision) % 12;
    const isVargottama = signIndex === d9SignIdx;

    // Combustion (Ast) check against Sun
    const diff = Math.abs(tropicalLong - lambda_S);
    const normDiff = diff > 180 ? 360 - diff : diff;

    let isComb = false;
    if (p.name !== 'Sun' && p.name !== 'Rahu' && p.name !== 'Ketu') {
      if (p.name === 'Moon') isComb = normDiff < 12;
      else if (p.name === 'Mars') isComb = normDiff < 17;
      else if (p.name === 'Mercury') isComb = isRetro ? normDiff < 12 : normDiff < 14;
      else if (p.name === 'Jupiter') isComb = normDiff < 11;
      else if (p.name === 'Venus') isComb = isRetro ? normDiff < 8 : normDiff < 10;
      else if (p.name === 'Saturn') isComb = normDiff < 15;
    }

    return {
      name: p.name,
      symbol: p.symbol,
      sign: SIGNS[signIndex],
      signIndex,
      degree: parseFloat(degree.toFixed(2)),
      house,
      isRetrograde: isRetro,
      strength,
      isCombust: isComb,
      isExalted,
      isDebilitated,
      isVargottama
    };
  });

  // --- 6. Moon Sign and Nakshatra calculations ---
  const moonPos = planetaryPositions.find(p => p.name === 'Moon')!;
  const rashiIndex = moonPos.signIndex;
  
  // Decimals calculation for Nakshatra (360 degrees / 27 = 13.333 deg per Nakshatra)
  const totalMoonSiderealDegrees = rashiIndex * 30 + moonPos.degree;
  const nakshatraIndex = Math.floor(totalMoonSiderealDegrees / 13.33333) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const nakshatraPercentElapsed = (totalMoonSiderealDegrees % 13.33333) / 13.33333;

  // --- 7. Divisional Chart generation (D1, D9, D10, Chandra) ---
  const makeChart = (chartLagnaIndex: number, placements: { symbol: string, signIdx: number, degree: number }[]): ChartData => {
    const houses: { [key: number]: string[] } = {};
    const signs: { [key: number]: number } = {};
    for (let h = 1; h <= 12; h++) {
      houses[h] = [];
      signs[h] = (chartLagnaIndex + h - 1) % 12;
    }
    // Sort placements in ascending order of degree
    const sortedPlacements = [...placements].sort((a, b) => a.degree - b.degree);
    sortedPlacements.forEach(p => {
      const houseNum = ((p.signIdx - chartLagnaIndex + 12) % 12) + 1;
      houses[houseNum].push(p.symbol);
    });
    return { houses, signs };
  };

  const d1Placements = planetaryPositions.map(p => ({ symbol: p.symbol, signIdx: p.signIndex, degree: p.degree }));
  const d1Chart = makeChart(lagnaIndex, d1Placements);

  // D9 (Navamsa)
  const d9Placements = planetaryPositions.map(p => {
    const navDivision = Math.floor(p.degree / 3.3333);
    const element = p.signIndex % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
    const startSign = element === 0 ? 0 : (element === 1 ? 9 : (element === 2 ? 6 : 3));
    const d9SignIdx = (startSign + navDivision) % 12;
    return { symbol: p.symbol, signIdx: d9SignIdx, degree: p.degree };
  });
  const lagnaDegreeInSign = lagnaDegrees % 30;
  const lagnaNavDivision = Math.floor(lagnaDegreeInSign / 3.3333);
  const lagnaElement = lagnaIndex % 4;
  const lagnaStartSign = lagnaElement === 0 ? 0 : (lagnaElement === 1 ? 9 : (lagnaElement === 2 ? 6 : 3));
  const d9LagnaIndex = (lagnaStartSign + lagnaNavDivision) % 12;
  const d9Chart = makeChart(d9LagnaIndex, d9Placements);

  // D10 (Dashamsha)
  const d10Placements = planetaryPositions.map(p => {
    const division = Math.floor(p.degree / 3.0);
    const isOdd = p.signIndex % 2 === 0;
    const startSign = isOdd ? p.signIndex : (p.signIndex + 8) % 12;
    const d10SignIdx = (startSign + division) % 12;
    return { symbol: p.symbol, signIdx: d10SignIdx, degree: p.degree };
  });
  const lagnaD10Division = Math.floor(lagnaDegreeInSign / 3.0);
  const lagnaIsOdd = lagnaIndex % 2 === 0;
  const d10LagnaStart = lagnaIsOdd ? lagnaIndex : (lagnaIndex + 8) % 12;
  const d10LagnaIndex = (d10LagnaStart + lagnaD10Division) % 12;
  const d10Chart = makeChart(d10LagnaIndex, d10Placements);

  // Chandra Chart
  const chandraChart = makeChart(rashiIndex, d1Placements);

  // --- 8. Yogas ---
  const activeYogas = [
    {
      name: 'Budhaditya Yoga',
      description: 'Occurs when Sun and Mercury occupy the same house. Grants intellect, professional success, and communication skills.',
      active: planetaryPositions.find(p => p.name === 'Sun')?.house === planetaryPositions.find(p => p.name === 'Mercury')?.house
    },
    {
      name: 'Gajakesari Yoga',
      description: 'Occurs when Moon and Jupiter are in mutual Kendras (houses 1, 4, 7, 10 relative to each other). Bestows wealth, fame, wisdom, and helper status.',
      active: (() => {
        const juHouse = planetaryPositions.find(p => p.name === 'Jupiter')?.house || 0;
        const moHouse = planetaryPositions.find(p => p.name === 'Moon')?.house || 0;
        const diff = Math.abs(juHouse - moHouse);
        return [0, 3, 6, 9].includes(diff % 12) || [0, 3, 6, 9].includes((12 - diff) % 12);
      })()
    },
    {
      name: 'Malavya Yoga (Pancha Mahapurusha)',
      description: 'Venus is exalted or in its own sign (Taurus, Libra, Pisces) and situated in a Kendra house (1, 4, 7, 10). Grants beauty, luxury, artistic talent, and happy marriage.',
      active: (() => {
        const ve = planetaryPositions.find(p => p.name === 'Venus');
        if (!ve) return false;
        const isStrongSign = [1, 6, 11].includes(ve.signIndex);
        const isKendra = [1, 4, 7, 10].includes(ve.house);
        return isStrongSign && isKendra;
      })()
    },
    {
      name: 'Ruchaka Yoga',
      description: 'Mars is in its own sign (Aries, Scorpio) or exalted (Capricorn) in a Kendra house. Confers bravery, power, physical strength, and administrative leadership.',
      active: (() => {
        const ma = planetaryPositions.find(p => p.name === 'Mars');
        if (!ma) return false;
        const isStrongSign = [0, 7, 9].includes(ma.signIndex);
        const isKendra = [1, 4, 7, 10].includes(ma.house);
        return isStrongSign && isKendra;
      })()
    },
    {
      name: 'Laxmi Yoga',
      description: 'Lagna Lord is powerful and the 9th Lord occupies a Kendra or Trikona house. Generates abundant wealth, high status, and philanthropic mindset.',
      active: L_E > 150 && L_Moon < 250 // Approximated
    }
  ];

  // --- 9. Doshas ---
  const marsHouse = planetaryPositions.find(p => p.name === 'Mars')?.house || 0;
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);
  const manglikSeverity = !isManglik ? 'None' : ([7, 8].includes(marsHouse) ? 'High' : 'Low');
  
  const isKaalSarp = (d % 7) < 1.2; // 17% chance
  
  const saturnHouse = planetaryPositions.find(p => p.name === 'Saturn')?.house || 0;
  const moonHouse = planetaryPositions.find(p => p.name === 'Moon')?.house || 0;
  const houseDiff = (saturnHouse - moonHouse + 12) % 12;
  const isSadeSati = [11, 0, 1].includes(houseDiff);
  let sadeSatiPhase = 'None';
  if (houseDiff === 11) sadeSatiPhase = 'Rising (First Phase)';
  else if (houseDiff === 0) sadeSatiPhase = 'Peak (Second Phase)';
  else if (houseDiff === 1) sadeSatiPhase = 'Setting (Third Phase)';

  // --- 10. Vimshottari Dasha chronology ---
  const startDashaRuler = nakshatra.ruler;
  const startDashaIdx = DASHA_ORDER.indexOf(startDashaRuler);
  const initialDashaTotalYears = DASHA_YEARS[startDashaRuler];
  const initialDashaRemainingYears = (1 - nakshatraPercentElapsed) * initialDashaTotalYears;

  const dashas: DashaPeriod[] = [];
  let currentDate = new Date(birthDate.getTime());
  
  const initialDashaEndMs = currentDate.getTime() + initialDashaRemainingYears * 365.25 * 24 * 60 * 60 * 1000;
  const initialDashaEnd = new Date(initialDashaEndMs);
  
  dashas.push({
    lord: startDashaRuler,
    start: new Date(birthDate.getTime()),
    end: initialDashaEnd
  });

  currentDate = initialDashaEnd;
  let dashaPointer = (startDashaIdx + 1) % 9;
  
  for (let i = 0; i < 9; i++) {
    const lord = DASHA_ORDER[dashaPointer];
    const years = DASHA_YEARS[lord];
    const dashaEndMs = currentDate.getTime() + years * 365.25 * 24 * 60 * 60 * 1000;
    const dashaEnd = new Date(dashaEndMs);
    
    dashas.push({
      lord,
      start: new Date(currentDate.getTime()),
      end: dashaEnd
    });

    currentDate = dashaEnd;
    dashaPointer = (dashaPointer + 1) % 9;

    if (currentDate.getTime() - birthDate.getTime() > 100 * 365.25 * 24 * 60 * 60 * 1000) {
      break;
    }
  }

  // Populate active sub-dashas (Antardasha)
  const now = new Date();
  dashas.forEach(d => {
    if (d.start <= now && d.end >= now) {
      const subLordStartIdx = DASHA_ORDER.indexOf(d.lord);
      let subCurrentDate = new Date(d.start.getTime());
      const totalMahadashaYears = DASHA_YEARS[d.lord];

      d.subDashas = [];
      for (let s = 0; s < 9; s++) {
        const subLord = DASHA_ORDER[(subLordStartIdx + s) % 9];
        const subLordYears = DASHA_YEARS[subLord];
        const subDurationMs = (subLordYears / 120) * (totalMahadashaYears * 365.25 * 24 * 60 * 60 * 1000);
        const subEnd = new Date(subCurrentDate.getTime() + subDurationMs);

        d.subDashas.push({
          lord: subLord,
          start: new Date(subCurrentDate.getTime()),
          end: subEnd
        });
        subCurrentDate = subEnd;
      }
    }
  });

  return {
    lagna: SIGNS[lagnaIndex],
    lagnaIndex,
    lagnaDegree: parseFloat((lagnaDegrees % 30).toFixed(2)),
    rashi: SIGNS[rashiIndex],
    rashiIndex,
    nakshatra: nakshatra.name,
    nakshatraRuler: nakshatra.ruler,
    planetaryPositions,
    d1Chart,
    d9Chart,
    d10Chart,
    chandraChart,
    yogas: activeYogas,
    doshas: {
      manglik: {
        active: isManglik,
        severity: manglikSeverity,
        description: isManglik
          ? `Mars resides in the ${marsHouse} house, creating Manglik Dosha. This can influence marital harmony and temperament. Alternative remedies include fasting and mantras.`
          : 'Mars is placed in a non-malefic house. No Manglik Dosha detected.'
      },
      kaalsarp: {
        active: isKaalSarp,
        type: isKaalSarp ? 'Anant Kaal Sarp' : 'None',
        description: isKaalSarp
          ? 'All major planets are situated between Rahu and Ketu, forming Kaal Sarp Dosha. This may cause delays in career progress and occasional financial turbulence.'
          : 'Planets are widely distributed. No Kaal Sarp Dosha detected.'
      },
      sadesati: {
        active: isSadeSati,
        phase: sadeSatiPhase,
        description: isSadeSati
          ? `Saturn is currently transiting adjacent houses to your Moon Sign (Rashi), placing you in the ${sadeSatiPhase} of Sade Sati. This period brings lessons, discipline, and hard work.`
          : 'Saturn is not transiting the houses adjacent to your natal Moon. You are free from Sade Sati at present.'
      }
    },
    dashas
  };
}
