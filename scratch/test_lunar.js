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
  
  // Ayanamsa
  const ayanamsa = 23.85 + 0.01396 * (year - 2000);
  
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
  
  const siderealLong = (lambda_Moon - ayanamsa + 360) % 360;
  const signIndex = Math.floor(siderealLong / 30) % 12;
  const degree = siderealLong % 30;
  
  const totalMoonSiderealDegrees = signIndex * 30 + degree;
  const nakshatraIndex = Math.floor(totalMoonSiderealDegrees / 13.33333) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const nakshatraPercentElapsed = (totalMoonSiderealDegrees % 13.33333) / 13.33333;

  const startDashaRuler = nakshatra.ruler;
  const startDashaIdx = DASHA_ORDER.indexOf(startDashaRuler);
  const initialDashaTotalYears = DASHA_YEARS[startDashaRuler];
  
  // Subtracting the elapsed years from the total years
  const initialDashaRemainingYears = (1 - nakshatraPercentElapsed) * initialDashaTotalYears;

  const dashas = [];
  let currentDate = new Date(birthDate.getTime());
  
  // Vimshottari chronology:
  // Convert remaining years to milliseconds
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
  }

  return {
    moonTropical: lambda_Moon,
    moonSidereal: siderealLong,
    nakshatra: nakshatra.name,
    percentElapsed: nakshatraPercentElapsed,
    dashaStartRuler: startDashaRuler,
    dashas: dashas.map(d => ({
      lord: d.lord,
      start: d.start.toISOString().split('T')[0],
      end: d.end.toISOString().split('T')[0]
    }))
  };
}

console.log(JSON.stringify(calculateKundali('2005-10-03', '07:55', 'Ludhiana'), null, 2));
