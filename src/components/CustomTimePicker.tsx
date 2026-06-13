import React, { useState, useEffect, useRef } from 'react';
import { Clock as ClockIcon } from 'lucide-react';

interface CustomTimePickerProps {
  value: string; // HH:MM (24-hour format)
  onChange: (value: string) => void;
  lang: 'en' | 'hi';
}

export const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ value, onChange, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parse time
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedAmPm, setSelectedAmPm] = useState<'AM' | 'PM'>('AM');

  useEffect(() => {
    if (value) {
      const [hStr, mStr] = value.split(':');
      const h = Number(hStr);
      const m = Number(mStr);
      if (!isNaN(h) && !isNaN(m)) {
        setSelectedMinute(m);
        if (h === 0) {
          setSelectedHour(12);
          setSelectedAmPm('AM');
        } else if (h === 12) {
          setSelectedHour(12);
          setSelectedAmPm('PM');
        } else if (h > 12) {
          setSelectedHour(h - 12);
          setSelectedAmPm('PM');
        } else {
          setSelectedHour(h);
          setSelectedAmPm('AM');
        }
      }
    }
  }, [value]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfirm = () => {
    let rawHour = selectedHour;
    if (selectedAmPm === 'AM' && selectedHour === 12) {
      rawHour = 0;
    } else if (selectedAmPm === 'PM' && selectedHour !== 12) {
      rawHour = selectedHour + 12;
    }
    const formattedHour = String(rawHour).padStart(2, '0');
    const formattedMinute = String(selectedMinute).padStart(2, '0');
    onChange(`${formattedHour}:${formattedMinute}`);
    setIsOpen(false);
  };

  // Convert 24h string to 12h string for display
  const getDisplayTime = () => {
    if (!value) return lang === 'hi' ? 'समय चुनें' : 'Select Time';
    const [hStr, mStr] = value.split(':');
    const h = Number(hStr);
    const m = Number(mStr);
    if (isNaN(h) || isNaN(m)) return value;
    const ampm = h >= 12 ? 'PM' : 'AM';
    let displayH = h % 12;
    if (displayH === 0) displayH = 12;
    return `${String(displayH).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="custom-picker-container" ref={containerRef} style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="form-input custom-picker-trigger"
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>{getDisplayTime()}</span>
        <ClockIcon size={18} style={{ color: 'var(--accent-gold)' }} />
      </div>

      {isOpen && (
        <div className="custom-clock-dropdown glass-panel no-print" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '8px',
          width: '320px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '12px',
          padding: '16px',
          zIndex: 1000,
          boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Pickers Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', maxHeight: '180px' }}>
            
            {/* Hours Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '140px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
              <div style={{ padding: '6px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {lang === 'hi' ? 'घंटा' : 'Hour'}
              </div>
              {hours.map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setSelectedHour(h)}
                  style={{
                    padding: '8px 4px',
                    background: selectedHour === h ? 'var(--accent-purple-glow)' : 'transparent',
                    border: 'none',
                    color: selectedHour === h ? 'var(--accent-gold)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: selectedHour === h ? 'bold' : 'normal'
                  }}
                  onMouseEnter={(e) => { if (selectedHour !== h) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={(e) => { if (selectedHour !== h) e.currentTarget.style.background = 'transparent'; }}
                >
                  {String(h).padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* Minutes Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '140px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
              <div style={{ padding: '6px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {lang === 'hi' ? 'मिनट' : 'Min'}
              </div>
              {minutes.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setSelectedMinute(m)}
                  style={{
                    padding: '8px 4px',
                    background: selectedMinute === m ? 'var(--accent-purple-glow)' : 'transparent',
                    border: 'none',
                    color: selectedMinute === m ? 'var(--accent-gold)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: selectedMinute === m ? 'bold' : 'normal'
                  }}
                  onMouseEnter={(e) => { if (selectedMinute !== m) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={(e) => { if (selectedMinute !== m) e.currentTarget.style.background = 'transparent'; }}
                >
                  {String(m).padStart(2, '0')}
                </button>
              ))}
            </div>

            {/* AM/PM Column */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '140px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
              <div style={{ padding: '6px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--accent-gold)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                AM/PM
              </div>
              {['AM', 'PM'].map(ampm => (
                <button
                  key={ampm}
                  type="button"
                  onClick={() => setSelectedAmPm(ampm as 'AM' | 'PM')}
                  style={{
                    padding: '12px 4px',
                    background: selectedAmPm === ampm ? 'var(--accent-purple-glow)' : 'transparent',
                    border: 'none',
                    color: selectedAmPm === ampm ? 'var(--accent-gold)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: selectedAmPm === ampm ? 'bold' : 'normal',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => { if (selectedAmPm !== ampm) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                  onMouseLeave={(e) => { if (selectedAmPm !== ampm) e.currentTarget.style.background = 'transparent'; }}
                >
                  {ampm}
                </button>
              ))}
            </div>

          </div>

          {/* Confirm Button */}
          <button 
            type="button" 
            onClick={handleConfirm} 
            className="btn btn-primary"
            style={{ padding: '8px', width: '100%', fontSize: '0.85rem', justifyContent: 'center' }}
          >
            {lang === 'hi' ? 'समय निर्धारित करें' : 'Set Time'}
          </button>
        </div>
      )}
    </div>
  );
};
