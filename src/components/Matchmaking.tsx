import React, { useState } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { Heart, Sparkles, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';
import { CustomDatePicker } from './CustomDatePicker';
import { CustomTimePicker } from './CustomTimePicker';
import { CITIES as CITIES_DB } from '../engine/cities';

interface MatchmakingProps {
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    title: '✦ Kundali Matchmaking (Gun Milan)',
    subtitle: 'Check compatibility of bride and groom based on Vedic Ashtakoota rules.',
    brideTitle: 'Bride Details (Girl)',
    groomTitle: 'Groom Details (Boy)',
    name: 'Name',
    dob: 'Date of Birth',
    tob: 'Time of Birth',
    pob: 'Place of Birth',
    calculate: 'Calculate Compatibility Score',
    scoreTitle: 'Matchmaking Score',
    statusExcellent: 'Excellent Compatibility',
    statusGood: 'Good Compatibility',
    statusAverage: 'Average Compatibility',
    statusPoor: 'Poor Compatibility (Not Recommended)',
    manglikTitle: 'Manglik Dosha Match',
    manglikCompatible: 'Manglik Placements are Compatible',
    manglikWarn: 'Manglik Mismatch Detected! Cautions advised.',
    manglikNone: 'No Manglik Dosha in either chart.',
    kootasTitle: 'Ashtakoota Breakdown (36 Gunas)',
    koota: 'Koota / category',
    maxPoints: 'Max Gunas',
    earnedPoints: 'Obtained Gunas',
    desc: 'Astrological Impact',
    compatibilityReport: 'Vedic Compatibility Summary'
  },
  hi: {
    title: '✦ कुण्डली मिलान (गुण मिलान)',
    subtitle: 'वैदिक अष्टकूट नियमों के आधार पर वर और वधू की अनुकूलता की जाँच करें।',
    brideTitle: 'कन्या का विवरण (वधू)',
    groomTitle: 'वर का विवरण (वर)',
    name: 'नाम',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    pob: 'जन्म स्थान',
    calculate: 'अनुकूलता गुण मिलान गणना करें',
    scoreTitle: 'गुण मिलान स्कोर',
    statusExcellent: 'उत्कृष्ट अनुकूलता (अति उत्तम)',
    statusGood: 'अच्छी अनुकूलता (शुभ मिलान)',
    statusAverage: 'सामान्य अनुकूलता',
    statusPoor: 'असंतोषजनक अनुकूलता (वर्जित मिलान)',
    manglikTitle: 'मांगलिक दोष मिलान',
    manglikCompatible: 'मांगलिक दोष मिलान अनुकूल है',
    manglikWarn: 'मांगलिक दोष असंतुलन! सावधानियां आवश्यक हैं।',
    manglikNone: 'दोनों में से किसी भी कुंडली में मांगलिक दोष नहीं है।',
    kootasTitle: 'अष्टकूट मिलान विवरण (३६ गुण)',
    koota: 'कूट श्रेणी',
    maxPoints: 'अधिकतम गुण',
    earnedPoints: 'प्राप्त गुण',
    desc: 'प्रभाव एवं फल',
    compatibilityReport: 'वैदिक अनुकूलता रिपोर्ट सारांश'
  }
};

const KOOTAS_INFO = {
  en: [
    { name: 'Varna', max: 1, desc: 'Work profile, mental caliber, and spiritual alignment.' },
    { name: 'Vashya', max: 2, desc: 'Mutual control, attraction, and dominance compatibility.' },
    { name: 'Tara', max: 3, desc: 'Destiny, health, and mutual longevity of partners.' },
    { name: 'Yoni', max: 4, desc: 'Biological affinity, sexual compatibility, and love dynamics.' },
    { name: 'Maitri', max: 5, desc: 'Intellectual friendship, mutual understanding, and coordination.' },
    { name: 'Gana', max: 6, desc: 'Temperament compatibility (Deva, Manushya, Rakshasa).' },
    { name: 'Bhakoot', max: 7, desc: 'Emotional strength, family prosperity, and wealth longevity.' },
    { name: 'Nadi', max: 8, desc: 'Physiological health, genetic compatibility, and progeny success.' }
  ],
  hi: [
    { name: 'वर्ण (Varna)', max: 1, desc: 'कार्य शैली, मानसिक स्तर और आध्यात्मिक विकास।' },
    { name: 'वश्य (Vashya)', max: 2, desc: 'आपसी नियंत्रण, आकर्षण और आपसी वर्चस्व अनुकूलता।' },
    { name: 'तारा (Tara)', max: 3, desc: 'भाग्य, स्वास्थ्य और जीवन साथी की दीर्घायु।' },
    { name: 'योनि (Yoni)', max: 4, desc: 'जैविक संबंध, कामुक अनुकूलता और प्रेम सम्बन्ध।' },
    { name: 'मैत्री (Maitri)', max: 5, desc: 'बौद्धिक मित्रता, आपसी समझ और आपसी तालमेल।' },
    { name: 'गण (Gana)', max: 6, desc: 'स्वभाव अनुकूलता (देव, मनुष्य, राक्षस प्रवृत्ति)।' },
    { name: 'भकूट (Bhakoot)', max: 7, desc: 'भावनात्मक सामंजस्य, पारिवारिक समृद्धि और सुख।' },
    { name: 'नाड़ी (Nadi)', max: 8, desc: 'शारीरिक स्वास्थ्य, आनुवंशिक अनुकूलता और संतान सुख।' }
  ]
};

