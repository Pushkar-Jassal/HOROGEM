import React, { useState, useRef, useEffect } from 'react';
import { KundaliResult } from '../engine/astrology';
import { recommendGemstones } from '../engine/gemstones';
import { getLalKitabRemedies, getSpiritualRemedies } from '../engine/remedies';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotProps {
  kundali: KundaliResult | null;
  clientName: string;
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    title: 'AI Astrology Assistant',
    profileLabel: 'Profile',
    lagnaLabel: 'Lagna',
    inputPlaceholderEmpty: 'Calculate your horoscope to ask questions...',
    inputPlaceholderActive: 'Ask about gemstones, dashas, remedies...',
    greetEmpty: 'Pranam! ✦ Enter your birth details in the Horoscope tab or load a client profile, and I can analyze your Vedic charts to recommend gemstones and remedies. How can I help you today?',
    greetActive: (name: string, lagna: string, rashi: string) => 
      `Pranam ${name}! ✦ I have synchronized with your Sidereal Kundali (${lagna} Ascendant, ${rashi} Moon Sign). Ask me anything about your gemstone recommendations, active Vimshottari Dasha, or Lal Kitab remedies.`
  },
  hi: {
    title: 'एआई ज्योतिष सहायक',
    profileLabel: 'प्रोफ़ाइल',
    lagnaLabel: 'लग्न',
    inputPlaceholderEmpty: 'प्रश्न पूछने के लिए पहले अपनी कुंडली विवरण भरें...',
    inputPlaceholderActive: 'रत्न, महादशा, गोचर, उपाय के बारे में कुछ भी पूछें...',
    greetEmpty: 'प्रणाम! ✦ कुंडली टैब में अपने जन्म का विवरण भरें या क्लाइंट प्रोफ़ाइल लोड करें। मैं आपके रत्नों और लाल किताब उपायों का विश्लेषण करूंगा। आज मैं आपकी क्या सहायता कर सकता हूँ?',
    greetActive: (name: string, lagna: string, rashi: string) => 
      `प्रणाम ${name}! ✦ मैं आपकी जन्म कुंडली (लग्न: ${lagna}, चंद्र राशि: ${rashi}) से जुड़ गया हूँ। मुझसे अपने भाग्यशाली रत्न, सक्रिय विंशोत्तरी महादशा या लाल किताब उपायों के बारे में कुछ भी पूछें।`
  }
};

