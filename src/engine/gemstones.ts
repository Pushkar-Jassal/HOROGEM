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
  alternatives?: string[];
  alternativesHi?: string[];
  basePricePerRatti?: number;
}

export interface RecommendationOutput {
  lifeStone: Gemstone;
  lifeStoneReason: string;
  luckyStone: Gemstone;
  luckyStoneReason: string;
  workStone: Gemstone;
  workStoneReason: string;
  otherStones: { stone: Gemstone; reason: string }[];
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
    wearingMethod: 'Wash the ring in Ganga water or unboiled milk on Sunday morning. Perform prayers, chant the Sun Mantra 108 times, and wear the ring on the ring finger of your right hand.',
    alternatives: ['Red Garnet', 'Red Spinel', 'Rubellite'],
    alternativesHi: ['लाल गार्नेट', 'लाल स्पिनल', 'रूबेलाइट'],
    basePricePerRatti: 2500
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
    wearingMethod: 'Purify the pearl ring with raw milk and honey on Monday morning. Recite the Moon Mantra 108 times and wear it on the little finger of the working hand.',
    alternatives: ['Moonstone', 'White Agate'],
    alternativesHi: ['चन्द्रकान्त मणि (मूनस्टोन)', 'सफेद अकीक'],
    basePricePerRatti: 800
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
    wearingMethod: 'Soak the coral ring in unboiled milk and holy water. On Tuesday morning after sunrise, recite the Mars Mantra 108 times and wear it on the ring finger.',
    alternatives: ['Red Jasper', 'Carnelian'],
    alternativesHi: ['लाल जैस्पर', 'कार्नेलियन'],
    basePricePerRatti: 1200
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
    wearingMethod: 'Wash the emerald ring in unboiled milk, then rinse in fresh water. On Wednesday morning, chant the Mercury Mantra 108 times and wear it on the little finger.',
    alternatives: ['Green Tourmaline', 'Peridot', 'Green Onyx'],
    alternativesHi: ['हरा तुरमली', 'पेरिडॉट', 'हरा ओनिक्स'],
    basePricePerRatti: 3500
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
    wearingMethod: 'Soak the ring in unboiled milk or honey on Thursday morning. Pray to Lord Jupiter, chant the Guru Mantra 108 times, and wear it on the index finger.',
    alternatives: ['Yellow Topaz', 'Citrine', 'Yellow Tourmaline'],
    alternativesHi: ['पीला टोपाज', 'सुनहला (सिट्रीन)', 'पीला तुरमली'],
    basePricePerRatti: 4500
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
    wearingMethod: 'Purify the diamond/white sapphire ring on Friday morning with unboiled milk. Recite the Venus Mantra 108 times and wear it on the middle finger of the right hand.',
    alternatives: ['White Zircon', 'Opal', 'White Topaz'],
    alternativesHi: ['सफेद जरकन', 'ओपल', 'सफेद टोपाज'],
    basePricePerRatti: 8000
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
    wearingMethod: 'Test the stone under your pillow for 3 nights first. If no bad dreams occur, wash the ring in milk and water, chant the Saturn Mantra 108 times on Saturday morning, and wear it on the middle finger.',
    alternatives: ['Neeli (Iolite)', 'Amethyst', 'Blue Spinel', 'Tiger Eye'],
    alternativesHi: ['नीली (आयलाइट)', 'कटेला (एमेथिस्ट)', 'नीला स्पिनल', 'टाइगर आई'],
    basePricePerRatti: 5500
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
    wearingMethod: 'Wash the Hessonite ring in unboiled milk. On Saturday evening (sunset), chant the Rahu Mantra 108 times and wear the ring on the middle finger.',
    alternatives: ['Orange Zircon', 'Spessartite Garnet'],
    alternativesHi: ['नारंगी जरकन', 'स्पैसर्टाइट गारनेट'],
    basePricePerRatti: 1000
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
    wearingMethod: 'Purify the Cat\'s eye ring in milk and water. On Tuesday evening or night, chant the Ketu Mantra 108 times and wear it on the middle finger.',
    alternatives: ['Tiger Eye', 'Cat\'s Eye Quartz', 'Turquoise'],
    alternativesHi: ['टाइगर आई', 'कैट्स आई क्वार्ट्ज', 'फिरोजा'],
    basePricePerRatti: 1100
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
    benefics: ['Sun', 'Jupiter'],
    yogakaraka: 'Mars',
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
    benefics: ['Mars', 'Sun', 'Moon', 'Jupiter'],
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
    benefics: ['Saturn'],
    yogakaraka: 'Venus',
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

