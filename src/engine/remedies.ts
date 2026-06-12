// Alternative Remedies Engine (Lal Kitab, Spiritual, Rudraksha)
import { KundaliResult } from './astrology';

export interface LalKitabRemedy {
  title: string;
  remedy: string;
  category: 'Donation' | 'Charity' | 'Behavioral' | 'Feed Animals';
}

export interface RudrakshaRecommendation {
  mukhi: string;
  rulingPlanet: string;
  benefits: string;
  wearingInstructions: string;
}

export interface SpiritualRemedy {
  mantraName: string;
  mantraText: string;
  translation: string;
  japaCount: number;
  yantraName: string;
  yantraDesc: string;
}

export const RUDRAKSHA_DATABASE: { [key: string]: RudrakshaRecommendation } = {
  Sun: {
    mukhi: '1 Mukhi (One-Faced) or 12 Mukhi',
    rulingPlanet: 'Sun',
    benefits: 'Boosts leadership, self-confidence, administrative powers, and alleviates eye, heart, or bone ailments.',
    wearingInstructions: 'String in red thread, wash in raw milk on Sunday morning, chant "Om Hreem Namah" 108 times, and wear around the neck.'
  },
  Moon: {
    mukhi: '2 Mukhi (Two-Faced)',
    rulingPlanet: 'Moon',
    benefits: 'Enhances mental peace, emotional stability, family relations, and cures sleep issues or cold.',
    wearingInstructions: 'String in white silk thread, wash in raw milk on Monday morning, chant "Om Namah" 108 times, and wear.'
  },
  Jupiter: {
    mukhi: '5 Mukhi (Five-Faced)',
    rulingPlanet: 'Jupiter',
    benefits: 'Brings wisdom, academic growth, mental clarity, and spiritual progress. It regulates blood pressure.',
    wearingInstructions: 'String in yellow thread, wash in raw milk on Thursday morning, chant "Om Hreem Namah" 108 times, and wear.'
  },
  Rahu: {
    mukhi: '8 Mukhi (Eight-Faced)',
    rulingPlanet: 'Rahu',
    benefits: 'Removes sudden failures, increases stock market luck, clears confusion, and shields against evil eye.',
    wearingInstructions: 'String in black thread on Saturday evening, wash in raw milk, chant "Om Hum Namah" 108 times, and wear.'
  },
  Mercury: {
    mukhi: '4 Mukhi (Four-Faced)',
    rulingPlanet: 'Mercury',
    benefits: 'Improves communication, memory, IQ, public speaking skills, and relieves skin diseases.',
    wearingInstructions: 'String in green or white thread on Wednesday morning, chant "Om Hreem Namah" 108 times, and wear.'
  },
  Venus: {
    mukhi: '6 Mukhi (Six-Faced)',
    rulingPlanet: 'Venus',
    benefits: 'Brings attraction, artistic skills, marital harmony, comfort, luxury, and controls diabetes.',
    wearingInstructions: 'String in red or white thread on Friday morning, wash in milk, chant "Om Hreem Hum Namah" 108 times, and wear.'
  },
  Ketu: {
    mukhi: '9 Mukhi (Nine-Faced)',
    rulingPlanet: 'Ketu',
    benefits: 'Enhances inner voice, saves from unforeseen dangers, removes phobias, and grants spiritual height.',
    wearingInstructions: 'String in red thread on Tuesday morning or Saturday evening, chant "Om Hreem Hum Namah" 108 times, and wear.'
  },
  Saturn: {
    mukhi: '7 Mukhi (Seven-Faced)',
    rulingPlanet: 'Saturn',
    benefits: 'Attracts wealth, stabilizes career, cures chronic joint pains, and relieves Sade Sati effects.',
    wearingInstructions: 'String in black or silver thread on Saturday morning, chant "Om Hum Namah" 108 times, and wear.'
  },
  Mars: {
    mukhi: '3 Mukhi (Three-Faced)',
    rulingPlanet: 'Mars',
    benefits: 'Fosters courage, cures blood disorders, boosts energy, and removes laziness or depression.',
    wearingInstructions: 'String in red thread on Tuesday morning, wash in milk, chant "Om Kleem Namah" 108 times, and wear.'
  }
};

