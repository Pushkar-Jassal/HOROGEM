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
import { Matchmaking } from './components/Matchmaking';
import { 
  Sparkles, Award, ShieldAlert, Printer, Compass, 
  Database, User, BarChart, MessageSquare, Mic, Globe,
  Menu, ChevronLeft, ChevronRight, Sun, Moon, Heart,
  Settings, X
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    tabHoroscope: 'Horoscope & Gems',
    tabRemedies: 'Alternative Remedies',
    tabMatchmaking: 'Matchmaking (Gun Milan)',
    tabYogas: 'Planetary Yogas',
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
    lifeLabel: 'Life Stone (Lagnesh)',
    luckyLabel: 'Lucky Stone (Bhagyesh)',
    workLabel: 'Work Stone (Karmesh)',
    otherLabel: 'Other Stones',
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
    colState: 'State / Dignity',
    colStrength: 'Shadbala Strength',
    dashaTitle: 'Vimshottari Dasha Chronology (100 Years)',
    dashaDesc: 'Vimshottari Dasha shows the planetary cycles ruling your lifetime milestones.',
    antardashaTitle: 'Antardasha breakdown:',
    activeLabel: 'Active',
    noDosha: 'No Dosha',
    activeDosha: 'ACTIVE',
    footerText: 'HOROGEM made by Pushkar @2026'
  },
  hi: {
    tabHoroscope: 'कुंडली और रत्न',
    tabRemedies: 'वैकल्पिक उपाय',
    tabMatchmaking: 'कुंडली मिलान',
    tabYogas: 'कुंडली के योग',
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
    lifeLabel: 'जीवन रत्न (लग्नेश)',
    luckyLabel: 'भाग्य रत्न (भाग्येश)',
    workLabel: 'कार्य रत्न (कर्मेश)',
    otherLabel: 'अन्य शुभ रत्न',
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
    colState: 'अवस्था / गरिमा',
    colStrength: 'षडबल बल',
    dashaTitle: 'विंशोत्तरी महादशा अनुक्रम (१०० वर्ष)',
    dashaDesc: 'विंशोत्तरी दशा आपके जीवन के विभिन्न कालों पर ग्रहों के स्वामित्व के समय को दर्शाती है।',
    antardashaTitle: 'अंतर्दशा विवरण:',
    activeLabel: 'सक्रिय',
    noDosha: 'दोष मुक्त',
    activeDosha: 'सक्रिय',
    footerText: 'होरोेजेम - पुष्कर द्वारा निर्मित @२०२६'
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
  'Sunday morning': 'रविवार सुबह',
  'Monday morning': 'सोमवार सुबह',
  'Tuesday morning': 'मंगलवार सुबह',
  'Wednesday morning': 'बुधवार सुबह',
  'Thursday morning': 'गुरुवार सुबह',
  'Friday morning': 'शुक्रवार सुबह',
  'Saturday morning': 'शनिवार सुबह',
  'Saturday evening': 'शनिवार शाम',
  'Tuesday evening': 'मंगलवार शाम/रात'
};

const FINGERS_HI: { [key: string]: string } = {
  'Ring Finger': 'अनामिका उंगली',
  'Little Finger': 'कनिष्ठिका उंगली',
  'Index Finger': 'तर्जनी उंगली',
  'Middle Finger': 'मध्यमा उंगली',
  'Middle/Ring Finger': 'मध्यमा या अनामिका'
};

const translateReason = (reason: string, lagna: string, lang: 'en' | 'hi') => {
  if (lang === 'en') return reason;
  const lagnaHi = SIGNS_HI[lagna] || lagna;
  let res = reason;
  res = res.replace(/Yogakaraka planet for (\w+) Lagna\./g, `${lagnaHi} लग्न के लिए योगकारक ग्रह।`);
  res = res.replace(/Lagna Lord \(Ascendant Ruler\)\./g, 'लग्न स्वामी (तनु भाव अधिपति)।');
  res = res.replace(/Needs strength \(Planetary strength is low at (\d+)%\)\./g, (_, p) => `बल की आवश्यकता है (ग्रह बल ${p}% कम है)।`);
  res = res.replace(/Strong beneficial planet \((\d+)% strength\)\./g, (_, p) => `मजकूत शुभ ग्रह (${p}% बल)।`);
  return res;
};