  const SIGN_RULERS = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
  const lagnaLord = SIGN_RULERS[kundali.lagnaIndex];
  const luckyPlanet = SIGN_RULERS[(kundali.lagnaIndex + 8) % 12];
  const workPlanet = SIGN_RULERS[(kundali.lagnaIndex + 9) % 12];

  // Analyze each planet
  planetsMap.forEach((pData, pName) => {
    // Rahu and Ketu are shadow planet remedies and generally avoided unless running Dasha
    if (pName === 'Rahu' || pName === 'Ketu') {
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `Rahu/Ketu gemstones are shadow planet remedies and generally avoided. Suitable only under specific Dasha cycles under expert guidance.`
      });
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

    // Gemstones to Avoid (Malefics or placed in 6, 8, 12 houses unless exalted/own sign)
    if (isMalefic) {
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `${pName} is a Functional Malefic (destructive lord) for ${lagna} Ascendant. Wearing its gemstone can amplify negative traits.`
      });
    } else if ((pData.house === 6 || pData.house === 8 || pData.house === 12) && !(isExalted || isOwnSign)) {
      avoidList.push({
        stone: GEMSTONE_DB[pName],
        reason: `Although ${pName} is beneficial, it is placed in the negative ${pData.house}th house. Wearing its gemstone is not recommended.`
      });
    } else if (isBenefic) {
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
      if (isExalted || isOwnSign) {
        score += 15;
        reason += `${pName} is exalted or in its own sign (dignified placement). `;
      }

      if (pData.strength < 50) {
        score += 20; // Strengthening required!
        reason += `Needs strength (Planetary strength is low at ${pData.strength}%). `;
      } else {
        score += 5;
        reason += `Strong beneficial planet (${pData.strength}% strength). `;
      }

      candidateBenefics.push({ planet: pName, score, reason });
    }
  });

  candidateBenefics.sort((a, b) => b.score - a.score);

  const lagnaLordData = planetsMap.get(lagnaLord)!;
  const luckyPlanetData = planetsMap.get(luckyPlanet)!;
  const workPlanetData = planetsMap.get(workPlanet)!;

  const getReason = (role: 'life' | 'lucky' | 'work', pName: string, pData: PlanetPosition) => {
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

    let caution = '';
    if (pData.house === 6 || pData.house === 8 || pData.house === 12) {
      if (isExalted || isOwnSign) {
        caution = ` Note: Planet is in the ${pData.house}th house, but since it is exalted or in its own sign, it forms protective aspects (dignified placement).`;
      } else {
        caution = ` WARNING: Planet is placed in the negative ${pData.house}th house (dusthana). Wear only under expert supervision.`;
      }
    }

    if (role === 'life') {
      return `Lagnesh / Ascendant Lord planet. Represents self, health, physical constitution, and longevity.${caution}`;
    } else if (role === 'lucky') {
      return `Bhagyesh / 9th Lord planet. Controls luck, destiny, higher education, father, and fortune.${caution}`;
    } else {
      return `Karmesh / 10th Lord planet. Rulers career, profession, fame, status, and worldly deeds.${caution}`;
    }
  };

  const lifeStone = GEMSTONE_DB[lagnaLord];
  const luckyStone = GEMSTONE_DB[luckyPlanet];
  const workStone = GEMSTONE_DB[workPlanet];

  const lifeStoneReason = getReason('life', lagnaLord, lagnaLordData);
  const luckyStoneReason = getReason('lucky', luckyPlanet, luckyPlanetData);
  const workStoneReason = getReason('work', workPlanet, workPlanetData);

  const otherStones: { stone: Gemstone; reason: string }[] = [];
  candidateBenefics.forEach(cb => {
    if (cb.planet !== lagnaLord && cb.planet !== luckyPlanet && cb.planet !== workPlanet) {
      otherStones.push({
        stone: GEMSTONE_DB[cb.planet],
        reason: cb.reason
      });
    }
  });

  const filteredAvoidList = avoidList.filter(item => 
    item.stone.planet !== lagnaLord &&
    item.stone.planet !== luckyPlanet &&
    item.stone.planet !== workPlanet &&
    !otherStones.find(os => os.stone.planet === item.stone.planet)
  );

  return {
    lifeStone,
    lifeStoneReason,
    luckyStone,
    luckyStoneReason,
    workStone,
    workStoneReason,
    otherStones,
    avoid: filteredAvoidList
  };
}
