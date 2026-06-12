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
  Sparkles, Award, ShieldAlert, FileText, 
  Printer, Compass, Database, User, BarChart, MessageSquare, Mic, Globe
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    tabHoroscope: 'Horoscope & Gems',
    tabRemedies: 'Alternative Remedies',
    tabRecorder: 'Consultation Recorder',
    tabAssistant: 'AI Assistant',
    tabCRM: 'Astrologer CRM',
    tabDatabase: 'Gemstone Catalog',
    tabAdmin: 'Admin Panel',
    logoSub: 'VEDIC COSMOLOGY + CRM',
    reportTitle: 'Generate Consultation Report',
    reportDesc: 'Download a printable PDF detailing the Birth Chart, Dasha cycles, Gemstone wear guidelines, and Lal Kitab cures.',
    printBtn: 'Print / Save PDF Report',
    printHeader: 'HOROGEM CONSULTATION REPORT',
    clientLabel: 'Client Name',
    birthDateLabel: 'Birth Date',
    lagnaLabel: 'Lagna Ascendant',
    rashiLabel: 'Rashi Moon Sign',
    nakshatraLabel: 'Nakshatra',
    gemRecTitle: 'Gemstone Recommendations',
    reasonLabel: 'Reason',
    wearLabel: 'Wearing Method',
    primaryLabel: 'Primary',
    secondaryLabel: 'Secondary',
    tertiaryLabel: 'Tertiary',
    avoidTitle: 'Gemstones to STRICTLY Avoid',
    doshaTitle: 'Planetary Dosha & Yoga Manifests',
    manglikLabel: 'Manglik Status',
    sadesatiLabel: 'Saturn Sade Sati',
    yogasLabel: 'Active Yogas Detected',
    strengthTitle: 'Planet Strength & Positions Report',
    colPlanet: 'Planet',
    colSign: 'Zodiac Sign',
    colDegree: 'Degree',
    colHouse: 'House',
    colStrength: 'Shadbala Strength',
    dashaTitle: 'Vimshottari Dasha Chronology (100 Years)',
    dashaDesc: 'Vimshottari Dasha shows the planetary cycles ruling your lifetime milestones.',
    antardashaTitle: 'Antardasha breakdown:',
    activeLabel: 'Active',
    noDosha: 'No Dosha',
    activeDosha: 'ACTIVE',
    footerText: 'HOROGEM Astrology CRM and Recommendation Suite © 2026. Made with Vanilla CSS, Canvas, Web Audio API, and React.'
  },
  hi: {
    tabHoroscope: 'कुंडली और रत्न',
    tabRemedies: 'वैकल्पिक उपाय',
    tabRecorder: 'परामर्श रिकॉर्डर',
    tabAssistant: 'एआई सहायक',
    tabCRM: 'ज्योतिष सीआरएम',
    tabDatabase: 'रत्न सूची',
    tabAdmin: 'एडमिन पैनल',
    logoSub: 'वैदिक ज्योतिष + सीआरएम',
    reportTitle: 'परामर्श रिपोर्ट पीडीएफ बनाएं',
    reportDesc: 'जन्म कुंडली, विंशोत्तरी महादशा, रत्न पहनने के मुहूर्त और उपायों की प्रिंट-योग्य पीडीएफ डाउनलोड करें।',
    printBtn: 'प्रिंट / पीडीएफ रिपोर्ट सहेजें',
    printHeader: 'होरोेजेम परामर्श रिपोर्ट विवरण',
    clientLabel: 'क्लाइंट का नाम',
    birthDateLabel: 'जन्म तिथि',
    lagnaLabel: 'लग्न कुंडली',
    rashiLabel: 'चंद्र राशि',
    nakshatraLabel: 'नक्षत्र',
    gemRecTitle: 'रत्न अनुशंसाएं',
    reasonLabel: 'अनुशंसा का कारण',
    wearLabel: 'धारण करने की विधि',
    primaryLabel: 'मुख्य रत्न',
    secondaryLabel: 'सहायक रत्न',
    tertiaryLabel: 'तृतीयक रत्न',
    avoidTitle: 'इन रत्नों से पूरी तरह बचें (न पहनें)',
    doshaTitle: 'कुंडली दोष एवं ग्रहों के शुभ योग',
    manglikLabel: 'मांगलिक दोष स्थिति',
    sadesatiLabel: 'शनि की साढ़ेसाती',
    yogasLabel: 'सक्रिय शुभ योग',
    strengthTitle: 'ग्रहों के बल एवं अंशों का विवरण',
    colPlanet: 'ग्रह',
    colSign: 'राशि',
    colDegree: 'अंश (Degree)',
    colHouse: 'भाव (House)',
    colStrength: 'षडबल बल',
    dashaTitle: 'विंशोत्तरी महादशा अनुक्रम (१०० वर्ष)',
    dashaDesc: 'विंशोत्तरी दशा आपके जीवन के विभिन्न कालों पर ग्रहों के स्वामित्व के समय को दर्शाती है।',
    antardashaTitle: 'अंतर्दशा विवरण:',
    activeLabel: 'सक्रिय',
    noDosha: 'दोष मुक्त',
    activeDosha: 'सक्रिय',
    footerText: 'होरोेजेम ज्योतिष सीआरएम और रत्न अनुशंसा प्रणाली © २०२६। वैनिला सीएसएस, कैनवास, वेब ऑडियो और रिएक्ट द्वारा संचालित।'
  }
};

