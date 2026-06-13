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

function calculateKundali(dob, tob, place, lat = 28.6139, lng = 77.2090) {
  const birthDate = new Date(`${dob}T${tob}`);
  const year = birthDate.getFullYear();
  const d = (birthDate.getTime() - 946728000000) / 86400000;
  const ayanamsa = 23.85 + 0.01396 * (year - 2000);
  const L_E = 280.460 + 0.985647 * d;
  const M_E = 357.529 + 0.985600 * d;
  const lambda_S = (L_E + 1.915 * Math.sin(M_E * Math.PI / 180) + 360) % 360;
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
    { name: 'Moon', symbol: 'Mo', a: 1.0 }
  ];

  const L_Moon = 218.316 + 13.176396 * d;
  const M_Moon = 134.963 + 13.064993 * d;
  const lambda_Moon = (L_Moon + 6.289 * Math.sin(M_Moon * Math.PI / 180) + 360) % 360;

  const planetaryPositions = planetsConfig.map((p) => {
    let tropicalLong = p.name === 'Sun' ? lambda_S : lambda_Moon;
    const siderealLong = (tropicalLong - ayanamsa + 360) % 360;
    const signIndex = Math.floor(siderealLong / 30) % 12;
    const degree = siderealLong % 30;
    return {
      name: p.name,
      signIndex,
      degree
    };
  });

  const moonPos = planetaryPositions.find(p => p.name === 'Moon');
  const rashiIndex = moonPos.signIndex;
  const totalMoonSiderealDegrees = rashiIndex * 30 + moonPos.degree;
  const nakshatraIndex = Math.floor(totalMoonSiderealDegrees / 13.33333) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const nakshatraPercentElapsed = (totalMoonSiderealDegrees % 13.33333) / 13.33333;

  const startDashaRuler = nakshatra.ruler;
  const startDashaIdx = DASHA_ORDER.indexOf(startDashaRuler);
  const initialDashaTotalYears = DASHA_YEARS[startDashaRuler];
  const initialDashaRemainingYears = (1 - nakshatraPercentElapsed) * initialDashaTotalYears;

  const dashas = [];
  let currentDate = new Date(birthDate.getTime());
  const initialDashaEndMs = currentDate.getTime() + initialDashaRemainingYears * 365.25 * 24 * 60 * 60 * 1000;
  const initialDashaEnd = new Date(initialDashaEndMs);

  dashas.push({
    lord: startDashaRuler,
    start: new Date(birthDate.getTime()),
    end: initialDashaEnd,
    remaining: initialDashaRemainingYears
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
      end: dashaEnd,
      years
    });
    currentDate = dashaEnd;
    dashaPointer = (dashaPointer + 1) % 9;
  }

  return {
    moonDeg: totalMoonSiderealDegrees,
    nakshatra: nakshatra.name,
    ruler: nakshatra.ruler,
    percentElapsed: nakshatraPercentElapsed,
    dashas: dashas.map(d => ({
      lord: d.lord,
      start: d.start.toISOString().split('T')[0],
      end: d.end.toISOString().split('T')[0]
    }))
  };
}

console.log(JSON.stringify(calculateKundali('2005-10-03', '07:55', 'Ludhiana'), null, 2));
