// Gemstone Recommendation Engine
import { KundaliResult, PlanetPosition } from './astrology';

export interface Gemstone {
  name: string;
  hindiName: string;
  planet: string;
  metal: string;
  finger: string;
  day: string;
  weightRange: string;
  mantra: string;
  benefits: string[];
  sideEffects: string[];
  wearingMethod: string;
}

export interface RecommendationOutput {
  primary: Gemstone;
  primaryReason: string;
  secondary?: Gemstone;
  secondaryReason: string;
  tertiary?: Gemstone;
  tertiaryReason: string;
  avoid: { stone: Gemstone; reason: string }[];
}

export const GEMSTONE_DB: { [key: string]: Gemstone } = {
  Sun: {
    name: 'Ruby',
    hindiName: 'Manik',
    planet: 'Sun',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    day: 'Sunday morning',
    weightRange: '5 - 7 Carats',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    benefits: [
      'Boosts leadership qualities and self-confidence.',
      'Enhances authority, power, and administrative skills.',
      'Improves cardiovascular health and bone vitality.',
      'Brings public recognition and honor.'
    ],
    sideEffects: [
      'Can cause mild arrogance or short temper if unsuitable.',
      'May lead to increased body heat or insomnia.'
    ],
    wearingMethod: 'Wash the ring in Ganga water or unboiled milk on Sunday morning. Perform prayers, chant the Sun Mantra 108 times, and wear the ring on the ring finger of your right hand.'
  },
  Moon: {
    name: 'Pearl',
    hindiName: 'Moti',
    planet: 'Moon',
    metal: 'Silver',
    finger: 'Little Finger',
    day: 'Monday morning',
    weightRange: '5 - 8 Carats',
    mantra: 'Om Shram Shreem Shroum Sah Chandraya Namah',
    benefits: [
      'Calms the mind and controls emotional turbulence.',
      'Improves memory, concentration, and clarity.',
      'Enhances maternal relations and domestic peace.',
      'Helps manage water-related health issues and sleep.'
    ],
    sideEffects: [
      'May cause excessive emotional sensitivity or cold/cough if unsuitable.',
      'Can lead to lethargy or mood swings.'
    ],
    wearingMethod: 'Purify the pearl ring with raw milk and honey on Monday morning. Recite the Moon Mantra 108 times and wear it on the little finger of the working hand.'
  },
  Mars: {
    name: 'Red Coral',
    hindiName: 'Moonga',
    planet: 'Mars',
    metal: 'Gold or Copper',
    finger: 'Ring Finger',
    day: 'Tuesday morning',
    weightRange: '6 - 8 Carats',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    benefits: [
      'Instills immense courage, energy, and physical strength.',
      'Helps overcome obstacles and defeat adversaries.',
      'Assists in property and real estate ventures.',
      'Improves blood circulation and muscle vitality.'
    ],
    sideEffects: [
      'Can trigger aggression, arguments, and relationship friction.',
      'Might lead to high blood pressure or accident-prone states.'
    ],
    wearingMethod: 'Soak the coral ring in unboiled milk and holy water. On Tuesday morning after sunrise, recite the Mars Mantra 108 times and wear it on the ring finger.'
  },
  Mercury: {
    name: 'Emerald',
    hindiName: 'Panna',
    planet: 'Mercury',
    metal: 'Gold or Silver',
    finger: 'Little Finger',
    day: 'Wednesday morning',
    weightRange: '5 - 7 Carats',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namah',
    benefits: [
      'Significantly enhances intellect, speech, and communication.',
      'Supports business growth, trading, and arithmetic skills.',
      'Improves skin, speech clarity, and nervous coordination.',
      'Fosters creative thinking and academic excellence.'
    ],
    sideEffects: [
      'Could cause distraction, stammering, or skin allergies if incompatible.',
      'May lead to anxiety and overthinking.'
    ],
    wearingMethod: 'Wash the emerald ring in unboiled milk, then rinse in fresh water. On Wednesday morning, chant the Mercury Mantra 108 times and wear it on the little finger.'
  },
  Jupiter: {
    name: 'Yellow Sapphire',
    hindiName: 'Pukhraj',
    planet: 'Jupiter',
    metal: 'Gold',
    finger: 'Index Finger',
    day: 'Thursday morning',
    weightRange: '4 - 6 Carats',
    mantra: 'Om Gram Greem Groum Sah Gurave Namah',
    benefits: [
      'Attracts immense wealth, wisdom, and spiritual growth.',
      'Promotes educational success, career promotions, and luck.',
      'Ensures happy marital life and children happiness.',
      'Improves liver functions and metabolic vitality.'
    ],
    sideEffects: [
      'Might cause weight gain, laziness, or over-optimism if unsuitable.',
      'Can occasionally trigger liver-heat.'
    ],
    wearingMethod: 'Soak the ring in unboiled milk or honey on Thursday morning. Pray to Lord Jupiter, chant the Guru Mantra 108 times, and wear it on the index finger.'
  },
  Venus: {
    name: 'Diamond / White Sapphire',
    hindiName: 'Heera / Safed Pukhraj',
    planet: 'Venus',
    metal: 'Gold or Platinum',
    finger: 'Middle Finger',
    day: 'Friday morning',
    weightRange: '1 - 2 Carats (Diamond) or 4 - 6 Carats (White Sapphire)',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namah',
    benefits: [
      'Brings luxury, comforts, fame, and artistic success.',
      'Strengthens love affairs, marital bliss, and overall charm.',
      'Improves creative talents and business in luxury goods.',
      'Enhances vital energy and hormonal balance.'
    ],
    sideEffects: [
      'Can lead to extravagance, relation scandals, or reproductive issues if unsuitable.',
      'May cause sudden financial loss due to speculation.'
    ],
    wearingMethod: 'Purify the diamond/white sapphire ring on Friday morning with unboiled milk. Recite the Venus Mantra 108 times and wear it on the middle finger of the right hand.'
  },
  Saturn: {
    name: 'Blue Sapphire',
    hindiName: 'Neelam',
    planet: 'Saturn',
    metal: 'Iron, Silver or White Gold',
    finger: 'Middle Finger',
    day: 'Saturday morning',
    weightRange: '4 - 6 Carats',
    mantra: 'Om Pram Preem Proum Sah Shanaishcharaya Namah',
    benefits: [
      'Brings rapid wealth, windfall profits, and extreme luck if suitable.',
      'Provides high discipline, patience, and professional status.',
      'Offers shielding against negative energies and accidents.',
      'Alleviates long-standing bone and chronic ailments.'
    ],
    sideEffects: [
      'Highly volatile; if unsuitable, can cause immediate losses, accidents, or depression.',
      'May cause nightmares or relationship strain within 72 hours.'
    ],
    wearingMethod: 'Test the stone under your pillow for 3 nights first. If no bad dreams occur, wash the ring in milk and water, chant the Saturn Mantra 108 times on Saturday morning, and wear it on the middle finger.'
  },
  Rahu: {
    name: 'Hessonite',
    hindiName: 'Gomed',
    planet: 'Rahu',
    metal: 'Silver or Panchdhatu',
    finger: 'Middle Finger',
    day: 'Saturday evening',
    weightRange: '5 - 8 Carats',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    benefits: [
      'Helps in politics, stock trading, and high-tech ventures.',
      'Removes confusion and grants sudden insights/success.',
      'Provides protection against sudden diseases and court cases.',
      'Clears mental anxiety and blocks black magic.'
    ],
    sideEffects: [
      'Can cause skin allergies, legal issues, or hallucinations if unsuitable.',
      'May lead to chaotic thoughts and sleep issues.'
    ],
    wearingMethod: 'Wash the Hessonite ring in unboiled milk. On Saturday evening (sunset), chant the Rahu Mantra 108 times and wear the ring on the middle finger.'
  },
  Ketu: {
    name: 'Cat\'s Eye',
    hindiName: 'Lehsuniya',
    planet: 'Ketu',
    metal: 'Silver or Panchdhatu',
    finger: 'Middle Finger',
    day: 'Tuesday evening',
    weightRange: '4 - 7 Carats',
    mantra: 'Om Stram Streem Stroum Sah Ketave Namah',
    benefits: [
      'Fosters spiritual enlightenment and intuitive dreams.',
      'Protects against secret enemies, entities, and bad luck.',
      'Cures skin diseases and helps in healing joint pains.',
      'Bestows unexpected wealth and recovery from debts.'
    ],
    sideEffects: [
      'Can cause high stress, skin rashes, or loss of concentration if incompatible.',
      'Might trigger isolationist tendencies.'
    ],
    wearingMethod: 'Purify the Cat\'s eye ring in milk and water. On Tuesday evening or night, chant the Ketu Mantra 108 times and wear it on the middle finger.'
  }
};

