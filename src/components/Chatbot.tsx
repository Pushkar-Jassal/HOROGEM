import React, { useState, useRef, useEffect } from 'react';
import { KundaliResult, PlanetPosition } from '../engine/astrology';
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
    inputPlaceholderActive: 'Ask about gemstones, career, marriage, Lal Kitab, Yogas...',
    greetEmpty: 'Pranam! ✦ Enter your birth details in the Horoscope tab or load a client profile, and I can analyze your Vedic charts to recommend gemstones and remedies. How can I help you today?',
    greetActive: (name: string, lagna: string, rashi: string) => 
      `Pranam ${name}! ✦ I have synchronized with your Sidereal Kundali (${lagna} Ascendant, ${rashi} Moon Sign). Ask me about your Life/Lucky/Work stones, active Yogas, Lal Kitab remedies, Bhrigu Shastra placements, or Dasha forecasts.`
  },
  hi: {
    title: 'एआई ज्योतिष सहायक',
    profileLabel: 'प्रोफ़ाइल',
    lagnaLabel: 'लग्न',
    inputPlaceholderEmpty: 'प्रश्न पूछने के लिए पहले अपनी कुंडली विवरण भरें...',
    inputPlaceholderActive: 'रत्न, करियर, विवाह, लाल किताब, योग, महादशा के बारे में पूछें...',
    greetEmpty: 'प्रणाम! ✦ कुंडली टैब में अपने जन्म का विवरण भरें या क्लाइंट प्रोफ़ाइल लोड करें। मैं आपके रत्नों और लाल किताब उपायों का विश्लेषण करूंगा। आज मैं आपकी क्या सहायता कर सकता हूँ?',
    greetActive: (name: string, lagna: string, rashi: string) => 
      `प्रणाम ${name}! ✦ मैं आपकी जन्म कुंडली (लग्न: ${lagna}, चंद्र राशि: ${rashi}) से जुड़ गया हूँ। मुझसे अपने भाग्यशाली रत्न (Life/Lucky/Work Stone), सक्रिय शुभ योग, लाल किताब उपाय, भृगु संहिता स्थिति या महादशा फल के बारे में पूछें।`
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

export const Chatbot: React.FC<ChatbotProps> = ({ kundali, clientName, lang }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('horogem_gemini_api_key') || '');
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const queryText = inputText;
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: queryText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Add processing placeholder
    const botPlaceholderId = String(Date.now() + 1);
    setMessages(prev => [...prev, {
      id: botPlaceholderId,
      sender: 'bot',
      text: lang === 'hi' ? 'विश्लेषण किया जा रहा है... ✦' : 'Analyzing charts... ✦'
    }]);

    try {
      const currentKey = localStorage.getItem('horogem_gemini_api_key') || (import.meta.env?.VITE_GEMINI_API_KEY as string | undefined);
      if (currentKey && currentKey.trim()) {
        // We have a Gemini API key: let Gemini answer all queries with full chart context!
        const geminiResponse = await fetchGeminiResponse(queryText, currentKey, kundali, lang);
        setMessages(prev => prev.map(m => m.id === botPlaceholderId ? { ...m, text: geminiResponse } : m));
      } else {
        // Offline / No key configured: fall back to local keyword responses
        const localResponse = generateLocalResponse(queryText, kundali, clientName, lang);
        if (localResponse) {
          setMessages(prev => prev.map(m => m.id === botPlaceholderId ? { ...m, text: localResponse } : m));
        } else {
          // If local rules also can't answer, show missing key warning and default summary
          const defaultResponse = getDefaultSummary(kundali, lang);
          const setupMessage = lang === 'hi'
            ? `⚠️ **Gemini AI असमर्थ है:** सामान्य ज्योतिषीय प्रश्नों के विस्तृत विश्लेषण के लिए कृपया अपनी \`.env\` फ़ाइल में **VITE_GEMINI_API_KEY** दर्ज करें।\n\n${defaultResponse}`
            : `⚠️ **Gemini API Key missing:** Please configure a **VITE_GEMINI_API_KEY** in your environment (\`.env\`) file to ask general and custom astrological questions.\n\n${defaultResponse}`;
          setMessages(prev => prev.map(m => m.id === botPlaceholderId ? { ...m, text: setupMessage } : m));
        }
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = lang === 'hi'
        ? `त्रुटि: उत्तर प्राप्त करने में समस्या आई। विवरण: ${err.message || err}`
        : `Error fetching response: ${err.message || err}`;
      setMessages(prev => prev.map(m => m.id === botPlaceholderId ? { ...m, text: errMsg } : m));
    }
  };

  return (
    <div className="glass-panel" style={{ height: '520px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <Bot size={22} style={{ color: 'var(--accent-gold)' }} /> {t.title}
        </h3>
        {kundali && (
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
            {t.profileLabel}: {clientName} ({lang === 'hi' ? SIGNS_HI[kundali.lagna] : kundali.lagna} {t.lagnaLabel})
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

// Local keyword response generator utilizing Bhrigu Shastra, Lal Kitab, and Chart placements
function generateLocalResponse(query: string, kundali: KundaliResult | null, clientName: string, lang: 'en' | 'hi'): string | null {
  if (!kundali) return null;

  const q = query.toLowerCase();
  const recs = recommendGemstones(kundali);
  const lalKitab = getLalKitabRemedies(kundali);
  const spiritual = getSpiritualRemedies(kundali);
  const isHindi = lang === 'hi';

  const lagnaLord = recs.lifeStone.planet;

  // 1. Gemstones suite
  if (q.includes('gemstone') || q.includes('stone') || q.includes('wear') || q.includes('pukhraj') || q.includes('sapphire') || q.includes('ruby') || q.includes('emerald') || q.includes('pearl') || q.includes('रत्न') || q.includes('पुखराज') || q.includes('नीलम') || q.includes('माणिक') || q.includes('पन्ना') || q.includes('मोती') || q.includes('हीरा')) {
    
    if (q.includes('emerald') || q.includes('panna') || q.includes('पन्ना')) {
      const mercury = kundali.planetaryPositions.find(p => p.name === 'Mercury');
      const isMercuryAvoid = recs.avoid.find(a => a.stone.planet === 'Mercury');
      
      if (mercury && mercury.signIndex === 5 && kundali.lagna === 'Libra') {
        return isHindi 
          ? `✦ **पन्ना (Emerald) विशेष अनुकूलता विश्लेषण (तुला लग्न):**
             आपकी कुंडली में बुध महाराज १२वें भाव में कन्या राशि में स्थित हैं। ज्योतिष के सामान्य नियमों के अनुसार १२वें भाव के स्वामी का रत्न वर्जित होता है, लेकिन चूंकि **बुध आपकी कुंडली में कन्या राशि में उच्च के होकर स्थित हैं**, इसलिए वे अशुभ नहीं रहे। 
             
             भृगु शास्त्र और पराशरी सिद्धांतों के अनुसार, तुला लग्न में बुध भाग्येश (९वें भाव के स्वामी) भी हैं। उच्च का ग्रह १२वें भाव में होकर विपरीत राजयोग जैसा शुभ प्रभाव देता है। अतः **आप पन्ना (Emerald) धारण कर सकते हैं।**
             
             *धारण विधि:* बुधवार सुबह चाँदी या सोने में कनिष्ठिका (छोटी उंगली) में धारण करें।`
          : `✦ **Panna (Emerald) Suitability Analysis (Libra Lagna):**
             In your chart, Mercury is placed in the 12th house in Virgo. Standard rules suggest avoiding stones of 12th house lords. However, **Mercury is exalted in Virgo (own/highest sign)**.
             
             Under Bhrigu and Parashari principles, since Mercury is also your 9th Lord (Bhagyesh) and exalted, it is highly protective. Therefore, **you can wear Panna (Emerald) safely**.
             
             *Wearing Method:* Wear on Wednesday morning in Gold or Silver on the little finger.`;
      }

      if (isMercuryAvoid) {
        return isHindi
          ? `⚠️ **पन्ना निषेध:** बुध देव आपकी कुंडली के लिए मारक या अशुभ स्थिति में हैं। आपको पन्ना धारण करने से बचना चाहिए।`
          : `⚠️ **Emerald Avoidance:** Mercury acts as a malefic or is negatively placed. Wearing Emerald is not recommended.`;
      } else {
        return isHindi
          ? `✦ **पन्ना (Emerald) अनुकूलता:** बुध देव आपकी कुंडली में शुभ स्थान पर हैं। आप बुद्धि, व्यापार और संचार में वृद्धि के लिए पन्ना धारण कर सकते हैं।`
          : `✦ **Emerald Suitability:** Mercury is supportive. Wearing an Emerald will boost intellect, communications, and business skills.`;
      }
    }

    if (q.includes('blue sapphire') || q.includes('neelam') || q.includes('नीलम')) {
      const saturn = kundali.planetaryPositions.find(p => p.name === 'Saturn');
      const isSaturnAvoid = recs.avoid.find(a => a.stone.planet === 'Saturn');
      if (isSaturnAvoid) {
        return isHindi
          ? `⚠️ **नीलम निषेध:** शनि देव आपकी कुंडली के अशुभ भाव (${saturn?.house}वें) में हैं। नीलम पहनने से अचानक नुकसान या दुर्घटनाएं हो सकती हैं। धारण न करें।`
          : `⚠️ **Blue Sapphire Avoidance:** Saturn is in your ${saturn?.house}th house. Neelam is highly reactive and not recommended for your chart.`;
      } else {
        return isHindi
          ? `✦ **नीलम अनुकूलता:** शनि देव योगकारक या लग्नेश होकर अनुकूल हैं। हालांकि, धारण करने से पहले शनिवार की रात तकिए के नीचे रखकर ३ रातों तक परीक्षण (trial) अवश्य करें।`
          : `✦ **Blue Sapphire Suitability:** Saturn is well placed. Still, perform a 3-day trial under your pillow to check for nightmares or negative feedback before final wearing.`;
      }
    }

    let response = isHindi ? `✦ **आपके लिए रत्न अनुशंसा (Life, Lucky, Work Stones):**\n\n` : `✦ **Gemstone Recommendations (Life, Lucky, Work Stones):**\n\n`;
    
    response += isHindi 
      ? `१. **जीवन रत्न (Life Stone)**: **${recs.lifeStone.hindiName} (${recs.lifeStone.name})** - ${PLANETS_HI[recs.lifeStone.planet] || recs.lifeStone.planet} का रत्न।
         * कारण: ${translateReason(recs.lifeStoneReason, kundali.lagna, 'hi')}
         * विधि: ${formatWearingMethodHi(recs.lifeStone)}\n\n`
      : `1. **Life Stone (Lagna Lord)**: **${recs.lifeStone.name} (${recs.lifeStone.hindiName})** - for ${recs.lifeStone.planet}.
         * Reason: ${recs.lifeStoneReason}
         * Method: Wear in ${recs.lifeStone.metal} on the ${recs.lifeStone.finger} on ${recs.lifeStone.day}.\n\n`;

    response += isHindi
      ? `२. **भाग्य रत्न (Lucky Stone)**: **${recs.luckyStone.hindiName} (${recs.luckyStone.name})** - ${PLANETS_HI[recs.luckyStone.planet] || recs.luckyStone.planet} का रत्न।
         * कारण: ${translateReason(recs.luckyStoneReason, kundali.lagna, 'hi')}
         * विधि: ${formatWearingMethodHi(recs.luckyStone)}\n\n`
      : `2. **Lucky Stone (9th Lord)**: **${recs.luckyStone.name} (${recs.luckyStone.hindiName})** - for ${recs.luckyStone.planet}.
         * Reason: ${recs.luckyStoneReason}
         * Method: Wear in ${recs.luckyStone.metal} on the ${recs.luckyStone.finger} on ${recs.luckyStone.day}.\n\n`;

    response += isHindi
      ? `३. **कार्य रत्न (Work Stone)**: **${recs.workStone.hindiName} (${recs.workStone.name})** - ${PLANETS_HI[recs.workStone.planet] || recs.workStone.planet} का रत्न।
         * कारण: ${translateReason(recs.workStoneReason, kundali.lagna, 'hi')}
         * विधि: ${formatWearingMethodHi(recs.workStone)}\n\n`
      : `3. **Work Stone (10th Lord)**: **${recs.workStone.name} (${recs.workStone.hindiName})** - for ${recs.workStone.planet}.
         * Reason: ${recs.workStoneReason}
         * Method: Wear in ${recs.workStone.metal} on the ${recs.workStone.finger} on ${recs.workStone.day}.\n\n`;

    if (recs.otherStones.length > 0) {
      response += isHindi ? `✦ **अन्य शुभ रत्न:**\n` : `✦ **Other Benefic Stones:**\n`;
      recs.otherStones.forEach(os => {
        response += isHindi
          ? `* **${os.stone.hindiName}**: ${translateReason(os.reason, kundali.lagna, 'hi')}\n`
          : `* **${os.stone.name}**: ${os.reason}\n`;
      });
      response += `\n`;
    }

    if (recs.avoid.length > 0) {
      response += isHindi ? `⚠️ **परहेज रत्न (भूलकर भी धारण न करें):**\n` : `⚠️ **Gemstones to Strictly AVOID:**\n`;
      recs.avoid.forEach(av => {
        response += isHindi
          ? `* **${av.stone.hindiName} (${av.stone.name})**: ${translateAvoidReason(av.reason, kundali.lagna, 'hi')}\n`
          : `* **${av.stone.name}**: ${av.reason}\n`;
      });
    }

    return response;
  }

  // 2. Planets
  for (const p of kundali.planetaryPositions) {
    const pNameLower = p.name.toLowerCase();
    const pHindiName = PLANETS_HI[p.name] || p.name;
    const pSignHi = SIGNS_HI[p.sign] || p.sign;
    
    if (q.includes(pNameLower) || (isHindi && q.includes(pHindiName.toLowerCase()))) {
      let response = isHindi
        ? `✦ **भृगु संहिता विश्लेषण - ${pHindiName} की स्थिति:**
           आपकी कुंडली में **${pHindiName}** ${p.house}वें भाव में **${pSignHi}** राशि में ${p.degree}° अंशों पर स्थित है।
           * शक्ति (Shadbala Strength): ${p.strength}%
           * चाल: ${p.isRetrograde ? 'वक्री (Retrograde)' : 'मार्गी (Direct)'}\n\n`
        : `✦ **Bhrigu Shastra Analysis - ${p.name} Placement:**
           In your Kundali, **${p.name}** is situated in the **${p.house}th house** in **${p.sign}** at ${p.degree}°.
           * Shadbala Strength: ${p.strength}%
           * Movement: ${p.isRetrograde ? 'Retrograde' : 'Direct'}\n\n`;

      if (p.name === 'Sun' && p.house === 12) {
        response += isHindi
          ? `**फल:** १२वें भाव में सूर्य होने से आँखों की कमजोरी, विदेशों से संबंध, सरकारी कामों में अनावश्यक खर्चे तथा सिरदर्द की समस्या हो सकती है। इसे लाल किताब में 'अंधा सूर्य' भी कहा जाता है। सुबह तांबे के लोटे से सूर्य देव को जल अर्पित करें।`
          : `**Reading:** Sun in the 12th house can cause vision issues, foreign settlements or connections, high expenditures, and conflicts with authority. Remediate by offering water to the Sun daily.`;
      } else if (p.name === 'Mercury' && p.house === 12) {
        response += isHindi
          ? `**फल:** १२वें भाव में बुध होने से व्यक्ति तीव्र बुद्धि का, व्यापार में चतुर और गूढ़ विद्याओं (जैसे ज्योतिष) में रुचि रखने वाला होता है। चूंकि कन्या इसकी उच्च राशि है, यह आपको गहन खोज और शोध में अपार सफलता दिलाएगा।`
          : `**Reading:** Mercury in the 12th house (especially exalted in Virgo) makes you analytical, good at research, and interested in occult subjects. It gives sharp business acumen and financial resilience.`;
      } else if (p.name === 'Saturn' && p.house === 10) {
        response += isHindi
          ? `**फल:** १०वें भाव में शनि देव (कर्म स्थान) करियर में स्थिरता लाते हैं लेकिन शुरुआती संघर्ष के बाद। व्यक्ति मेहनती और अनुशासन प्रिय होता है।`
          : `**Reading:** Saturn in the 10th house points to a highly structured career. Rise will be slow but steady. Avoid shortcut schemes.`;
      } else {
        response += isHindi
          ? `**फल:** ${pHindiName} का ${p.house}वें भाव में होना आपके जीवन में ${p.house === 1 ? 'व्यक्तित्व और स्वास्थ्य' : p.house === 2 ? 'धन और वाणी' : p.house === 10 ? 'करियर' : 'विभिन्न पक्षों'} पर गहरा प्रभाव डालेगा। ग्रह बल ${p.strength}% होने से इसके परिणाम मध्यम से तीव्र रहेंगे।`
          : `**Reading:** Having ${p.name} in the ${p.house}th house affects your life domains. The Shadbala strength of ${p.strength}% indicates its capacity to manifest results during its Dasha.`;
      }
      return response;
    }
  }

  // 3. Yogas
  if (q.includes('yoga') || q.includes('yogas') || q.includes('योग')) {
    const active = kundali.yogas.filter(y => y.active);
    if (active.length === 0) {
      return isHindi
        ? `✦ वर्तमान में आपकी कुंडली में कोई मुख्य सक्रिय योग नहीं है। सामान्य ग्रह प्रभाव चालू हैं।`
        : `✦ Currently, there are no primary active classical yogas detected in your chart.`;
    }

    let response = isHindi 
      ? `✦ **आपकी कुंडली में सक्रिय शुभ योग:**\n\n`
      : `✦ **Active Astrological Yogas in Your Chart:**\n\n`;

    active.forEach(y => {
      response += `* **${y.name}**: ${y.description}\n`;
    });
    return response;
  }

  // 4. Dasha
  if (q.includes('dasha') || q.includes('mahadasha') || q.includes('period') || q.includes('dasa') || q.includes('दशा') || q.includes('महादशा')) {
    const now = new Date();
    const activeDasha = kundali.dashas.find(d => d.start <= now && d.end >= now);
    
    if (activeDasha) {
      const activeSub = activeDasha.subDashas?.find(s => s.start <= now && s.end >= now);
      const endDateStr = new Date(activeDasha.end).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
      const subEndDateStr = activeSub ? new Date(activeSub.end).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' }) : '';

      return isHindi
        ? `✦ **विंशोत्तरी महादशा गणना:**
           आप वर्तमान में **${PLANETS_HI[activeDasha.lord] || activeDasha.lord} की महादशा** में चल रहे हैं।
           * अवधि: ${new Date(activeDasha.start).getFullYear()} से **${endDateStr}** तक।
           * वर्तमान अन्तरदशा (Antardasha): **${PLANETS_HI[activeSub?.lord || ''] || activeSub?.lord}** (चलेगी: ${subEndDateStr} तक)
           
           *लाल किताब महादशा उपाय:* महादशा स्वामी ग्रह का पूजन करें और बुधवार/शनिवार को चींटियों को शक्कर खिलाएं।`
        : `✦ **Vimshottari Dasha Analysis:**
           You are currently running the **${activeDasha.lord} Mahadasha**.
           * Duration: From ${new Date(activeDasha.start).getFullYear()} until ${endDateStr}.
           * Current Sub-Dasha (Antardasha): **${activeSub?.lord}** (running until ${subEndDateStr}).
           
           *Recommended action:* Chant the Beej Mantra for ${activeDasha.lord} to maximize positive outcomes during this period.`;
    }
  }

  // 5. Remedies
  if (q.includes('remedy') || q.includes('remedies') || q.includes('lal kitab') || q.includes('donation') || q.includes('mantra') || q.includes('उपाय') || q.includes('दान') || q.includes('मंत्र')) {
    const generalRemedies = lalKitab.map(r => `* **${r.title}**: ${r.remedy}`).join('\n');
    const mantra = spiritual[0];
    
    return isHindi
      ? `✦ **लाल किताब के अचूक उपाय एवं दान:**
         
         ${generalRemedies}
         
         **वैदिक बीज मंत्र:**
         * मंत्र: "${mantra.mantraText}"
         * विधि: प्रतिदिन सुबह ${mantra.japaCount} बार लाल चंदन या रुद्राक्ष माला से जाप करें।`
      : `✦ **Lal Kitab Cures & Vedic Remedies:**
         
         ${generalRemedies}
         
         **Vedic Mantra:**
         * Mantra: "${mantra.mantraText}"
         * Japa Count: Recite ${mantra.japaCount} times at sunrise.`;
  }

  // 6. Career
  if (q.includes('career') || q.includes('job') || q.includes('business') || q.includes('profession') || q.includes('काम') || q.includes('नौकरी') || q.includes('व्यवसाय')) {
    const workPlanet = recs.workStone.planet;
    const workStoneName = recs.workStone.name;
    const workStoneHi = recs.workStone.hindiName;
    const house10Placements = kundali.planetaryPositions.filter(p => p.house === 10);

    let response = isHindi
      ? `✦ **करियर और व्यापार विश्लेषण (भृगु शास्त्र):**
         आपकी कुंडली में १०वें भाव (कर्म स्थान) के स्वामी **${PLANETS_HI[workPlanet] || workPlanet}** हैं। 
         ${house10Placements.length > 0 
           ? `१०वें भाव में स्थित ग्रह: ${house10Placements.map(p => PLANETS_HI[p.name] || p.name).join(', ')}।` 
           : `१०वां भाव खाली है (स्वामी का प्रभाव मुख्य रहेगा)।`}
         
         *करियर मार्गदर्शन रत्न:* अपने करियर और व्यापार को मजबूत करने के लिए **${workStoneHi} (${workStoneName})** पहनना शुभ रहेगा।
         *कार्य उपाय:* प्रतिदिन अपने काम पर जाने से पहले सूर्य को जल चढ़ाएं और अपने पिता का आशीर्वाद लें।`
      : `✦ **Career and Professional Outlook (Bhrigu Shastra):**
         Your 10th Lord (Karmesh) is **${workPlanet}**.
         ${house10Placements.length > 0 
           ? `Planets transiting your 10th house: ${house10Placements.map(p => p.name).join(', ')}.` 
           : `The 10th house is vacant, meaning its lord holds direct influence over your career path.`}
         
         *Career Gemstone:* Wearing **${workStoneName} (${workStoneHi})** will strengthen your career opportunities and professional authority.
         *Remedies:* Respect fatherly figures, offer daily water to the Sun, and perform Saturday charities if Saturn affects your career.`;
    return response;
  }

  // 7.1 Love or Arrange Marriage Query
  const isLoveOrArrangeQuery = q.includes('love or arrange') || q.includes('arrange or love') || 
                               q.includes('love vs arrange') || q.includes('arrange vs love') || 
                               q.includes('love marriage') || q.includes('arrange marriage') || 
                               q.includes('लव या अरेंज') || q.includes('अरेंज या लव') || 
                               q.includes('लव मैरिज') || q.includes('अरेंज मैरिज');

  if (isLoveOrArrangeQuery) {
    const venus = kundali.planetaryPositions.find(p => p.name === 'Venus');
    const lagna = kundali.lagna;

    const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const signLords = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    
    const fifthSignIdx = kundali.d1Chart.signs[5];
    const fifthLord = signLords[fifthSignIdx];
    const fifthLordPos = kundali.planetaryPositions.find(p => p.name === fifthLord);

    const seventhSignIdx = kundali.d1Chart.signs[7];
    const seventhLord = signLords[seventhSignIdx];
    const seventhLordPos = kundali.planetaryPositions.find(p => p.name === seventhLord);

    const planetsIn7th = kundali.planetaryPositions.filter(p => p.house === 7);
    const planetsIn5th = kundali.planetaryPositions.filter(p => p.house === 5);

    let lovePoints = 0;
    let arrangePoints = 0;

    // Love Indicators
    if (fifthLordPos?.house === 7) lovePoints += 3;
    if (seventhLordPos?.house === 5) lovePoints += 3;
    if (fifthLordPos && seventhLordPos && fifthLordPos.house === seventhLordPos.house) lovePoints += 3;
    if (planetsIn7th.some(p => p.name === 'Venus' || p.name === 'Rahu')) lovePoints += 2.5;
    if (planetsIn5th.some(p => p.name === 'Rahu' || p.name === 'Venus')) lovePoints += 2;
    if (seventhLordPos && kundali.planetaryPositions.some(p => (p.name === 'Venus' || p.name === 'Rahu') && p.house === seventhLordPos.house)) lovePoints += 2;

    // Arrange Indicators
    if (seventhLordPos?.house === 9 || seventhLordPos?.house === 2 || seventhLordPos?.house === 4) arrangePoints += 2.5;
    if (planetsIn7th.some(p => p.name === 'Jupiter' || p.name === 'Sun' || p.name === 'Saturn')) arrangePoints += 2;
    if (planetsIn5th.some(p => p.name === 'Jupiter' || p.name === 'Sun')) arrangePoints += 1.5;

    let resultType: 'love' | 'arrange' | 'hybrid' = 'arrange';
    if (lovePoints > arrangePoints + 1) {
      resultType = 'love';
    } else if (Math.abs(lovePoints - arrangePoints) <= 1) {
      resultType = 'hybrid'; // Love cum Arrange
    }

    const HINDI_LORDS: { [key: string]: string } = {
      Mars: 'मंगल देव', Venus: 'शुक्र देव', Mercury: 'बुध देव', Moon: 'चन्द्र देव', Sun: 'सूर्य देव', Jupiter: 'गुरु बृहस्पति', Saturn: 'शनि देव'
    };

    let response = '';

    if (isHindi) {
      response += `✦ **कुंडली मिलान एवं वैवाहिक योग विश्लेषण (लव मैरिज बनाम अरेंज मैरिज):**\n\n`;
      response += `आपकी कुंडली में प्रेम विवाह (Love Marriage) और पारंपरिक विवाह (Arrange Marriage) के योगों की स्थिति निम्नलिखित है:\n\n`;
      
      response += `• **पंचम भाव (प्रेम व पसंद का कारक):** पंचमेश (5th Lord) **${HINDI_LORDS[fifthLord] || fifthLord}** हैं जो **${fifthLordPos?.house}वें भाव** में हैं।\n`;
      response += `• **सप्तम भाव (विवाह व साझेदारी स्थान):** सप्तमेश (7th Lord) **${HINDI_LORDS[seventhLord] || seventhLord}** हैं जो **${seventhLordPos?.house}वें भाव** में हैं।\n`;
      
      if (resultType === 'love') {
        response += `\n✦ **निष्कर्ष: लव मैरिज (प्रेम विवाह) के प्रबल योग**\n`;
        response += `आपकी कुंडली में पंचम (प्रेम) और सप्तम (विवाह) भाव के स्वामियों के बीच गहरा संबंध बन रहा है, अथवा राहु/शुक्र का सप्तम भाव पर सीधा प्रभाव है। यह दर्शाता है कि आपका विवाह आपकी अपनी पसंद (Self-Choice) से होने की **८०% से अधिक संभावना** है।\n`;
      } else if (resultType === 'hybrid') {
        response += `\n✦ **निष्कर्ष: लव-कम-अरेंज मैरिज (Love-cum-Arrange Marriage) के योग**\n`;
        response += `कुंडली में प्रेम और पारंपरिक मूल्यों दोनों का संतुलित प्रभाव है। इसका तात्पर्य है कि आप अपना जीवनसाथी स्वयं चुन सकते हैं, लेकिन विवाह परिवार की रजामंदी, आशीर्वाद और पारंपरिक रीति-रिवाजों के साथ ही संपन्न होगा (मध्यम मार्ग)।\n`;
      } else {
        response += `\n✦ **निष्कर्ष: पारंपरिक अरेंज मैरिज (Arrange Marriage) के प्रबल योग**\n`;
        response += `सप्तमेश और नवमेश (भाग्य व धर्म भाव) के बीच संबंध है और गुरु/सूर्य का शुभ प्रभाव है। यह संकेत देता है कि आपका विवाह परिवार की पसंद और माता-पिता के आशीर्वाद से पूर्णतः पारंपरिक रीति-रिवाजों के अनुसार होने के **७५% से अधिक योग** हैं।\n`;
      }

      response += `\n*वैवाहिक सुझाव (Astro Advice):*\n`;
      response += `* यदि प्रेम विवाह की दिशा में बढ़ रहे हैं तो शुक्र देव की आराधना करें।\n`;
      response += `* वैवाहिक जीवन में मधुरता के लिए नियमित रूप से माँ लक्ष्मी की पूजा करें और सुगंधित परफ्यूम का प्रयोग करें।`;
    } else {
      response += `✦ **Vedic Love vs. Arrange Marriage Analysis (Based on your Kundali):**\n\n`;
      response += `To determine whether you will have a Love or Arrange marriage, we analyze the relationship between your 5th house (romance/choices) and 7th house (marriage/partnerships):\n\n`;
      
      response += `• **5th Lord (Romance/Choice Ruler):** **${fifthLord}** placed in the **${fifthLordPos?.house}th house**.\n`;
      response += `• **7th Lord (Marriage Ruler):** **${seventhLord}** placed in the **${seventhLordPos?.house}th house**.\n`;
      response += `• **Conjunctions & Aspects:** ${
        planetsIn7th.length > 0 
          ? `Planets in your 7th house: ${planetsIn7th.map(p => p.name).join(', ')}.` 
          : 'No direct malefic or heavy planets in the 7th house.'
      }\n`;

      if (resultType === 'love') {
        response += `\n✦ **Verdict: Strong Indicators for a LOVE / Self-Choice Marriage (Probability: >80%)**\n`;
        response += `Your Kundali shows a strong connection between the 5th Lord and the 7th Lord, or active influences of Venus/Rahu on the house of partnership. You are highly likely to marry someone of your own choice.\n`;
      } else if (resultType === 'hybrid') {
        response += `\n✦ **Verdict: High Probability of a LOVE-CUM-ARRANGE Marriage**\n`;
        response += `There is a harmonious blend of personal romance (5th house) and traditional family support (Jupiter/9th house influence). You will likely choose your partner, but the marriage will be fully supported and celebrated by both families.\n`;
      } else {
        response += `\n✦ **Verdict: Strong Indicators for a Traditional ARRANGE Marriage (Probability: >75%)**\n`;
        response += `The marriage lord has strong connections with family houses (2nd, 4th, or 9th) under the guidance of Jupiter or Sun. Your marriage will likely be arranged by family members with traditional customs and parental blessings.\n`;
      }

      response += `\n*Astro Advice for Relationships:*\n`;
      response += `* Keep a clean copper vessel with water at your bedside, and respect parental choices as they act as a positive catalyst for your marital success.\n`;
      response += `* Chant the Venus Beej Mantra: "Om Shum Shukraya Namah" on Fridays to strengthen romantic connections.`;
    }

    return response;
  }

  // 7. Love & Marriage
  if (q.includes('marriage') || q.includes('love') || q.includes('spouse') || q.includes('wife') || q.includes('husband') || q.includes('shadi') || q.includes('विवाह') || q.includes('शादी') || q.includes('मांगलिक') || q.includes('lovelife') || q.includes('love life')) {
    const venus = kundali.planetaryPositions.find(p => p.name === 'Venus');
    const lagna = kundali.lagna;
    const isManglik = kundali.doshas.manglik.active;

    const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const signLords = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
    const seventhSignIdx = kundali.d1Chart.signs[7];
    const seventhLord = signLords[seventhSignIdx];
    const seventhLordPos = kundali.planetaryPositions.find(p => p.name === seventhLord);
    const planetsIn7th = kundali.planetaryPositions.filter(p => p.house === 7);

    const HINDI_LORDS: { [key: string]: string } = {
      Mars: 'मंगल देव', Venus: 'शुक्र देव', Mercury: 'बुध देव', Moon: 'चन्द्र देव', Sun: 'सूर्य देव', Jupiter: 'गुरु बृहस्पति', Saturn: 'शनि देव'
    };

    let response = '';

    if (isHindi) {
      const seventhSignHi = SIGNS_HI[SIGNS[seventhSignIdx]] || SIGNS[seventhSignIdx];
      const seventhLordHi = HINDI_LORDS[seventhLord] || seventhLord;
      const seventhLordHouse = seventhLordPos ? seventhLordPos.house : 1;
      const seventhLordSignHi = seventhLordPos ? SIGNS_HI[seventhLordPos.sign] || seventhLordPos.sign : '';

      response += `✦ **कुंडली के अनुसार प्रेम एवं वैवाहिक जीवन विश्लेषण:**\n\n`;
      response += `• **सप्तम भाव (विवाह स्थान):** आपकी कुंडली में ७वें भाव में **${seventhSignHi}** राशि स्थित है, जिसके स्वामी **${seventhLordHi}** हैं।\n`;
      if (seventhLordPos) {
        response += `• **सप्तमेश (7th Lord) की स्थिति:** विवाह के स्वामी ${seventhLordHi} आपकी कुंडली के **${seventhLordHouse}वें भाव** में **${seventhLordSignHi}** राशि में स्थित हैं। यह संकेत देता है कि आपका जीवनसाथी ${
          [1, 5, 9].includes(seventhLordHouse) ? 'धार्मिक, सहायक और परिवार को मान-सम्मान देने वाला' : 
          [2, 7, 11].includes(seventhLordHouse) ? 'आर्थिक रूप से समृद्ध, सुंदर, आकर्षक और सामाजिक रूप से सक्रिय' :
          [3, 4, 10].includes(seventhLordHouse) ? 'करियर-उन्मुख, स्वाभिमानी, कर्तव्यनिष्ठ और कामकाजी' :
          'स्वतंत्र विचारों वाला होगा, शादी के बाद आपके भाग्य उदय होने के प्रबल योग हैं।'
        } होगा।\n`;
      }

      if (planetsIn7th.length > 0) {
        const planetsStr = planetsIn7th.map(p => `${PLANETS_HI[p.name]} (${p.degree}°)`).join(', ');
        response += `• **सप्तम भाव में स्थित ग्रह:** ७वें भाव में **${planetsStr}** स्थित हैं। ${
          planetsIn7th.some(p => p.name === 'Saturn') ? 'शनि की उपस्थिति विवाह में थोड़ा विलंब (delay) लेकिन दीर्घकालिक व स्थिर संबंध देती है।' : ''
        } ${
          planetsIn7th.some(p => p.name === 'Mars') ? 'मंगल की उपस्थिति वैवाहिक जीवन में कभी-कभी नोकझोंक और मांगलिक प्रभाव उत्पन्न कर सकती है।' : ''
        } ${
          planetsIn7th.some(p => p.name === 'Jupiter' || p.name === 'Venus') ? 'बृहस्पति/शुक्र की यहाँ स्थिति एक सुंदर, बुद्धिमान और वफादार जीवनसाथी का संकेत देती है।' : ''
        }\n`;
      } else {
        response += `• **सप्तम भाव:** आपकी कुंडली का सप्तम भाव खाली है, जिससे वैवाहिक जीवन में किसी प्रतिकूल क्रूर ग्रह का सीधा प्रभाव नहीं है, जो कि अत्यंत शुभ माना जाता है।\n`;
      }

      if (venus) {
        response += `• **शुक्र देव (प्रेम एवं आकर्षण कारक):** शुक्र देव कुंडली के **${venus.house}वें भाव** में **${SIGNS_HI[venus.sign] || venus.sign}** राशि में हैं। यह दर्शाता है कि आपकी प्रेम शैली ${
          venus.house === 12 ? 'अत्यंत भावुक, रहस्यमयी और विदेश यात्राओं से प्रेम संबंध बनाने वाली' : 
          venus.house === 2 ? 'पारिवारिक सुख-शांति को प्राथमिकता देने वाली और वफादार' : 
          'रोमांटिक और मधुर संबंधों को पसंद करने वाली'
        } है।\n`;
      }

      response += `• **मांगलिक दोष स्थिति:** ${
        isManglik
          ? `आपकी कुंडली में **मांगलिक दोष सक्रिय है** (तीव्रता: ${kundali.doshas.manglik.severity})। ${kundali.doshas.manglik.description}`
          : `आपकी कुंडली **मांगलिक दोष से पूरी तरह मुक्त है**। यह एक सुखद वैवाहिक जीवन के लिए शुभ संकेत है।`
      }\n\n`;

      response += `*प्रेम एवं वैवाहिक उपाय (Remedies):*\n`;
      if (isManglik) {
        response += `* हनुमान चालीसा का पाठ करें और मंगलवार को बंदरों या जरूरतमंदों को गुड़-चना दान करें।\n`;
      }
      response += `* शुक्रवार को माँ लक्ष्मी को लाल फूल चढ़ाएं और "ॐ शुं शुक्राय नमः" मंत्र का जाप करें।\n`;

    } else {
      const seventhSignEn = SIGNS[seventhSignIdx];
      const seventhLordHouse = seventhLordPos ? seventhLordPos.house : 1;
      const seventhLordSignEn = seventhLordPos ? seventhLordPos.sign : '';

      response += `✦ **Vedic Love & Marriage Life Analysis (Based on your Kundali):**\n\n`;
      response += `• **7th House (Marriage & Partnership):** Your 7th house is ruled by the sign of **${seventhSignEn}**, and its governing planet (7th Lord) is **${seventhLord}**.\n`;
      if (seventhLordPos) {
        response += `• **7th Lord Placement:** The marriage lord, ${seventhLord}, is placed in the **${seventhLordHouse}th house** in the sign of **${seventhLordSignEn}**. This placement suggests a spouse who is ${
          [1, 5, 9].includes(seventhLordHouse) ? 'highly supportive, spiritual, bringing good fortune after marriage' : 
          [2, 7, 11].includes(seventhLordHouse) ? 'financially prosperous, attractive, and highly social' :
          [3, 4, 10].includes(seventhLordHouse) ? 'career-oriented, responsible, and structured' :
          'independent, giving rise to fortune through marriage after some initial adjustments.'
        }.\n`;
      }

      if (planetsIn7th.length > 0) {
        const planetsStr = planetsIn7th.map(p => `${p.name} (${p.degree}°)`).join(', ');
        response += `• **Planets in 7th House:** Currently, **${planetsStr}** occupies your 7th house. ${
          planetsIn7th.some(p => p.name === 'Saturn') ? 'Saturn here might introduce maturity or slight delays in marriage, but promises long-term bonding and durability.' : ''
        } ${
          planetsIn7th.some(p => p.name === 'Mars') ? 'Mars in the 7th house can trigger temporary arguments or high-energy adjustments in the relationship.' : ''
        } ${
          planetsIn7th.some(p => p.name === 'Jupiter' || p.name === 'Venus') ? 'Jupiter or Venus here is highly auspicious, indicating a noble, attractive, and intellectually mature partner.' : ''
        }\n`;
      } else {
        response += `• **Planets in 7th House:** The 7th house is vacant. This means no direct malefic transit or planetary afflictions are causing friction, which is highly protective for relationship longevity.\n`;
      }

      if (venus) {
        response += `• **Venus (Significator of Romance):** Venus is situated in the **${venus.house}th house** in the sign of **${venus.sign}**. This points to a romance style that is ${
          venus.house === 12 ? 'deeply emotional, spiritual, and potentially linked to long-distance travels' : 
          venus.house === 2 ? 'family-centric, valuing stability, security, and long-term loyalty' : 
          'romantic, highly creative, and harmonious'
        }.\n`;
      }

      response += `• **Manglik Dosha Status:** ${
        isManglik
          ? `**Manglik Dosha is ACTIVE** (Severity: ${kundali.doshas.manglik.severity}). ${kundali.doshas.manglik.description}`
          : `Your chart is **free from Manglik Dosha**. This is highly favorable for relationship harmony.`
      }\n\n`;

      response += `*Romance & Relationship Remedies:*\n`;
      if (isManglik) {
        response += `* Recite Hanuman Chalisa on Tuesdays and offer sweets to a local shelter/temple.\n`;
      }
      response += `* Chant the Venus mantra: "Om Shum Shukraya Namah" on Friday mornings and offer white flowers to Goddess Lakshmi.\n`;
    }

    return response;
  }

  // 8. Health
  if (q.includes('health') || q.includes('disease') || q.includes('illness') || q.includes('बीमारी') || q.includes('स्वास्थ्य') || q.includes('दर्द')) {
    const sun = kundali.planetaryPositions.find(p => p.name === 'Sun');
    const moon = kundali.planetaryPositions.find(p => p.name === 'Moon');

    let response = isHindi
      ? `✦ **स्वास्थ्य एवं शारीरिक ऊर्जा विश्लेषण:**
         * लग्न स्वामी (Lagna Lord): ${PLANETS_HI[lagnaLord] || lagnaLord} (आपकी शारीरिक ऊर्जा का नियंत्रक)।
         * सूर्य (हड्डियाँ और नेत्र): ${sun?.house}वें भाव में।
         * चन्द्रमा (मन और मानसिक स्वास्थ्य): ${moon?.house}वें भाव में।
         
         *स्वास्थ्य उपाय:* सुबह उगते सूर्य को जल चढ़ाएं, गायत्री मंत्र का जाप करें और तांबे के बर्तन में रखा जल पिएं।`
      : `✦ **Health & Vitality Analysis:**
         * Lagna Lord (Overall Constitution): ${lagnaLord}.
         * Sun (Bones, Eyes, Vitality): Placed in the ${sun?.house}th house.
         * Moon (Mind, Body fluids): Placed in the ${moon?.house}th house.
         
         *Health Action:* Wake up at sunrise, practice breathing exercises (Pranayama), and drink water from a copper vessel.`;
    return response;
  }

  // Return null to trigger search/Gemini fallback
  return null;
}

function getDefaultSummary(kundali: KundaliResult | null, lang: 'en' | 'hi'): string {
  if (!kundali) return '';
  const isHindi = lang === 'hi';
  const recs = recommendGemstones(kundali);
  const workPlanet = recs.workStone.planet;
  const workStoneName = recs.workStone.name;
  const workStoneHi = recs.workStone.hindiName;
  const isManglik = kundali.doshas.manglik.active;
  const venus = kundali.planetaryPositions.find(p => p.name === 'Venus');
  const lagna = kundali.lagna;

  const careerSummaryEn = `Career Insight: Your 10th Lord is ${workPlanet}. Wearing ${workStoneName} (${workStoneHi}) is highly recommended to enhance career prospects and status.`;
  const careerSummaryHi = `करियर विश्लेषण: आपके दशमेश (10th Lord) ${PLANETS_HI[workPlanet] || workPlanet} हैं। व्यावसायिक सफलता और कीर्ति के लिए ${workStoneHi} (${workStoneName}) धारण करना अति शुभ रहेगा।`;

  const loveSummaryEn = `Love & Marriage: Your Lagna is ${lagna}. Venus (marriage significator) is placed in the ${venus?.house}th house in ${venus?.sign}. ${isManglik ? 'Note: Active Manglik Dosha detected, performing pacifying remedies is advised.' : 'No major marriage blockages detected.'}`;
  const loveSummaryHi = `प्रेम और विवाह फल: आपका लग्न ${SIGNS_HI[lagna] || lagna} है। विवाह कारक शुक्र देव ${venus?.house}वें भाव में ${SIGNS_HI[venus?.sign || ''] || venus?.sign} राशि में हैं। ${isManglik ? 'ध्यान दें: कुंडली में मांगलिक दोष सक्रिय है, मंगलवार के उपाय करना उचित रहेगा।' : 'वैवाहिक जीवन अनुकूल है, कोई गंभीर दोष नहीं है।'}`;

  return isHindi
    ? `प्रणाम! आपकी कुंडली के मुख्य बिंदु (लव लाइफ और करियर):
       
       • 💼 **${careerSummaryHi}**
       
       • ❤️ **${loveSummaryHi}**
       
       क्या आप अपने भाग्यशाली रत्नों, महादशा चक्रों, लाल किताब उपायों, या किसी विशिष्ट ग्रह के प्रभाव के बारे में और विस्तार से पूछना चाहते हैं?`
    : `Pranam! Here is a key summary of your Love Life and Career path:
       
       • 💼 **${careerSummaryEn}**
       
       • ❤️ **${loveSummaryEn}**
       
       Would you like to ask specifically about your gemstone wearing rituals, active Mahadasha transit predictions, active Yogas, or house-specific planet effects?`;
}

// Fetch live response from Gemini 1.5 Flash client-side
const fetchGeminiResponse = async (query: string, apiKey: string, kundali: KundaliResult | null, lang: 'en' | 'hi') => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  let context = "You are a professional Vedic astrologer, Lal Kitab expert, and Bhrigu Shastra scholar answering a client's question on Horogem (Vedic astrology software).\n";
  if (kundali) {
    context += `The client's details: Lagna (Ascendant) is ${kundali.lagna} (at degree ${kundali.lagnaDegree || 0}°), and Moon Sign (Rashi) is ${kundali.rashi}.\n`;
    context += "Planetary placements in their chart:\n";
    kundali.planetaryPositions.forEach(p => {
      context += `- ${p.name}: ${p.sign} at ${p.degree}°, in House ${p.house}, retrograde=${p.isRetrograde}, combust=${p.isCombust}, exalted=${p.isExalted}, debilitated=${p.isDebilitated}, vargottama=${p.isVargottama}.\n`;
    });
  }

  context += `\nAnswer the user's question accurately and thoroughly in markdown format. Do NOT redirect them to external sites (like google or gemini website). Present the answer directly. If the language of query is Hindi or they ask in Hindi, answer in Hindi. Query: "${query}"`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: context }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to contact Gemini API. Status: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response received from Gemini.");
  }
  return text;
};