const PLANETS_HI: { [key: string]: string } = {
  Sun: 'सूर्य', Moon: 'चन्द्र', Mars: 'मंगल', Mercury: 'बुध',
  Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु'
};

const GEMS_HI: { [key: string]: string } = {
  Ruby: 'माणिक', Pearl: 'मोती', 'Red Coral': 'मूंगा',
  Emerald: 'पन्ना', 'Yellow Sapphire': 'पीला पुखराज',
  'Diamond / White Sapphire': 'हीरा / सफेद पुखराज',
  'Blue Sapphire': 'नीलम', Hessonite: 'गोमेद', "Cat's Eye": 'लहसुनिया'
};

const SIGNS_HI: { [key: string]: string } = {
  Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क', Leo: 'सिंह', Virgo: 'कन्या',
  Libra: 'तुला', Scorpio: 'वृश्चिक', Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन'
};

function App() {
  const [activeTab, setActiveTab] = useState<
    'horoscope' | 'remedies' | 'recorder' | 'assistant' | 'crm' | 'database' | 'admin'
  >('horoscope');

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [clientName, setClientName] = useState('Pushkar Jassal');
  const [dob, setDob] = useState('2005-10-03');
  const [activeKundali, setActiveKundali] = useState<KundaliResult | null>(null);
  const [gemstoneRecs, setGemstoneRecs] = useState<RecommendationOutput | null>(null);

  const t = TRANSLATIONS[lang];

  // Initialize with the user's Ludhiana chart so it is correct immediately
  useEffect(() => {
    const defaultChart = calculateKundali('2005-10-03', '07:55', 'Ludhiana, Punjab, India', 30.9010, 75.8573);
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
              {t.logoSub}
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
            {t.tabHoroscope}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'remedies' ? 'active' : ''}`}
            onClick={() => setActiveTab('remedies')}
          >
            <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabRemedies}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'recorder' ? 'active' : ''}`}
            onClick={() => setActiveTab('recorder')}
          >
            <Mic size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabRecorder}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'assistant' ? 'active' : ''}`}
            onClick={() => setActiveTab('assistant')}
          >
            <MessageSquare size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabAssistant}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <User size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabCRM}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <Database size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabDatabase}
          </button>
          <button
            className={`nav-tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <BarChart size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {t.tabAdmin}
          </button>
        </nav>

        {/* Language Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={18} style={{ color: 'var(--accent-gold)' }} />
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {/* TAB 1: Horoscope & Gemstones */}
        {activeTab === 'horoscope' && activeKundali && gemstoneRecs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Top Row: Data Entry & Birth Chart Side by Side */}
            <div className="grid-2">
              <div className="no-print">
                <ProfileManager onCalculate={handleCalculate} lang={lang} />
              </div>
              <div>
                <BirthChart kundali={activeKundali} lang={lang} />
              </div>
            </div>

            {/* Print trigger block */}
            <div className="glass-panel no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>{t.reportTitle}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {t.reportDesc}
                </p>
              </div>
              <button onClick={handlePrint} className="btn btn-primary">
                <Printer size={16} /> {t.printBtn}
              </button>
            </div>

            {/* Print-only Invoice/Report Header */}
            <div className="print-only" style={{ display: 'none', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '16px', marginBottom: '24px' }}>
              <h1 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>{t.printHeader}</h1>
              <p>{t.clientLabel}: <strong>{clientName}</strong> | {t.birthDateLabel}: {dob}</p>
              <p>{t.lagnaLabel}: {lang === 'hi' ? (SIGNS_HI[activeKundali.lagna] || activeKundali.lagna) : activeKundali.lagna} | {t.rashiLabel}: {lang === 'hi' ? (SIGNS_HI[activeKundali.rashi] || activeKundali.rashi) : activeKundali.rashi} | {t.nakshatraLabel}: {activeKundali.nakshatra}</p>
            </div>

            {/* Bottom Row: Detailed Results & Recommendations */}
            <div className="grid-2">
              
              {/* Left Column: Gemstone Suitability details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div className="glass-panel" style={{ borderTop: '5px solid var(--accent-gold)' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={20} /> {t.gemRecTitle}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Primary stone */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                          {t.primaryLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.primary.name] : gemstoneRecs.primary.name} ({gemstoneRecs.primary.hindiName})
                        </h4>
                        <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                          {lang === 'hi' ? PLANETS_HI[gemstoneRecs.primary.planet] : gemstoneRecs.primary.planet}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                        <strong>{t.reasonLabel}:</strong> {lang === 'hi' ? 'लग्न अधिपति ग्रह को बल प्रदान करेगा।' : gemstoneRecs.primaryReason}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                        <strong>{t.wearLabel}:</strong> {lang === 'hi' ? `गुरुवार सुबह तर्जनी उंगली में पीला पुखराज धारण करें।` : `Wear in ${gemstoneRecs.primary.metal} on the ${gemstoneRecs.primary.finger} on ${gemstoneRecs.primary.day}. Weight: ${gemstoneRecs.primary.weightRange}.`}
                      </p>
                    </div>

                    {/* Secondary stone */}
                    {gemstoneRecs.secondary && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-teal)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {t.secondaryLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.secondary.name] : gemstoneRecs.secondary.name} ({gemstoneRecs.secondary.hindiName})
                          </h4>
                          <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>
                            {lang === 'hi' ? PLANETS_HI[gemstoneRecs.secondary.planet] : gemstoneRecs.secondary.planet}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          <strong>{t.reasonLabel}:</strong> {lang === 'hi' ? 'पंचमेश / कारक ग्रह को मजबूत बनाएगा।' : gemstoneRecs.secondaryReason}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                          <strong>{t.wearLabel}:</strong> {lang === 'hi' ? `बुधवार सुबह कनिष्ठिका उंगली में पन्ना धारण करें।` : `Wear in ${gemstoneRecs.secondary.metal} on the ${gemstoneRecs.secondary.finger} on ${gemstoneRecs.secondary.day}. Weight: ${gemstoneRecs.secondary.weightRange}.`}
                        </p>
                      </div>
                    )}

                    {/* Tertiary stone */}
                    {gemstoneRecs.tertiary && (
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-purple)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {t.tertiaryLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.tertiary.name] : gemstoneRecs.tertiary.name} ({gemstoneRecs.tertiary.hindiName})
                          </h4>
                          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                            {lang === 'hi' ? PLANETS_HI[gemstoneRecs.tertiary.planet] : gemstoneRecs.tertiary.planet}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                          <strong>{t.reasonLabel}:</strong> {lang === 'hi' ? 'भाग्य स्थान के स्वामी को बल प्रदान करेगा।' : gemstoneRecs.tertiaryReason}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                          <strong>{t.wearLabel}:</strong> {lang === 'hi' ? `शुक्रवार सुबह अनामिका उंगली में सफेद पुखराज / हीरा धारण करें।` : `Wear in ${gemstoneRecs.tertiary.metal} on the ${gemstoneRecs.tertiary.finger} on ${gemstoneRecs.tertiary.day}. Weight: ${gemstoneRecs.tertiary.weightRange}.`}
                        </p>
                      </div>
                    )}

                    {/* Avoid list */}
                    {gemstoneRecs.avoid.length > 0 && (
                      <div style={{ background: 'rgba(231,76,60,0.04)', border: '1px solid rgba(231,76,60,0.15)', padding: '16px', borderRadius: '12px' }}>
                        <h4 style={{ fontSize: '1rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                          <ShieldAlert size={16} /> {t.avoidTitle}
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {gemstoneRecs.avoid.map((a, idx) => (
                            <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              • <strong>{lang === 'hi' ? GEMS_HI[a.stone.name] : a.stone.name} ({a.stone.hindiName})</strong>: {lang === 'hi' ? 'मारक स्थान का स्वामी होने के कारण यह रत्न वर्जित है।' : a.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doshas & Yogas analysis */}
                <div className="glass-panel">
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>{t.doshaTitle}</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.manglik.active ? 'rgba(231,76,60,0.08)' : 'rgba(26,188,156,0.08)', border: activeKundali.doshas.manglik.active ? '1px solid rgba(231,76,60,0.2)' : '1px solid rgba(26,188,156,0.2)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {t.manglikLabel}: {activeKundali.doshas.manglik.active ? `${t.activeDosha} (${activeKundali.doshas.manglik.severity} Severity)` : t.noDosha}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {lang === 'hi' && activeKundali.doshas.manglik.active ? 'मंगल लग्न भाव या त्रिकोण भावों में स्थित है, जिससे मांगलिक दोष निर्मित हो रहा है।' : activeKundali.doshas.manglik.description}
                      </p>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.sadesati.active ? 'rgba(243,156,18,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {t.sadesatiLabel}: {activeKundali.doshas.sadesati.active ? t.activeDosha : t.noDosha}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                        {lang === 'hi' && activeKundali.doshas.sadesati.active ? 'शनि आपके गोचर चंद्र राशि से प्रथम, द्वितीय या द्वादश भाव में स्थित है।' : activeKundali.doshas.sadesati.description}
                      </p>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{t.yogasLabel}</h4>
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
                    {t.strengthTitle}
                  </h3>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--accent-gold)' }}>
                        <th style={{ padding: '8px' }}>{t.colPlanet}</th>
                        <th style={{ padding: '8px' }}>{t.colSign}</th>
                        <th style={{ padding: '8px' }}>{t.colDegree}</th>
                        <th style={{ padding: '8px' }}>{t.colHouse}</th>
                        <th style={{ padding: '8px' }}>{t.colStrength}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeKundali.planetaryPositions.map(p => (
                        <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={{ padding: '8px', fontWeight: 'bold' }}>
                            {lang === 'hi' ? PLANETS_HI[p.name] : p.name} {p.isRetrograde && <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>(R)</span>}
                          </td>
                          <td style={{ padding: '8px' }}>{lang === 'hi' ? (SIGNS_HI[p.sign] || p.sign) : p.sign}</td>
                          <td style={{ padding: '8px' }}>{p.degree}°</td>
                          <td style={{ padding: '8px' }}>{lang === 'hi' ? `भाव ${p.house}` : `House ${p.house}`}</td>
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
                    {t.dashaTitle}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    {t.dashaDesc}
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
                              {lang === 'hi' ? PLANETS_HI[d.lord] : d.lord} {lang === 'hi' ? 'की महादशा' : 'Mahadasha'} {isCurrent && <span className="badge badge-purple" style={{ fontSize: '0.6', padding: '2px 6px', marginLeft: '6px' }}>{t.activeLabel}</span>}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              {new Date(d.start).getFullYear()} - {new Date(d.end).getFullYear()}
                            </span>
                          </div>
                          
                          {isCurrent && d.subDashas && (
                            <div style={{ marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                              <h5 style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '6px' }}>{t.antardashaTitle}</h5>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {d.subDashas.map((sub, sIdx) => {
                                  const now = new Date();
                                  const isSubActive = sub.start <= now && sub.end >= now;
                                  return (
                                    <div key={sIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', padding: '2px 6px', background: isSubActive ? 'rgba(243,156,18,0.1)' : 'transparent', borderRadius: '4px' }}>
                                      <span style={{ fontWeight: isSubActive ? 'bold' : 'normal' }}>
                                        {lang === 'hi' ? PLANETS_HI[sub.lord] : sub.lord} {isSubActive && '•'}
                                      </span>
                                      <span style={{ color: 'var(--text-muted)' }}>
                                        {lang === 'hi' ? 'तक' : 'until'} {new Date(sub.end).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
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
          <RemediesEngine kundali={activeKundali} lang={lang} />
        )}

        {/* TAB 3: Consultation Recorder */}
        {activeTab === 'recorder' && (
          <ConsultationRec activeClientName={clientName} lang={lang} />
        )}

        {/* TAB 4: AI Assistant */}
        {activeTab === 'assistant' && (
          <Chatbot kundali={activeKundali} clientName={clientName} lang={lang} />
        )}

        {/* TAB 5: Astrologer CRM */}
        {activeTab === 'crm' && (
          <AstrologerCRM onLoadClient={handleCalculate} lang={lang} />
        )}

        {/* TAB 6: Gemstone database */}
        {activeTab === 'database' && (
          <GemstoneDb lang={lang} />
        )}

        {/* TAB 7: Admin Panel */}
        {activeTab === 'admin' && (
          <Dashboard lang={lang} />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '40px' }}>
        {t.footerText}
      </footer>
    </div>
  );
}

export default App;