export const Chatbot: React.FC<ChatbotProps> = ({ kundali, clientName, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const greetingText = kundali 
      ? t.greetActive(clientName, kundali.lagna, kundali.rashi)
      : t.greetEmpty;
    
    setMessages([
      { id: 'greet', sender: 'bot', text: greetingText }
    ]);
  }, [kundali, clientName, lang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      const responseText = generateAstrologyResponse(inputText, kundali, clientName, lang);
      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: responseText
      }]);
    }, 1000);
  };

  return (
    <div className="glass-panel" style={{ height: '520px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} /> {t.title}
        </h3>
        {kundali && (
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
            {t.profileLabel}: {clientName} ({kundali.lagna} {t.lagnaLabel})
          </span>
        )}
      </div>

      {/* Messages Window */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'rgba(0,0,0,0.15)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.03)'
      }}>
        {messages.map(msg => (
          <div 
            key={msg.id}
            style={{
              display: 'flex',
              gap: '10px',
              maxWidth: '85%',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: msg.sender === 'user' ? 'var(--accent-purple)' : 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#05030f',
              flexShrink: 0
            }}>
              {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>

            <div style={{
              background: msg.sender === 'user' ? 'rgba(142,68,173,0.15)' : 'rgba(255,255,255,0.04)',
              border: msg.sender === 'user' ? '1px solid rgba(142,68,173,0.3)' : '1px solid rgba(255,255,255,0.08)',
              padding: '12px 16px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              color: 'var(--text-primary)',
              lineHeight: '1.5',
              whiteSpace: 'pre-line'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          className="form-input"
          placeholder={kundali ? t.inputPlaceholderActive : t.inputPlaceholderEmpty}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={!kundali}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '12px' }} disabled={!inputText.trim() || !kundali}>
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

// Local context-aware dialogue generator with Hindi translations support
function generateAstrologyResponse(query: string, kundali: KundaliResult | null, clientName: string, lang: 'en' | 'hi'): string {
  if (!kundali) return '';

  const q = query.toLowerCase();
  const recs = recommendGemstones(kundali);
  const lalKitab = getLalKitabRemedies(kundali);
  const spiritual = getSpiritualRemedies(kundali);

  const isHindi = lang === 'hi';

  // 1. Gemstone Suitabilities
  if (q.includes('gemstone') || q.includes('stone') || q.includes('wear') || q.includes('pukhraj') || q.includes('sapphire') || q.includes('ruby') || q.includes('emerald') || q.includes('pearl') || q.includes('रत्न') || q.includes('पुखराज') || q.includes('नीलम') || q.includes('माणिक') || q.includes('पन्ना') || q.includes('मोती')) {
    
    // Satrun/Blue Sapphire Specific
    if (q.includes('blue sapphire') || q.includes('neelam') || q.includes('नीलम')) {
      const saturnData = kundali.planetaryPositions.find(p => p.name === 'Saturn');
      const isSaturnAvoid = recs.avoid.find(a => a.stone.name.includes('Blue'));
      if (isSaturnAvoid) {
        return isHindi 
          ? `⚠️ चेतावनी: आपके चार्ट के लिए नीलम (Blue Sapphire) पहनना बिल्कुल **वर्जित** है।
             कारण: शनि आपकी कुंडली में एक मारक/अशुभ ग्रह है।
             शनि वर्तमान में आपके ${saturnData?.house}वें भाव में स्थित है। नीलम पहनने से जीवन में बाधाएं आ सकती हैं। इसके स्थान पर शनिवार को काली उड़द का दान करें।`
          : `⚠️ Caution: Blue Sapphire (Neelam) is strictly **AVOIDED** for your chart.
             Reason: Saturn is functional malefic or placed in a negative house (${saturnData?.house}th house). Wearing Neelam can amplify obstacles. Instead, perform Saturday charities.`;
      } else {
        return isHindi
          ? `✦ नीलम अनुकूलता जांच:
             शनि देव आपकी कुंडली में शुभ फलदायी हैं। हालांकि नीलम धारण करने से पहले शनिवार की रात को इसे अपने तकिए के नीचे रखकर ३ रातों तक अवश्य परीक्षण करें।`
          : `✦ Blue Sapphire suitability check:
             Saturn is a beneficial/neutral planet for your chart. However, since Blue Sapphire is highly reactive, test the stone under your pillow for 3 nights before wearing.`;
      }
    }

    // Default gemstones summary
    return isHindi
      ? `✦ ${clientName} के लिए रत्न अनुशंसाएं:
         १. **मुख्य भाग्यशाली रत्न**: **${recs.primary.hindiName} (${recs.primary.name})**
            * कारण: यह आपके लग्न स्वामी/शुभ ग्रह की स्थिति को मजबूत करेगा।
            * धातु: ${recs.primary.metal === 'Gold' ? 'सोना' : recs.primary.metal} | उंगली: ${recs.primary.finger}
         
         २. **सहायक रत्न**: **${recs.secondary?.hindiName} (${recs.secondary?.name})**
            * कारण: ${recs.secondaryReason}
         
         ३. **परहेज रत्न (इन्हें न पहनें)**:
            ${recs.avoid.slice(0, 2).map(a => `* **${a.stone.hindiName}**: यह ग्रह आपकी कुंडली में मारक स्थान पर है।`).join('\n')}`
      : `✦ Gemstone Recommendations for ${clientName}:
         1. **Primary**: **${recs.primary.name} (${recs.primary.hindiName})**
            * Reason: ${recs.primaryReason}
            * Metal: ${recs.primary.metal} | Finger: ${recs.primary.finger}
         
         2. **Secondary**: **${recs.secondary?.name} (${recs.secondary?.hindiName})**
            * Reason: ${recs.secondaryReason}
         
         3. **Avoid List**:
            ${recs.avoid.slice(0, 2).map(a => `* **${a.stone.name}**: ${a.reason}`).join('\n')}`;
  }

  // 2. Dasha Cycles
  if (q.includes('dasha') || q.includes('mahadasha') || q.includes('period') || q.includes('dasa') || q.includes('दशा') || q.includes('महादशा')) {
    const now = new Date();
    const activeDasha = kundali.dashas.find(d => d.start <= now && d.end >= now);
    
    if (activeDasha) {
      const activeSub = activeDasha.subDashas?.find(s => s.start <= now && s.end >= now);
      const endDateStr = new Date(activeDasha.end).toLocaleDateString('en-IN');
      const subEndDateStr = activeSub ? new Date(activeSub.end).toLocaleDateString('en-IN') : '';

      return isHindi
        ? `✦ वर्तमान विंशोत्तरी दशा चक्र:
           वर्तमान में आपकी **${activeDasha.lord} की महादशा** सक्रिय है, जो ${new Date(activeDasha.start).toLocaleDateString('en-IN')} से प्रारंभ हुई है और **${endDateStr}** तक चलेगी।
           
           इसके अंतर्गत वर्तमान **अन्तरदशा (Sub-Dasha): ${activeSub ? activeSub.lord : 'N/A'}** है जो **${subEndDateStr}** तक सक्रिय रहेगी।
           
           *ज्योतिषीय परामर्श:* ${activeDasha.lord} की महादशा में उस ग्रह के बीज मंत्र का जाप करें। यह अवधि आपके जीवन में महत्वपूर्ण बदलाव लेकर आएगी।`
        : `✦ Active Vimshottari Dasha Cycles:
           You are currently running the **${activeDasha.lord} Mahadasha**, running until **${endDateStr}**.
           Within this, the active Sub-Dasha is **${activeSub ? activeSub.lord : 'N/A'}** running until **${subEndDateStr}**.`;
    }
  }

  // 3. Remedies / Donations
  if (q.includes('remedy') || q.includes('remedies') || q.includes('lal kitab') || q.includes('donation') || q.includes('mantra') || q.includes('उपाय') || q.includes('दान') || q.includes('मंत्र')) {
    const generalRemedies = lalKitab.slice(0, 2).map(r => `* **${r.title}**: ${r.remedy}`).join('\n');
    const mantra = spiritual[0];
    
    return isHindi
      ? `✦ कुंडली ग्रहों के अनुसार वैदिक उपाय:
         
         **लाल किताब के सरल उपाय:**
         ${generalRemedies}
         
         **बीज मंत्र जाप:**
         * मंत्र: "${mantra.mantraText}"
         * जाप विधि: सूर्योदय के समय ${mantra.japaCount} बार उच्चारण करें।`
      : `✦ Remedies recommendations based on planetary placements:
         
         **Lal Kitab Remedies:**
         ${generalRemedies}
         
         **Spiritual Japa Mantra:**
         * Mantra: "${mantra.mantraText}"
         * Japa Count: Chant ${mantra.japaCount} times at sunrise.`;
  }

  // Fallback responses
  return isHindi
    ? `प्रणाम! मैंने आपका प्रश्न समझ लिया है। आपकी कुंडली के लग्न स्वामी ${recs.primary.planet} हैं। क्या आप विशिष्ट रत्न धारण करने के मुहूर्त, करियर की बाधाओं या लाल किताब दान के बारे में पूछना चाहते हैं?`
    : `Pranam! I understand your question. In your Kundali chart, the Lagna Lord is ${recs.primary.planet}. Would you like to ask specifically about gemstone wearing methods, career blockages, or Lal Kitab remedies?`;
}
