import React, { useState } from 'react';
import { KundaliResult, ChartData } from '../engine/astrology';

interface BirthChartProps {
  kundali: KundaliResult;
  lang: 'en' | 'hi';
  theme?: 'dark' | 'light';
}

const TRANSLATIONS = {
  en: {
    title: 'Divisional Charts',
    d1: 'Birth (D1)',
    d9: 'Navamsa (D9)',
    d10: 'Dashamsha (D10)',
    chandra: 'Chandra',
    note: 'Values in gold represent the Zodiac Sign Number (1 = Aries, 12 = Pisces).',
    legend: 'Su: Sun | Mo: Moon | Ma: Mars | Me: Mercury | Ju: Jupiter | Ve: Venus | Sa: Saturn | Ra: Rahu | Ke: Ketu | Lg: Lagna'
  },
  hi: {
    title: 'विभागीय कुंडली चार्ट',
    d1: 'जन्म कुंडली (D1)',
    d9: 'नवांश कुंडली (D9)',
    d10: 'दशमांश कुंडली (D10)',
    chandra: 'चन्द्र कुंडली',
    note: 'स्वर्ण रंग के अंक राशि संख्या दर्शाते हैं (1 = मेष, 12 = मीन)।',
    legend: 'Su: सूर्य | Mo: चन्द्र | Ma: मंगल | Me: बुध | Ju: गुरु | Ve: शुक्र | Sa: शनि | Ra: राहु | Ke: केतु | Lg: लग्न'
  }
};

const PLANETS_HI_SHORT: { [key: string]: string } = {
  Sun: 'सू', Moon: 'च', Mars: 'मं', Mercury: 'बु',
  Jupiter: 'गु', Venus: 'शु', Saturn: 'श', Rahu: 'रा', Ketu: 'के'
};

const getPlanetCoords = (house: number, idx: number, total: number): { x: number; y: number } => {
  const coordsMap: { [key: number]: { [key: number]: [number, number][] } } = {
    1: {
      1: [[200, 145]],
      2: [[165, 135], [235, 135]],
      3: [[165, 135], [200, 160], [235, 135]],
      4: [[165, 125], [235, 125], [175, 160], [225, 160]],
      5: [[165, 125], [235, 125], [200, 165], [170, 145], [230, 145]],
      6: [[165, 125], [235, 125], [200, 165], [160, 145], [200, 140], [240, 145]]
    },
    2: {
      1: [[120, 50]],
      2: [[100, 45], [140, 50]],
      3: [[85, 45], [115, 50], [145, 55]],
      4: [[100, 40], [140, 45], [100, 65], [140, 70]],
      5: [[80, 40], [110, 45], [140, 50], [95, 65], [125, 70]],
      6: [[80, 40], [110, 45], [140, 50], [85, 65], [115, 68], [145, 70]]
    },
    3: {
      1: [[50, 120]],
      2: [[45, 100], [50, 140]],
      3: [[45, 85], [50, 120], [45, 155]],
      4: [[40, 80], [60, 105], [60, 135], [40, 160]],
      5: [[40, 70], [60, 95], [60, 120], [60, 145], [40, 170]],
      6: [[40, 70], [60, 95], [60, 120], [60, 145], [40, 170], [45, 195]]
    },
    4: {
      1: [[145, 200]],
      2: [[135, 165], [135, 235]],
      3: [[135, 165], [160, 200], [135, 235]],
      4: [[125, 165], [125, 235], [160, 175], [160, 225]],
      5: [[125, 165], [125, 235], [165, 200], [145, 175], [145, 225]],
      6: [[125, 165], [125, 235], [165, 200], [145, 175], [145, 225], [160, 200]]
    },
    5: {
      1: [[50, 280]],
      2: [[50, 260], [45, 300]],
      3: [[45, 245], [50, 280], [45, 315]],
      4: [[40, 240], [60, 265], [60, 295], [40, 320]],
      5: [[40, 230], [60, 255], [60, 280], [60, 305], [40, 330]],
      6: [[40, 230], [60, 255], [60, 280], [60, 305], [40, 330], [45, 355]]
    },
    6: {
      1: [[120, 350]],
      2: [[100, 355], [140, 350]],
      3: [[85, 355], [115, 350], [145, 345]],
      4: [[100, 360], [140, 355], [100, 335], [140, 330]],
      5: [[80, 360], [110, 355], [140, 350], [95, 335], [125, 330]],
      6: [[80, 360], [110, 355], [140, 350], [85, 335], [115, 330], [145, 325]]
    },
    7: {
      1: [[200, 255]],
      2: [[165, 265], [235, 265]],
      3: [[165, 265], [200, 240], [235, 265]],
      4: [[165, 275], [235, 275], [175, 240], [225, 240]],
      5: [[165, 275], [235, 275], [200, 235], [170, 255], [230, 255]],
      6: [[165, 275], [235, 275], [200, 235], [170, 255], [230, 255], [200, 265]]
    },
    8: {
      1: [[280, 350]],
      2: [[260, 350], [300, 355]],
      3: [[255, 345], [285, 350], [315, 355]],
      4: [[260, 360], [300, 355], [260, 335], [300, 330]],
      5: [[260, 360], [290, 355], [320, 350], [275, 335], [305, 330]],
      6: [[260, 360], [290, 355], [320, 350], [255, 335], [285, 330], [315, 325]]
    },
    9: {
      1: [[350, 280]],
      2: [[350, 260], [355, 300]],
      3: [[355, 245], [350, 280], [355, 315]],
      4: [[360, 240], [340, 265], [340, 295], [360, 320]],
      5: [[360, 230], [340, 255], [340, 280], [340, 305], [360, 330]],
      6: [[360, 230], [340, 255], [340, 280], [340, 305], [360, 330], [355, 355]]
    },
    10: {
      1: [[255, 200]],
      2: [[265, 165], [265, 235]],
      3: [[265, 165], [240, 200], [265, 235]],
      4: [[275, 165], [275, 235], [240, 175], [240, 225]],
      5: [[275, 165], [275, 235], [235, 200], [255, 175], [255, 225]],
      6: [[275, 165], [275, 235], [235, 200], [255, 175], [255, 225], [240, 200]]
    },
    11: {
      1: [[350, 120]],
      2: [[350, 100], [355, 140]],
      3: [[355, 85], [350, 120], [355, 155]],
      4: [[360, 80], [340, 105], [340, 135], [360, 160]],
      5: [[360, 70], [340, 95], [340, 120], [340, 145], [360, 170]],
      6: [[360, 70], [340, 95], [340, 120], [340, 145], [360, 170], [355, 195]]
    },
    12: {
      1: [[280, 50]],
      2: [[260, 50], [300, 45]],
      3: [[255, 55], [285, 50], [315, 45]],
      4: [[260, 45], [300, 40], [260, 70], [300, 65]],
      5: [[260, 50], [290, 45], [320, 40], [275, 70], [305, 65]],
      6: [[260, 50], [290, 45], [320, 40], [260, 70], [295, 68], [330, 65]]
    }
  };

  const houseCoords = coordsMap[house];
  if (!houseCoords) return { x: 200, y: 200 };

  const safeTotal = Math.min(total, 6);
  const coordsList = houseCoords[safeTotal];
  if (!coordsList || coordsList.length === 0) return { x: 200, y: 200 };

  const coordIdx = idx % coordsList.length;
  const pt = coordsList[coordIdx];
  return { x: pt[0], y: pt[1] };
};