export const Matchmaking: React.FC<MatchmakingProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [partner1, setPartner1] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [partner2, setPartner2] = useState({
    name: '',
    dob: '',
    tob: '',
    place: ''
  });

  const [p1Suggestions, setP1Suggestions] = useState<typeof CITIES_DB>([]);
  const [p2Suggestions, setP2Suggestions] = useState<typeof CITIES_DB>([]);

  const handleP1PlaceChange = (value: string) => {
    setPartner1({ ...partner1, place: value });
    if (value.trim().length > 1) {
      const filtered = CITIES_DB.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
      setP1Suggestions(filtered.slice(0, 8));
    } else {
      setP1Suggestions([]);
    }
  };

  const handleP2PlaceChange = (value: string) => {
    setPartner2({ ...partner2, place: value });
    if (value.trim().length > 1) {
      const filtered = CITIES_DB.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
      setP2Suggestions(filtered.slice(0, 8));
    } else {
      setP2Suggestions([]);
    }
  };

  const [results, setResults] = useState<any>(null);

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();

    if (!partner1.name || !partner1.dob || !partner1.tob || !partner1.place ||
        !partner2.name || !partner2.dob || !partner2.tob || !partner2.place) {
      alert(lang === 'hi' ? 'कृपया वर और वधू दोनों के सभी विवरण भरें।' : 'Please fill all details for both Groom and Bride.');
      return;
    }

    // Calculate chart results for both using exact city matching and robust fallbacks
    const coords1 = CITIES_DB.find(c => c.name.toLowerCase() === partner1.place.toLowerCase()) ||
                    CITIES_DB.find(c => partner1.place.toLowerCase().includes(c.name.split(',')[0].toLowerCase())) ||
                    CITIES_DB.find(c => c.name.toLowerCase().includes(partner1.place.toLowerCase())) ||
                    CITIES_DB[1];
    const coords2 = CITIES_DB.find(c => c.name.toLowerCase() === partner2.place.toLowerCase()) ||
                    CITIES_DB.find(c => partner2.place.toLowerCase().includes(c.name.split(',')[0].toLowerCase())) ||
                    CITIES_DB.find(c => c.name.toLowerCase().includes(partner2.place.toLowerCase())) ||
                    CITIES_DB[0];

    const chart1 = calculateKundali(partner1.dob, partner1.tob, partner1.place, coords1.lat, coords1.lng);
    const chart2 = calculateKundali(partner2.dob, partner2.tob, partner2.place, coords2.lat, coords2.lng);

    // Astro matching variables
    const p1Rashi = chart1.rashiIndex;
    const p2Rashi = chart2.rashiIndex;

    const p1MoonPos = chart1.planetaryPositions.find(p => p.name === 'Moon')!;
    const p2MoonPos = chart2.planetaryPositions.find(p => p.name === 'Moon')!;

    const p1MoonDeg = p1Rashi * 30 + p1MoonPos.degree;
    const p2MoonDeg = p2Rashi * 30 + p2MoonPos.degree;

    const p1Nak = Math.floor(p1MoonDeg / 13.33333) % 27;
    const p2Nak = Math.floor(p2MoonDeg / 13.33333) % 27;

    // --- Ashtakoota Solving Algorithm ---
    
    // 1. Varna (Max 1)
    const getVarna = (rashi: number) => {
      if ([3, 7, 11].includes(rashi)) return 4; // Brahmin
      if ([0, 4, 8].includes(rashi)) return 3;  // Kshatriya
      if ([1, 5, 9].includes(rashi)) return 2;  // Vaishya
      return 1; // Shudra
    };
    const varna1 = getVarna(p1Rashi);
    const varna2 = getVarna(p2Rashi);
    const varnaScore = varna1 >= varna2 ? 1 : 0;

    // 2. Vashya (Max 2)
    const getVashya = (rashi: number) => {
      if ([0, 1, 4, 8, 9].includes(rashi)) return 'chatushpada';
      if ([2, 5, 6, 10].includes(rashi)) return 'dwipada';
      if ([3, 7, 11].includes(rashi)) return 'jalachara';
      return 'keeta';
    };
    const vashya1 = getVashya(p1Rashi);
    const vashya2 = getVashya(p2Rashi);
    const vashyaScore = vashya1 === vashya2 ? 2 : (vashya1 === 'dwipada' || vashya2 === 'dwipada' ? 1 : 0);

    // 3. Tara (Max 3)
    const diff1 = (p2Nak - p1Nak + 27) % 9;
    const diff2 = (p1Nak - p2Nak + 27) % 9;
    const badTaras = [3, 5, 7];
    const tara1Bad = badTaras.includes(diff1);
    const tara2Bad = badTaras.includes(diff2);
    let taraScore = 3;
    if (tara1Bad && tara2Bad) taraScore = 0;
    else if (tara1Bad || tara2Bad) taraScore = 1.5;

    // 4. Yoni (Max 4)
    // Map Nakshatra to Yoni categories: Horse=0, Elephant=1, Sheep=2, Serpent=3, Dog=4, Cat=5, Rat=6, Cow=7, Buffalo=8, Tiger=9, Deer=10, Monkey=11, Lion=12, Mongoose=13
    const nakYoni = [0, 1, 2, 3, 3, 10, 4, 4, 5, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 1, 1, 13, 2];
    const yoni1 = nakYoni[p1Nak];
    const yoni2 = nakYoni[p2Nak];
    const enemies = [[0, 9], [1, 12], [2, 11], [3, 13], [4, 5], [6, 5], [7, 9], [8, 12]]; // Animal enemies
    const isEnemy = enemies.some(pair => (pair[0] === yoni1 && pair[1] === yoni2) || (pair[0] === yoni2 && pair[1] === yoni1));
    let yoniScore = 2;
    if (yoni1 === yoni2) yoniScore = 4;
    else if (isEnemy) yoniScore = 0;

    // 5. Maitri (Rashi Lord Friendship) (Max 5)
    // Lords: Su=0, Mo=1, Ma=2, Me=3, Ju=4, Ve=5, Sa=6
    const rashiLords = [2, 5, 3, 1, 0, 3, 5, 2, 4, 6, 6, 4];
    const lord1 = rashiLords[p1Rashi];
    const lord2 = rashiLords[p2Rashi];
    // Simple friendship score
    let maitriScore = 3;
    if (lord1 === lord2) maitriScore = 5;
    else if (Math.abs(lord1 - lord2) === 1 || Math.abs(lord1 - lord2) === 3) maitriScore = 4; // Friendly
    else if (Math.abs(lord1 - lord2) === 5) maitriScore = 0; // Enemy

    // 6. Gana (Max 6)
    // Deva=0, Manushya=1, Rakshasa=2
    const nakGana = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 0, 2, 0, 0, 2, 2, 1, 1, 0, 2, 1, 2, 1, 0];
    const gana1 = nakGana[p1Nak];
    const gana2 = nakGana[p2Nak];
    let ganaScore = 0;
    if (gana1 === gana2) ganaScore = 6;
    else if (gana1 === 0 && gana2 === 1) ganaScore = 5;
    else if (gana1 === 1 && gana2 === 0) ganaScore = 5;
    else if (gana1 === 0 && gana2 === 2) ganaScore = 1;
    else if (gana1 === 2 && gana2 === 0) ganaScore = 1;

    // 7. Bhakoot (Max 7)
    const rashiDiff = (p2Rashi - p1Rashi + 12) % 12;
    const badDiffs = [1, 5, 7, 11]; // 2-12, 6-8 placements
    const bhakootScore = badDiffs.includes(rashiDiff) ? 0 : 7;

    // 8. Nadi (Max 8)
    // Adi=0, Madhya=1, Antya=2
    const nakNadi = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0, 0, 1, 2];
    const nadi1 = nakNadi[p1Nak];
    const nadi2 = nakNadi[p2Nak];
    const nadiScore = nadi1 === nadi2 ? 0 : 8;

    // Totals
    const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;

    // Manglik Check
    const manglik1 = chart1.doshas.manglik.active;
    const manglik2 = chart2.doshas.manglik.active;
    const manglikCompatible = (manglik1 === manglik2) || (!manglik1 && !manglik2);

    setResults({
      totalScore,
      varnaScore,
      vashyaScore,
      taraScore,
      yoniScore,
      maitriScore,
      ganaScore,
      bhakootScore,
      nadiScore,
      manglikCompatible,
      manglik1,
      manglik2,
      brideNak: chart2.nakshatra,
      brideRashi: chart2.rashi,
      groomNak: chart1.nakshatra,
      groomRashi: chart1.rashi
    });
  };

  const getStatusText = (score: number) => {
    if (score >= 28) return t.statusExcellent;
    if (score >= 21) return t.statusGood;
    if (score >= 18) return t.statusAverage;
    return t.statusPoor;
  };

  const getStatusClass = (score: number) => {
    if (score >= 21) return 'badge-teal';
    if (score >= 18) return 'badge-gold';
    return 'badge-red';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ borderTop: '5px solid var(--accent-purple)' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-purple)', marginBottom: '8px' }}>
          {t.title}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={calculateCompatibility} className="grid-2">
        {/* Groom Profile */}
        <div className="glass-panel" style={{ borderTop: '3px solid var(--accent-gold)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} /> {t.groomTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">{t.name}</label>
              <input
                type="text"
                className="form-input"
                value={partner1.name}
                onChange={(e) => setPartner1({ ...partner1, name: e.target.value })}
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{t.dob}</label>
                <CustomDatePicker
                  value={partner1.dob}
                  onChange={(val) => setPartner1({ ...partner1, dob: val })}
                  lang={lang}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t.tob}</label>
                <CustomTimePicker
                  value={partner1.tob}
                  onChange={(val) => setPartner1({ ...partner1, tob: val })}
                  lang={lang}
                />
              </div>
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label">{t.pob}</label>
              <input
                type="text"
                className="form-input"
                placeholder={lang === 'hi' ? 'जन्म शहर का नाम...' : 'Start typing birth city...'}
                value={partner1.place}
                onChange={(e) => handleP1PlaceChange(e.target.value)}
              />
              {p1Suggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  zIndex: 10,
                  maxHeight: '180px',
                  overflowY: 'auto',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                  {p1Suggestions.map(c => (
                    <div
                      key={c.name}
                      onClick={() => {
                        setPartner1({ ...partner1, place: c.name });
                        setP1Suggestions([]);
                      }}
                      style={{
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bride Profile */}
        <div className="glass-panel" style={{ borderTop: '3px solid #ff4757' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#ff4757', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={16} /> {t.brideTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">{t.name}</label>
              <input
                type="text"
                className="form-input"
                value={partner2.name}
                onChange={(e) => setPartner2({ ...partner2, name: e.target.value })}
              />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">{t.dob}</label>
                <CustomDatePicker
                  value={partner2.dob}
                  onChange={(val) => setPartner2({ ...partner2, dob: val })}
                  lang={lang}
                />
              </div>
              <div className="form-group">
                <label className="form-label">{t.tob}</label>
                <CustomTimePicker
                  value={partner2.tob}
                  onChange={(val) => setPartner2({ ...partner2, tob: val })}
                  lang={lang}
                />
              </div>
            </div>
            <div className="form-group" style={{ position: 'relative' }}>
              <label className="form-label">{t.pob}</label>
              <input
                type="text"
                className="form-input"
                placeholder={lang === 'hi' ? 'जन्म शहर का नाम...' : 'Start typing birth city...'}
                value={partner2.place}
                onChange={(e) => handleP2PlaceChange(e.target.value)}
              />
              {p2Suggestions.length > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  zIndex: 10,
                  maxHeight: '180px',
                  overflowY: 'auto',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                  {p2Suggestions.map(c => (
                    <div
                      key={c.name}
                      onClick={() => {
                        setPartner2({ ...partner2, place: c.name });
                        setP2Suggestions([]);
                      }}
                      style={{
                        padding: '10px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        fontSize: '0.85rem'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '14px' }}>
            <Heart size={18} fill="currentColor" /> {t.calculate}
          </button>
        </div>
      </form>

      {/* Matching Results Output */}
      {results && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Compatibility Score Card */}
          <div className="glass-panel" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', borderLeft: '5px solid var(--accent-purple)' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '6px solid var(--accent-purple)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 0 15px var(--accent-purple-glow)',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{results.totalScore}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ 36 Gunas</span>
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
                {t.compatibilityReport}
              </h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className={`badge ${getStatusClass(results.totalScore)}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                  {getStatusText(results.totalScore)}
                </span>
                <span className={`badge ${results.manglikCompatible ? 'badge-teal' : 'badge-red'}`} style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                  {results.manglikCompatible ? t.manglikCompatible : t.manglikWarn}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
                {lang === 'hi'
                  ? `वर का नक्षत्र: **${results.groomNak}** (${results.groomRashi} राशि) | वधू का नक्षत्र: **${results.brideNak}** (${results.brideRashi} राशि)। अष्टकूट कूटों के अनुसार ३६ में से कुल ${results.totalScore} गुण प्राप्त हुए हैं।`
                  : `Groom's Nakshatra: **${results.groomNak}** (${results.groomRashi} Rashi) | Bride's Nakshatra: **${results.brideNak}** (${results.brideRashi} Rashi). Gun Milan total score: ${results.totalScore}/36.`
                }
              </p>
            </div>
          </div>

          {/* Manglik Match details */}
          <div className="glass-panel" style={{ borderLeft: `5px solid ${results.manglikCompatible ? 'var(--accent-teal)' : 'var(--accent-red)'}` }}>
            <h3 style={{ fontSize: '1.2rem', color: results.manglikCompatible ? 'var(--accent-teal)' : 'var(--accent-red)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {results.manglikCompatible ? <ShieldCheck size={18} /> : <AlertTriangle size={18} />} {t.manglikTitle}
            </h3>
            <div className="grid-2" style={{ fontSize: '0.9rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                <strong>{partner1.name} (Boy):</strong> {results.manglik1 ? (lang === 'hi' ? 'मांगलिक (दोष सक्रिय)' : 'MANGLIK (Dosha Active)') : (lang === 'hi' ? 'गैर-मांगलिक' : 'Non-Manglik')}
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                <strong>{partner2.name} (Girl):</strong> {results.manglik2 ? (lang === 'hi' ? 'मांगलिक (दोष सक्रिय)' : 'MANGLIK (Dosha Active)') : (lang === 'hi' ? 'गैर-मांगलिक' : 'Non-Manglik')}
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px' }}>
              {results.manglik1 === results.manglik2
                ? (lang === 'hi' ? 'दोनों कुंडलियों में मांगलिक दोष संतुलित है, विवाह के लिए उत्तम है।' : 'Both charts have matching Manglik status. The dosha is balanced.')
                : (lang === 'hi' ? 'एक पार्टनर मांगलिक है और दूसरा नहीं, पूजा या दोष निवारण के बाद ही विवाह उचित है।' : 'One partner is Manglik and the other is not. Astro consultation is advised to verify check mitigations.')}
            </p>
          </div>

          {/* Ashtakoota table */}
          <div className="glass-panel">
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
              {t.kootasTitle}
            </h3>

            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent-purple)' }}>
                  <th style={{ padding: '10px' }}>{t.koota}</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>{t.maxPoints}</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>{t.earnedPoints}</th>
                  <th style={{ padding: '10px' }}>{t.desc}</th>
                </tr>
              </thead>
              <tbody>
                {(lang === 'hi' ? KOOTAS_INFO.hi : KOOTAS_INFO.en).map((k, idx) => {
                  const scores = [results.varnaScore, results.vashyaScore, results.taraScore, results.yoniScore, results.maitriScore, results.ganaScore, results.bhakootScore, results.nadiScore];
                  const earned = scores[idx];
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}>{k.name}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>{k.max}</td>
                      <td style={{ padding: '10px', textAlign: 'center', color: earned === 0 ? 'var(--accent-red)' : earned === k.max ? 'var(--accent-teal)' : 'var(--accent-gold)', fontWeight: 'bold' }}>{earned}</td>
                      <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{k.desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>

        </div>
      )}
    </div>
  );
};
