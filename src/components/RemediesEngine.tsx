import React, { useState, useEffect, useRef } from 'react';
import { KundaliResult } from '../engine/astrology';
import { getLalKitabRemedies, getSpiritualRemedies, recommendRudraksha, LalKitabRemedy, SpiritualRemedy, RudrakshaRecommendation } from '../engine/remedies';
import { Volume2, VolumeX } from 'lucide-react';

interface RemediesEngineProps {
  kundali: KundaliResult;
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    lalKitabTitle: '✦ Lal Kitab Suitability Remedies',
    lalKitabDesc: 'These remedies are designed to redirect planetary currents using behavioral changes, donations, and charity.',
    rudrakshaTitle: '✦ Rudraksha Recommendations',
    rudrakshaDesc: 'Rudraksha beads stabilize magnetic energy fields and balance planetary deficiencies without side effects.',
    mantraTitle: '✦ Meditative Mantras & Beej Japa',
    mantraDesc: 'Chanting planetary mantras recalibrates the subconscious mind. Click the volume icon to start a simulated Vedic drone.',
    yantraTitle: '✦ Yantra Sacred Geometry',
    yantraDesc: 'Yantras are visual layout codes of planetary deities that amplify beneficial energy.',
    playDrone: 'Play Drone',
    stopDrone: 'Stop Drone',
    japaCount: 'Japa Count',
    times: 'times',
    dayLabel: 'Day: Morning / Sunrise',
    planetLabel: 'Planet',
    wearLabel: 'How to wear',
    benefitsLabel: 'Benefits'
  },
  hi: {
    lalKitabTitle: '✦ लाल किताब अनुकूलता उपाय',
    lalKitabDesc: 'ये उपाय व्यवहार में बदलाव, दान और धर्मार्थ कार्यों का उपयोग करके ग्रह प्रभावों को संतुलित करते हैं।',
    rudrakshaTitle: '✦ रुद्राक्ष अनुशंसाएं',
    rudrakshaDesc: 'रुद्राक्ष के मनके चुंबकीय ऊर्जा क्षेत्रों को स्थिर करते हैं और बिना किसी दुष्प्रभाव के ग्रह दोषों को शांत करते है।',
    mantraTitle: '✦ ध्यान मंत्र और बीज जाप',
    mantraDesc: 'ग्रहों के बीज मंत्रों का जाप अवचेतन मन को शांत करता है। वैदिक ड्रोन ध्वनि सुनने के लिए बटन दबाएं।',
    yantraTitle: '✦ यंत्र पवित्र ज्यामिति',
    yantraDesc: 'यंत्र ग्रहों के विजुअल कोड हैं जो सकारात्मक ऊर्जा को आकर्षित करते हैं।',
    playDrone: 'ध्वनि शुरू करें',
    stopDrone: 'ध्वनि बंद करें',
    japaCount: 'जाप संख्या',
    times: 'बार',
    dayLabel: 'समय: सुबह / सूर्योदय',
    planetLabel: 'संबद्ध ग्रह',
    wearLabel: 'धारण विधि',
    benefitsLabel: 'लाभ'
  }
};

const RUDRAKSHA_HI: { [key: string]: string } = {
  '1 Mukhi (One-Faced) or 12 Mukhi': '१ मुखी (एक मुखी) या १२ मुखी रुद्राक्ष',
  '2 Mukhi (Two-Faced)': '२ मुखी (दो मुखी) रुद्राक्ष',
  '5 Mukhi (Five-Faced)': '५ मुखी (पंचमुखी) रुद्राक्ष',
  '8 Mukhi (Eight-Faced)': '८ मुखी (अष्टमुखी) रुद्राक्ष',
  '4 Mukhi (Four-Faced)': '४ मुखी (चतुर्मुखी) रुद्राक्ष',
  '6 Mukhi (Six-Faced)': '६ मुखी (षष्ठमुखी) रुद्राक्ष',
  '9 Mukhi (Nine-Faced)': '९ मुखी (नौ मुखी) रुद्राक्ष',
  '7 Mukhi (Seven-Faced)': '७ मुखी (सप्तमुखी) रुद्राक्ष',
  '3 Mukhi (Three-Faced)': '३ मुखी (त्रिमुखी) रुद्राक्ष'
};