export const BirthChart: React.FC<BirthChartProps> = ({ kundali, lang, theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState<'D1' | 'D9' | 'D10' | 'Chandra'>('D1');

  const t = TRANSLATIONS[lang];

  const getChartData = (): ChartData => {
    switch (activeTab) {
      case 'D9': return kundali.d9Chart;
      case 'D10': return kundali.d10Chart;
      case 'Chandra': return kundali.chandraChart;
      case 'D1':
      default:
        return kundali.d1Chart;
    }
  };

  const chart = getChartData();

  // House positioning coordinates for SVG text rendering
  const houseConfig: {
    [key: number]: {
      signX: number;
      signY: number;
      name: string;
    }
  } = {
    1: { signX: 200, signY: 105, name: 'Lagna' },
    2: { signX: 45, signY: 30, name: '2nd House' },
    3: { signX: 30, signY: 45, name: '3rd House' },
    4: { signX: 105, signY: 200, name: '4th House' },
    5: { signX: 30, signY: 355, name: '5th House' },
    6: { signX: 45, signY: 370, name: '6th House' },
    7: { signX: 200, signY: 295, name: '7th House' },
    8: { signX: 355, signY: 370, name: '8th House' },
    9: { signX: 370, signY: 355, name: '9th House' },
    10: { signX: 295, signY: 200, name: '10th House' },
    11: { signX: 370, signY: 45, name: '11th House' },
    12: { signX: 355, signY: 30, name: '12th House' }
  };

  const getPlanetMarker = (symbol: string) => {
    const symbolToName: { [key: string]: string } = {
      Su: 'Sun', Mo: 'Moon', Ma: 'Mars', Me: 'Mercury',
      Ju: 'Jupiter', Ve: 'Venus', Sa: 'Saturn', Ra: 'Rahu', Ke: 'Ketu',
      'सू': 'Sun', 'च': 'Moon', 'मं': 'Mars', 'बु': 'Mercury',
      'गु': 'Jupiter', 'शु': 'Venus', 'श': 'Saturn', 'रा': 'Rahu', 'के': 'Ketu'
    };

    const planetName = symbolToName[symbol];
    if (!planetName) {
      if (symbol === 'Lg' || symbol === 'ल') {
        return {
          symbol: lang === 'hi' ? 'ल' : 'Lg',
          degree: Math.round(kundali.lagnaDegree || 0),
          isRetro: false,
          isCombust: false,
          isVargottama: false,
          isExalted: false,
          isDebilitated: false
        };
      }
      return null;
    }

    const p = kundali.planetaryPositions.find(x => x.name === planetName);
    if (!p) return null;

    const shortHi = PLANETS_HI_SHORT[p.name] || symbol;

    return {
      symbol: lang === 'hi' ? shortHi : p.symbol,
      degree: Math.round(p.degree),
      isRetro: p.isRetrograde,
      isCombust: p.isCombust,
      isVargottama: p.isVargottama,
      isExalted: p.isExalted,
      isDebilitated: p.isDebilitated
    };
  };

  const getSuperscript = (info: any) => {
    if (!info) return '';
    let labels = `${info.degree}`;
    if (info.isRetro) labels += '*';
    if (info.isCombust) labels += '^';
    if (info.isVargottama) labels += '▫';
    if (info.isExalted) labels += '↑';
    if (info.isDebilitated) labels += '↓';
    return labels;
  };

  const getVedicSignNum = (signIdx: number): number => {
    return signIdx + 1;
  };

  const isLight = theme === 'light';

  return (
    <div className="glass-panel" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      alignItems: 'center',
      background: isLight ? '#ffffff' : undefined,
      border: isLight ? '1px solid #FF7F32' : undefined,
      boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.05)' : undefined
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent-gold)' }}>✦</span> {t.title}
        </h3>
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.2)', padding: '3px', borderRadius: '8px' }}>
          {(['D1', 'D9', 'D10', 'Chandra'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'var(--accent-gold)' : 'transparent',
                color: activeTab === tab ? '#05030f' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontFamily: 'var(--font-title)',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
            >
              {tab === 'D1' ? t.d1 : tab === 'D9' ? t.d9 : tab === 'D10' ? t.d10 : t.chandra}
            </button>
          ))}
        </div>
      </div>

      {/* SVG North Indian Kundali Rendering */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '1/1' }}>
        <svg
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
          style={{
            background: isLight ? '#ffffff' : 'rgba(12, 10, 31, 0.6)',
            borderRadius: '12px',
            border: isLight ? '2px solid #FF7F32' : '2px solid rgba(243, 156, 18, 0.25)',
            boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.05)' : '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Definitions for Glow effects */}
          <defs>
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Border */}
          <rect x="10" y="10" width="380" height="380" fill="none" stroke={isLight ? '#FF7F32' : 'var(--accent-purple)'} strokeWidth="2.5" />
          
          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" stroke={isLight ? '#FF7F32' : 'rgba(142, 68, 173, 0.4)'} strokeWidth="1.5" />
          <line x1="10" y1="390" x2="390" y2="10" stroke={isLight ? '#FF7F32' : 'rgba(142, 68, 173, 0.4)'} strokeWidth="1.5" />
          
          {/* Inner Diamond */}
          <polygon
            points="200,10 10,200 200,390 390,200"
            fill="none"
            stroke={isLight ? '#FF7F32' : 'var(--accent-gold)'}
            strokeWidth="2"
            style={{ filter: isLight ? 'none' : 'url(#gold-glow)', opacity: isLight ? 1.0 : 0.85 }}
          />

          {/* Draw house numbers & planets */}
          {Object.entries(houseConfig).map(([houseNumStr, config]) => {
            const houseNum = Number(houseNumStr);
            const signIdx = chart.signs[houseNum];
            
            // Get list of planets, and prepend Lagna (Lg/ल) inside House 1
            const planets = [...(chart.houses[houseNum] || [])];
            if (houseNum === 1) {
              planets.unshift(lang === 'hi' ? 'ल' : 'Lg');
            }

            return (
              <g key={houseNum}>
                {/* House Sign Number */}
                <text
                  x={config.signX}
                  y={config.signY}
                  fill={isLight ? '#FF7F32' : 'var(--accent-gold)'}
                  fontSize="13"
                  fontWeight="800"
                  textAnchor="middle"
                  fontFamily="var(--font-title)"
                >
                  {getVedicSignNum(signIdx)}
                </text>

                {/* Planets listing formatted dynamically like AstroSage */}
                {planets.map((pSymbol, idx) => {
                  const info = getPlanetMarker(pSymbol);
                  if (!info) return null;
                  
                  const pt = getPlanetCoords(houseNum, idx, planets.length);
                  const supText = getSuperscript(info);

                  return (
                    <g key={`${pSymbol}-${idx}`}>
                      {/* Degree & State Markers (Superscript) */}
                      {supText && (
                        <text
                          x={pt.x}
                          y={pt.y - 7}
                          fill={isLight ? '#FF7F32' : 'var(--accent-gold)'}
                          fontSize="7.5"
                          fontWeight="600"
                          textAnchor="middle"
                          fontFamily="var(--font-body)"
                        >
                          {supText}
                        </text>
                      )}
                      {/* Planet Symbol */}
                      <text
                        x={pt.x}
                        y={pt.y + 4}
                        fill={isLight ? '#111111' : '#ffffff'}
                        fontSize="11.5"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="var(--font-body)"
                      >
                        {info.symbol}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>
        <p>{t.note}</p>
        <p style={{ marginTop: '4px', fontWeight: 'bold' }}>
          {t.legend}
        </p>
      </div>
    </div>
  );
};
