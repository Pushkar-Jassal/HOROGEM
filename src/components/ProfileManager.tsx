import React, { useState, useEffect } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { MapPin, User, History, Trash2 } from 'lucide-react';
import { CITIES } from '../engine/cities';
import { CustomDatePicker } from './CustomDatePicker';
import { CustomTimePicker } from './CustomTimePicker';

interface ProfileManagerProps {
  onCalculate: (result: KundaliResult, name: string, dob: string) => void;
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    title: 'Birth Details Profile',
    name: 'Full Name',
    namePlaceholder: 'Enter full name',
    gender: 'Gender',
    marital: 'Marital Status',
    dob: 'Date of Birth',
    tob: 'Time of Birth',
    pob: 'Place of Birth',
    pobPlaceholder: 'Start typing birth city...',
    currentLoc: 'Current Location',
    currentLocPlaceholder: 'City, Country',
    occupation: 'Occupation',
    occupationPlaceholder: 'e.g. Engineer, Student',
    submit: 'Generate Horoscope & Recommendation',
    genders: { Male: 'Male', Female: 'Female', Other: 'Other' },
    maritalStatus: { Single: 'Single', Married: 'Married', Divorced: 'Divorced', Widowed: 'Widowed' },
    historyTitle: 'Recent Profiles',
    noHistory: 'No search history',
    clearHistory: 'Clear'
  },
  hi: {
    title: 'जन्म विवरण प्रोफ़ाइल',
    name: 'पूरा नाम',
    namePlaceholder: 'पूरा नाम दर्ज करें',
    gender: 'लिंग',
    marital: 'वैवाहिक स्थिति',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय',
    pob: 'जन्म स्थान',
    pobPlaceholder: 'जन्म शहर टाइप करना शुरू करें...',
    currentLoc: 'वर्तमान स्थान',
    currentLocPlaceholder: 'शहर, देश',
    occupation: 'व्यवसाय',
    occupationPlaceholder: 'जैसे इंजीनियर, छात्र',
    submit: 'कुंडली और रत्न अनुशंसा उत्पन्न करें',
    genders: { Male: 'पुरुष', Female: 'महिला', Other: 'अन्य' },
    maritalStatus: { Single: 'अविवाहित', Married: 'विवाहित', Divorced: 'तलाकशुदा', Widowed: 'विधुर/विधवा' },
    historyTitle: 'हालिया प्रोफाइल',
    noHistory: 'कोई इतिहास नहीं है',
    clearHistory: 'साफ़ करें'
  }
};