const formatWearingMethodHi = (gem: any) => {
  if (!gem) return '';
  const metal = METALS_HI[gem.metal] || gem.metal;
  const finger = FINGERS_HI[gem.finger] || gem.finger;
  const day = DAYS_HI[gem.day] || gem.day;
  return `${day} को ${metal} की अंगूठी में ${finger} पर धारण करें। वजन: ${gem.weightRange}।`;
};

const translateAvoidReason = (reason: string, lagna: string, lang: 'en' | 'hi') => {
  if (lang === 'en') return reason;
  const lagnaHi = SIGNS_HI[lagna] || lagna;
  let res = reason;
  
  res = res.replace(/(\w+) is a Functional Malefic \(destructive lord\) for (\w+) Ascendant\. Wearing its gemstone can amplify negative traits\./g, 
    (_, planet, ascendant) => `${PLANETS_HI[planet] || planet} ${SIGNS_HI[ascendant] || ascendant} लग्न के लिए मारक/अशुभ ग्रह है। इसका रत्न पहनने से नकारात्मक परिणाम मिल सकते हैं।`);
    
  res = res.replace(/Although (\w+) is beneficial, it is placed in the negative (\d+)th house\. Wearing its gemstone is not recommended\./g, 
    (_, planet, house) => `यद्यपि ${PLANETS_HI[planet] || planet} शुभ है, लेकिन यह कुंडली के अशुभ ${house}वें भाव में स्थित है। इसका रत्न धारण करना वर्जित है।`);
    
  res = res.replace(/Rahu\/Ketu gemstones are shadow planet remedies and generally avoided\. Suitable only under specific Dasha cycles under expert guidance\./g,
    'राहु/केतु छाया ग्रह हैं और इनके रत्न सामान्यतः वर्जित हैं। इन्हें केवल विशेष दशा चक्रों में विशेषज्ञ की सलाह पर ही पहनें।');
    
  return res;
};

