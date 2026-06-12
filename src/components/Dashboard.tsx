import React, { useState } from 'react';
import { GEMSTONE_DB, Gemstone } from '../engine/gemstones';
import { BarChart, Users, DollarSign, Award, Settings, Check } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [dbList, setDbList] = useState<Gemstone[]>(Object.values(GEMSTONE_DB));
  const [editingGem, setEditingGem] = useState<string | null>(null);
  const [editedMetal, setEditedMetal] = useState('');
  const [editedWeight, setEditedWeight] = useState('');

  const handleEdit = (gem: Gemstone) => {
    setEditingGem(gem.name);
    setEditedMetal(gem.metal);
    setEditedWeight(gem.weightRange);
  };

  const handleSave = (name: string) => {
    setDbList(prev => 
      prev.map(g => g.name === name ? { ...g, metal: editedMetal, weightRange: editedWeight } : g)
    );
    setEditingGem(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* KPI stats */}
      <div className="grid-4">
        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(243,156,18,0.1)', borderRadius: '10px', color: 'var(--accent-gold)' }}>
            <Users size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Active Clients</h4>
            <h2 style={{ fontSize: '1.6rem' }}>1,248</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(26,188,156,0.1)', borderRadius: '10px', color: 'var(--accent-teal)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Revenue</h4>
            <h2 style={{ fontSize: '1.6rem' }}>₹1,42,500</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(142,68,173,0.1)', borderRadius: '10px', color: 'var(--accent-purple)' }}>
            <BarChart size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Total Consultations</h4>
            <h2 style={{ fontSize: '1.6rem' }}>384</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(231,76,60,0.1)', borderRadius: '10px', color: 'var(--accent-red)' }}>
            <Award size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Success Index</h4>
            <h2 style={{ fontSize: '1.6rem' }}>96.8%</h2>
          </div>
        </div>
      </div>

      {/* SVG charts */}
      <div className="grid-2">
        {/* Revenue Trend */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>✦ Consultation Revenue Cycle (Last 6 Months)</h3>
          
          <div style={{ height: '200px', width: '100%', padding: '10px' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Background horizontal gridlines */}
              <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

              {/* Area path */}
              <path
                d="M 40,170 Q 120,130 200,100 T 360,60 T 480,40 L 480,170 Z"
                fill="rgba(142, 68, 173, 0.15)"
                stroke="none"
              />

              {/* Line path */}
              <path
                d="M 40,170 Q 120,130 200,100 T 360,60 T 480,40"
                fill="none"
                stroke="var(--accent-purple)"
                strokeWidth="3"
              />

              {/* Dots on nodes */}
              <circle cx="120" cy="135" r="4" fill="var(--accent-gold)" />
              <circle cx="200" cy="100" r="4" fill="var(--accent-gold)" />
              <circle cx="280" cy="80" r="4" fill="var(--accent-gold)" />
              <circle cx="360" cy="60" r="4" fill="var(--accent-gold)" />
              <circle cx="440" cy="48" r="4" fill="var(--accent-gold)" />

              {/* X Axis labels */}
              <text x="40" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jan</text>
              <text x="120" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Feb</text>
              <text x="200" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Mar</text>
              <text x="280" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Apr</text>
              <text x="360" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">May</text>
              <text x="440" y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Jun</text>

              {/* Y Axis labels */}
              <text x="30" y="34" fill="var(--text-muted)" fontSize="10" textAnchor="end">₹30k</text>
              <text x="30" y="84" fill="var(--text-muted)" fontSize="10" textAnchor="end">₹20k</text>
              <text x="30" y="134" fill="var(--text-muted)" fontSize="10" textAnchor="end">₹10k</text>
              <text x="30" y="174" fill="var(--text-muted)" fontSize="10" textAnchor="end">0</text>
            </svg>
          </div>
        </div>

        {/* Gemstone Popularity */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>✦ Most Prescribed Gemstones</h3>
          
          <div style={{ height: '200px', width: '100%', padding: '10px' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Bar chart rendering */}
              <rect x="50" y="60" width="35" height="110" rx="3" fill="rgba(243, 156, 18, 0.75)" />
              <rect x="130" y="90" width="35" height="80" rx="3" fill="rgba(26, 188, 156, 0.75)" />
              <rect x="210" y="40" width="35" height="130" rx="3" fill="rgba(142, 68, 173, 0.75)" />
              <rect x="290" y="110" width="35" height="60" rx="3" fill="rgba(231, 76, 60, 0.75)" />
              <rect x="370" y="125" width="35" height="45" rx="3" fill="rgba(255, 255, 255, 0.3)" />

              <line x1="30" y1="170" x2="470" y2="170" stroke="rgba(255,255,255,0.15)" />

              {/* Prescriptions counts */}
              <text x="67" y="50" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">110</text>
              <text x="147" y="80" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">80</text>
              <text x="227" y="30" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">145</text>
              <text x="307" y="100" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">60</text>
              <text x="387" y="115" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">45</text>

              {/* Labels */}
              <text x="67" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Yellow Sapphire</text>
              <text x="147" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Emerald</text>
              <text x="227" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Ruby</text>
              <text x="307" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Pearl</text>
              <text x="387" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Others</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Gemstone DB editor */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} /> Gemstone Database Configuration Editor
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-purple)' }}>
              <th style={{ padding: '10px' }}>Gemstone Name</th>
              <th style={{ padding: '10px' }}>Ruling Planet</th>
              <th style={{ padding: '10px' }}>Metal Required</th>
              <th style={{ padding: '10px' }}>Carats Range</th>
              <th style={{ padding: '10px' }}>Configure</th>
            </tr>
          </thead>
          <tbody>
            {dbList.map(gem => (
              <tr key={gem.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{gem.name} ({gem.hindiName})</td>
                <td style={{ padding: '10px' }}>{gem.planet}</td>
                <td style={{ padding: '10px' }}>
                  {editingGem === gem.name ? (
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ padding: '4px 8px', fontSize: '0.85rem' }} 
                      value={editedMetal} 
                      onChange={(e) => setEditedMetal(e.target.value)} 
                    />
                  ) : gem.metal}
                </td>
                <td style={{ padding: '10px' }}>
                  {editingGem === gem.name ? (
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ padding: '4px 8px', fontSize: '0.85rem' }} 
                      value={editedWeight} 
                      onChange={(e) => setEditedWeight(e.target.value)} 
                    />
                  ) : gem.weightRange}
                </td>
                <td style={{ padding: '10px' }}>
                  {editingGem === gem.name ? (
                    <button 
                      onClick={() => handleSave(gem.name)}
                      className="btn btn-primary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      <Check size={12} /> Save
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(gem)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      Edit Row
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