export function getLalKitabRemedies(kundali: KundaliResult): LalKitabRemedy[] {
  const remedies: LalKitabRemedy[] = [];
  const planetsMap = new Map(kundali.planetaryPositions.map(p => [p.name, p]));

  // Default Lal Kitab remedies based on placements
  const sun = planetsMap.get('Sun');
  if (sun && sun.house === 7) {
    remedies.push({
      title: 'Sun in 7th House Remedy',
      remedy: 'Keep a bowl of fresh water on the bedside table at night and pour it in a flower pot in the morning. Avoid building house facing south.',
      category: 'Behavioral'
    });
  }

  const moon = planetsMap.get('Moon');
  if (moon && moon.house === 6) {
    remedies.push({
      title: 'Moon in 6th House Remedy',
      remedy: 'Avoid offering free milk or sweets to anyone. Instead, serve water/milk to travelers or guests without taking money.',
      category: 'Behavioral'
    });
  }

  const mars = planetsMap.get('Mars');
  if (mars && [1, 4, 7, 8, 12].includes(mars.house)) {
    remedies.push({
      title: 'Manglik Placement Feed',
      remedy: 'Feed sweet rotis (cooked with sugar/jaggery) to stray dogs on Tuesdays. Do not accept gift items made of copper or iron.',
      category: 'Feed Animals'
    });
  }

  const saturn = planetsMap.get('Saturn');
  if (saturn && [6, 8, 12].includes(saturn.house)) {
    remedies.push({
      title: 'Saturn Shadow Donation',
      remedy: 'Pour mustard oil in a bowl, look at your reflection (Chhaya Daan), and donate the oil to a temple or a needy person on Saturday.',
      category: 'Donation'
    });
  }

  // Base remedies depending on weakest planets
  const weakestPlanet = [...kundali.planetaryPositions].sort((a, b) => a.strength - b.strength)[0];
  if (weakestPlanet) {
    if (weakestPlanet.name === 'Sun') {
      remedies.push({
        title: 'Sun Strengthening Charity',
        remedy: 'Donate wheat, copper vessels, or red cloth to a temple on Sundays.',
        category: 'Donation'
      });
    } else if (weakestPlanet.name === 'Moon') {
      remedies.push({
        title: 'Moon Peace Action',
        remedy: 'Feed milk to white cows or serve water to thirsty people. Keep silver coin in your wallet.',
        category: 'Feed Animals'
      });
    } else if (weakestPlanet.name === 'Jupiter') {
      remedies.push({
        title: 'Jupiter Knowledge Donation',
        remedy: 'Donate yellow items (chana dal, turmeric, bananas) or religious books to elderly priests on Thursdays.',
        category: 'Donation'
      });
    } else if (weakestPlanet.name === 'Mercury') {
      remedies.push({
        title: 'Mercury Green Feed',
        remedy: 'Feed green grass or spinach to cows on Wednesdays. Grow broad-leaved plants at home.',
        category: 'Feed Animals'
      });
    } else if (weakestPlanet.name === 'Venus') {
      remedies.push({
        title: 'Venus Charity',
        remedy: 'Donate white clothes, rice, or ghee to women on Fridays. Feed sweet food to black cows.',
        category: 'Charity'
      });
    } else if (weakestPlanet.name === 'Saturn') {
      remedies.push({
        title: 'Saturn Service',
        remedy: 'Serve physically challenged people or donate black blankets, mustard oil, or iron items on Saturdays.',
        category: 'Charity'
      });
    } else if (weakestPlanet.name === 'Mars') {
      remedies.push({
        title: 'Mars Strength Feed',
        remedy: 'Feed monkeys with boiled grams or jaggery on Tuesdays. Support siblings.',
        category: 'Feed Animals'
      });
    }
  }

  // Standard Lal Kitab general guidelines
  remedies.push({
    title: 'Universal Lal Kitab Wisdom',
    remedy: 'Respect elders, clean the home threshold daily, feed birds, and avoid keeping rusted iron tools on the terrace.',
    category: 'Behavioral'
  });

  return remedies;
}

