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
const DASHA_YEARS = {
  Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
};

function calculateKundali(dob, tob, place, lat = 30.9010, lng = 75.8573) {
  const birthDate = new Date(`${dob}T${tob}`);
  const year = birthDate.getFullYear();
  const d = (birthDate.getTime() - 946728000000) / 86400000;
  const ayanamsa = 23.85 + 0.01396 * (year - 2000);
  const L_E = 280.460 + 0.985647 * d;
  const M_E = 357.529 + 0.985600 * d;
  const lambda_S = (L_E + 1.915 * Math.sin(M_E * Math.PI / 180) + 360) % 360;
  
  // Lunar calculation with perturbations
  const rad = Math.PI / 180;
  const L = (218.316 + 13.176396 * d) % 360;
  const M = (134.963 + 13.064993 * d) % 360;
  const Ms = (357.529 + 0.985600 * d) % 360;
  const Ls = (280.460 + 0.985647 * d) % 360;
  const D = (L - Ls + 360) % 360;
  
  const eqCenter = 6.289 * Math.sin(M * rad);
  const evection = 1.274 * Math.sin((2 * D - M) * rad);
  const variation = 0.658 * Math.sin((2 * D) * rad);
  const annualEq = -0.186 * Math.sin(Ms * rad);
  const parallactic = -0.114 * Math.sin(D * rad);
  
  const lambda_Moon = (L + eqCenter + evection + variation + annualEq + parallactic + 360) % 360;
  
  const dayOfYear = Math.floor((birthDate.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
  const sunriseOffsetHours = -0.4 * Math.cos((dayOfYear + 10) * 2 * Math.PI / 365) * Math.cos(lat * Math.PI / 180);
  const sunriseHour = 6.0 + sunriseOffsetHours;
  const [hours, minutes] = tob.split(':').map(Number);
  const birthHour = hours + minutes / 60;
  const timeDifferenceFromSunrise = birthHour - sunriseHour;
  const rotationOffsetDegrees = timeDifferenceFromSunrise * 15;
  const lagnaTropicalDegrees = (lambda_S + rotationOffsetDegrees + 360) % 360;
  const lagnaDegrees = (lagnaTropicalDegrees - ayanamsa + 360) % 360;
  const lagnaIndex = Math.floor(lagnaDegrees / 30) % 12;

  const planetsConfig = [
    { name: 'Sun', symbol: 'Su', a: 1.0 },
    { name: 'Moon', symbol: 'Mo', a: 1.0 },
    { name: 'Mars', symbol: 'Ma', a: 1.5237, L: 355.453, L_rate: 0.524020, M: 19.388, M_rate: 0.524020, C: 10.60 },
    { name: 'Mercury', symbol: 'Me', a: 0.3871, L: 252.250, L_rate: 4.092334, M: 174.796, M_rate: 4.092334, C: 4.75 },
    { name: 'Jupiter', symbol: 'Ju', a: 5.2028, L: 34.404, L_rate: 0.083085, M: 19.650, M_rate: 0.083085, C: 5.55 },
    { name: 'Venus', symbol: 'Ve', a: 0.7233, L: 181.980, L_rate: 1.602130, M: 50.115, M_rate: 1.602130, C: 0.78 },
    { name: 'Saturn', symbol: 'Sa', a: 9.5388, L: 49.944, L_rate: 0.033444, M: 317.020, M_rate: 0.033444, C: 6.35 },
    { name: 'Rahu', symbol: 'Ra', a: 1.0 },
    { name: 'Ketu', symbol: 'Ke', a: 1.0 }
  ];

  const lambda_Rahu = (125.0445 - 0.052953 * d + 360) % 360;
  const lambda_Ketu = (lambda_Rahu + 180) % 360;

  const planetaryPositions = planetsConfig.map((p) => {
    let tropicalLong = 0;
    let isRetro = false;
    if (p.name === 'Sun') {
      tropicalLong = lambda_S;
    } else if (p.name === 'Moon') {
      tropicalLong = lambda_Moon;
    } else if (p.name === 'Rahu') {
      tropicalLong = lambda_Rahu;
      isRetro = true;
    } else if (p.name === 'Ketu') {
      tropicalLong = lambda_Ketu;
      isRetro = true;
    } else if (p.L && p.M && p.L_rate && p.M_rate && p.C) {
      const L_P = p.L + p.L_rate * d;
      const M_P = p.M + p.M_rate * d;
      const helioLong = (L_P + p.C * Math.sin(M_P * Math.PI / 180) + 360) % 360;
      const radS = lambda_S * Math.PI / 180;
      const radP = helioLong * Math.PI / 180;
      const xG = p.a * Math.cos(radP) + Math.cos(radS);
      const yG = p.a * Math.sin(radP) + Math.sin(radS);
      tropicalLong = (Math.atan2(yG, xG) * 180 / Math.PI + 360) % 360;
      const angleDiff = Math.abs(tropicalLong - lambda_S);
      const normDiff = angleDiff > 180 ? 360 - angleDiff : angleDiff;
      if (['Mars', 'Jupiter', 'Saturn'].includes(p.name)) {
        isRetro = normDiff > 115;
      } else {
        const pseudoState = Math.sin((d + 10) * Math.PI / 25);
        isRetro = normDiff < 18 && pseudoState > 0.45;
      }
    }
    const siderealLong = (tropicalLong - ayanamsa + 360) % 360;
    const signIndex = Math.floor(siderealLong / 30) % 12;
    const degree = siderealLong % 30;
    const house = ((signIndex - lagnaIndex + 12) % 12) + 1;
    let strength = 50;
    if (p.name === 'Sun') strength = signIndex === 5 ? 75 : (signIndex === 0 ? 95 : (signIndex === 6 ? 25 : 55));
    else if (p.name === 'Moon') strength = signIndex === 1 ? 95 : (signIndex === 7 ? 20 : 60);
    else if (p.name === 'Mars') strength = signIndex === 9 ? 95 : (signIndex === 3 ? 20 : 50);
    else if (p.name === 'Mercury') strength = signIndex === 5 ? 90 : (signIndex === 11 ? 25 : 65);
    else if (p.name === 'Jupiter') strength = signIndex === 3 ? 98 : (signIndex === 9 ? 15 : 70);
    else if (p.name === 'Venus') strength = signIndex === 11 ? 95 : (signIndex === 5 ? 20 : 55);
    else if (p.name === 'Saturn') strength = signIndex === 6 ? 96 : (signIndex === 0 ? 20 : 45);

    return {
      name: p.name,
      symbol: p.symbol,
      sign: SIGNS[signIndex],
      signIndex,
      degree: parseFloat(degree.toFixed(2)),
      house,
      isRetrograde: isRetro,
      strength
    };
  });

  const moonPos = planetaryPositions.find(p => p.name === 'Moon');
  const rashiIndex = moonPos.signIndex;

  return {
    lagna: SIGNS[lagnaIndex],
    lagnaIndex,
    rashi: SIGNS[rashiIndex],
    rashiIndex,
    planetaryPositions
  };
}

const GEMSTONE_DB = {
  Sun: { name: 'Ruby', hindiName: 'Manik', planet: 'Sun' },
  Moon: { name: 'Pearl', hindiName: 'Moti', planet: 'Moon' },
  Mars: { name: 'Red Coral', hindiName: 'Moonga', planet: 'Mars' },
  Mercury: { name: 'Emerald', hindiName: 'Panna', planet: 'Mercury' },
  Jupiter: { name: 'Yellow Sapphire', hindiName: 'Pukhraj', planet: 'Jupiter' },
  Venus: { name: 'Diamond / White Sapphire', hindiName: 'Heera / Safed Pukhraj', planet: 'Venus' },
  Saturn: { name: 'Blue Sapphire', hindiName: 'Neelam', planet: 'Saturn' },
  Rahu: { name: 'Hessonite', hindiName: 'Gomed', planet: 'Rahu' },
  Ketu: { name: 'Cat\'s Eye', hindiName: 'Lehsuniya', planet: 'Ketu' }
};

const LAGNA_RULES = {
  Aries: { benefics: ['Sun', 'Jupiter', 'Mars'], malefics: ['Mercury', 'Venus', 'Saturn'], neutrals: ['Moon'] },
  Taurus: { benefics: ['Venus', 'Mercury'], yogakaraka: 'Saturn', malefics: ['Jupiter', 'Moon', 'Mars'], neutrals: ['Sun'] },
  Gemini: { benefics: ['Mercury', 'Venus'], malefics: ['Mars', 'Jupiter', 'Sun'], neutrals: ['Moon', 'Saturn'] },
  Cancer: { benefics: ['Moon', 'Jupiter'], yogakaraka: 'Mars', malefics: ['Mercury', 'Venus', 'Saturn'], neutrals: ['Sun'] },
  Leo: { benefics: ['Sun', 'Jupiter'], yogakaraka: 'Mars', malefics: ['Mercury', 'Venus', 'Saturn'], neutrals: ['Moon'] },
  Virgo: { benefics: ['Mercury', 'Venus'], malefics: ['Mars', 'Jupiter', 'Moon'], neutrals: ['Sun', 'Saturn'] },
  Libra: { benefics: ['Venus', 'Mercury'], yogakaraka: 'Saturn', malefics: ['Sun', 'Jupiter', 'Mars'], neutrals: ['Moon'] },
  Scorpio: { benefics: ['Mars', 'Sun', 'Moon', 'Jupiter'], malefics: ['Mercury', 'Venus'], neutrals: ['Saturn'] },
  Sagittarius: { benefics: ['Jupiter', 'Sun', 'Mars'], malefics: ['Mercury', 'Venus', 'Saturn'], neutrals: ['Moon'] },
  Capricorn: { benefics: ['Saturn', 'Mercury'], yogakaraka: 'Venus', malefics: ['Moon', 'Mars', 'Jupiter'], neutrals: ['Sun'] },
  Aquarius: { benefics: ['Saturn'], yogakaraka: 'Venus', malefics: ['Jupiter', 'Moon', 'Mars'], neutrals: ['Sun', 'Mercury'] },
  Pisces: { benefics: ['Jupiter', 'Moon', 'Mars'], malefics: ['Mercury', 'Venus', 'Sun', 'Saturn'], neutrals: [] }
};

function recommendGemstones(kundali) {
  const lagna = kundali.lagna;
  const rules = LAGNA_RULES[lagna] || LAGNA_RULES['Aries'];
  const planetsMap = new Map();
  kundali.planetaryPositions.forEach(p => planetsMap.set(p.name, p));
  const avoidList = [];
  const candidateBenefics = [];
  const lagnaLordMap = {
    Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon', Leo: 'Sun', Virgo: 'Mercury',
    Libra: 'Venus', Scorpio: 'Mars', Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter'
  };
  const lagnaLord = lagnaLordMap[lagna];

  planetsMap.forEach((pData, pName) => {
    if (pName === 'Rahu' || pName === 'Ketu') {
      avoidList.push({ stone: GEMSTONE_DB[pName], reason: 'Rahu/Ketu' });
      return;
    }
    const isYogakaraka = rules.yogakaraka === pName;
    const isBenefic = rules.benefics.includes(pName) || pName === lagnaLord || isYogakaraka;
    const isMalefic = rules.malefics.includes(pName);

    const isExalted = (pName === 'Sun' && pData.signIndex === 0) ||
                      (pName === 'Moon' && pData.signIndex === 1) ||
                      (pName === 'Mars' && pData.signIndex === 9) ||
                      (pName === 'Mercury' && pData.signIndex === 5) ||
                      (pName === 'Jupiter' && pData.signIndex === 3) ||
                      (pName === 'Venus' && pData.signIndex === 11) ||
                      (pName === 'Saturn' && pData.signIndex === 6);

    const isOwnSign = (pName === 'Sun' && pData.signIndex === 4) ||
                      (pName === 'Moon' && pData.signIndex === 3) ||
                      (pName === 'Mars' && [0, 7].includes(pData.signIndex)) ||
                      (pName === 'Mercury' && [2, 5].includes(pData.signIndex)) ||
                      (pName === 'Jupiter' && [8, 11].includes(pData.signIndex)) ||
                      (pName === 'Venus' && [1, 6].includes(pData.signIndex)) ||
                      (pName === 'Saturn' && [9, 10].includes(pData.signIndex));

    if (isMalefic) {
      avoidList.push({ stone: GEMSTONE_DB[pName], reason: `${pName} is a Functional Malefic for ${lagna} Ascendant.` });
    } else if ((pData.house === 6 || pData.house === 8 || pData.house === 12) && !(isExalted || isOwnSign)) {
      avoidList.push({ stone: GEMSTONE_DB[pName], reason: `Although ${pName} is beneficial, it is placed in the negative ${pData.house}th house.` });
    } else if (isBenefic) {
      let score = 50;
      let reason = '';
      if (isYogakaraka) { score += 30; reason += `Yogakaraka planet for ${lagna} Lagna. `; }
      if (pName === lagnaLord) { score += 25; reason += `Lagna Lord (Ascendant Ruler). `; }
      
      if (isExalted || isOwnSign) {
        score += 15;
        reason += `${pName} is strong by being exalted or in its own sign. `;
      }

      if (pData.strength < 50) {
        score += 20; reason += `Needs strength (Planetary strength is low at ${pData.strength}%). `;
      } else {
        score += 5; reason += `Strong beneficial planet (${pData.strength}% strength). `;
      }
      candidateBenefics.push({ planet: pName, score, reason });
    }
  });

  candidateBenefics.sort((a, b) => b.score - a.score);

  return {
    lagna,
    positions: kundali.planetaryPositions.map(p => ({ name: p.name, house: p.house, sign: p.sign, strength: p.strength })),
    candidateBenefics,
    avoidList: avoidList.map(a => a.stone.planet)
  };
}

const res = calculateKundali('2005-10-03', '07:55', 'Ludhiana');
console.log(JSON.stringify(recommendGemstones(res), null, 2));
