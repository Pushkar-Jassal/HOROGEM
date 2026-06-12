// Numerology Calculation Engine

export interface NumerologyResult {
  birthNumber: number; // Mulank
  birthDescription: string;
  destinyNumber: number; // Bhagyank
  destinyDescription: string;
  nameNumber: number; // Namank
  nameDescription: string;
  rulingPlanet: string;
  luckyGemstone: string;
}

// Chaldean Numerology Value Map
const CHALDEAN_MAP: { [key: string]: number } = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  p: 8, f: 8
};

const PLANET_MAP: { [key: number]: { planet: string; gemstone: string; desc: string } } = {
  1: {
    planet: 'Sun',
    gemstone: 'Ruby (Manik)',
    desc: 'Represents leadership, authority, independence, and strong willpower. Ruled by the Sun, individuals are ambitious and creative.'
  },
  2: {
    planet: 'Moon',
    gemstone: 'Pearl (Moti)',
    desc: 'Represents diplomacy, cooperation, emotion, and artistic flair. Ruled by the Moon, individuals are intuitive and peace-loving.'
  },
  3: {
    planet: 'Jupiter',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    desc: 'Represents wisdom, optimism, expansion, and knowledge. Ruled by Jupiter, individuals are natural teachers and excellent communicators.'
  },
  4: {
    planet: 'Rahu',
    gemstone: 'Hessonite (Gomed)',
    desc: 'Represents innovation, rebellion, sudden shifts, and high intellect. Ruled by Rahu, individuals are unconventional and out-of-the-box thinkers.'
  },
  5: {
    planet: 'Mercury',
    gemstone: 'Emerald (Panna)',
    desc: 'Represents quick wit, communication, adaptability, and trade. Ruled by Mercury, individuals are versatile, fast learners, and social.'
  },
  6: {
    planet: 'Venus',
    gemstone: 'Diamond / White Sapphire',
    desc: 'Represents beauty, love, harmony, and luxury. Ruled by Venus, individuals are artistic, charming, and value relationships deeply.'
  },
  7: {
    planet: 'Ketu',
    gemstone: 'Cat\'s Eye (Lehsuniya)',
    desc: 'Represents spirituality, mysticism, research, and analysis. Ruled by Ketu, individuals are deep thinkers, intuitive, and seek inner truth.'
  },
  8: {
    planet: 'Saturn',
    gemstone: 'Blue Sapphire (Neelam)',
    desc: 'Represents karma, discipline, patience, and hard work. Ruled by Saturn, individuals are highly organized, realistic, and face trials that lead to major achievements.'
  },
  9: {
    planet: 'Mars',
    gemstone: 'Red Coral (Moonga)',
    desc: 'Represents courage, energy, passion, and combativeness. Ruled by Mars, individuals are fighters, protective, and excel in sports or leadership.'
  }
};

// Helper to sum digits until a single digit is reached (unless 11 or 22 in some systems, but standard is 1-9 in Vedic)
export function reduceToSingleDigit(num: number): number {
  let val = num;
  while (val > 9) {
    val = String(val)
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  return val;
}

export function calculateNumerology(dob: string, fullName: string): NumerologyResult {
  // Extract Day, Month, Year
  const [yearStr, monthStr, dayStr] = dob.split('-');
  const birthDay = Number(dayStr);
  
  // 1. Birth Number (Mulank)
  const birthNumber = reduceToSingleDigit(birthDay);
  const birthInfo = PLANET_MAP[birthNumber];

  // 2. Destiny Number (Bhagyank)
  const allDigits = dob.replace(/-/g, '').split('').map(Number);
  const totalSum = allDigits.reduce((a, b) => a + b, 0);
  const destinyNumber = reduceToSingleDigit(totalSum);
  const destinyInfo = PLANET_MAP[destinyNumber];

  // 3. Name Number (Namank)
  const cleanedName = fullName.toLowerCase().replace(/[^a-z]/g, '');
  let nameSum = 0;
  for (let i = 0; i < cleanedName.length; i++) {
    const char = cleanedName[i];
    nameSum += CHALDEAN_MAP[char] || 0;
  }
  const nameNumber = reduceToSingleDigit(nameSum || 9); // Fallback to 9 if empty name
  const nameInfo = PLANET_MAP[nameNumber];

  return {
    birthNumber,
    birthDescription: birthInfo.desc,
    destinyNumber,
    destinyDescription: destinyInfo.desc,
    nameNumber,
    nameDescription: nameInfo.desc,
    rulingPlanet: birthInfo.planet,
    luckyGemstone: birthInfo.gemstone
  };
}
