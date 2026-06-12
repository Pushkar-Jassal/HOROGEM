import React, { useState, useEffect, useRef } from 'react';
import { KundaliResult } from '../engine/astrology';
import { getLalKitabRemedies, getSpiritualRemedies, recommendRudraksha, LalKitabRemedy, SpiritualRemedy, RudrakshaRecommendation } from '../engine/remedies';
import { Volume2, VolumeX, Eye, BookOpen, Heart, Activity } from 'lucide-react';

interface RemediesEngineProps {
  kundali: KundaliResult;
}

export const RemediesEngine: React.FC<RemediesEngineProps> = ({ kundali }) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const lalKitabRemedies: LalKitabRemedy[] = getLalKitabRemedies(kundali);
  const spiritualRemedies: SpiritualRemedy[] = getSpiritualRemedies(kundali);
  const rudrakshas: RudrakshaRecommendation[] = recommendRudraksha(kundali);

  // Sound Synthesizer: Meditative Vedic Chanting Drone
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
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Master Gain Node for volume control
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Fade in master volume
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 1.5);

      // 1. Root Om frequency (approx 136.1 Hz - planetary cosmic frequency)
      const oscRoot = ctx.createOscillator();
      oscRoot.type = 'sawtooth';
      oscRoot.frequency.setValueAtTime(136.1, ctx.currentTime);
      
      // Low pass filter to make the sound warm and smooth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);
      
      oscRoot.connect(filter);
      filter.connect(masterGain);

      // 2. Harmonic Fifth (204.15 Hz) for a pleasant meditative dyad
      const oscFifth = ctx.createOscillator();
      oscFifth.type = 'triangle';
      oscFifth.frequency.setValueAtTime(204.15, ctx.currentTime);
      oscFifth.connect(filter);

      // 3. Vibrato (LFO to simulate respiratory rising and falling in chants)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.18, ctx.currentTime); // very slow breathing cycle
      lfoGain.gain.setValueAtTime(0.08, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain);

      // Start all oscillators
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
      // Fade out audio smoothly to avoid clicks
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
          // already closed
        }
      }, 600);
    }
    setIsPlaying(null);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  // Render Shree Yantra geometry on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);
    
    // Draw background grid glow
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

    // Sacred Geometry drawing
    ctx.strokeStyle = 'rgba(243, 156, 18, 0.8)'; // Golden line
    ctx.shadowColor = 'rgba(243, 156, 18, 0.5)';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;

    // 1. Draw outer double circles
    ctx.beginPath();
    ctx.arc(center, center, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 85, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Draw 8-petal lotus
    for (let s = 0; s < 8; s++) {
      const angle = (s * Math.PI) / 4;
      const x = center + Math.cos(angle) * 75;
      const y = center + Math.sin(angle) * 75;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3. Draw interlinked central triangles
    ctx.strokeStyle = 'rgba(142, 68, 173, 0.9)'; // Purple line
    ctx.shadowColor = 'rgba(142, 68, 173, 0.5)';
    
    // Triangle 1 pointing up
    ctx.beginPath();
    ctx.moveTo(center, center - 60);
    ctx.lineTo(center - 50, center + 30);
    ctx.lineTo(center + 50, center + 30);
    ctx.closePath();
    ctx.stroke();

    // Triangle 2 pointing down
    ctx.beginPath();
    ctx.moveTo(center, center + 60);
    ctx.lineTo(center - 50, center - 30);
    ctx.lineTo(center + 50, center - 30);
    ctx.closePath();
    ctx.stroke();

    // 4. Central Bindu dot
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
            ✦ Lal Kitab Suitability Remedies
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            These remedies are designed to redirect planetary currents using behavioral changes, donations, and charity.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {lalKitabRemedies.map((rem, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', borderLeft: '3px solid var(--accent-purple)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{rem.title}</h4>
                  <span className={`badge ${
                    rem.category === 'Donation' ? 'badge-gold' : 
                    rem.category === 'Feed Animals' ? 'badge-teal' : 'badge-purple'
                  }`} style={{ fontSize: '0.65rem' }}>
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
            ✦ Rudraksha Recommendations
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Rudraksha beads stabilize magnetic energy fields and balance planetary deficiencies without side effects.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rudrakshas.map((rud, idx) => (
              <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '10px', borderLeft: '3px solid var(--accent-teal)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  {rud.mukhi}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginTop: '2px' }}>
                  Planet: {rud.rulingPlanet}
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  <strong>Benefits:</strong> {rud.benefits}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px' }}>
                  <strong>How to wear:</strong> {rud.wearingInstructions}
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
            ✦ Meditative Mantras & Beej Japa
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Chanting planetary mantras recalibrates the subconscious mind. Click the volume icon to start a simulated Vedic drone.
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
                    {isPlaying === sp.mantraName ? 'Stop Drone' : 'Play Drone'}
                  </button>
                </div>

                <p style={{ fontSize: '1.1rem', letterSpacing: '0.5px', color: '#fff', textAlign: 'center', margin: '12px 0', fontFamily: 'var(--font-title)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px' }}>
                  {sp.mantraText}
                </p>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '10px' }}>
                  <strong>Translation:</strong> {sp.translation}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Japa Count: {sp.japaCount} times</span>
                  <span>Day: Morning / Sunrise</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yantra SACRED GEOMETRY */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', width: '100%', borderBottom: '1px solid rgba(243, 156, 18, 0.15)', paddingBottom: '8px', textAlign: 'left' }}>
            ✦ Yantra Sacred Geometry
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', width: '100%' }}>
            Yantras are visual layout codes of planetary deities that amplify beneficial energy.
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
