import React, { useState } from 'react';
import { GEMSTONE_DB, Gemstone } from '../engine/gemstones';
import { Search, Info, ShieldAlert, Check } from 'lucide-react';

export const GemstoneDb: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('All');

  const planets = ['All', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  const filteredGemstones = Object.values(GEMSTONE_DB).filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          gem.hindiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlanet = selectedPlanet === 'All' || gem.planet === selectedPlanet;
    return matchesSearch && matchesPlanet;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>
          ✦ Gemstone Knowledge Database
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search gemstone by English or Hindi name..."
              style={{ paddingLeft: '40px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          </div>

          <div style={{ minWidth: '150px' }}>
            <select
              className="form-select"
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
            >
              {planets.map(p => (
                <option key={p} value={p}>{p === 'All' ? 'Filter by Planet' : p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {filteredGemstones.map((gem: Gemstone) => (
          <div key={gem.name} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '4px solid var(--accent-purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                  {gem.name} <span style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 'normal' }}>({gem.hindiName})</span>
                </h3>
                <span className="badge badge-purple" style={{ marginTop: '6px' }}>{gem.planet}</span>
              </div>
            </div>

            <div className="details-list" style={{ fontSize: '0.9rem', gap: '8px' }}>
              <div className="details-item">
                <span className="details-key">Metal:</span>
                <span className="details-val">{gem.metal}</span>
              </div>
              <div className="details-item">
                <span className="details-key">Wearing Day:</span>
                <span className="details-val">{gem.day}</span>
              </div>
              <div className="details-item">
                <span className="details-key">Finger:</span>
                <span className="details-val">{gem.finger}</span>
              </div>
              <div className="details-item">
                <span className="details-key">Weight:</span>
                <span className="details-val">{gem.weightRange}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginBottom: '4px' }}>
                <Info size={14} /> Beej Mantra
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#fff', wordBreak: 'break-word' }}>"{gem.mantra}"</p>
            </div>

            <div style={{ flexGrow: 1 }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-teal)', marginBottom: '8px', borderBottom: '1px solid rgba(26,188,156,0.15)', paddingBottom: '4px' }}>
                Key Benefits
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                {gem.benefits.map((benefit, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <Check size={14} style={{ color: 'var(--accent-teal)', marginTop: '3px', flexShrink: 0 }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', color: '#e74c3c', marginBottom: '8px', borderBottom: '1px solid rgba(231,76,60,0.15)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={14} /> Side Effects
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                {gem.sideEffects.map((effect, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <span style={{ color: 'rgba(231,76,60,0.6)', marginTop: '2px', fontSize: '1.2rem', lineHeight: '1', flexShrink: 0 }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
              <strong>Ritual:</strong> {gem.wearingMethod}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
