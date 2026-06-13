import React, { useState } from 'react';
import { GEMSTONE_DB, Gemstone } from '../engine/gemstones';
import { BarChart, Users, DollarSign, Award, Settings, Check } from 'lucide-react';

interface DashboardProps {
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    kpiUsers: 'Active Clients',
    kpiRevenue: 'Total Revenue',
    kpiConsults: 'Total Consultations',
    kpiSuccess: 'Success Index',
    chartRevTitle: '✦ Consultation Revenue Cycle (Last 6 Months)',
    chartPopTitle: '✦ Most Prescribed Gemstones',
    editorTitle: '✦ Gemstone Database Configuration Editor',
    colName: 'Gemstone Name',
    colPlanet: 'Ruling Planet',
    colMetal: 'Metal Required',
    colCarats: 'Carats Range',
    colConfig: 'Configure',
    saveBtn: 'Save',
    editBtn: 'Edit Row'
  },
  hi: {
    kpiUsers: 'सक्रिय ग्राहक',
    kpiRevenue: 'कुल संचित आय',
    kpiConsults: 'कुल परामर्श सत्र',
    kpiSuccess: 'सफलता सूचकांक',
    chartRevTitle: '✦ परामर्श आय चक्र (विगत ६ माह)',
    chartPopTitle: '✦ सर्वाधिक अनुशंसित रत्न',
    editorTitle: '✦ रत्न डेटाबेस विन्यास संपादक (व्यवस्थापक)',
    colName: 'रत्न का नाम',
    colPlanet: 'संबद्ध ग्रह',
    colMetal: 'आवश्यक धातु',
    colCarats: 'रत्ती वजन सीमा',
    colConfig: 'संपादित करें',
    saveBtn: 'सहेजें',
    editBtn: 'बदलाव करें'
  }
};

const PLANETS_HI: { [key: string]: string } = {
  Sun: 'सूर्य', Moon: 'चन्द्र', Mars: 'मंगल', Mercury: 'बुध',
  Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु'
};

const MONTHS_HI = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const GEMS_HI: { [key: string]: string } = {
  'Yellow Sapphire': 'पीला पुखराज',
  'Emerald': 'पन्ना',
  'Ruby': 'माणिक',
  'Pearl': 'मोती',
  'Others': 'अन्य'
};

