import React, { useState } from 'react';
import { GEMSTONE_DB, Gemstone } from '../engine/gemstones';
import { Search, Info, ShieldAlert, Check } from 'lucide-react';

interface GemstoneDbProps {
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    title: '✦ Gemstone Knowledge Database',
    searchPlaceholder: 'Search gemstone by English or Hindi name...',
    filterLabel: 'Filter by Planet',
    metalLabel: 'Metal',
    dayLabel: 'Wearing Day',
    fingerLabel: 'Finger',
    weightLabel: 'Weight',
    mantraLabel: 'Beej Mantra',
    benefitsLabel: 'Key Benefits',
    sideEffectsLabel: 'Side Effects',
    ritualLabel: 'Ritual'
  },
  hi: {
    title: '✦ रत्न ज्ञानकोष डेटाबेस',
    searchPlaceholder: 'अंग्रेजी या हिंदी नाम से रत्न खोजें...',
    filterLabel: 'संबद्ध ग्रह से फ़िल्टर करें',
    metalLabel: 'धातु',
    dayLabel: 'धारण का दिन',
    fingerLabel: 'उंगली',
    weightLabel: 'रत्ती वजन',
    mantraLabel: 'बीज मंत्र',
    benefitsLabel: 'मुख्य लाभ',
    sideEffectsLabel: 'दुष्प्रभाव',
    ritualLabel: 'धारण विधि'
  }
};

const PLANETS_HI: { [key: string]: string } = {
  All: 'सभी ग्रह', Sun: 'सूर्य', Moon: 'चन्द्र', Mars: 'मंगल', Mercury: 'बुध',
  Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु'
};

const METALS_HI: { [key: string]: string } = {
  'Gold or Copper': 'सोना या तांबा',
  'Silver': 'चांदी',
  'Gold or Silver': 'सोना या चांदी',
  'Gold': 'सोना',
  'Gold or Platinum': 'सोना या प्लैटिनम',
  'Iron, Silver or White Gold': 'लोहा, चांदी या श्वेत स्वर्ण',
  'Silver or Panchdhatu': 'चांदी या पंचधातु'
};

const DAYS_HI: { [key: string]: string } = {
  'Sunday morning': 'रविवार सुबह (सूर्योदय)',
  'Monday morning': 'सोमवार सुबह',
  'Tuesday morning': 'मंगलवार सुबह',
  'Wednesday morning': 'बुधवार सुबह',
  'Thursday morning': 'गुरुवार सुबह',
  'Friday morning': 'शुक्रवार सुबह',
  'Saturday morning': 'शनिवार सुबह',
  'Saturday evening': 'शनिवार शाम (सूर्यास्त)',
  'Tuesday evening': 'मंगलवार शाम/रात'
};

const FINGERS_HI: { [key: string]: string } = {
  'Ring Finger': 'अनामिका (Ring Finger)',
  'Little Finger': 'कनिष्ठिका (Little Finger)',
  'Index Finger': 'तर्जनी (Index Finger)',
  'Middle Finger': 'मध्यमा (Middle Finger)',
  'Middle/Ring Finger': 'मध्यमा या अनामिका'
};

export const GemstoneDb: React.FC<GemstoneDbProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('All');

  const t = TRANSLATIONS[lang];
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
          {t.title}
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder={t.searchPlaceholder}
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
                <option key={p} value={p}>
                  {p === 'All' ? t.filterLabel : (lang === 'hi' ? PLANETS_HI[p] : p)}
                </option>
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
                <span className="badge badge-purple" style={{ marginTop: '6px' }}>
                  {lang === 'hi' ? PLANETS_HI[gem.planet] : gem.planet}
                </span>
              </div>
            </div>

            <div className="details-list" style={{ fontSize: '0.9rem', gap: '8px' }}>
              <div className="details-item">
                <span className="details-key">{t.metalLabel}:</span>
                <span className="details-val">{lang === 'hi' ? (METALS_HI[gem.metal] || gem.metal) : gem.metal}</span>
              </div>
              <div className="details-item">
                <span className="details-key">{t.dayLabel}:</span>
                <span className="details-val">{lang === 'hi' ? (DAYS_HI[gem.day] || gem.day) : gem.day}</span>
              </div>
              <div className="details-item">
                <span className="details-key">{t.fingerLabel}:</span>
                <span className="details-val">{lang === 'hi' ? (FINGERS_HI[gem.finger] || gem.finger) : gem.finger}</span>
              </div>
              <div className="details-item">
                <span className="details-key">{t.weightLabel}:</span>
                <span className="details-val">{gem.weightRange}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginBottom: '4px' }}>
                <Info size={14} /> {t.mantraLabel}
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#fff', wordBreak: 'break-word' }}>"{gem.mantra}"</p>
            </div>

            <div style={{ flexGrow: 1 }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-teal)', marginBottom: '8px', borderBottom: '1px solid rgba(26,188,156,0.15)', paddingBottom: '4px' }}>
                {t.benefitsLabel}
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
                <ShieldAlert size={14} /> {t.sideEffectsLabel}
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
              <strong>{t.ritualLabel}:</strong> {gem.wearingMethod}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