export const ProfileManager: React.FC<ProfileManagerProps> = ({ onCalculate, lang }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    tob: '',
    placeOfBirth: '',
    currentLocation: '',
    occupation: '',
    maritalStatus: 'Single'
  });

  const [locationSuggestions, setLocationSuggestions] = useState<typeof CITIES>([]);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [history, setHistory] = useState<any[]>([]);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const stored = localStorage.getItem('horogem_profile_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, placeOfBirth: value });

    if (value.trim().length > 1) {
      const filtered = CITIES.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered.slice(0, 8)); // Limit to top 8
    } else {
      setLocationSuggestions([]);
    }
  };

  const selectSuggestion = (city: typeof CITIES[0]) => {
    setFormData({ ...formData, placeOfBirth: city.name });
    setSelectedCoords({ lat: city.lat, lng: city.lng });
    setLocationSuggestions([]);
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) newErrors.fullName = lang === 'hi' ? 'नाम आवश्यक है' : 'Full Name is required';
    if (!formData.dob) newErrors.dob = lang === 'hi' ? 'जन्म तिथि आवश्यक है' : 'Date of birth is required';
    if (!formData.tob) {
      newErrors.tob = lang === 'hi' ? 'जन्म समय आवश्यक है' : 'Time of birth is required';
    } else {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.tob)) {
        newErrors.tob = lang === 'hi' ? 'अमान्य समय प्रारूप (24 घंटे)' : 'Invalid birth time format (use HH:MM, 24h)';
      }
    }
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = lang === 'hi' ? 'स्थान आवश्यक है' : 'Place of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Use selected coordinates or search CITIES or fallback
    let lat = selectedCoords?.lat;
    let lng = selectedCoords?.lng;

    if (!lat || !lng) {
      const foundCity = CITIES.find(c => c.name.toLowerCase().includes(formData.placeOfBirth.toLowerCase()));
      if (foundCity) {
        lat = foundCity.lat;
        lng = foundCity.lng;
      } else {
        lat = 30.9010; // Ludhiana fallback
        lng = 75.8573;
      }
    }

    const result = calculateKundali(
      formData.dob,
      formData.tob,
      formData.placeOfBirth,
      lat,
      lng
    );

    // Save profile to history
    const newProfile = {
      fullName: formData.fullName,
      gender: formData.gender,
      dob: formData.dob,
      tob: formData.tob,
      placeOfBirth: formData.placeOfBirth,
      currentLocation: formData.currentLocation,
      occupation: formData.occupation,
      maritalStatus: formData.maritalStatus,
      lat,
      lng
    };

    let updatedHistory = history.filter(p => 
      !(p.fullName.toLowerCase() === newProfile.fullName.toLowerCase() && p.dob === newProfile.dob)
    );
    updatedHistory = [newProfile, ...updatedHistory].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem('horogem_profile_history', JSON.stringify(updatedHistory));

    onCalculate(result, formData.fullName, formData.dob);
  };

  const selectHistoryProfile = (profile: any) => {
    setFormData({
      fullName: profile.fullName,
      gender: profile.gender,
      dob: profile.dob,
      tob: profile.tob,
      placeOfBirth: profile.placeOfBirth,
      currentLocation: profile.currentLocation || '',
      occupation: profile.occupation || '',
      maritalStatus: profile.maritalStatus || 'Single'
    });
    setSelectedCoords({ lat: profile.lat, lng: profile.lng });

    const result = calculateKundali(
      profile.dob,
      profile.tob,
      profile.placeOfBirth,
      profile.lat,
      profile.lng
    );
    onCalculate(result, profile.fullName, profile.dob);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('horogem_profile_history');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <User style={{ color: 'var(--accent-gold)' }} /> {t.title}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">{t.name}</label>
            <input
              type="text"
              className="form-input"
              placeholder={t.namePlaceholder}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
            {errors.fullName && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.fullName}</span>}
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{t.gender}</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">{t.genders.Male}</option>
                <option value="Female">{t.genders.Female}</option>
                <option value="Other">{t.genders.Other}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t.marital}</label>
              <select
                className="form-select"
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
              >
                <option value="Single">{t.maritalStatus.Single}</option>
                <option value="Married">{t.maritalStatus.Married}</option>
                <option value="Divorced">{t.maritalStatus.Divorced}</option>
                <option value="Widowed">{t.maritalStatus.Widowed}</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{t.dob}</label>
              <CustomDatePicker
                value={formData.dob}
                onChange={(val) => setFormData({ ...formData, dob: val })}
                lang={lang}
              />
              {errors.dob && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.dob}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">{t.tob}</label>
              <CustomTimePicker
                value={formData.tob}
                onChange={(val) => setFormData({ ...formData, tob: val })}
                lang={lang}
              />
              {errors.tob && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.tob}</span>}
            </div>
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">{t.pob}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder={t.pobPlaceholder}
                style={{ paddingRight: '40px' }}
                value={formData.placeOfBirth}
                onChange={handlePlaceChange}
              />
              <MapPin size={18} style={{ position: 'absolute', right: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>
            {errors.placeOfBirth && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.placeOfBirth}</span>}
            
            {locationSuggestions.length > 0 && (
              <ul style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--accent-gold)',
                borderRadius: '8px',
                zIndex: 10,
                boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
                listStyle: 'none',
                maxHeight: '200px',
                overflowY: 'auto',
                padding: 0,
                margin: 0
              }}>
                {locationSuggestions.map((city, idx) => (
                  <li
                    key={idx}
                    onClick={() => selectSuggestion(city)}
                    style={{
                      padding: '10px 16px',
                      cursor: 'pointer',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-purple-glow)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">{t.currentLoc}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t.currentLocPlaceholder}
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t.occupation}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t.occupationPlaceholder}
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            {t.submit}
          </button>
        </form>
      </div>

      {/* History panel */}
      {history.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
              <History size={14} /> {t.historyTitle}
            </h3>
            <button 
              onClick={clearHistory}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-red)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Trash2 size={12} /> {t.clearHistory}
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
            {history.map((h, idx) => (
              <div
                key={idx}
                onClick={() => selectHistoryProfile(h)}
                style={{
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-purple-glow)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
              >
                <div>
                  <div style={{ fontWeight: 'bold' }}>{h.fullName}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {h.dob} | {h.placeOfBirth.split(',')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