// Vedic Astrology Rules mapping: Lagnas Benefics & Malefics
// 1 = Benefic, 2 = Yogakaraka (Super Benefic), -1 = Malefic, 0 = Neutral
interface LagnaRule {
  benefics: string[];
  yogakaraka?: string;
  malefics: string[];
  neutrals: string[];
}

const LAGNA_RULES: { [key: string]: LagnaRule } = {
  Aries: {
    benefics: ['Sun', 'Jupiter', 'Mars'],
    malefics: ['Mercury', 'Venus', 'Saturn'],
    neutrals: ['Moon']
  },
  Taurus: {
    benefics: ['Venus', 'Mercury'],
    yogakaraka: 'Saturn',
    malefics: ['Jupiter', 'Moon', 'Mars'],
    neutrals: ['Sun']
  },
  Gemini: {
    benefics: ['Mercury', 'Venus'],
    malefics: ['Mars', 'Jupiter', 'Sun'],
    neutrals: ['Moon', 'Saturn']
  },
  Cancer: {
    benefics: ['Moon', 'Jupiter'],
    yogakaraka: 'Mars',
    malefics: ['Mercury', 'Venus', 'Saturn'],
    neutrals: ['Sun']
  },
  Leo: {
    benefics: ['Sun', 'Mars'],
    yogakaraka: 'Jupiter', // Technically Mars is Yogakaraka too, but Ju/Ma both highly benefic
    malefics: ['Mercury', 'Venus', 'Saturn'],
    neutrals: ['Moon']
  },
  Virgo: {
    benefics: ['Mercury', 'Venus'],
    malefics: ['Mars', 'Jupiter', 'Moon'],
    neutrals: ['Sun', 'Saturn']
  },
  Libra: {
    benefics: ['Venus', 'Mercury'],
    yogakaraka: 'Saturn',
    malefics: ['Sun', 'Jupiter', 'Mars'],
    neutrals: ['Moon']
  },
  Scorpio: {
    benefics: ['Mars', 'Sun', 'Moon'],
    yogakaraka: 'Jupiter',
    malefics: ['Mercury', 'Venus'],
    neutrals: ['Saturn']
  },
  Sagittarius: {
    benefics: ['Jupiter', 'Sun', 'Mars'],
    malefics: ['Mercury', 'Venus', 'Saturn'],
    neutrals: ['Moon']
  },
  Capricorn: {
    benefics: ['Saturn', 'Mercury'],
    yogakaraka: 'Venus',
    malefics: ['Moon', 'Mars', 'Jupiter'],
    neutrals: ['Sun']
  },
  Aquarius: {
    benefics: ['Saturn', 'Venus'],
    malefics: ['Jupiter', 'Moon', 'Mars'],
    neutrals: ['Sun', 'Mercury']
  },
  Pisces: {
    benefics: ['Jupiter', 'Moon', 'Mars'],
    malefics: ['Mercury', 'Venus', 'Sun', 'Saturn'],
    neutrals: []
  }
};