function App() {
  const [activeTab, setActiveTab] = useState<
    'horoscope' | 'remedies' | 'matchmaking' | 'yogas' | 'recorder' | 'assistant' | 'crm' | 'database'
  >('horoscope');

  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('horogem_gemini_api_key') || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [clientName, setClientName] = useState('Pushkar Jassal');
  const [dob, setDob] = useState('2005-10-03');
  const [activeKundali, setActiveKundali] = useState<KundaliResult | null>(null);
  const [gemstoneRecs, setGemstoneRecs] = useState<RecommendationOutput | null>(null);

  const t = TRANSLATIONS[lang];

  // Apply theme class to HTML node
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
    <div className="app-layout">
      {/* Collapsible Left Cosmic Profile Sidebar */}
      <aside className={`sidebar no-print ${isSidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Compass size={28} className="spin-slow" style={{ color: 'var(--accent-gold)' }} />
            {isSidebarOpen && (
              <span className="logo-text">HOROGEM</span>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="sidebar-toggle-btn"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isSidebarOpen && (
          <div className="sidebar-content">
            <ProfileManager onCalculate={handleCalculate} lang={lang} />
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="main-container">
        {/* Platform Header */}
        <header className="app-header no-print">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="btn-icon" 
                style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <Menu size={20} />
              </button>
            )}
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
              className={`nav-tab-btn ${activeTab === 'matchmaking' ? 'active' : ''}`}
              onClick={() => setActiveTab('matchmaking')}
            >
              <Heart size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {t.tabMatchmaking}
            </button>
            <button
              className={`nav-tab-btn ${activeTab === 'yogas' ? 'active' : ''}`}
              onClick={() => setActiveTab('yogas')}
            >
              <Award size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {t.tabYogas}
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

          </nav>

          {/* Theme & Language Selectors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="btn-icon theme-toggle-btn"
              aria-label="Toggle Theme"
              style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%', padding: '8px' }}
            >
              {theme === 'dark' ? <Sun size={18} style={{ color: 'var(--accent-gold)' }} /> : <Moon size={18} style={{ color: 'var(--accent-purple)' }} />}
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="btn-icon settings-toggle-btn"
              aria-label="Settings"
              style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '50%', padding: '8px' }}
            >
              <Settings size={18} style={{ color: 'var(--accent-gold)' }} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={16} style={{ color: 'var(--accent-gold)' }} />
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 'bold' }}
              >
                {lang === 'en' ? 'हिन्दी' : 'English'}
              </button>
            </div>
          </div>
        </header>

        <main className="main-content">
          {/* TAB 1: Horoscope & Gemstones */}
          {activeTab === 'horoscope' && activeKundali && gemstoneRecs && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Birth Chart display */}
              <div style={{ width: '100%' }}>
                <BirthChart kundali={activeKundali} lang={lang} theme={theme} />
              </div>

              {/* Print trigger block */}
              <div className="glass-panel no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{t.reportTitle}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
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
                      {/* Life stone */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: 0 }}>
                            {t.lifeLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.lifeStone.name] : gemstoneRecs.lifeStone.name} ({gemstoneRecs.lifeStone.hindiName})
                          </h4>
                          <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                            {lang === 'hi' ? PLANETS_HI[gemstoneRecs.lifeStone.planet] : gemstoneRecs.lifeStone.planet}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '8px' }}>
                          <strong>{t.reasonLabel}:</strong> {translateReason(gemstoneRecs.lifeStoneReason, activeKundali.lagna, lang)}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          <strong>{t.wearLabel}:</strong> {lang === 'hi' ? formatWearingMethodHi(gemstoneRecs.lifeStone) : `Wear in ${gemstoneRecs.lifeStone.metal} on the ${gemstoneRecs.lifeStone.finger} on ${gemstoneRecs.lifeStone.day}. Weight: ${gemstoneRecs.lifeStone.weightRange}.`}
                        </p>
                      </div>

                      {/* Lucky stone */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-teal)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: 0 }}>
                            {t.luckyLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.luckyStone.name] : gemstoneRecs.luckyStone.name} ({gemstoneRecs.luckyStone.hindiName})
                          </h4>
                          <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>
                            {lang === 'hi' ? PLANETS_HI[gemstoneRecs.luckyStone.planet] : gemstoneRecs.luckyStone.planet}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '8px' }}>
                          <strong>{t.reasonLabel}:</strong> {translateReason(gemstoneRecs.luckyStoneReason, activeKundali.lagna, lang)}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          <strong>{t.wearLabel}:</strong> {lang === 'hi' ? formatWearingMethodHi(gemstoneRecs.luckyStone) : `Wear in ${gemstoneRecs.luckyStone.metal} on the ${gemstoneRecs.luckyStone.finger} on ${gemstoneRecs.luckyStone.day}. Weight: ${gemstoneRecs.luckyStone.weightRange}.`}
                        </p>
                      </div>

                      {/* Work stone */}
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-purple)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: 0 }}>
                            {t.workLabel}: {lang === 'hi' ? GEMS_HI[gemstoneRecs.workStone.name] : gemstoneRecs.workStone.name} ({gemstoneRecs.workStone.hindiName})
                          </h4>
                          <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                            {lang === 'hi' ? PLANETS_HI[gemstoneRecs.workStone.planet] : gemstoneRecs.workStone.planet}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', marginBottom: '8px' }}>
                          <strong>{t.reasonLabel}:</strong> {translateReason(gemstoneRecs.workStoneReason, activeKundali.lagna, lang)}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                          <strong>{t.wearLabel}:</strong> {lang === 'hi' ? formatWearingMethodHi(gemstoneRecs.workStone) : `Wear in ${gemstoneRecs.workStone.metal} on the ${gemstoneRecs.workStone.finger} on ${gemstoneRecs.workStone.day}. Weight: ${gemstoneRecs.workStone.weightRange}.`}
                        </p>
                      </div>

                      {/* Other stones */}
                      {gemstoneRecs.otherStones.length > 0 && (
                        <div style={{ background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-teal-glow)' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0 0 10px 0', color: 'var(--accent-gold)' }}>
                            {t.otherLabel}
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {gemstoneRecs.otherStones.map((os, idx) => (
                              <div key={idx} style={{ borderBottom: idx < gemstoneRecs.otherStones.length - 1 ? '1px dashed rgba(255,255,255,0.05)' : 'none', paddingBottom: '8px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                  {lang === 'hi' ? GEMS_HI[os.stone.name] : os.stone.name} ({os.stone.hindiName})
                                </span>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                                  {translateReason(os.reason, activeKundali.lagna, lang)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Avoid list */}
                      {gemstoneRecs.avoid.length > 0 && (
                        <div style={{ background: 'rgba(231,76,60,0.04)', border: '1px solid rgba(231,76,60,0.15)', padding: '16px', borderRadius: '12px' }}>
                          <h4 style={{ fontSize: '1rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
                            <ShieldAlert size={16} /> {t.avoidTitle}
                          </h4>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {gemstoneRecs.avoid.map((a, idx) => (
                              <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                • <strong>{lang === 'hi' ? (GEMS_HI[a.stone.name] || a.stone.name) : a.stone.name} ({a.stone.hindiName})</strong>: {translateAvoidReason(a.reason, activeKundali.lagna, lang)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doshas & Yogas analysis summary */}
                  <div className="glass-panel">
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '16px' }}>{t.doshaTitle}</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.manglik.active ? 'rgba(231,76,60,0.08)' : 'rgba(26,188,156,0.08)', border: activeKundali.doshas.manglik.active ? '1px solid rgba(231,76,60,0.2)' : '1px solid rgba(26,188,156,0.2)' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
                          {t.manglikLabel}: {activeKundali.doshas.manglik.active ? `${t.activeDosha} (${activeKundali.doshas.manglik.severity} Severity)` : t.noDosha}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
                          {lang === 'hi' && activeKundali.doshas.manglik.active ? 'मंगल लग्न भाव या त्रिकोण भावों में स्थित है, जिससे मांगलिक दोष निर्मित हो रहा है।' : activeKundali.doshas.manglik.description}
                        </p>
                      </div>

                      <div style={{ padding: '12px', borderRadius: '8px', background: activeKundali.doshas.sadesati.active ? 'rgba(243,156,18,0.08)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>
                          {t.sadesatiLabel}: {activeKundali.doshas.sadesati.active ? t.activeDosha : t.noDosha}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
                          {lang === 'hi' && activeKundali.doshas.sadesati.active ? 'शनि आपके गोचर चंद्र राशि से प्रथम, द्वितीय या द्वादश भाव में स्थित है।' : activeKundali.doshas.sadesati.description}
                        </p>
                      </div>

                      <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-gold)', margin: 0 }}>{t.yogasLabel}</h4>
                        <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: 0 }}>
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
                          <th style={{ padding: '8px' }}>{t.colState}</th>
                          <th style={{ padding: '8px' }}>{t.colStrength}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeKundali.planetaryPositions.map(p => {
                          const badges: { text: string; color: string; bg: string }[] = [];
                          if (p.isRetrograde) {
                            badges.push({
                              text: lang === 'hi' ? 'वक्री' : 'Vakri (R)',
                              color: 'var(--accent-gold)',
                              bg: 'rgba(243, 156, 18, 0.1)'
                            });
                          }
                          if (p.isCombust) {
                            badges.push({
                              text: lang === 'hi' ? 'अस्त' : 'Ast (Combust)',
                              color: '#e74c3c',
                              bg: 'rgba(231, 76, 60, 0.1)'
                            });
                          }
                          if (p.isVargottama) {
                            badges.push({
                              text: lang === 'hi' ? 'वर्गोत्तम' : 'Vargottama',
                              color: 'var(--accent-purple)',
                              bg: 'rgba(155, 89, 182, 0.1)'
                            });
                          }
                          if (p.isExalted) {
                            badges.push({
                              text: lang === 'hi' ? 'उच्च' : 'Ucch (Exalted)',
                              color: 'var(--accent-teal)',
                              bg: 'rgba(26, 188, 156, 0.1)'
                            });
                          }
                          if (p.isDebilitated) {
                            badges.push({
                              text: lang === 'hi' ? 'नीच' : 'Neech (Debilitated)',
                              color: '#d35400',
                              bg: 'rgba(211, 84, 0, 0.1)'
                            });
                          }

                          return (
                            <tr key={p.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                              <td style={{ padding: '8px', fontWeight: 'bold' }}>
                                {lang === 'hi' ? PLANETS_HI[p.name] : p.name} {p.isRetrograde && <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem' }}>(R)</span>}
                              </td>
                              <td style={{ padding: '8px' }}>{lang === 'hi' ? (SIGNS_HI[p.sign] || p.sign) : p.sign}</td>
                              <td style={{ padding: '8px' }}>{p.degree}°</td>
                              <td style={{ padding: '8px' }}>{lang === 'hi' ? `भाव ${p.house}` : `House ${p.house}`}</td>
                              <td style={{ padding: '8px' }}>
                                {badges.length === 0 ? (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {lang === 'hi' ? 'सामान्य' : 'Normal'}
                                  </span>
                                ) : (
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    {badges.map((b, idx) => (
                                      <span
                                        key={idx}
                                        style={{
                                          fontSize: '0.7rem',
                                          fontWeight: 'bold',
                                          padding: '2px 6px',
                                          borderRadius: '4px',
                                          color: b.color,
                                          background: b.bg,
                                          border: `1px solid ${b.color}25`
                                        }}
                                      >
                                        {b.text}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td style={{ padding: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ flexGrow: 1, background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', width: '50px' }}>
                                    <div style={{ background: p.strength > 75 ? 'var(--accent-teal)' : p.strength < 40 ? 'var(--accent-red)' : 'var(--accent-gold)', width: `${p.strength}%`, height: '100%', borderRadius: '3px' }} />
                                  </div>
                                  <span>{p.strength}%</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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
                              background: isCurrent ? 'var(--accent-purple-glow)' : 'rgba(255,255,255,0.01)',
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
                                <h5 style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '6px', margin: 0 }}>{t.antardashaTitle}</h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
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

          {/* TAB 3: Matchmaking (Gun Milan) */}
          {activeTab === 'matchmaking' && (
            <Matchmaking lang={lang} />
          )}

          {/* TAB 4: Yogas */}
          {activeTab === 'yogas' && activeKundali && (
            <div className="glass-panel" style={{ borderTop: '5px solid var(--accent-gold)' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginBottom: '8px', marginTop: 0 }}>
                {lang === 'hi' ? 'सक्रिय एवं निष्क्रिय शुभ योग' : 'Classical Kundali Yogas'}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                {lang === 'hi'
                  ? 'वैदिक ज्योतिष में योग विशिष्ट ग्रहों की युति या दृष्टि से बनते हैं जो जीवन में सफलता, भाग्य और संपत्ति का निर्धारण करते हैं।'
                  : 'Yogas are special planetary alignments in Vedic astrology that manifest specific wealth, wisdom, and destiny outcomes.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {activeKundali.yogas.map((y, idx) => (
                  <div 
                    key={idx}
                    style={{
                      padding: '16px',
                      background: y.active ? 'var(--accent-purple-glow)' : 'rgba(255,255,255,0.01)',
                      border: y.active ? '1px solid var(--accent-purple)' : '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', margin: '0 0 6px 0', color: y.active ? 'var(--accent-gold)' : '#fff' }}>
                        {y.name}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                        {y.description}
                      </p>
                    </div>
                    <span className={`badge ${y.active ? 'badge-teal' : 'badge-red'}`} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                      {y.active 
                        ? (lang === 'hi' ? 'सक्रिय (ACTIVE)' : 'ACTIVE') 
                        : (lang === 'hi' ? 'निष्क्रिय (INACTIVE)' : 'INACTIVE')
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Consultation Recorder */}
          {activeTab === 'recorder' && (
            <ConsultationRec activeClientName={clientName} lang={lang} />
          )}

          {/* TAB 6: AI Assistant */}
          {activeTab === 'assistant' && (
            <Chatbot kundali={activeKundali} clientName={clientName} lang={lang} />
          )}

          {/* TAB 7: Astrologer CRM */}
          {activeTab === 'crm' && (
            <AstrologerCRM onLoadClient={handleCalculate} lang={lang} />
          )}

          {/* TAB 8: Gemstone database */}
          {activeTab === 'database' && (
            <GemstoneDb lang={lang} />
          )}


        </main>

        {/* Footer */}
        <footer className="no-print" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '40px' }}>
          {t.footerText}
        </footer>
      </div>

      {/* Settings Modal popover for API Key setup on any device */}
      {isSettingsOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '450px',
            borderTop: '5px solid var(--accent-gold)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {/* Close button */}
            <button
              onClick={() => setIsSettingsOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Settings size={22} /> {lang === 'hi' ? 'सिस्टम सेटिंग्स (Settings)' : 'System Settings'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <label className="form-label" style={{ fontWeight: '600' }}>
                {lang === 'hi' ? 'Gemini API Key दर्ज करें:' : 'Enter Gemini API Key:'}
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={(e) => {
                  setGeminiApiKey(e.target.value);
                  localStorage.setItem('horogem_gemini_api_key', e.target.value);
                }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                {lang === 'hi'
                  ? '✦ यह एपीआई कुंजी चैट सहायक में लाइव एआई ज्योतिष खोज को सक्रिय करती है। सहेजने पर यह आपके इसी फोन या पीसी पर सुरक्षित सहेज ली जाएगी।'
                  : '✦ Saving your API key here configures it securely on this device (phone or PC) for live assistant fallback, without requiring code environment setups.'}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="btn btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                {lang === 'hi' ? 'सहेजें और बंद करें' : 'Save & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