export const RemediesEngine: React.FC<RemediesEngineProps> = ({ kundali, lang }) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const t = TRANSLATIONS[lang];

  const lalKitabRemedies: LalKitabRemedy[] = getLalKitabRemedies(kundali);
  const spiritualRemedies: SpiritualRemedy[] = getSpiritualRemedies(kundali);
  const rudrakshas: RudrakshaRecommendation[] = recommendRudraksha(kundali);

  const togglePlayChant = (mantraName: string) => {
    if (isPlaying === mantraName) {
      stopSound();
    } else {
      stopSound();
      playSound();
      setIsPlaying(mantraName);
    }
  };

  const playSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.5);

      const oscRoot = ctx.createOscillator();
      oscRoot.type = 'sawtooth';
      oscRoot.frequency.setValueAtTime(136.1, ctx.currentTime);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      
      oscRoot.connect(filter);
      filter.connect(masterGain);

      const oscFifth = ctx.createOscillator();
      oscFifth.type = 'triangle';
      oscFifth.frequency.setValueAtTime(204.15, ctx.currentTime);
      oscFifth.connect(filter);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.18, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);

      oscRoot.start();
      oscFifth.start();
      lfo.start();

      oscillatorsRef.current = [oscRoot, oscFifth, lfo];
    } catch (e) {
      console.error('Audio initialization failed', e);
    }
  };

  const stopSound = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      setTimeout(() => {
        try {
          oscillatorsRef.current.forEach(osc => osc.stop());
          oscillatorsRef.current = [];
          if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
          }
          audioContextRef.current = null;
        } catch (e) {
          // closed
        }
      }, 600);
    }
    setIsPlaying(null);
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);
    
    ctx.strokeStyle = 'rgba(142, 68, 173, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < size; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0); ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(size, i);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(243, 156, 18, 0.8)';
    ctx.shadowColor = 'rgba(243, 156, 18, 0.5)';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(center, center, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 85, 0, Math.PI * 2);
    ctx.stroke();

    for (let s = 0; s < 8; s++) {
      const angle = (s * Math.PI) / 4;
      const x = center + Math.cos(angle) * 75;
      const y = center + Math.sin(angle) * 75;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(142, 68, 173, 0.9)';
    ctx.shadowColor = 'rgba(142, 68, 173, 0.5)';
    
    ctx.beginPath();
    ctx.moveTo(center, center - 60);
    ctx.lineTo(center - 50, center + 30);
    ctx.lineTo(center + 50, center + 30);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(center, center + 60);
    ctx.lineTo(center - 50, center - 30);
    ctx.lineTo(center + 50, center - 30);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'var(--accent-gold)';
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'var(--accent-gold)';
    ctx.beginPath();
    ctx.arc(center, center, 5, 0, Math.PI * 2);
    ctx.fill();

  }, [kundali]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="grid-2">
        {/* Lal Kitab remedies */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(243, 156, 18, 0.15)', paddingBottom: '8px' }}>
            {t.lalKitabTitle}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {t.lalKitabDesc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lalKitabRemedies.map((rem, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', borderLeft: '3px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{rem.title}</h4>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>
                    {rem.category}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{rem.remedy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rudraksha Suitability */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-teal)', borderBottom: '1px solid rgba(26,188,156,0.15)', paddingBottom: '8px' }}>
            {t.rudrakshaTitle}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {t.rudrakshaDesc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rudrakshas.map((rud, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', borderLeft: '3px solid var(--accent-teal)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {lang === 'hi' ? (RUDRAKSHA_HI[rud.mukhi] || rud.mukhi) : rud.mukhi}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginTop: '2px' }}>
                  {t.planetLabel}: {rud.rulingPlanet}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  <strong>{t.benefitsLabel}:</strong> {rud.benefits}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px' }}>
                  <strong>{t.wearLabel}:</strong> {rud.wearingInstructions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Spiritual Remedies: Mantras & Chanting */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-purple)', borderBottom: '1px solid rgba(142, 68, 173, 0.15)', paddingBottom: '8px' }}>
            {t.mantraTitle}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {t.mantraDesc}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {spiritualRemedies.map((sp, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(142, 68, 173, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{sp.mantraName}</h4>
                  <button 
                    onClick={() => togglePlayChant(sp.mantraName)}
                    className="btn"
                    style={{ 
                      padding: '6px 10px', 
                      background: isPlaying === sp.mantraName ? 'var(--accent-red)' : 'var(--accent-purple)',
                      color: '#fff',
                      fontSize: '0.75rem' 
                    }}
                  >
                    {isPlaying === sp.mantraName ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    {isPlaying === sp.mantraName ? t.stopDrone : t.playDrone}
                  </button>
                </div>

                <p style={{ fontSize: '1.1rem', letterSpacing: '0.5px', color: '#fff', textAlign: 'center', margin: '12px 0', fontFamily: 'var(--font-title)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px' }}>
                  {sp.mantraText}
                </p>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '10px' }}>
                  <strong>{lang === 'hi' ? 'मंत्र का अनुवाद' : 'Translation'}:</strong> {sp.translation}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.japaCount}: {sp.japaCount} {t.times}</span>
                  <span>{t.dayLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yantra SACRED GEOMETRY */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', width: '100%', borderBottom: '1px solid rgba(243, 156, 18, 0.15)', paddingBottom: '8px', textAlign: 'left' }}>
            {t.yantraTitle}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', width: '100%' }}>
            {t.yantraDesc}
          </p>

          <canvas 
            ref={canvasRef} 
            width={240} 
            height={240} 
            style={{ 
              background: 'rgba(5, 3, 15, 0.8)',
              border: '2px solid rgba(243, 156, 18, 0.2)',
              borderRadius: '50%',
              margin: '10px 0',
              boxShadow: '0 8px 16px rgba(0,0,0,0.6)'
            }}
          />

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', width: '100%' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>
              {spiritualRemedies[0]?.yantraName || 'Shree Yantra'}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {spiritualRemedies[0]?.yantraDesc || 'Sacred geometric mapping of cosmic nodes. Place it facing East and worship with devotion.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