export function recommendGemstones(kundali: KundaliResult): RecommendationOutput {
  const lagna = kundali.lagna;
  const rules = LAGNA_RULES[lagna] || LAGNA_RULES['Aries'];
  
  const planetsMap = new Map<string, PlanetPosition>();
  kundali.planetaryPositions.forEach(p => planetsMap.set(p.name, p));

  const avoidList: { stone: Gemstone; reason: string }[] = [];
  const candidateBenefics: { planet: string; score: number; reason: string }[] = [];

  // --- Step 1 & 2: Identify Strong/Weak Benefic Planets ---
  // Lagna Lord is always a candidate
  const lagnaLordMap: { [key: string]: string } = {
    Aries: 'Mars', Taurus: 'Venus', Gemini: 'Mercury', Cancer: 'Moon', Leo: 'Sun', Virgo: 'Mercury',
    Libra: 'Venus', Scorpio: 'Mars', Sagittarius: 'Jupiter', Capricorn: 'Saturn', Aquarius: 'Saturn', Pisces: 'Jupiter'
  };
  const lagnaLord = lagnaLordMap[lagna];
  const lagnaLordData = planetsMap.get(lagnaLord);

  // Analyze each planet
  planetsMap.forEach((pData, pName) => {
    // Rahu and Ketu are generally recommended with extreme caution, and usually avoided unless running Dasha
    if (pName === 'Rahu' || pName === 'Ketu') {
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `Rahu/Ketu gemstones are shadow planet remedies and generally avoided. Suitable only under specific Dasha cycles under expert guidance.`
      });
      return;
    }

    const isYogakaraka = rules.yogakaraka === pName;
    const isBenefic = rules.benefics.includes(pName) || pName === lagnaLord;
    const isMalefic = rules.malefics.includes(pName);

    // Gemstones to Avoid (Malefics or placed in 6, 8, 12 houses)
    if (isMalefic) {
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `${pName} is a Functional Malefic (destructive lord) for ${lagna} Ascendant. Wearing its gemstone can amplify negative traits.`
      });
    } else if (pData.house === 6 || pData.house === 8 || pData.house === 12) {
      // Benefic planet placed in Trik/Dusthana houses (6th, 8th, 12th) - gemstone should be avoided or worn with extreme caution,
      // as it might strengthen the negative houses.
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `Although ${pName} is beneficial, it is placed in the negative ${pData.house}th house. Wearing its gemstone is not recommended.`
      });
    } else if (isBenefic) {
      // Score calculation:
      // Yogakaraka gets boost.
      // Lagna Lord gets boost.
      // Weaker planets (strength < 50) are ranked higher as they need support (Step 2 of algorithm: Identify weak but beneficial planets).
      // Extremely weak planets (strength < 25) might be too weak, but are excellent candidates for gemstones.
      // Strong planets (strength > 75) already give good results, but wearing a gemstone amplifies them further.
      let score = 50;
      let reason = '';

      if (isYogakaraka) {
        score += 30;
        reason += `Yogakaraka planet for ${lagna} Lagna. `;
      }
      if (pName === lagnaLord) {
        score += 25;
        reason += `Lagna Lord (Ascendant Ruler). `;
      }

      if (pData.strength < 50) {
        score += 20; // Strengthing required!
        reason += `Needs strength (Planetary strength is low at ${pData.strength}%). `;
      } else {
        score += 5;
        reason += `Strong beneficial planet (${pData.strength}% strength). `;
      }

      candidateBenefics.push({ planet: pName, score, reason });
    }
  });

  // Sort candidates by score descending
  candidateBenefics.sort((a, b) => b.score - a.score);

  // Select Primary, Secondary, Tertiary
  const primaryPlanet = candidateBenefics[0]?.planet || 'Jupiter';
  const primaryReason = candidateBenefics[0]?.reason || 'Strong Jupiter influence';

  const secondaryPlanet = candidateBenefics[1]?.planet || 'Mercury';
  const secondaryReason = candidateBenefics[1]?.reason || 'Supports Mercury';

  const tertiaryPlanet = candidateBenefics[2]?.planet || 'Moon';
  const tertiaryReason = candidateBenefics[2]?.reason || 'Enhances Moon';

  // Make sure we don't have overlapping avoid list items with the recommended list
  const filteredAvoidList = avoidList.filter(item => 
    item.stone.planet !== primaryPlanet &&
    item.stone.planet !== secondaryPlanet &&
    item.stone.planet !== tertiaryPlanet
  );

  return {
    primary: GEMSTONE_DB[primaryPlanet],
    primaryReason,
    secondary: GEMSTONE_DB[secondaryPlanet],
    secondaryReason,
    tertiary: GEMSTONE_DB[tertiaryPlanet],
    tertiaryReason,
    avoid: filteredAvoidList
  };
}
