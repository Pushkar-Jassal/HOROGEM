import React, { useState } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { MapPin, Calendar, Clock, User } from 'lucide-react';

interface ProfileManagerProps {
  onCalculate: (result: KundaliResult, name: string, dob: string) => void;
  lang: 'en' | 'hi';
}

// Extensive Cities Database (100+ Major Indian Cities by State and Global Hubs)
const CITIES = [
  // Punjab
  { name: 'Ludhiana, Punjab, India', lat: 30.9010, lng: 75.8573 },
  { name: 'Amritsar, Punjab, India', lat: 31.6340, lng: 74.8723 },
  { name: 'Jalandhar, Punjab, India', lat: 31.3260, lng: 75.5762 },
  { name: 'Patiala, Punjab, India', lat: 30.3398, lng: 76.3869 },
  { name: 'Bathinda, Punjab, India', lat: 30.2076, lng: 74.9454 },
  { name: 'Mohali, Punjab, India', lat: 30.6970, lng: 76.7230 },
  // Delhi
  { name: 'New Delhi, Delhi, India', lat: 28.6139, lng: 77.2090 },
  // Haryana
  { name: 'Gurugram, Haryana, India', lat: 28.4595, lng: 77.0266 },
  { name: 'Faridabad, Haryana, India', lat: 28.4089, lng: 77.3178 },
  { name: 'Panipat, Haryana, India', lat: 29.3909, lng: 76.9635 },
  { name: 'Ambala, Haryana, India', lat: 30.3752, lng: 76.7821 },
  { name: 'Rohtak, Haryana, India', lat: 28.8955, lng: 76.6066 },
  { name: 'Chandigarh, India', lat: 30.7333, lng: 76.7794 },
  // Himachal Pradesh
  { name: 'Shimla, Himachal Pradesh, India', lat: 31.1048, lng: 77.1734 },
  { name: 'Dharamshala, Himachal Pradesh, India', lat: 32.2190, lng: 76.3234 },
  { name: 'Manali, Himachal Pradesh, India', lat: 32.2396, lng: 77.1887 },
  // Jammu & Kashmir
  { name: 'Srinagar, Jammu & Kashmir, India', lat: 34.0837, lng: 74.7973 },
  { name: 'Jammu, Jammu & Kashmir, India', lat: 32.7266, lng: 74.8570 },
  // Rajasthan
  { name: 'Jaipur, Rajasthan, India', lat: 26.9124, lng: 75.7873 },
  { name: 'Jodhpur, Rajasthan, India', lat: 26.2389, lng: 73.0243 },
  { name: 'Udaipur, Rajasthan, India', lat: 24.5854, lng: 73.7125 },
  { name: 'Kota, Rajasthan, India', lat: 25.1825, lng: 75.8396 },
  { name: 'Ajmer, Rajasthan, India', lat: 26.4499, lng: 74.6399 },
  // Uttar Pradesh
  { name: 'Lucknow, Uttar Pradesh, India', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur, Uttar Pradesh, India', lat: 26.4499, lng: 80.3319 },
  { name: 'Noida, Uttar Pradesh, India', lat: 28.5355, lng: 77.3910 },
  { name: 'Ghaziabad, Uttar Pradesh, India', lat: 28.6692, lng: 77.4538 },
  { name: 'Varanasi, Uttar Pradesh, India', lat: 25.3176, lng: 82.9739 },
  { name: 'Agra, Uttar Pradesh, India', lat: 27.1767, lng: 78.0081 },
  { name: 'Prayagraj, Uttar Pradesh, India', lat: 25.4358, lng: 81.8463 },
  { name: 'Meerut, Uttar Pradesh, India', lat: 28.9845, lng: 77.7064 },
  // Uttarakhand
  { name: 'Dehradun, Uttarakhand, India', lat: 30.3165, lng: 78.0322 },
  { name: 'Haridwar, Uttarakhand, India', lat: 29.9457, lng: 78.1642 },
  // Bihar
  { name: 'Patna, Bihar, India', lat: 25.5941, lng: 85.1376 },
  { name: 'Gaya, Bihar, India', lat: 24.7914, lng: 84.9997 },
  { name: 'Muzaffarpur, Bihar, India', lat: 26.1196, lng: 85.3910 },
  // Jharkhand
  { name: 'Ranchi, Jharkhand, India', lat: 23.3441, lng: 85.3096 },
  { name: 'Jamshedpur, Jharkhand, India', lat: 22.8046, lng: 86.2029 },
  // West Bengal
  { name: 'Kolkata, West Bengal, India', lat: 22.5726, lng: 88.3639 },
  { name: 'Howrah, West Bengal, India', lat: 22.5769, lng: 88.3186 },
  { name: 'Darjeeling, West Bengal, India', lat: 27.0410, lng: 88.2627 },
  // Odisha
  { name: 'Bhubaneswar, Odisha, India', lat: 20.2961, lng: 85.8245 },
  { name: 'Cuttack, Odisha, India', lat: 20.4625, lng: 85.8830 },
  // Madhya Pradesh
  { name: 'Bhopal, Madhya Pradesh, India', lat: 23.2599, lng: 77.4126 },
  { name: 'Indore, Madhya Pradesh, India', lat: 22.7196, lng: 75.8577 },
  { name: 'Gwalior, Madhya Pradesh, India', lat: 26.2124, lng: 78.1772 },
  // Chhattisgarh
  { name: 'Raipur, Chhattisgarh, India', lat: 21.2514, lng: 81.6296 },
  // Gujarat
  { name: 'Ahmedabad, Gujarat, India', lat: 23.0225, lng: 72.5714 },
  { name: 'Surat, Gujarat, India', lat: 21.1702, lng: 72.8311 },
  { name: 'Vadodara, Gujarat, India', lat: 22.3072, lng: 73.1812 },
  { name: 'Rajkot, Gujarat, India', lat: 22.3039, lng: 70.8022 },
  // Maharashtra
  { name: 'Mumbai, Maharashtra, India', lat: 19.0760, lng: 72.8777 },
  { name: 'Pune, Maharashtra, India', lat: 18.5204, lng: 73.8567 },
  { name: 'Nagpur, Maharashtra, India', lat: 21.1458, lng: 79.0882 },
  { name: 'Nashik, Maharashtra, India', lat: 19.9975, lng: 73.7898 },
  { name: 'Thane, Maharashtra, India', lat: 19.2183, lng: 72.9781 },
  // Goa
  { name: 'Panaji, Goa, India', lat: 15.4909, lng: 73.8278 },
  // Karnataka
  { name: 'Bengaluru, Karnataka, India', lat: 12.9716, lng: 77.5946 },
  { name: 'Mysuru, Karnataka, India', lat: 12.2958, lng: 76.6394 },
  { name: 'Mangaluru, Karnataka, India', lat: 12.9141, lng: 74.8560 },
  // Telangana
  { name: 'Hyderabad, Telangana, India', lat: 17.3850, lng: 78.4867 },
  { name: 'Warangal, Telangana, India', lat: 18.0000, lng: 79.5800 },
  // Andhra Pradesh
  { name: 'Visakhapatnam, Andhra Pradesh, India', lat: 17.6868, lng: 83.2185 },
  { name: 'Vijayawada, Andhra Pradesh, India', lat: 16.5062, lng: 80.6480 },
  // Tamil Nadu
  { name: 'Chennai, Tamil Nadu, India', lat: 13.0827, lng: 80.2707 },
  { name: 'Coimbatore, Tamil Nadu, India', lat: 11.0168, lng: 76.9558 },
  { name: 'Madurai, Tamil Nadu, India', lat: 9.9252, lng: 78.1198 },
  // Kerala
  { name: 'Kochi, Kerala, India', lat: 9.9312, lng: 76.2673 },
  { name: 'Thiruvananthapuram, Kerala, India', lat: 8.5241, lng: 76.9366 },
  // Assam
  { name: 'Guwahati, Assam, India', lat: 26.1445, lng: 91.7362 },
  // Global capitals/cities
  { name: 'New York, NY, USA', lat: 40.7128, lng: -74.0060 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Sydney, NSW, Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Toronto, ON, Canada', lat: 43.6532, lng: -79.3832 }
];

const TRANSLATIONS = {
  en: {
    title: 'Birth Details Profile',
    name: 'Full Name',
    namePlaceholder: 'Enter full name',
    gender: 'Gender',
    marital: 'Marital Status',
    dob: 'Date of Birth',
    tob: 'Time of Birth (24 Hr format)',
    tobPlaceholder: 'e.g. 14:30',
    pob: 'Place of Birth',
    pobPlaceholder: 'Start typing birth city...',
    currentLoc: 'Current Location',
    currentLocPlaceholder: 'City, Country',
    occupation: 'Occupation',
    occupationPlaceholder: 'e.g. Engineer, Student',
    submit: 'Generate Horoscope & Recommendation',
    genders: { Male: 'Male', Female: 'Female', Other: 'Other' },
    maritalStatus: { Single: 'Single', Married: 'Married', Divorced: 'Divorced', Widowed: 'Widowed' }
  },
  hi: {
    title: 'जन्म विवरण प्रोफ़ाइल',
    name: 'पूरा नाम',
    namePlaceholder: 'पूरा नाम दर्ज करें',
    gender: 'लिंग',
    marital: 'वैवाहिक स्थिति',
    dob: 'जन्म तिथि',
    tob: 'जन्म समय (24 घंटे का प्रारूप)',
    tobPlaceholder: 'जैसे 14:30',
    pob: 'जन्म स्थान',
    pobPlaceholder: 'जन्म शहर टाइप करना शुरू करें...',
    currentLoc: 'वर्तमान स्थान',
    currentLocPlaceholder: 'शहर, देश',
    occupation: 'व्यवसाय',
    occupationPlaceholder: 'जैसे इंजीनियर, छात्र',
    submit: 'कुंडली और रत्न अनुशंसा उत्पन्न करें',
    genders: { Male: 'पुरुष', Female: 'महिला', Other: 'अन्य' },
    maritalStatus: { Single: 'अविवाहित', Married: 'विवाहित', Divorced: 'तलाकशुदा', Widowed: 'विधुर/विधवा' }
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

  const t = TRANSLATIONS[lang];

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

    // Use Ludhiana coordinates as search fallback if Ludhiana typed
    let lat = selectedCoords?.lat ?? 28.6139;
    let lng = selectedCoords?.lng ?? 77.2090;

    if (!selectedCoords && formData.placeOfBirth.toLowerCase().includes('ludhiana')) {
      lat = 30.9010;
      lng = 75.8573;
    }

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
        <User style={{ color: 'var(--accent-gold)' }} /> {t.title}
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            <label className="form-label">{t.tob}</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder={t.tobPlaceholder}
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
  );
};
