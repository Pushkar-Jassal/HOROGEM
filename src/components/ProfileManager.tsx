import React, { useState } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { MapPin, Calendar, Clock, User } from 'lucide-react';

interface ProfileManagerProps {
  onCalculate: (result: KundaliResult, name: string, dob: string) => void;
}

// Mock Cities Database for place auto-suggest
const CITIES = [
  { name: 'New Delhi, Delhi, India', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai, Maharashtra, India', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru, Karnataka, India', lat: 12.9716, lng: 77.5946 },
  { name: 'Kolkata, West Bengal, India', lat: 22.5726, lng: 88.3639 },
  { name: 'Chennai, Tamil Nadu, India', lat: 13.0827, lng: 80.2707 },
  { name: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune, Maharashtra, India', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Jaipur, Rajasthan, India', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow, Uttar Pradesh, India', lat: 26.8467, lng: 80.9462 },
  { name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 }
];

export const ProfileManager: React.FC<ProfileManagerProps> = ({ onCalculate }) => {
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

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, placeOfBirth: value });

    if (value.trim().length > 1) {
      const filtered = CITIES.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
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

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.tob) {
      newErrors.tob = 'Time of birth is required';
    } else {
      // Basic time validation HH:MM
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.tob)) {
        newErrors.tob = 'Invalid birth time format (use HH:MM, 24h)';
      }
    }
    if (!formData.placeOfBirth.trim()) newErrors.placeOfBirth = 'Place of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Use default coordinates if none selected
    const lat = selectedCoords?.lat ?? 28.6139;
    const lng = selectedCoords?.lng ?? 77.2090;

    const result = calculateKundali(
      formData.dob,
      formData.tob,
      formData.placeOfBirth,
      lat,
      lng
    );

    onCalculate(result, formData.fullName, formData.dob);
  };

  return (
    <div className="glass-panel" style={{ height: '100%' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <User style={{ color: 'var(--accent-gold)' }} /> Birth Details Profile
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
          {errors.fullName && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.fullName}</span>}
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Marital Status</label>
            <select
              className="form-select"
              value={formData.maritalStatus}
              onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                className="form-input"
                style={{ paddingRight: '40px' }}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
              <Calendar size={18} style={{ position: 'absolute', right: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>
            {errors.dob && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.dob}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Time of Birth (24 Hr format)</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 14:30"
                style={{ paddingRight: '40px' }}
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
              />
              <Clock size={18} style={{ position: 'absolute', right: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>
            {errors.tob && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem' }}>{errors.tob}</span>}
          </div>
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label className="form-label">Place of Birth</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Start typing birth city..."
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
              background: '#0c0a1f',
              border: '1px solid var(--accent-gold)',
              borderRadius: '8px',
              zIndex: 10,
              boxShadow: '0 8px 16px rgba(0,0,0,0.6)',
              listStyle: 'none',
              maxHeight: '200px',
              overflowY: 'auto'
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
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(243, 156, 18, 0.1)'}
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
            <label className="form-label">Current Location</label>
            <input
              type="text"
              className="form-input"
              placeholder="City, Country"
              value={formData.currentLocation}
              onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Occupation</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Engineer, Business owner"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
          Generate Horoscope & Recommendation
        </button>
      </form>
    </div>
  );
};