export const Dashboard: React.FC<DashboardProps> = ({ lang }) => {
  const [dbList, setDbList] = useState<Gemstone[]>(Object.values(GEMSTONE_DB));
  const [editingGem, setEditingGem] = useState<string | null>(null);
  const [editedMetal, setEditedMetal] = useState('');
  const [editedWeight, setEditedWeight] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('horogem_gemini_api_key') || '');

  const t = TRANSLATIONS[lang];

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
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.kpiUsers}</h4>
            <h2 style={{ fontSize: '1.6rem' }}>1,248</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(26,188,156,0.1)', borderRadius: '10px', color: 'var(--accent-teal)' }}>
            <DollarSign size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.kpiRevenue}</h4>
            <h2 style={{ fontSize: '1.6rem' }}>₹1,42,500</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(142,68,173,0.1)', borderRadius: '10px', color: 'var(--accent-purple)' }}>
            <BarChart size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.kpiConsults}</h4>
            <h2 style={{ fontSize: '1.6rem' }}>384</h2>
          </div>
        </div>

        <div className="glass-panel" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ padding: '12px', background: 'rgba(231,76,60,0.1)', borderRadius: '10px', color: 'var(--accent-red)' }}>
            <Award size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.kpiSuccess}</h4>
            <h2 style={{ fontSize: '1.6rem' }}>96.8%</h2>
          </div>
        </div>
      </div>

      {/* SVG charts */}
      <div className="grid-2">
        {/* Revenue Trend */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{t.chartRevTitle}</h3>
          
          <div style={{ height: '200px', width: '100%', padding: '10px' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.05)" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.1)" />

              <path
                d="M 40,170 L 120,135 L 200,100 L 280,80 L 360,60 L 440,48 L 440,170 Z"
                fill="rgba(142, 68, 173, 0.15)"
                stroke="none"
              />

              <path
                d="M 40,170 L 120,135 L 200,100 L 280,80 L 360,60 L 440,48"
                fill="none"
                stroke="var(--accent-purple)"
                strokeWidth="3"
              />

              <circle cx="40" cy="170" r="4" fill="var(--accent-gold)" />
              <circle cx="120" cy="135" r="4" fill="var(--accent-gold)" />
              <circle cx="200" cy="100" r="4" fill="var(--accent-gold)" />
              <circle cx="280" cy="80" r="4" fill="var(--accent-gold)" />
              <circle cx="360" cy="60" r="4" fill="var(--accent-gold)" />
              <circle cx="440" cy="48" r="4" fill="var(--accent-gold)" />

              {/* X Axis labels */}
              {(lang === 'hi' ? MONTHS_HI : MONTHS_EN).map((m, idx) => (
                <text key={idx} x={40 + idx * 80} y="190" fill="var(--text-muted)" fontSize="10" textAnchor="middle">{m}</text>
              ))}

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
          <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{t.chartPopTitle}</h3>
          
          <div style={{ height: '200px', width: '100%', padding: '10px' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              <rect x="50" y="60" width="35" height="110" rx="3" fill="rgba(243, 156, 18, 0.75)" />
              <rect x="130" y="90" width="35" height="80" rx="3" fill="rgba(26, 188, 156, 0.75)" />
              <rect x="210" y="40" width="35" height="130" rx="3" fill="rgba(142, 68, 173, 0.75)" />
              <rect x="290" y="110" width="35" height="60" rx="3" fill="rgba(231, 76, 60, 0.75)" />
              <rect x="370" y="125" width="35" height="45" rx="3" fill="rgba(255, 255, 255, 0.3)" />

              <line x1="30" y1="170" x2="470" y2="170" stroke="rgba(255,255,255,0.15)" />

              <text x="67" y="50" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">110</text>
              <text x="147" y="80" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">80</text>
              <text x="227" y="30" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">145</text>
              <text x="307" y="100" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">60</text>
              <text x="387" y="115" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">45</text>

              {/* Labels */}
              <text x="67" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{lang === 'hi' ? GEMS_HI['Yellow Sapphire'] : 'Yellow Sapphire'}</text>
              <text x="147" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{lang === 'hi' ? GEMS_HI['Emerald'] : 'Emerald'}</text>
              <text x="227" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{lang === 'hi' ? GEMS_HI['Ruby'] : 'Ruby'}</text>
              <text x="307" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{lang === 'hi' ? GEMS_HI['Pearl'] : 'Pearl'}</text>
              <text x="387" y="186" fill="var(--text-secondary)" fontSize="10" textAnchor="middle">{lang === 'hi' ? GEMS_HI['Others'] : 'Others'}</text>
            </svg>
          </div>
        </div>
      </div>

      {/* Gemstone DB editor */}
      <div className="glass-panel">
        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} /> {t.editorTitle}
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-purple)' }}>
              <th style={{ padding: '10px' }}>{t.colName}</th>
              <th style={{ padding: '10px' }}>{t.colPlanet}</th>
              <th style={{ padding: '10px' }}>{t.colMetal}</th>
              <th style={{ padding: '10px' }}>{t.colCarats}</th>
              <th style={{ padding: '10px' }}>{t.colConfig}</th>
            </tr>
          </thead>
          <tbody>
            {dbList.map(gem => (
              <tr key={gem.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{lang === 'hi' ? gem.hindiName : gem.name} ({gem.hindiName})</td>
                <td style={{ padding: '10px' }}>{lang === 'hi' ? PLANETS_HI[gem.planet] : gem.planet}</td>
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
                      <Check size={12} /> {t.saveBtn}
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEdit(gem)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      {t.editBtn}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gemini API Key Configuration Section */}
      <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-gold)' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} /> {lang === 'hi' ? 'लाइव एआई खोज विन्यास (Gemini API Configuration)' : 'Live AI Search Configuration (Gemini)'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '450px' }}>
          <label className="form-label" style={{ fontWeight: '600' }}>
            {lang === 'hi' ? 'अपनी Gemini API Key दर्ज करें:' : 'Your Gemini API Key:'}
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="password"
              className="form-input"
              style={{ flexGrow: 1 }}
              placeholder={lang === 'hi' ? 'Gemini API Key दर्ज करें...' : 'Enter Gemini API Key...'}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('horogem_gemini_api_key', e.target.value);
              }}
            />
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
            {lang === 'hi'
              ? '✦ यह एपीआई कुंजी चैटबॉट (AI Assistant) में सामान्य ज्योतिषीय प्रश्नों के लिए लाइव एआई फॉलबैक सर्च को सक्षम करती है।'
              : '✦ Setting your API key here enables live fallback AI search in the Chatbot assistant for questions not matched by local rules.'}
          </p>
        </div>
      </div>

    </div>
  );
};
