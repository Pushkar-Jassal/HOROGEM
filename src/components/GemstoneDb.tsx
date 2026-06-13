import React, { useState } from 'react';
import { GEMSTONE_DB, Gemstone } from '../engine/gemstones';
import { Search, Info, ShieldAlert, Check } from 'lucide-react';

interface CartItem {
  name: string;
  hindiName: string;
  ratti: number;
  quantity: number;
  price: number;
}

interface GemstoneDbProps {
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    title: '✦ Gemstone Knowledge Database',
    searchPlaceholder: 'Search gemstone by English or Hindi name...',
    filterLabel: 'Filter by Planet',
    metalLabel: 'Metal',
    dayLabel: 'Wearing Day',
    fingerLabel: 'Finger',
    weightLabel: 'Weight',
    mantraLabel: 'Beej Mantra',
    benefitsLabel: 'Key Benefits',
    sideEffectsLabel: 'Side Effects',
    ritualLabel: 'Ritual'
  },
  hi: {
    title: '✦ रत्न ज्ञानकोष डेटाबेस',
    searchPlaceholder: 'अंग्रेजी या हिंदी नाम से रत्न खोजें...',
    filterLabel: 'संबद्ध ग्रह से फ़िल्टर करें',
    metalLabel: 'धातु',
    dayLabel: 'धारण का दिन',
    fingerLabel: 'उंगली',
    weightLabel: 'रत्ती वजन',
    mantraLabel: 'बीज मंत्र',
    benefitsLabel: 'मुख्य लाभ',
    sideEffectsLabel: 'दुष्प्रभाव',
    ritualLabel: 'धारण विधि'
  }
};

const PLANETS_HI: { [key: string]: string } = {
  All: 'सभी ग्रह', Sun: 'सूर्य', Moon: 'चन्द्र', Mars: 'मंगल', Mercury: 'बुध',
  Jupiter: 'गुरु', Venus: 'शुक्र', Saturn: 'शनि', Rahu: 'राहु', Ketu: 'केतु'
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
  'Sunday morning': 'रविवार सुबह (सूर्योदय)',
  'Monday morning': 'सोमवार सुबह',
  'Tuesday morning': 'मंगलवार सुबह',
  'Wednesday morning': 'बुधवार सुबह',
  'Thursday morning': 'गुरुवार सुबह',
  'Friday morning': 'शुक्रवार सुबह',
  'Saturday morning': 'शनिवार सुबह',
  'Saturday evening': 'शनिवार शाम (सूर्यास्त)',
  'Tuesday evening': 'मंगलवार शाम/रात'
};

const FINGERS_HI: { [key: string]: string } = {
  'Ring Finger': 'अनामिका (Ring Finger)',
  'Little Finger': 'कनिष्ठिका (Little Finger)',
  'Index Finger': 'तर्जनी (Index Finger)',
  'Middle Finger': 'मध्यमा (Middle Finger)',
  'Middle/Ring Finger': 'मध्यमा या अनामिका'
};

