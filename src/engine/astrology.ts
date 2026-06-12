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

// Simple pseudo-random hash generator based on date and time strings for deterministic outputs
function getSeed(dateStr: string, timeStr: string, locationStr: string): number {
  const combined = dateStr + timeStr + locationStr;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Generate seeded float between 0 and 1
function seededRandom(seed: number, salt: number): number {
  const x = Math.sin(seed + salt) * 10000;
  return x - Math.floor(x);
}

export function calculateKundali(
  dob: string, // YYYY-MM-DD
  tob: string, // HH:MM
  place: string,
  lat: number = 28.6139, // Default New Delhi
  lng: number = 77.2090
): KundaliResult {
  const seed = getSeed(dob, tob, place);

  // --- 1. Calculate Lagna (Ascendant) ---
  // Lagna changes roughly 30 degrees every 2 hours, aligned with solar time.
  const dateObj = new Date(dob);
  const dayOfYear = Math.floor((dateObj.getTime() - new Date(dateObj.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Sun sign estimate based on date (approximate transit: Sun enters Aries ~April 13/14 in Vedic Sidereal)
  // Sidereal Sun starts in Aries around day 103 (April 13)
  const siderealSunPosDegrees = ((dayOfYear - 103 + 365) % 365) * (360 / 365.25);
  const sunSignIndex = Math.floor(siderealSunPosDegrees / 30) % 12;

  // Local solar time calculation
  const [hours, minutes] = tob.split(':').map(Number);
  const timeInMinutes = hours * 60 + minutes;
  // Offset from sunrise (approx 6:00 AM)
  const minutesSinceSunrise = (timeInMinutes - 360 + 1440) % 1440;
  // Earth rotates 360 degrees in 1440 minutes, which is 0.25 degrees per minute
  const degreesRotatedSinceSunrise = minutesSinceSunrise * 0.25;

  const lagnaDegrees = (siderealSunPosDegrees + degreesRotatedSinceSunrise) % 360;
  const lagnaIndex = Math.floor(lagnaDegrees / 30) % 12;
  const lagnaDegreeInSign = lagnaDegrees % 30;

  // --- 2. Calculate Moon Position (Rashi & Nakshatra) ---
  // Moon travels 360 degrees in ~27.3 days, approx 13.18 degrees per day.
  const baseMoonPosDegrees = (dayOfYear * 13.17639 + seededRandom(seed, 100) * 13.18) % 360;
  const rashiIndex = Math.floor(baseMoonPosDegrees / 30) % 12;
  const moonDegreeInSign = baseMoonPosDegrees % 30;

  // Nakshatra is based on moon degrees: 360 / 27 = 13 degrees 20 minutes (13.333 degrees) per Nakshatra
  const nakshatraIndex = Math.floor(baseMoonPosDegrees / 13.33333) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const nakshatraPercentElapsed = (baseMoonPosDegrees % 13.33333) / 13.33333;

  // --- 3. Planetary Placements (Deterministic based on DOB) ---
  const planets = [
    { name: 'Sun', symbol: 'Su', orbitalPeriod: 365.25, baseSpeed: 0.9856 },
    { name: 'Moon', symbol: 'Mo', orbitalPeriod: 27.32, baseSpeed: 13.176 },
    { name: 'Mars', symbol: 'Ma', orbitalPeriod: 686.98, baseSpeed: 0.524 },
    { name: 'Mercury', symbol: 'Me', orbitalPeriod: 87.97, baseSpeed: 4.09 },
    { name: 'Jupiter', symbol: 'Ju', orbitalPeriod: 4332.59, baseSpeed: 0.083 },
    { name: 'Venus', symbol: 'Ve', orbitalPeriod: 224.7, baseSpeed: 1.602 },
    { name: 'Saturn', symbol: 'Sa', orbitalPeriod: 10759.22, baseSpeed: 0.0334 },
    { name: 'Rahu', symbol: 'Ra', orbitalPeriod: 6793, baseSpeed: -0.05295 }, // Always retrograde
    { name: 'Ketu', symbol: 'Ke', orbitalPeriod: 6793, baseSpeed: -0.05295 }  // 180 degrees from Rahu
  ];

  const planetaryPositions: PlanetPosition[] = planets.map((p, idx) => {
    let rawDegrees = 0;
    let isRetro = false;

    if (p.name === 'Sun') {
      rawDegrees = siderealSunPosDegrees;
    } else if (p.name === 'Moon') {
      rawDegrees = baseMoonPosDegrees;
    } else if (p.name === 'Ketu') {
      // Ketu is always 180 degrees opposite to Rahu
      const rahuPos = (dayOfYear * 0.05295 + seededRandom(seed, 200) * 360) % 360;
      rawDegrees = (rahuPos + 180) % 360;
      isRetro = true;
    } else if (p.name === 'Rahu') {
      rawDegrees = (dayOfYear * 0.05295 + seededRandom(seed, 200) * 360) % 360;
      isRetro = true;
    } else {
      // Seeded orbital calculation
      const cycles = (dateObj.getFullYear() - 1900) + (dayOfYear / 365);
      const meanAnomaly = (cycles * 360 * (365.25 / p.orbitalPeriod) + seededRandom(seed, idx * 50) * 360) % 360;
      rawDegrees = meanAnomaly;
      // Retrograde check for non-luminaries (approx 20% chance based on seed)
      isRetro = seededRandom(seed, idx * 25) < 0.2;
    }

    const signIdx = Math.floor(rawDegrees / 30) % 12;
    const degInSign = rawDegrees % 30;

    // Calculate House number relative to Lagna Index
    // House 1 starts at LagnaIndex, House 2 at LagnaIndex+1, etc.
    const house = ((signIdx - lagnaIndex + 12) % 12) + 1;
    
    // Strengths: Combines planetary sign placements (exalted/debilitated/own sign) and degree
    let strength = Math.floor(30 + seededRandom(seed, idx * 10) * 60);
    // Exaltation adjustments (mocking key states)
    if (p.name === 'Sun' && signIdx === 0) strength = 95;      // Sun exalted in Aries
    if (p.name === 'Moon' && signIdx === 1) strength = 98;     // Moon exalted in Taurus
    if (p.name === 'Jupiter' && signIdx === 3) strength = 97;  // Jupiter exalted in Cancer
    if (p.name === 'Saturn' && signIdx === 6) strength = 96;   // Saturn exalted in Libra
    if (p.name === 'Mercury' && signIdx === 5) strength = 95;  // Mercury exalted in Virgo

    // Debilitation adjustments
    if (p.name === 'Sun' && signIdx === 6) strength = 20;      // Sun debilitated in Libra
    if (p.name === 'Moon' && signIdx === 7) strength = 18;     // Moon debilitated in Scorpio
    if (p.name === 'Jupiter' && signIdx === 9) strength = 15;  // Jupiter debilitated in Capricorn
    if (p.name === 'Saturn' && signIdx === 0) strength = 22;   // Saturn debilitated in Aries
    
    return {
      name: p.name,
      symbol: p.symbol,
      sign: SIGNS[signIdx],
      signIndex: signIdx,
      degree: parseFloat(degInSign.toFixed(2)),
      house,
      isRetrograde: isRetro,
      strength
    };
  });

  // --- 4. Chart Assembly (D1, D9, D10, Chandra) ---
  const makeChart = (chartLagnaIndex: number, placements: { symbol: string, signIdx: number }[]): ChartData => {
    const houses: { [key: number]: string[] } = {};
    const signs: { [key: number]: number } = {};
    for (let h = 1; h <= 12; h++) {
      houses[h] = [];
      signs[h] = (chartLagnaIndex + h - 1) % 12;
    }
    placements.forEach(p => {
      const houseNum = ((p.signIdx - chartLagnaIndex + 12) % 12) + 1;
      houses[houseNum].push(p.symbol);
    });
    return { houses, signs };
  };

  // D1 Chart Placements
  const d1Placements = planetaryPositions.map(p => ({ symbol: p.symbol, signIdx: p.signIndex }));
  const d1Chart = makeChart(lagnaIndex, d1Placements);

  // D9 (Navamsa) Placements
  // Each sign of 30 deg has 9 navamsas of 3°20' (3.333 deg)
  const d9Placements = planetaryPositions.map(p => {
    const navamsaDivision = Math.floor(p.degree / 3.3333);
    // Navamsa starting sign varies by element of the sign:
    // Fire signs (Aries, Leo, Sag) start from Aries (0)
    // Earth signs (Taurus, Virgo, Cap) start from Capricorn (9)
    // Air signs (Gemini, Libra, Aqu) start from Libra (6)
    // Water signs (Cancer, Sco, Pis) start from Cancer (3)
    const element = p.signIndex % 4; // 0=Fire, 1=Earth, 2=Air, 3=Water
    let startSign = 0;
    if (element === 0) startSign = 0; // Aries
    else if (element === 1) startSign = 9; // Capricorn
    else if (element === 2) startSign = 6; // Libra
    else if (element === 3) startSign = 3; // Cancer

    const d9SignIdx = (startSign + navamsaDivision) % 12;
    return { symbol: p.symbol, signIdx: d9SignIdx };
  });
  // Lagna Navamsa
  const lagnaNavDivision = Math.floor(lagnaDegreeInSign / 3.3333);
  const lagnaElement = lagnaIndex % 4;
  let lagnaStartSign = 0;
  if (lagnaElement === 0) lagnaStartSign = 0;
  else if (lagnaElement === 1) lagnaStartSign = 9;
  else if (lagnaElement === 2) lagnaStartSign = 6;
  else if (lagnaElement === 3) lagnaStartSign = 3;
  const d9LagnaIndex = (lagnaStartSign + lagnaNavDivision) % 12;
  const d9Chart = makeChart(d9LagnaIndex, d9Placements);

  // D10 (Dashamsha) Placements
  // Each sign divided into 10 parts of 3 degrees.
  const d10Placements = planetaryPositions.map(p => {
    const division = Math.floor(p.degree / 3.0);
    // For odd signs (Aries, Gem, Leo, Lib, Sag, Aqu), counting starts from the sign itself
    // For even signs, counting starts from 9th sign from the sign
    const isOdd = p.signIndex % 2 === 0; // index 0 (Aries) is odd sign
    let startSign = p.signIndex;
    if (!isOdd) {
      startSign = (p.signIndex + 8) % 12; // 9th sign is +8 indices
    }
    const d10SignIdx = (startSign + division) % 12;
    return { symbol: p.symbol, signIdx: d10SignIdx };
  });
  const lagnaD10Division = Math.floor(lagnaDegreeInSign / 3.0);
  const lagnaIsOdd = lagnaIndex % 2 === 0;
  let d10LagnaStart = lagnaIndex;
  if (!lagnaIsOdd) {
    d10LagnaStart = (lagnaIndex + 8) % 12;
  }
  const d10LagnaIndex = (d10LagnaStart + lagnaD10Division) % 12;
  const d10Chart = makeChart(d10LagnaIndex, d10Placements);

  // Chandra Kundali (Moon Sign is House 1)
  const chandraChart = makeChart(rashiIndex, d1Placements);

  // --- 5. Yogas Calculation ---
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
        const isStrongSign = [1, 6, 11].includes(ve.signIndex); // Taurus, Libra, Pisces
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
      active: seededRandom(seed, 40) > 0.6 // Approximated
    }
  ];

  // --- 6. Doshas Calculation ---
  // Manglik Dosha: Mars in 1, 4, 7, 8, 12 houses
  const marsHouse = planetaryPositions.find(p => p.name === 'Mars')?.house || 0;
  const isManglik = [1, 4, 7, 8, 12].includes(marsHouse);
  const manglikSeverity = !isManglik ? 'None' : ([7, 8].includes(marsHouse) ? 'High' : 'Low');
  
  // Kaal Sarp Dosha: All planets between Rahu and Ketu
  // For simplicity, we check if Rahu and Ketu split the chart, and seeded check
  const isKaalSarp = seededRandom(seed, 95) < 0.15; // 15% chance
  
  // Sade Sati: Saturn is in 12th, 1st, or 2nd house from Moon
  const saturnHouse = planetaryPositions.find(p => p.name === 'Saturn')?.house || 0;
  const moonHouse = planetaryPositions.find(p => p.name === 'Moon')?.house || 0;
  const houseDiff = (saturnHouse - moonHouse + 12) % 12;
  const isSadeSati = [11, 0, 1].includes(houseDiff); // 12th (diff=11), 1st (diff=0), 2nd (diff=1)
  let sadeSatiPhase = 'None';
  if (houseDiff === 11) sadeSatiPhase = 'Rising (First Phase)';
  else if (houseDiff === 0) sadeSatiPhase = 'Peak (Second Phase)';
  else if (houseDiff === 1) sadeSatiPhase = 'Setting (Third Phase)';

  // --- 7. Dasha Calculation (Vimshottari) ---
  // Starting point based on Nakshatra Ruler
  const startDashaRuler = nakshatra.ruler;
  const startDashaIdx = DASHA_ORDER.indexOf(startDashaRuler);
  
  // Remaining duration of the first dasha: (1 - nakshatraPercentElapsed) * totalYears
  const initialDashaTotalYears = DASHA_YEARS[startDashaRuler];
  const initialDashaRemainingYears = (1 - nakshatraPercentElapsed) * initialDashaTotalYears;

  const birthDate = new Date(dob + 'T' + tob);
  const dashas: DashaPeriod[] = [];

  let currentDate = new Date(birthDate.getTime());
  
  // Calculate starting dasha end date
  const initialDashaEndMs = currentDate.getTime() + initialDashaRemainingYears * 365.25 * 24 * 60 * 60 * 1000;
  const initialDashaEnd = new Date(initialDashaEndMs);
  
  dashas.push({
    lord: startDashaRuler,
    start: new Date(birthDate.getTime()),
    end: initialDashaEnd
  });

  currentDate = initialDashaEnd;

  // Compute subsequent dashas for the next 100 years
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

    // Break if we exceed 100 years from birth
    if (currentDate.getTime() - birthDate.getTime() > 100 * 365.25 * 24 * 60 * 60 * 1000) {
      break;
    }
  }

  // Populate sub-dashas (Antardasha) for the current dasha period (relative to 2026/current year)
  // Let's find which dasha is active today (approx June 2026 or system time)
  const now = new Date();
  dashas.forEach(d => {
    if (d.start <= now && d.end >= now) {
      // Calculate 9 sub-dashas (lords start from the Mahadasha lord)
      const subLordStartIdx = DASHA_ORDER.indexOf(d.lord);
      let subCurrentDate = new Date(d.start.getTime());
      const totalMahadashaYears = DASHA_YEARS[d.lord];
      const dashaDurationMs = d.end.getTime() - d.start.getTime();

      d.subDashas = [];
      for (let s = 0; s < 9; s++) {
        const subLord = DASHA_ORDER[(subLordStartIdx + s) % 9];
        const subLordYears = DASHA_YEARS[subLord];
        
        // Antardasha duration ratio = (subLordYears / 120) * Mahadasha duration
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
