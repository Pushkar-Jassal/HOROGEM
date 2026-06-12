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
}

export const Chatbot: React.FC<ChatbotProps> = ({ kundali, clientName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Set up initial greeting
  useEffect(() => {
    const greetingText = kundali 
      ? `Pranam ${clientName}! ✦ I have synchronized with your Sidereal Kundali (${kundali.lagna} Ascendant, ${kundali.rashi} Moon Sign). Ask me anything about your gemstone recommendations, active Vimshottari Dasha, or Lal Kitab remedies.`
      : `Pranam! ✦ Enter your birth details in the Horoscope tab or load a client profile, and I can analyze your Vedic charts to recommend gemstones and remedies. How can I help you today?`;
    
    setMessages([
      { id: 'greet', sender: 'bot', text: greetingText }
    ]);
  }, [kundali, clientName]);

  // Scroll to bottom of chat
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

    // Simulate Bot response
    setTimeout(() => {
      const responseText = generateAstrologyResponse(inputText, kundali, clientName);
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
          <Sparkles size={18} /> AI Astrology Assistant
        </h3>
        {kundali && (
          <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
            Profile: {clientName} ({kundali.lagna} Lagna)
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
          placeholder={kundali ? "Ask about gemstones, dashas, remedies..." : "Calculate your horoscope to ask questions..."}
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

// Local context-aware dialogue generator
function generateAstrologyResponse(query: string, kundali: KundaliResult | null, clientName: string): string {
  if (!kundali) {
    return "Please enter your birth details in the profile panel to calculate your horoscope first, and then I will be able to check your placements.";
  }

  const q = query.toLowerCase();
  const recs = recommendGemstones(kundali);
  const lalKitab = getLalKitabRemedies(kundali);
  const spiritual = getSpiritualRemedies(kundali);

  // 1. Gemstone Recommendation queries
  if (q.includes('gemstone') || q.includes('stone') || q.includes('wear') || q.includes('pukhraj') || q.includes('sapphire') || q.includes('ruby') || q.includes('emerald') || q.includes('pearl')) {
    if (q.includes('blue sapphire') || q.includes('neelam')) {
      const saturnData = kundali.planetaryPositions.find(p => p.name === 'Saturn');
      const isSaturnAvoid = recs.avoid.find(a => a.stone.name === 'Blue Sapphire');
      if (isSaturnAvoid) {
        return `⚠️ Caution: Blue Sapphire (Neelam) is strictly **AVOIDED** for your chart.
        Reason: ${isSaturnAvoid.reason}
        Saturn is currently placed in your ${saturnData?.house}th house. Wearing Neelam can amplify health obstacles or delays. Instead, please follow Saturday charities.`;
      } else {
        return `✦ Blue Sapphire suitability check:
        For your ${kundali.lagna} Ascendant, Saturn is a beneficial/neutral planet. However, Blue Sapphire is highly reactive; it is recommended to test the stone under your pillow for 3 nights before wearing.`;
      }
    }

    if (q.includes('ruby') || q.includes('manik')) {
      const isAvoid = recs.avoid.find(a => a.stone.name === 'Ruby');
      if (isAvoid) {
        return `⚠️ Avoid Ruby (Manik) for your chart.
        Reason: ${isAvoid.reason}`;
      } else {
        return `✦ Ruby (Manik) Suitability:
        The Sun is a beneficial planet for you. You can wear Ruby in Gold on your Ring Finger on Sunday mornings.`;
      }
    }

    // Default gemstone summary
    return `✦ Gemstone Recommendations for ${clientName}:
    1. **Primary**: **${recs.primary.name} (${recs.primary.hindiName})**
       * Reason: ${recs.primaryReason}
       * Metal: ${recs.primary.metal} | Finger: ${recs.primary.finger}
    
    2. **Secondary**: **${recs.secondary?.name} (${recs.secondary?.hindiName})**
       * Reason: ${recs.secondaryReason}
    
    3. **Avoid List**:
       ${recs.avoid.slice(0, 2).map(a => `* **${a.stone.name}**: ${a.reason}`).join('\n')}`;
  }

  // 2. Dasha / Mahadasha queries
  if (q.includes('dasha') || q.includes('mahadasha') || q.includes('period') || q.includes('running')) {
    const now = new Date();
    const activeDasha = kundali.dashas.find(d => d.start <= now && d.end >= now);
    
    if (activeDasha) {
      const activeSub = activeDasha.subDashas?.find(s => s.start <= now && s.end >= now);
      const endDateStr = new Date(activeDasha.end).toLocaleDateString('en-IN');
      const subEndDateStr = activeSub ? new Date(activeSub.end).toLocaleDateString('en-IN') : '';

      return `✦ Active Vimshottari Dasha Cycles:
      You are currently running the **${activeDasha.lord} Mahadasha**, which began on ${new Date(activeDasha.start).toLocaleDateString('en-IN')} and will continue until **${endDateStr}**.
      
      ${activeSub ? `Within this, the active Sub-Dasha (Antardasha) is **${activeSub.lord}** running until **${subEndDateStr}**.` : ''}
      
      *Astrological Advice:* During ${activeDasha.lord} Mahadasha, focus on activities ruled by ${activeDasha.lord}. If it is a benefic, you will experience expansions; if weak, follow its respective mantra remedies.`;
    }
    return `I found Dasha periods calculated in your report. You can view the complete Vimshottari chronology under the Dasha section.`;
  }

  // 3. Remedies / Lal Kitab queries
  if (q.includes('remedy') || q.includes('remedies') || q.includes('lal kitab') || q.includes('donation') || q.includes('mantra')) {
    const generalRemedies = lalKitab.slice(0, 2).map(r => `* **${r.title}**: ${r.remedy} (${r.category})`).join('\n');
    const mantra = spiritual[0];
    
    return `✦ Remedies recommendations based on planetary placements:
    
    **Lal Kitab Remedies:**
    ${generalRemedies}
    
    **Spiritual Japa Mantra:**
    * Mantra: "${mantra.mantraText}"
    * Chant: ${mantra.japaCount} times at sunrise.
    * Translation: ${mantra.translation}`;
  }

  // 4. Numerology queries
  if (q.includes('numerology') || q.includes('destiny') || q.includes('birth number') || q.includes('mulank') || q.includes('bhagyank')) {
    return `✦ Numerology Summary for ${clientName}:
    * Your birth date calculates a **Mulank (Birth Number)** of **${recs.primary.planet === 'Sun' ? 1 : recs.primary.planet === 'Moon' ? 2 : 3}** (Ruled by ${recs.primary.planet}).
    * This number represents leadership, focus, and drive.
    * The corresponding gemstone matches your primary recommended stone: **${recs.primary.name}**.`;
  }

  // General fallback
  return `Pranam! I hear you. In your Kundali chart, the Lagna Lord is placed in house ${kundali.planetaryPositions.find(p => p.name === recs.primary.planet)?.house}. 
  Could you specify if you are asking about gemstone wearing times, career hurdles, or matching Lal Kitab remedies?`;
}