export const GemstoneDb: React.FC<GemstoneDbProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('All');
  
  // Selection state for each gemstone card
  const [selections, setSelections] = useState<{
    [key: string]: { ratti: number; quantity: number; selectedStoneIdx?: number }
  }>({});

  // E-commerce Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = TRANSLATIONS[lang];
  const planets = ['All', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

  const filteredGemstones = Object.values(GEMSTONE_DB).filter(gem => {
    const matchesSearch = gem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          gem.hindiName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlanet = selectedPlanet === 'All' || gem.planet === selectedPlanet;
    return matchesSearch && matchesPlanet;
  });

  const addToCart = (gem: Gemstone) => {
    const ratti = selections[gem.name]?.ratti || 6;
    const quantity = selections[gem.name]?.quantity || 1;
    const selectedStoneIdx = selections[gem.name]?.selectedStoneIdx || 0;

    let finalName = gem.name;
    let finalHindiName = gem.hindiName;
    let pricePerRatti = gem.basePricePerRatti || 2000;

    if (selectedStoneIdx > 0 && gem.alternatives && gem.alternatives.length >= selectedStoneIdx) {
      finalName = gem.alternatives[selectedStoneIdx - 1];
      finalHindiName = gem.alternativesHi ? gem.alternativesHi[selectedStoneIdx - 1] : finalName;
      pricePerRatti = Math.round(pricePerRatti * 0.25);
    }

    const price = pricePerRatti * ratti * quantity;

    const newItem: CartItem = {
      name: finalName,
      hindiName: finalHindiName,
      ratti,
      quantity,
      price
    };

    setCart(prev => [...prev, newItem]);
    alert(lang === 'hi' 
      ? `${finalHindiName} (${ratti} रत्ती) कार्ट में जोड़ा गया!` 
      : `${finalName} (${ratti} Ratti) added to cart!`
    );
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    alert(lang === 'hi' 
      ? 'आपका ऑर्डर सफलतापूर्वक स्वीकार कर लिया गया है! हमारे प्रतिनिधि जल्द ही आपसे संपर्क करेंगे।' 
      : 'Your gemstone order has been placed successfully! Our team will contact you shortly.'
    );
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>
          {t.title}
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder={t.searchPlaceholder}
              style={{ paddingLeft: '40px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
          </div>

          <div style={{ minWidth: '150px' }}>
            <select
              className="form-select"
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
            >
              {planets.map(p => (
                <option key={p} value={p}>
                  {p === 'All' ? t.filterLabel : (lang === 'hi' ? PLANETS_HI[p] : p)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {filteredGemstones.map((gem: Gemstone) => {
          const cardRatti = selections[gem.name]?.ratti || 6;
          const cardQty = selections[gem.name]?.quantity || 1;
          const selectedStoneIdx = selections[gem.name]?.selectedStoneIdx || 0;

          let basePrice = gem.basePricePerRatti || 2000;
          if (selectedStoneIdx > 0) {
            basePrice = Math.round(basePrice * 0.25);
          }
          const cardPrice = basePrice * cardRatti * cardQty;

          return (
            <div key={gem.name} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '4px solid var(--accent-purple)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)' }}>
                    {gem.name} <span style={{ fontSize: '1rem', color: 'var(--accent-gold)', fontWeight: 'normal' }}>({gem.hindiName})</span>
                  </h3>
                  <span className="badge badge-purple" style={{ marginTop: '6px' }}>
                    {lang === 'hi' ? PLANETS_HI[gem.planet] : gem.planet}
                  </span>
                </div>
              </div>

              {/* Alternative Stones Display */}
              {gem.alternatives && gem.alternatives.length > 0 && (
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <strong>{lang === 'hi' ? 'वैकल्पिक रत्न (उपरत्न):' : 'Substitute / Alternative Stones:'}</strong>{' '}
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>
                    {(lang === 'hi' ? gem.alternativesHi : gem.alternatives)?.join(', ')}
                  </span>
                </div>
              )}

              <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginBottom: '4px' }}>
                  <Info size={14} /> {t.mantraLabel}
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#fff', wordBreak: 'break-word' }}>"{gem.mantra}"</p>
              </div>

              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-teal)', marginBottom: '8px', borderBottom: '1px solid rgba(26,188,156,0.15)', paddingBottom: '4px' }}>
                  {t.benefitsLabel}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                  {gem.benefits.map((benefit, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <Check size={14} style={{ color: 'var(--accent-teal)', marginTop: '3px', flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#e74c3c', marginBottom: '8px', borderBottom: '1px solid rgba(231,76,60,0.15)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldAlert size={14} /> {t.sideEffectsLabel}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                  {gem.sideEffects.map((effect, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <span style={{ color: 'rgba(231,76,60,0.6)', marginTop: '2px', fontSize: '1.2rem', lineHeight: '1', flexShrink: 0 }}>•</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', marginBottom: '12px' }}>
                <strong>{t.ritualLabel}:</strong> {gem.wearingMethod}
              </div>

              {/* Ratti weight & Quantity & Cart section */}
              <div style={{ 
                marginTop: 'auto', 
                paddingTop: '16px', 
                borderTop: '2px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {/* Variant selection */}
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                    {lang === 'hi' ? 'रत्न प्रकार चुनें' : 'Select Stone Variant'}
                  </label>
                  <select
                    className="form-select"
                    style={{ padding: '8px 12px', fontSize: '0.85rem', cursor: 'pointer' }}
                    value={selectedStoneIdx}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setSelections(prev => ({
                        ...prev,
                        [gem.name]: { ...(prev[gem.name] || { ratti: 6, quantity: 1 }), selectedStoneIdx: idx }
                      }));
                    }}
                  >
                    <option value={0}>
                      {gem.name} {gem.hindiName ? `(${gem.hindiName})` : ''} - Primary (₹{(gem.basePricePerRatti || 2000).toLocaleString('en-IN')}/Ratti)
                    </option>
                    {gem.alternatives?.map((alt, aIdx) => {
                      const altHi = gem.alternativesHi ? gem.alternativesHi[aIdx] : alt;
                      const altPrice = Math.round((gem.basePricePerRatti || 2000) * 0.25);
                      return (
                        <option key={aIdx + 1} value={aIdx + 1}>
                          {alt} {altHi ? `(${altHi})` : ''} - Alt (₹{altPrice.toLocaleString('en-IN')}/Ratti)
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  {/* Ratti selection */}
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      {lang === 'hi' ? 'वजन (रत्ती)' : 'Weight (Ratti)'}
                    </label>
                    <select
                      className="form-select"
                      style={{ padding: '6px 10px', fontSize: '0.85rem', cursor: 'pointer' }}
                      value={cardRatti}
                      onChange={(e) => {
                        const r = Number(e.target.value);
                        setSelections(prev => ({ 
                          ...prev, 
                          [gem.name]: { ...(prev[gem.name] || { quantity: 1, selectedStoneIdx: 0 }), ratti: r } 
                        }));
                      }}
                    >
                      {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(r => (
                        <option key={r} value={r}>{r} {lang === 'hi' ? 'रत्ती' : 'Ratti'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity selection */}
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
                      {lang === 'hi' ? 'मात्रा' : 'Quantity'}
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '10px', overflow: 'hidden' }}>
                      <button 
                        type="button"
                        onClick={() => {
                          if (cardQty > 1) {
                            setSelections(prev => ({ 
                              ...prev, 
                              [gem.name]: { ...(prev[gem.name] || { ratti: 6, selectedStoneIdx: 0 }), quantity: cardQty - 1 } 
                            }));
                          }
                        }}
                        style={{ width: '30px', height: '32px', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                      >-</button>
                      <span style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {cardQty}
                      </span>
                      <button 
                        type="button"
                        onClick={() => {
                          setSelections(prev => ({ 
                            ...prev, 
                            [gem.name]: { ...(prev[gem.name] || { ratti: 6, selectedStoneIdx: 0 }), quantity: cardQty + 1 } 
                          }));
                        }}
                        style={{ width: '30px', height: '32px', border: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                      >+</button>
                    </div>
                  </div>
                </div>

                {/* Price and checkout triggers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      {lang === 'hi' ? 'अनुमानित मूल्य' : 'Estimated Price'}
                    </span>
                    <span style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: '800' }}>
                      ₹{cardPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(gem)}
                    className="btn btn-primary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  >
                    {lang === 'hi' ? 'कार्ट में जोड़ें' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: 'linear-gradient(135deg, var(--accent-gold), #e67e22)',
            color: '#05030f',
            border: 'none',
            borderRadius: '50px',
            padding: '14px 28px',
            boxShadow: '0 8px 30px rgba(243,156,18,0.4)',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '800',
            fontSize: '1rem',
            transition: 'transform 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <span>🛒</span>
          <span>{lang === 'hi' ? 'कार्ट देखें' : 'View Cart'} ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
        </button>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 1100,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-panel" style={{
            width: '100%',
            maxWidth: '450px',
            height: '100%',
            borderRadius: 0,
            borderLeft: '1px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            background: 'var(--bg-secondary)',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', margin: 0 }}>
                🛒 {lang === 'hi' ? 'आपका कार्ट' : 'Shopping Cart'}
              </h3>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.8rem', cursor: 'pointer', outline: 'none' }}
              >
                &times;
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                  {lang === 'hi' ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: '#fff', margin: 0 }}>{lang === 'hi' ? item.hindiName : item.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {item.ratti} Ratti • {lang === 'hi' ? `मात्रा: ${item.quantity}` : `Qty: ${item.quantity}`}
                      </span>
                      <div style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginTop: '4px' }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(idx)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                    >
                      {lang === 'hi' ? 'हटाएं' : 'Remove'}
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal and Checkout */}
            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.1rem' }}>
                  <span>{lang === 'hi' ? 'कुल देय:' : 'Grand Total:'}</span>
                  <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold', fontSize: '1.35rem' }}>
                    ₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '1rem' }}
                >
                  {lang === 'hi' ? 'ऑर्डर की पुष्टि करें (चेकआउट)' : 'Checkout & Order Now'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
