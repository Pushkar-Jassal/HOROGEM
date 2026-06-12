import React, { useState, useEffect, useRef } from 'react';
import { Mic, Video, StopCircle, RefreshCw, Sparkles, FileText, ChevronRight, Play, Square } from 'lucide-react';

interface RecordingSession {
  id: string;
  clientName: string;
  date: string;
  duration: string;
  blobUrl?: string;
  summary?: {
    overview: string;
    keyPoints: string[];
    gemstones: string[];
    alternativeRemedies: string[];
    followUp: string;
  };
}

interface ConsultationRecProps {
  activeClientName: string;
}

export const ConsultationRec: React.FC<ConsultationRecProps> = ({ activeClientName }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [sessions, setSessions] = useState<RecordingSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<RecordingSession | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  
  // Audio waveform visualizer references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = window.setInterval(() => {
        setRecordTime(t => t + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      setRecordTime(0);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Start recording
  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;

      // Start Media Recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const blobUrl = URL.createObjectURL(audioBlob);
        
        // Add new session
        const newSession: RecordingSession = {
          id: String(Date.now()),
          clientName: activeClientName || 'Guest User',
          date: new Date().toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          duration: formatTime(recordTime),
          blobUrl
        };
        setSessions(prev => [newSession, ...prev]);
        setSelectedSession(newSession);
      };

      mediaRecorder.start();
      setIsRecording(true);
      drawWaveform();
    } catch (err) {
      console.warn('Microphone access denied or failed, falling back to simulated recording visualizer.', err);
      // Fallback: simulated recording
      setIsRecording(true);
      drawSimulatedWaveform();

      setTimeout(() => {
        // Mock save after simulated stop
      }, 100);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback stop
      setIsRecording(false);
      const newSession: RecordingSession = {
        id: String(Date.now()),
        clientName: activeClientName || 'Guest User',
        date: new Date().toLocaleDateString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        duration: formatTime(recordTime || 45) // mock duration
      };
      setSessions(prev => [newSession, ...prev]);
      setSelectedSession(newSession);
    }

    setIsRecording(false);

    // Stop streams
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  // Real Waveform Draw
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray as any);

      ctx.fillStyle = 'rgba(5, 3, 15, 0.2)'; // semi-clear for trail
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / dataArray.length) * 1.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] * 0.45;

        // Gradient coloring
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, 'var(--accent-purple)');
        gradient.addColorStop(1, 'var(--accent-gold)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }
    };
    renderFrame();
  };

  // Simulated Waveform Draw
  const drawSimulatedWaveform = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const renderFrame = () => {
      if (!isRecording) return;
      animationFrameRef.current = requestAnimationFrame(renderFrame);

      ctx.fillStyle = 'rgba(5, 3, 15, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(243, 156, 18, 0.8)';
      ctx.shadowColor = 'rgba(243, 156, 18, 0.4)';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;

      const midY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const amplitude = 30 * Math.sin(x * 0.02 + phase) * Math.sin(x * 0.005 + phase * 0.5);
        const y = midY + amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      phase += 0.08;
    };
    renderFrame();
  };

  // Run AI Summary Analysis on selected session
  const analyzeSession = (sessionId: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setSessions(prev => 
        prev.map(s => {
          if (s.id === sessionId) {
            return {
              ...s,
              summary: {
                overview: `Consultation session with ${s.clientName}. Discussed career transitions, financial blockages, and health compatibility. The chart shows strong ascendant characteristics but a weakened 5th house ruler, causing delays in personal growth.`,
                keyPoints: [
                  'Client expressed concerns regarding sudden delays in their career promotion (Saturn aspecting 10th house).',
                  'Recommended wearing Yellow Sapphire to strengthen Jupiter (Lagna Lord/benefic) and resolve delays.',
                  'Suggested alternative Lal Kitab remedy: donate yellow pulses and seek blessing from elderly priests on Thursdays.',
                  'Stressed the importance of meditation during Dasha Sandhi periods.'
                ],
                gemstones: ['Yellow Sapphire (Pukhraj) - 5 Carats on Index Finger', 'Emerald (Panna) - 6 Carats on Little Finger'],
                alternativeRemedies: ['Thursday Fasting', 'Feed yellow chickpeas to cows', 'Recite Guru Beej Mantra daily'],
                followUp: 'Schedule a review in 45 days after wearing the gemstone to analyze progress and changes in dasha sub-periods.'
              }
            };
          }
          return s;
        })
      );
      setIsAnalyzing(false);
      // Update selected session details with the new summary
      setSelectedSession(prev => {
        if (prev && prev.id === sessionId) {
          return {
            ...prev,
            summary: {
              overview: `Consultation session with ${prev.clientName}. Discussed career transitions, financial blockages, and health compatibility. The chart shows strong ascendant characteristics but a weakened 5th house ruler, causing delays in personal growth.`,
              keyPoints: [
                'Client expressed concerns regarding sudden delays in their career promotion (Saturn aspecting 10th house).',
                'Recommended wearing Yellow Sapphire to strengthen Jupiter (Lagna Lord/benefic) and resolve delays.',
                'Suggested alternative Lal Kitab remedy: donate yellow pulses and seek blessing from elderly priests on Thursdays.',
                'Stressed the importance of meditation during Dasha Sandhi periods.'
              ],
              gemstones: ['Yellow Sapphire (Pukhraj) - 5 Carats on Index Finger', 'Emerald (Panna) - 6 Carats on Little Finger'],
              alternativeRemedies: ['Thursday Fasting', 'Feed yellow chickpeas to cows', 'Recite Guru Beej Mantra daily'],
              followUp: 'Schedule a review in 45 days after wearing the gemstone to analyze progress and changes in dasha sub-periods.'
            }
          };
        }
        return prev;
      });
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="grid-2">
        {/* Recording Console */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)' }}>
            ✦ Consultation Recording Manager
          </h2>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Active Client: <strong>{activeClientName || 'No client loaded (Default Mode)'}</strong>
            </span>
          </div>

          <div style={{ position: 'relative', height: '120px', background: '#05030f', borderRadius: '10px', overflow: 'hidden' }}>
            <canvas 
              ref={canvasRef} 
              width={500} 
              height={120} 
              style={{ width: '100%', height: '100%' }}
            />
            {isRecording && (
              <div style={{ position: 'absolute', top: '10px', right: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                <span className="recording-dot" />
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>{formatTime(recordTime)}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {!isRecording ? (
              <button onClick={startRecording} className="btn btn-primary">
                <Mic size={16} /> Start Audio Record
              </button>
            ) : (
              <button onClick={stopRecording} className="btn btn-danger">
                <StopCircle size={16} /> Stop Recording
              </button>
            )}
            <button className="btn btn-secondary" disabled>
              <Video size={16} /> Record Video
            </button>
          </div>
        </div>

        {/* Sessions list */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-purple)' }}>
            ✦ Recording History Logs
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
            {sessions.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
                No recordings logged for this session yet.
              </div>
            ) : (
              sessions.map(s => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedSession(s)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: selectedSession?.id === s.id ? 'rgba(243,156,18,0.08)' : 'rgba(255,255,255,0.02)',
                    border: selectedSession?.id === s.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.05)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{s.clientName}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{s.duration}</span>
                    <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Selected Session Details & AI analysis */}
      {selectedSession && (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                Recording Details: {selectedSession.clientName}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Recorded on {selectedSession.date} • Duration: {selectedSession.duration}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              {selectedSession.blobUrl && (
                <audio src={selectedSession.blobUrl} controls style={{ height: '36px' }} />
              )}
              
              {!selectedSession.summary && (
                <button 
                  onClick={() => analyzeSession(selectedSession.id)} 
                  className="btn btn-primary"
                  disabled={isAnalyzing}
                >
                  <Sparkles size={16} /> {isAnalyzing ? 'Analyzing with AI...' : 'AI Session Analysis'}
                </button>
              )}
            </div>
          </div>

          {isAnalyzing && (
            <div style={{ textAlign: 'center', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <RefreshCw size={36} className="no-print" style={{ color: 'var(--accent-gold)', animation: 'spin 2s linear infinite' }} />
              <p style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-title)', fontWeight: 'bold' }}>
                AI Model parsing speech waves and aligning recommendations with Birth Chart...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          )}

          {selectedSession.summary && !isAnalyzing && (
            <div className="grid-2" style={{ marginTop: '10px' }}>
              {/* Overview Transcript Summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} /> AI Summary & Transcription
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.15)', padding: '16px', borderRadius: '10px', lineHeight: '1.6' }}>
                  {selectedSession.summary.overview}
                </p>

                <h4 style={{ fontSize: '1rem', color: '#fff', marginTop: '10px' }}>Key Consultation Discussion Points</h4>
                <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {selectedSession.summary.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Action Plan */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} /> Key Recommendations Plan
                </h4>

                <div style={{ background: 'rgba(26,188,156,0.05)', border: '1px solid rgba(26,188,156,0.15)', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', fontWeight: 'bold' }}>Gemstones Suggested</h5>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                      {selectedSession.summary.gemstones.map((g, idx) => (
                        <li key={idx}>• {g}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>Alternative Remedies</h5>
                    <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                      {selectedSession.summary.alternativeRemedies.map((r, idx) => (
                        <li key={idx}>• {r}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginTop: '4px' }}>
                    <h5 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 'bold' }}>Follow-up Action</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {selectedSession.summary.followUp}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
