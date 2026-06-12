import { useState, useEffect } from 'react';
import { calculateKundali, KundaliResult } from './engine/astrology';
import { recommendGemstones, RecommendationOutput } from './engine/gemstones';
import { ProfileManager } from './components/ProfileManager';
import { BirthChart } from './components/BirthChart';
import { RemediesEngine } from './components/RemediesEngine';
import { ConsultationRec } from './components/ConsultationRec';
import { AstrologerCRM } from './components/AstrologerCRM';
import { GemstoneDb } from './components/GemstoneDb';
import { Chatbot } from './components/Chatbot';
import { Dashboard } from './components/Dashboard';
import { 
  Sparkles, Calendar, Award, ShieldAlert, FileText, 
  Printer, Moon, Compass, Database, User, BarChart, MessageSquare, Mic 
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<
    'horoscope' | 'remedies' | 'recorder' | 'assistant' | 'crm' | 'database' | 'admin'
  >('horoscope');

  const [clientName, setClientName] = useState('Pushkar Kumar');
  const [dob, setDob] = useState('1996-10-10');
  const [activeKundali, setActiveKundali] = useState<KundaliResult | null>(null);
  const [gemstoneRecs, setGemstoneRecs] = useState<RecommendationOutput | null>(null);

  // Initialize with a beautiful default chart so the user is wowed immediately
  useEffect(() => {
    const defaultChart = calculateKundali('1996-10-10', '10:30', 'New Delhi, India', 28.6139, 77.2090);
    setActiveKundali(defaultChart);
    setGemstoneRecs(recommendGemstones(defaultChart));
  }, []);

  const handleCalculate = (result: KundaliResult, name: string, dateOfBirth: string) => {
    setActiveKundali(result);
    setClientName(name);
    setDob(dateOfBirth);
    setGemstoneRecs(recommendGemstones(result));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Platform Header */}
      <header className="app-header no-print">
        <div className="logo-container" onClick={() => setActiveTab('horoscope')}>
          <Compass size={32} style={{ color: 'var(--accent-gold)' }} />
          <div>
            <span className="logo-text">HOROGEM</span>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '2px', fontWeight: 'bold' }}>
              VEDIC COSMOLOGY + CRM
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'horoscope' ? 'active' : ''}`}
            onClick={() => setActiveTab('horoscope')}
          >
            <Compass size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Horoscope & Gems
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'remedies' ? 'active' : ''}`}
            onClick={() => setActiveTab('remedies')}
          >
            <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Alternative Remedies
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'recorder' ? 'active' : ''}`}
            onClick={() => setActiveTab('recorder')}
          >
            <Mic size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Consultation Recorder
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveTab('assistant')}
          >
            <MessageSquare size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            AI Assistant
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <User size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Astrologer CRM
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <Database size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Gemstone Catalog
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <BarChart size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Admin Panel
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* TAB 1: Horoscope & Gemstones */}
        {activeTab === 'horoscope' && activeKundali && gemstoneRecs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Top Row: Data Entry & Birth Chart Side by Side */}
            <div className="grid-2">
              <div className="no-print">
                <ProfileManager onCalculate={handleCalculate} />
              </div>
              <div>
                <BirthChart kundali={activeKundali} />
              </div>
            </div>

            {/* Print trigger block */}
            <div className="glass-panel no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>Generate Consultation Report</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Download a printable PDF detailing the Birth Chart, Dasha cycles, Gemstone wear guidelines, and Lal Kitab cures.
                </p>
              </div>
              <button onClick={handlePrint} className="btn btn-primary">
                <Printer size={16} /> Print / Save PDF Report
              </button>
            </div>

            {/* Print-only Invoice/Report Header */}
            <div className="print-only" style={{ display: 'none', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '16px', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>HOROGEM CONSULTATION REPORT</h1>
              <p>Client Name: <strong>{clientName}</strong> | Birth Date: {dob}</p>
              <p>Lagna Ascendant: {activeKundali.lagna} | Rashi Moon Sign: {activeKundali.rashi} | Nakshatra: {activeKundali.nakshatra}</p>
            </div>

            {/* Bottom Row: Detailed Results & Recommendations */}
            <div className="grid-2">
              
              {/* Left Column: Gemstone Suitability details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ borderTop: '5px solid var(--accent-gold)' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} /> Gemstone Recommendations
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Primary stone */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                          Primary: {gemstoneRecs.primary.name} ({gemstoneRecs.primary.hindiName})
                        </h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{gemstoneRecs.primary.planet}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                        <strong>Reason:</strong> {gemstoneRecs.primaryReason}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        <strong>Wearing Method:</strong> Wear in {gemstoneRecs.primary.metal} on the {gemstoneRecs.primary.finger} on {gemstoneRecs.primary.day}. Weight: {gemstoneRecs.primary.weightRange}.
                      </p>
                    </div>

                    {/* Secondary stone */}
                    {gemstoneRecs.secondary && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-teal)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Secondary: {gemstoneRecs.secondary.name} ({gemstoneRecs.secondary.hindiName})
                          </h4>
                          <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>{gemstoneRecs.secondary.planet}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          <strong>Reason:</strong> {gemstoneRecs.secondaryReason}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                          <strong>Wearing Method:</strong> Wear in {gemstoneRecs.secondary.metal} on the {gemstoneRecs.secondary.finger} on {gemstoneRecs.secondary.day}. Weight: {gemstoneRecs.secondary.weightRange}.
                        </p>
                      </div>
                    )}

                    {/* Tertiary stone */}
                    {gemstoneRecs.tertiary && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-purple)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            Tertiary: {gemstoneRecs.tertiary.name} ({gemstoneRecs.tertiary.hindiName})
                          </h4>
                          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{gemstoneRecs.tertiary.planet}</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          <strong>Reason:</strong> {gemstoneRecs.tertiaryReason}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                          <strong>Wearing Method:</strong> Wear in {gemstoneRecs.tertiary.metal} on the {gemstoneRecs.tertiary.finger} on {gemstoneRecs.tertiary.day}. Weight: {gemstoneRecs.tertiary.weightRange}.
                        </p>
                      </div>
                    )}

                    {/* Avoid list */}
                    {gemstoneRecs.avoid.length > 0 && (
                      <div style={{ background: 'rgba(231,76,60,0.04)', border: '1px solid rgba(231,76,60,0.15)', padding: '16px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                          <ShieldAlert size={16} /> Gemstones to STRICTLY Avoid
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {gemstoneRecs.avoid.map((a, idx) => (
                            <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              • <strong>{a.stone.name} ({a.stone.hindiName})</strong>: {a.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doshas & Yogas analysis */}
                <div className="glass-panel">
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>✦ Planetary Dosha & Yoga Manifests</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.manglik.active ? 'rgba(231,76,60,0.08)' : 'rgba(26,188,156,0.08)', border: activeKundali.doshas.manglik.active ? '1px solid rgba(231,76,60,0.2)' : '1px solid rgba(26,188,156,0.2)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Manglik Status: {activeKundali.doshas.manglik.active ? `ACTIVE (${activeKundali.doshas.manglik.severity} Severity)` : 'No Dosha'}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{activeKundali.doshas.manglik.description}</p>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.sadesati.active ? 'rgba(243,156,18,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        Saturn Sade Sati: {activeKundali.doshas.sadesati.active ? 'ACTIVE' : 'In-active'}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{activeKundali.doshas.sadesati.description}</p>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>Active Yogas Detected</h4>
                      <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {activeKundali.yogas.filter(y => y.active).map((y, idx) => (
                          <li key={idx}><strong>{y.name}</strong>: {y.description}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Planetary Positions & Dasha Timelines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* Planet Strength Report */}
                <div className="glass-panel">
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-purple)', marginBottom: '16px' }}>
                    ✦ Planet Strength & Positions Report
                  </h3>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent-gold)' }}>
                        <th style={{ padding: '8px' }}>Planet</th>
                        <th style={{ padding: '8px' }}>Zodiac Sign</th>
                        <th style={{ padding: '8px' }}>Degree</th>
                        <th style={{ padding: '8px' }}>House</th>
                        <th style={{ padding: '8px' }}>Shadbala Strength</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeKundali.planetaryPositions.map(p => (
                        <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '8px', fontWeight: 'bold' }}>
                            {p.name} {p.isRetrograde && <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>(R)</span>}
                          </td>
                          <td style={{ padding: '8px' }}>{p.sign}</td>
                          <td style={{ padding: '8px' }}>{p.degree}°</td>
                          <td style={{ padding: '8px' }}>House {p.house}</td>
                          <td style={{ padding: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', width: '50px' }}>
                                <div style={{ background: p.strength > 75 ? 'var(--accent-teal)' : p.strength < 40 ? 'var(--accent-red)' : 'var(--accent-gold)', width: `${p.strength}%`, height: '100%', borderRadius: '3px' }} />
                              </div>
                              <span>{p.strength}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Dasha Analysis Timeline */}
                <div className="glass-panel">
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>
                    ✦ Vimshottari Dasha Chronology (100 Years)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Vimshottari Dasha shows the planetary cycles ruling your lifetime milestones.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                    {activeKundali.dashas.map((d, idx) => {
                      const isCurrent = d.subDashas && d.subDashas.length > 0;
                      return (
                        <div 
                          key={idx}
                          style={{
                            padding: '12px',
                            background: isCurrent ? 'rgba(142, 68, 173, 0.08)' : 'rgba(255,255,255,0.01)',
                            border: isCurrent ? '1px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.03)',
                            borderRadius: '8px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9rem' }}>
                            <span style={{ color: isCurrent ? 'var(--accent-purple)' : '#fff' }}>
                              {d.lord} Mahadasha {isCurrent && <span className="badge badge-purple" style={{ fontSize: '0.6rem', padding: '2px 6px', marginLeft: '6px' }}>Active</span>}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {new Date(d.start).getFullYear()} - {new Date(d.end).getFullYear()}
                            </span>
                          </div>
                          
                          {isCurrent && d.subDashas && (
                            <div style={{ marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                              <h5 style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '6px' }}>Antardasha breakdown:</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {d.subDashas.map((sub, sIdx) => {
                                  const now = new Date();
                                  const isSubActive = sub.start <= now && sub.end >= now;
                                  return (
                                    <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '2px 6px', background: isSubActive ? 'rgba(243,156,18,0.1)' : 'transparent', borderRadius: '4px' }}>
                                      <span style={{ fontWeight: isSubActive ? 'bold' : 'normal' }}>
                                        {sub.lord} {isSubActive && '•'}
                                      </span>
                                      <span style={{ color: 'var(--text-muted)' }}>
                                        until {new Date(sub.end).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: Alternative Remedies */}
        {activeTab === 'remedies' && activeKundali && (
          <RemediesEngine kundali={activeKundali} />
        )}

        {/* TAB 3: Consultation Recorder */}
        {activeTab === 'recorder' && (
          <ConsultationRec activeClientName={clientName} />
        )}

        {/* TAB 4: AI Assistant */}
        {activeTab === 'assistant' && (
          <Chatbot kundali={activeKundali} clientName={clientName} />
        )}

        {/* TAB 5: Astrologer CRM */}
        {activeTab === 'crm' && (
          <AstrologerCRM onLoadClient={handleCalculate} />
        )}

        {/* TAB 6: Gemstone database */}
        {activeTab === 'database' && (
          <GemstoneDb />
        )}

        {/* TAB 7: Admin Panel */}
        {activeTab === 'admin' && (
          <Dashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '40px' }}>
        HOROGEM Astrology CRM and Recommendation Suite © 2026. Made with Vanilla CSS, Canvas, Web Audio API, and React.
      </footer>
    </div>
  );
}

export default App;
