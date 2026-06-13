import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: string; // yyyy-mm-dd
  onChange: (value: string) => void;
  lang: 'en' | 'hi';
}

const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_HI = [
  'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
  'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
];

const DAYS_EN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const DAYS_HI = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parse current date value
  const initialDate = value ? new Date(value) : new Date();
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear() || 2005);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth() || 9); // Oct is 9

  useEffect(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentYear(d.getFullYear());
        setCurrentMonth(d.getMonth());
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

  const months = lang === 'hi' ? MONTHS_HI : MONTHS_EN;
  const daysHeader = lang === 'hi' ? DAYS_HI : DAYS_EN;

  // Generate years (1920 to 2040)
  const years = Array.from({ length: 121 }, (_, i) => 1920 + i);

  // Helper calculations for calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleDaySelect = (day: number) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const selectedDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onChange(selectedDateStr);
    setIsOpen(false);
  };

  const renderCells = () => {
    const cells = [];
    
    // Empty cells for offset
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
    }

    // Days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedMonth = String(currentMonth + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const cellDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
      const isSelected = value === cellDateStr;

      cells.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDaySelect(day)}
          className={`calendar-cell day-btn ${isSelected ? 'selected' : ''}`}
        >
          {day}
        </button>
      );
    }

    return cells;
  };

  return (
    <div className="custom-picker-container" ref={containerRef} style={{ position: 'relative' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="form-input custom-picker-trigger"
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>{value || (lang === 'hi' ? 'तिथि चुनें' : 'Select Date')}</span>
        <CalendarIcon size={18} style={{ color: 'var(--accent-gold)' }} />
      </div>

      {isOpen && (
        <div className="custom-calendar-dropdown glass-panel no-print" style={{
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
          boxShadow: '0 10px 25px rgba(0,0,0,0.7)'
        }}>
          {/* Header Month / Year Select */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <button type="button" onClick={handlePrevMonth} className="btn-icon">
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(Number(e.target.value))}
                className="form-select select-compact"
                style={{ padding: '4px 8px', fontSize: '0.85rem', width: '95px' }}
              >
                {months.map((m, idx) => (
                  <option key={idx} value={idx}>{m}</option>
                ))}
              </select>

              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(Number(e.target.value))}
                className="form-select select-compact"
                style={{ padding: '4px 8px', fontSize: '0.85rem', width: '75px' }}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <button type="button" onClick={handleNextMonth} className="btn-icon">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Days Name Header */}
          <div className="calendar-week-header" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginBottom: '8px'
          }}>
            {daysHeader.map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="calendar-days-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '4px',
            textAlign: 'center'
          }}>
            {renderCells()}
          </div>
        </div>
      )}
    </div>
  );
};