export function getSpiritualRemedies(kundali: KundaliResult): SpiritualRemedy[] {
  const remedies: SpiritualRemedy[] = [];
  const weakestPlanet = [...kundali.planetaryPositions].sort((a, b) => a.strength - b.strength)[0];

  const mantras: { [key: string]: { text: string; trans: string; count: number } } = {
    Sun: {
      text: 'Om Ghrinih Suryaya Namah',
      trans: 'I bow to the Sun God, the giver of light, heat, and life.',
      count: 108
    },
    Moon: {
      text: 'Om Som Somaya Namah',
      trans: 'I salute the Moon God, the lord of emotions and peace.',
      count: 108
    },
    Mars: {
      text: 'Om Ang Angarkaya Namah',
      trans: 'Salutations to the fiery Mars, lord of energy and courage.',
      count: 108
    },
    Mercury: {
      text: 'Om Bum Budhaya Namah',
      trans: 'Salutations to Mercury, the planet of intellect and communications.',
      count: 108
    },
    Jupiter: {
      text: 'Om Brim Brihaspataye Namah',
      trans: 'Obeisance to Jupiter, the preceptor of gods, wisdom, and wealth.',
      count: 108
    },
    Venus: {
      text: 'Om Shum Shukraya Namah',
      trans: 'Obeisance to Venus, the teacher of demons, beauty, and luxury.',
      count: 108
    },
    Saturn: {
      text: 'Om Sham Shanaishcharaya Namah',
      trans: 'I bow to Saturn, the lord of justice, karma, and time.',
      count: 108
    },
    Rahu: {
      text: 'Om Ram Rahave Namah',
      trans: 'I bow to Rahu, who brings sudden transformations and wisdom.',
      count: 108
    },
    Ketu: {
      text: 'Om Kem Ketave Namah',
      trans: 'I bow to Ketu, the lord of liberation, spirituality, and analysis.',
      count: 108
    }
  };

  const planet = weakestPlanet?.name || 'Jupiter';
  const m = mantras[planet] || mantras['Jupiter'];

  remedies.push({
    mantraName: `${planet} Beej Mantra`,
    mantraText: m.text,
    translation: m.trans,
    japaCount: m.count,
    yantraName: `${planet} Yantra`,
    yantraDesc: `Draw a geometric 3x3 numeric grid corresponding to ${planet} on copper plate or paper. Worship daily with incense and offer yellow/red flowers.`
  });

  // Add Maha Mrityunjaya Mantra as universal remedy
  remedies.push({
    mantraName: 'Maha Mrityunjaya Mantra',
    mantraText: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam | Urvarukamiva Bandhanan Mrityor Mukshiya Mamritat',
    translation: 'We worship the three-eyed Lord Shiva, who is fragrant and nourishes all. May He liberate us from death, like a ripe cucumber falls from its vine, and guide us to immortality.',
    japaCount: 108,
    yantraName: 'Shree Yantra',
    yantraDesc: 'The cosmic geometric yantra of Goddess Lalitha Tripurasundari representing the universe. Keep in the East direction of your home and chant.'
  });

  return remedies;
}

export function recommendRudraksha(kundali: KundaliResult): RudrakshaRecommendation[] {
  // Recommend Rudraksha based on weak planets or Rashi Ruler
  const sortedPlanets = [...kundali.planetaryPositions].sort((a, b) => a.strength - b.strength);
  const weakest = sortedPlanets[0]?.name || 'Jupiter';
  const secondWeakest = sortedPlanets[1]?.name || 'Mercury';

  return [
    RUDRAKSHA_DATABASE[weakest],
    RUDRAKSHA_DATABASE[secondWeakest]
  ].filter(Boolean);
}
