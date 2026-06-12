import React, { useState } from 'react';
import { KundaliResult, ChartData } from '../engine/astrology';

interface BirthChartProps {
  kundali: KundaliResult;
}

export const BirthChart: React.FC<BirthChartProps> = ({ kundali }) => {
  const [activeTab, setActiveTab] = useState<'D1' | 'D9' | 'D10' | 'Chandra'>('D1');

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
  // Coordinates are tuned to place:
  // 1. Sign Number (small, centered relative to house)
  // 2. Planets list (spaced vertically or horizontally)
  const houseConfig: {
    [key: number]: {
      signX: number;
      signY: number;
      planetsX: number;
      planetsY: number;
      name: string;
    }
  } = {
    1: { signX: 200, signY: 115, planetsX: 200, planetsY: 155, name: 'Lagna' },
    2: { signX: 120, signY: 70, planetsX: 100, planetsY: 95, name: '2nd House' },
    3: { signX: 75, signY: 120, planetsX: 50, planetsY: 145, name: '3rd House' },
    4: { signX: 130, signY: 205, planetsX: 130, planetsY: 240, name: '4th House' },
    5: { signX: 75, signY: 290, planetsX: 50, planetsY: 265, name: '5th House' },
    6: { signX: 120, signY: 340, planetsX: 100, planetsY: 315, name: '6th House' },
    7: { signX: 200, signY: 295, planetsX: 200, planetsY: 250, name: '7th House' },
    8: { signX: 280, signY: 340, planetsX: 300, planetsY: 315, name: '8th House' },
    9: { signX: 325, signY: 290, planetsX: 350, planetsY: 265, name: '9th House' },
    10: { signX: 270, signY: 205, planetsX: 270, planetsY: 240, name: '10th House' },
    11: { signX: 325, signY: 120, planetsX: 350, planetsY: 145, name: '11th House' },
    12: { signX: 280, signY: 70, planetsX: 300, planetsY: 95, name: '12th House' }
  };

  // Convert 0-indexed sign to Vedic 1-indexed (1=Aries, 12=Pisces)
  const getVedicSignNum = (signIdx: number): number => {
    return signIdx + 1;
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent-gold)' }}>✦</span> Divisional Charts
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
              {tab === 'D1' ? 'Birth (D1)' : tab === 'D9' ? 'Navamsa (D9)' : tab === 'D10' ? 'Dashamsha (D10)' : 'Chandra'}
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
            background: 'rgba(12, 10, 31, 0.6)',
            borderRadius: '12px',
            border: '2px solid rgba(243, 156, 18, 0.25)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Definitions for Glow effects */}
          <defs>
            <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="purple-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComponentTransfer in="blur" result="glow">
                <feFuncA type="linear" slope="0.6"/>
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Border */}
          <rect x="10" y="10" width="380" height="380" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" />
          
          {/* Diagonals */}
          <line x1="10" y1="10" x2="390" y2="390" stroke="rgba(142, 68, 173, 0.4)" strokeWidth="1.5" />
          <line x1="10" y1="390" x2="390" y2="10" stroke="rgba(142, 68, 173, 0.4)" strokeWidth="1.5" />
          
          {/* Inner Diamond */}
          <polygon
            points="200,10 10,200 200,390 390,200"
            fill="none"
            stroke="var(--accent-gold)"
            strokeWidth="2"
            style={{ filter: 'url(#gold-glow)', opacity: 0.85 }}
          />

          {/* Draw house numbers & planets */}
          {Object.entries(houseConfig).map(([houseNumStr, config]) => {
            const houseNum = Number(houseNumStr);
            const signIdx = chart.signs[houseNum];
            const planets = chart.houses[houseNum] || [];
            
            return (
              <g key={houseNum}>
                {/* House Sign Number */}
                <text
                  x={config.signX}
                  y={config.signY}
                  fill="var(--accent-gold)"
                  fontSize="13"
                  fontWeight="800"
                  textAnchor="middle"
                  fontFamily="var(--font-title)"
                >
                  {getVedicSignNum(signIdx)}
                </text>

                {/* Planets listing */}
                <text
                  x={config.planetsX}
                  y={config.planetsY}
                  fill="#ffffff"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  fontFamily="var(--font-body)"
                  letterSpacing="3"
                >
                  {planets.join(' ')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>
        <p>Values in gold represent the Zodiac Sign Number (1 = Aries, 12 = Pisces).</p>
        <p style={{ marginTop: '4px' }}>
          <strong>Su</strong>: Sun | <strong>Mo</strong>: Moon | <strong>Ma</strong>: Mars | <strong>Me</strong>: Mercury | 
          <strong>Ju</strong>: Jupiter | <strong>Ve</strong>: Venus | <strong>Sa</strong>: Saturn | 
          <strong>Ra</strong>: Rahu | <strong>Ke</strong>: Ketu
        </p>
      </div>
    </div>
  );
};
