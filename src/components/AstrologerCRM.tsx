import React, { useState, useEffect } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { User, Calendar, CreditCard, Plus, Search, FileText, Check, AlertCircle, Printer, Download, Sparkles, BookOpen } from 'lucide-react';
import { CustomDatePicker } from './CustomDatePicker';
import { CustomTimePicker } from './CustomTimePicker';

interface CRMClient {
  id: string;
  name: string;
  dob: string;
  tob: string;
  place: string;
  gender: string;
  occupation: string;
  notes: string;
}

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  type: string;
  status: 'Scheduled' | 'Rescheduled' | 'Completed' | 'Cancelled';
  fee: number;
  paymentStatus: 'Paid' | 'Pending';
}

interface AstrologerCRMProps {
  onLoadClient: (result: KundaliResult, name: string, dob: string) => void;
  lang: 'en' | 'hi';
}

const TRANSLATIONS = {
  en: {
    tabClients: 'Clients Database',
    tabAppts: 'Booking Calendar',
    tabPayments: 'Invoice & Payments',
    catalogTitle: '✦ Client Catalog',
    addBtn: 'Register Client',
    hideBtn: 'Hide Form',
    searchPlaceholder: 'Search clients by name, occupation...',
    dob: 'DOB',
    occupation: 'Occupation',
    notes: 'Consult Notes',
    loadBtn: 'Load Profile & Chart',
    formTitle: '✦ Quick Registration Form',
    fieldName: 'Client Name',
    fieldDob: 'Date of Birth',
    fieldTob: 'Time (HH:MM)',
    fieldGender: 'Gender',
    fieldPlace: 'Place of Birth',
    fieldOcc: 'Occupation',
    fieldNotes: 'Special Consulting Notes',
    saveBtn: 'Save Client Profile',
    apptTitle: '✦ Booked Appointments Calendar',
    scheduleBtn: 'Schedule Session',
    newApptTitle: '✦ Schedule New Session',
    selectClient: 'Select Registered Client',
    chooseClient: '-- Choose Client --',
    apptDate: 'Session Date',
    apptTime: 'Session Time',
    apptCat: 'Consultation Category',
    fee: 'Fee (₹)',
    statusPaid: 'Paid',
    statusPending: 'Pending',
    statusCompleted: 'Completed',
    statusScheduled: 'Scheduled',
    completeBtn: 'Complete Session',
    ledgerTitle: '✦ Billings & Invoice Ledger',
    ledgerDesc: 'Track consulting earnings and generate printable client invoices.',
    colClient: 'Client Name',
    colCat: 'Category',
    colFee: 'Fee (₹)',
    colPay: 'Payment',
    colStatus: 'Status',
    colInvoice: 'Invoice',
    viewInvoice: 'View Invoice',
    invoiceHeader: 'INVOICE',
    invoiceFirm: 'HOROGEM INC.',
    invoiceSub: 'Astrology & Gemstone Advisory Services',
    invoiceNo: 'Invoice No',
    dateLabel: 'Date',
    billedTo: 'Billed To',
    idLabel: 'Client ID',
    colDesc: 'Service Description',
    colAmount: 'Amount (INR)',
    colTotal: 'Total Due',
    payRec: 'Payment Received',
    payPen: 'Payment Pending',
    printBtn: 'Print Invoice',
    successMsg: 'Chart and recommendations successfully updated for'
  },
  hi: {
    tabClients: 'क्लाइंट डेटाबेस',
    tabAppts: 'बुकिंग कैलेंडर',
    tabPayments: 'बिलिंग और भुगतान',
    catalogTitle: '✦ क्लाइंट कैटलॉग',
    addBtn: 'नया क्लाइंट जोड़ें',
    hideBtn: 'फॉर्म छिपाएं',
    searchPlaceholder: 'नाम, व्यवसाय द्वारा खोजें...',
    dob: 'जन्म तिथि',
    occupation: 'व्यवसाय',
    notes: 'परामर्श नोट',
    loadBtn: 'प्रोफ़ाइल लोड करें',
    formTitle: '✦ त्वरित पंजीकरण फॉर्म',
    fieldName: 'क्लाइंट का नाम',
    fieldDob: 'जन्म की तारीख',
    fieldTob: 'समय (HH:MM)',
    fieldGender: 'लिंग',
    fieldPlace: 'जन्म स्थान',
    fieldOcc: 'व्यवसाय',
    fieldNotes: 'विशेष परामर्श नोट',
    saveBtn: 'क्लाइंट सहेजें',
    apptTitle: '✦ निर्धारित बैठक कैलेंडर',
    scheduleBtn: 'सत्र बुक करें',
    newApptTitle: '✦ नया परामर्श सत्र तय करें',
    selectClient: 'पंजीकृत क्लाइंट चुनें',
    chooseClient: '-- क्लाइंट चुनें --',
    apptDate: 'सत्र की तारीख',
    apptTime: 'सत्र का समय',
    apptCat: 'परामर्श श्रेणी',
    fee: 'शुल्क (₹)',
    statusPaid: 'भुगतान पूरा',
    statusPending: 'लंबित',
    statusCompleted: 'संपन्न',
    statusScheduled: 'निर्धारित',
    completeBtn: 'परामर्श पूरा करें',
    ledgerTitle: '✦ बिलिंग और भुगतान बहीखाता',
    ledgerDesc: 'अपनी परामर्श आय को ट्रैक करें और ग्राहकों के लिए प्रिंट-योग्य चालान (इनवॉइस) बनाएं।',
    colClient: 'क्लाइंट का नाम',
    colCat: 'श्रेणी',
    colFee: 'शुल्क (₹)',
    colPay: 'भुगतान',
    colStatus: 'स्थिति',
    colInvoice: 'इनवॉइस',
    viewInvoice: 'इनवॉइस देखें',
    invoiceHeader: 'चालान (इनवॉइस)',
    invoiceFirm: 'होरोेजेम इंक.',
    invoiceSub: 'ज्योतिष और रत्न सलाहकार सेवाएं',
    invoiceNo: 'इनवॉइस संख्या',
    dateLabel: 'तारीख',
    billedTo: 'सेवा प्रदाता',
    idLabel: 'क्लाइंट आईडी',
    colDesc: 'सेवा विवरण',
    colAmount: 'राशि (INR)',
    colTotal: 'कुल देय राशि',
    payRec: 'भुगतान प्राप्त हुआ',
    payPen: 'भुगतान लंबित',
    printBtn: 'इनवॉइस प्रिंट करें',
    successMsg: 'कुंडली और रत्न अनुशंसा सफलतापूर्वक अपडेट कर दी गई है:'
  }
};

export const AstrologerCRM: React.FC<AstrologerCRMProps> = ({ onLoadClient, lang }) => {
  const [clients, setClients] = useState<CRMClient[]>(() => {
    const stored = localStorage.getItem('horogem_crm_clients');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    // Start from 0 (empty array)
    return [];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const stored = localStorage.getItem('horogem_crm_appointments');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [activeTab, setActiveTab] = useState<'clients' | 'appointments' | 'payments'>('clients');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '', dob: '', tob: '', place: '', gender: 'Male', occupation: '', notes: ''
  });

  const [showAddApptForm, setShowAddApptForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    clientName: '', date: '', time: '', type: 'Gemstone Analysis', fee: 1500, paymentStatus: 'Pending' as 'Paid' | 'Pending'
  });

  const [selectedInvoice, setSelectedInvoice] = useState<Appointment | null>(null);

  // States for active client astrological dossier
  const [selectedClient, setSelectedClient] = useState<CRMClient | null>(null);
  const [selectedClientChart, setSelectedClientChart] = useState<KundaliResult | null>(null);
  const [recentProfiles, setRecentProfiles] = useState<any[]>([]);

  const t = TRANSLATIONS[lang];

  // Sync clients to localStorage
  useEffect(() => {
    localStorage.setItem('horogem_crm_clients', JSON.stringify(clients));
  }, [clients]);

  // Sync appointments to localStorage
  useEffect(() => {
    localStorage.setItem('horogem_crm_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Fetch search history profiles for import/sync
  const loadRecentProfiles = () => {
    const stored = localStorage.getItem('horogem_profile_history');
    if (stored) {
      try {
        setRecentProfiles(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    loadRecentProfiles();
    // Set up window listener to sync if history updates elsewhere
    window.addEventListener('storage', loadRecentProfiles);
    return () => window.removeEventListener('storage', loadRecentProfiles);
  }, []);

  const handleLoadClientDetails = (client: CRMClient) => {
    // Determine coordinates based on place name (fallback check)
    let lat = 28.6139;
    let lng = 77.2090;

    if (client.place.toLowerCase().includes('mumbai')) { lat = 19.0760; lng = 72.8777; }
    else if (client.place.toLowerCase().includes('ahmedabad')) { lat = 23.0225; lng = 72.5714; }
    else if (client.place.toLowerCase().includes('ludhiana')) { lat = 30.9010; lng = 75.8573; }

    const res = calculateKundali(client.dob, client.tob || '12:00', client.place, lat, lng);
    
    // Save active state for CRM summary panel
    setSelectedClient(client);
    setSelectedClientChart(res);

    // Call prop callback to load on main app tabs
    onLoadClient(res, client.name, client.dob);

    // Sync to sidebar Recent Profiles history
    try {
      const stored = localStorage.getItem('horogem_profile_history');
      let historyList = stored ? JSON.parse(stored) : [];
      const profile = {
        fullName: client.name,
        gender: client.gender,
        dob: client.dob,
        tob: client.tob || '12:00',
        placeOfBirth: client.place,
        currentLocation: '',
        occupation: client.occupation,
        maritalStatus: 'Single',
        lat,
        lng
      };
      // Prevent duplicates
      historyList = historyList.filter((h: any) => 
        !(h.fullName.toLowerCase() === profile.fullName.toLowerCase() && h.dob === profile.dob)
      );
      historyList = [profile, ...historyList].slice(0, 10);
      localStorage.setItem('horogem_profile_history', JSON.stringify(historyList));
      loadRecentProfiles();
    } catch (e) {
      console.error(e);
    }

    alert(`${t.successMsg} ${client.name}!`);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.dob || !newClient.place) {
      alert(lang === 'hi' ? 'कृपया आवश्यक फ़ील्ड भरें' : 'Please fill Name, Date and Place');
      return;
    }
    const created: CRMClient = {
      id: `crm-${Date.now()}`,
      ...newClient
    };
    setClients(prev => [...prev, created]);

    // Also sync to Recent Profiles in sidebar
    try {
      const stored = localStorage.getItem('horogem_profile_history');
      let historyList = stored ? JSON.parse(stored) : [];
      const profile = {
        fullName: newClient.name,
        gender: newClient.gender,
        dob: newClient.dob,
        tob: newClient.tob || '12:00',
        placeOfBirth: newClient.place,
        currentLocation: '',
        occupation: newClient.occupation,
        maritalStatus: 'Single',
        lat: 28.6139,
        lng: 77.2090
      };
      historyList = historyList.filter((h: any) => 
        !(h.fullName.toLowerCase() === profile.fullName.toLowerCase() && h.dob === profile.dob)
      );
      historyList = [profile, ...historyList].slice(0, 10);
      localStorage.setItem('horogem_profile_history', JSON.stringify(historyList));
      loadRecentProfiles();
    } catch (e) {
      console.error(e);
    }

    setNewClient({ name: '', dob: '', tob: '', place: '', gender: 'Male', occupation: '', notes: '' });
    setShowAddClientForm(false);
  };

  const handleImportRecentProfile = (profile: any) => {
    // Check duplication
    if (clients.some(c => c.name.toLowerCase() === profile.fullName.toLowerCase() && c.dob === profile.dob)) {
      alert(lang === 'hi' ? 'यह प्रोफ़ाइल पहले से क्लाइंट सूची में है।' : 'This profile is already registered in CRM.');
      return;
    }

    const created: CRMClient = {
      id: `crm-${Date.now()}`,
      name: profile.fullName,
      dob: profile.dob,
      tob: profile.tob || '12:00',
      place: profile.placeOfBirth,
      gender: profile.gender,
      occupation: profile.occupation || 'N/A',
      notes: `Imported from recent searches history.`
    };

    setClients(prev => [...prev, created]);
    alert(lang === 'hi' ? 'सफलतापूर्वक आयात किया गया!' : 'Successfully imported!');
  };

  const handleAddAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.clientName || !newAppt.date || !newAppt.time) {
      alert(lang === 'hi' ? 'कृपया सभी जानकारी भरें' : 'Please fill Client, Date and Time');
      return;
    }
    const created: Appointment = {
      id: String(Date.now()),
      clientName: newAppt.clientName,
      date: newAppt.date,
      time: newAppt.time,
      type: newAppt.type,
      status: 'Scheduled',
      fee: Number(newAppt.fee),
      paymentStatus: newAppt.paymentStatus
    };
    setAppointments(prev => [...prev, created]);
    setShowAddApptForm(false);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Navigation tabs */}
      <div className="glass-panel no-print" style={{ padding: '15px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'clients' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('clients')}
          >
            <User size={16} /> {t.tabClients} ({clients.length})
          </button>
          <button 
            className={`btn ${activeTab === 'appointments' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={16} /> {t.tabAppts} ({appointments.length})
          </button>
          <button 
            className={`btn ${activeTab === 'payments' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard size={16} /> {t.tabPayments}
          </button>
        </div>
      </div>

      {/* 1. Clients Tab */}
      {activeTab === 'clients' && (
        <div className="grid-3 no-print">
          {/* List panel */}
          <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>{t.catalogTitle}</h3>
              <button onClick={() => setShowAddClientForm(!showAddClientForm)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                <Plus size={16} /> {showAddClientForm ? t.hideBtn : t.addBtn}
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder={t.searchPlaceholder}
                style={{ paddingLeft: '40px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredClients.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                  {lang === 'hi' ? 'कोई क्लाइंट उपलब्ध नहीं है।' : 'No registered clients available.'}
                </div>
              ) : (
                filteredClients.map(c => (
                  <div 
                    key={c.id}
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      padding: '16px',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '12px',
                      transition: 'var(--transition-smooth)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-purple)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                  >
                    <div style={{ flex: '1', minWidth: '200px' }}>
                      <h4 style={{ fontSize: '1.05rem', color: '#fff' }}>{c.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {lang === 'hi' && c.gender === 'Male' ? 'पुरुष' : lang === 'hi' && c.gender === 'Female' ? 'महिला' : c.gender} • {t.dob}: {c.dob} ({c.tob}) • {c.place}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '4px' }}>
                        <strong>{t.occupation}:</strong> {c.occupation || 'N/A'}
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', background: 'rgba(0,0,0,0.15)', padding: '8px 12px', borderRadius: '6px' }}>
                        <strong>{t.notes}:</strong> {c.notes}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button onClick={() => handleLoadClientDetails(c)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                        {t.loadBtn}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Recent search profiles importer */}
            {recentProfiles.length > 0 && (
              <div style={{ marginTop: '24px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} /> {lang === 'hi' ? 'हालिया खोज इतिहास से आयात करें' : 'Import from Recent Searches'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                  {recentProfiles.map((p, idx) => {
                    const isAlreadyClient = clients.some(c => c.name.toLowerCase() === p.fullName.toLowerCase() && c.dob === p.dob);
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          padding: '12px', 
                          background: 'rgba(255,255,255,0.02)', 
                          border: '1px solid rgba(255,255,255,0.05)', 
                          borderRadius: '8px', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          gap: '10px', 
                          justifyContent: 'space-between' 
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>{p.fullName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.dob} • {p.placeOfBirth.split(',')[0]}</div>
                        </div>
                        <button
                          type="button"
                          disabled={isAlreadyClient}
                          onClick={() => handleImportRecentProfile(p)}
                          className="btn btn-secondary"
                          style={{ padding: '4px 8px', fontSize: '0.75rem', width: '100%', justifyContent: 'center' }}
                        >
                          {isAlreadyClient ? (lang === 'hi' ? 'पहले से मौजूद' : 'Added') : (lang === 'hi' ? 'ग्राहक सूची में जोड़ें' : 'Import Client')}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column: Form and Selected Client Astrological summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Add Form panel */}
            <div className="glass-panel" style={{ height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', marginBottom: '16px' }}>
                {t.formTitle}
              </h3>
              
              <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">{t.fieldName}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.fieldDob}</label>
                  <CustomDatePicker
                    value={newClient.dob}
                    onChange={(val) => setNewClient({ ...newClient, dob: val })}
                    lang={lang}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">{t.fieldTob}</label>
                    <CustomTimePicker
                      value={newClient.tob}
                      onChange={(val) => setNewClient({ ...newClient, tob: val })}
                      lang={lang}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.fieldGender}</label>
                    <select
                      className="form-select"
                      value={newClient.gender}
                      onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
                    >
                      <option value="Male">{lang === 'hi' ? 'पुरुष' : 'Male'}</option>
                      <option value="Female">{lang === 'hi' ? 'महिला' : 'Female'}</option>
                      <option value="Other">{lang === 'hi' ? 'अन्य' : 'Other'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t.fieldPlace}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newClient.place}
                    onChange={(e) => setNewClient({ ...newClient, place: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.fieldOcc}</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newClient.occupation}
                    onChange={(e) => setNewClient({ ...newClient, occupation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.fieldNotes}</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={newClient.notes}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  {t.saveBtn}
                </button>
              </form>
            </div>

            {/* Selected Client Astrological Summary Dossier */}
            {selectedClient && selectedClientChart && (
              <div className="glass-panel" style={{ borderTop: '4px solid var(--accent-gold)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BookOpen size={16} /> {lang === 'hi' ? `${selectedClient.name} ज्योतिष रिपोर्ट` : `Chart Summary: ${selectedClient.name}`}
                </h3>

                {/* Dasha / Mahadasha */}
                <div style={{ background: 'var(--accent-purple-glow)', padding: '12px', borderRadius: '8px', border: '1px solid var(--accent-purple)', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                    {lang === 'hi' ? 'सक्रिय विंशोत्तरी महादशा' : 'Active Dasha Period'}
                  </h4>
                  {(() => {
                    const now = new Date();
                    const activeDasha = selectedClientChart.dashas.find((d: any) => {
                      return new Date(d.start) <= now && new Date(d.end) >= now;
                    }) || selectedClientChart.dashas[0];
                    
                    const activeSub = activeDasha?.subDashas?.find((s: any) => {
                      return s.start <= now && s.end >= now;
                    });

                    return (
                      <div style={{ fontSize: '0.85rem' }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--accent-gold)', fontSize: '0.95rem' }}>
                          {activeDasha.lord} Dasha
                        </div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
                          Period: {new Date(activeDasha.start).getFullYear()} - {new Date(activeDasha.end).getFullYear()}
                        </div>
                        {activeSub && (
                          <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '6px' }}>
                            <strong>Antardasha:</strong> {activeSub.lord} (until {new Date(activeSub.end).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })})
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Yogas tab list */}
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-teal)', marginBottom: '8px', borderBottom: '1px solid rgba(26,188,156,0.15)', paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={14} /> {lang === 'hi' ? 'सक्रिय कुंडली योग' : 'Active Chart Yogas'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', paddingRight: '4px' }}>
                    {selectedClientChart.yogas.filter(y => y.active).length === 0 ? (
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {lang === 'hi' ? 'कोई सक्रिय योग नहीं मिला।' : 'No active yogas detected.'}
                      </div>
                    ) : (
                      selectedClientChart.yogas.filter(y => y.active).map((y, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem', padding: '6px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '2px solid var(--accent-teal)' }}>
                          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>{y.name}</span>
                          <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.75rem', marginTop: '2px' }}>{y.description}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Chronological vimshottari timeline */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#fff', marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px' }}>
                    {lang === 'hi' ? 'विंशोत्तरी दशा अनुक्रम' : 'Vimshottari Chronology'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto', paddingRight: '4px' }}>
                    {selectedClientChart.dashas.map((d, idx) => {
                      const isCurrent = new Date(d.start) <= new Date() && new Date(d.end) >= new Date();
                      return (
                        <div 
                          key={idx} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            fontSize: '0.75rem', 
                            padding: '4px 8px', 
                            background: isCurrent ? 'rgba(243,156,18,0.1)' : 'transparent', 
                            borderRadius: '4px',
                            border: isCurrent ? '1px solid rgba(243,156,18,0.2)' : 'none'
                          }}
                        >
                          <span style={{ fontWeight: isCurrent ? 'bold' : 'normal', color: isCurrent ? 'var(--accent-gold)' : 'var(--text-secondary)' }}>
                            {d.lord} Mahadasha
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>
                            {new Date(d.start).getFullYear()} - {new Date(d.end).getFullYear()}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="grid-3 no-print">
          {/* List panel */}
          <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>{t.apptTitle}</h3>
              <button onClick={() => setShowAddApptForm(!showAddApptForm)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                <Plus size={16} /> {t.scheduleBtn}
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appointments.map(appt => (
                <div 
                  key={appt.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px',
                    borderRadius: '12px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 'bold' }}>{appt.clientName}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {lang === 'hi' ? 'तारीख' : 'Date'}: <strong>{appt.date}</strong> {lang === 'hi' ? 'समय' : 'at'} <strong>{appt.time}</strong> • {lang === 'hi' ? 'विषय' : 'Type'}: {appt.type}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {lang === 'hi' ? 'शुल्क' : 'Session Fee'}: ₹{appt.fee} • {lang === 'hi' ? 'भुगतान स्थिति' : 'Payment Status'}: <span style={{ color: appt.paymentStatus === 'Paid' ? 'var(--accent-teal)' : 'var(--accent-gold)' }}>{appt.paymentStatus === 'Paid' ? t.statusPaid : t.statusPending}</span>
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className={`badge ${
                      appt.status === 'Completed' ? 'badge-teal' :
                      appt.status === 'Cancelled' ? 'badge-red' : 'badge-gold'
                    }`} style={{ alignSelf: 'center' }}>
                      {appt.status === 'Completed' ? t.statusCompleted : appt.status === 'Scheduled' ? t.statusScheduled : appt.status}
                    </span>
                    {appt.status === 'Scheduled' && (
                      <button 
                        onClick={() => {
                          setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'Completed', paymentStatus: 'Paid' } : a));
                        }}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                      >
                        {t.completeBtn}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Scheduler form */}
          <div className="glass-panel" style={{ height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-teal)', marginBottom: '16px' }}>
              {t.newApptTitle}
            </h3>
            
            <form onSubmit={handleAddAppt} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">{t.selectClient}</label>
                <select
                  className="form-select"
                  value={newAppt.clientName}
                  onChange={(e) => setNewAppt({ ...newAppt, clientName: e.target.value })}
                >
                  <option value="">{t.chooseClient}</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.apptDate}</label>
                <input
                  type="date"
                  className="form-input"
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.apptTime}</label>
                <input
                  type="time"
                  className="form-input"
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.apptCat}</label>
                <select
                  className="form-select"
                  value={newAppt.type}
                  onChange={(e) => setNewAppt({ ...newAppt, type: e.target.value })}
                >
                  <option value="Gemstone Analysis">{lang === 'hi' ? 'रत्न अनुकूलता विश्लेषण' : 'Gemstone Analysis'}</option>
                  <option value="General Reading">{lang === 'hi' ? 'सामान्य कुंडली वाचन' : 'General Reading'}</option>
                  <option value="Lal Kitab Remedies">{lang === 'hi' ? 'लाल किताब उपाय विश्लेषण' : 'Lal Kitab Remedies'}</option>
                  <option value="Dasha Transit">{lang === 'hi' ? 'दशा गोचर काल फल' : 'Dasha Transit'}</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">{t.fee}</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newAppt.fee}
                    onChange={(e) => setNewAppt({ ...newAppt, fee: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'hi' ? 'भुगतान' : 'Payment Status'}</label>
                  <select
                    className="form-select"
                    value={newAppt.paymentStatus}
                    onChange={(e) => setNewAppt({ ...newAppt, paymentStatus: e.target.value as 'Paid' | 'Pending' })}
                  >
                    <option value="Pending">{t.statusPending}</option>
                    <option value="Paid">{t.statusPaid}</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                {t.scheduleBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Payments Tab */}
      {activeTab === 'payments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel no-print" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>{t.ledgerTitle}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {t.ledgerDesc}
            </p>

            <div className="table-container">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-gold)' }}>
                  <th style={{ padding: '12px' }}>{t.colClient}</th>
                  <th style={{ padding: '12px' }}>{t.colCat}</th>
                  <th style={{ padding: '12px' }}>{t.colFee}</th>
                  <th style={{ padding: '12px' }}>{t.colPay}</th>
                  <th style={{ padding: '12px' }}>{t.colStatus}</th>
                  <th style={{ padding: '12px' }}>{t.colInvoice}</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appt => (
                  <tr key={appt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{appt.clientName}</td>
                    <td style={{ padding: '12px' }}>{appt.type}</td>
                    <td style={{ padding: '12px' }}>₹{appt.fee}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        color: appt.paymentStatus === 'Paid' ? 'var(--accent-teal)' : '#f39c12',
                        background: appt.paymentStatus === 'Paid' ? 'rgba(26,188,156,0.1)' : 'rgba(243,156,18,0.1)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {appt.paymentStatus === 'Paid' ? t.statusPaid : t.statusPending}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      {appt.status === 'Completed' ? t.statusCompleted : appt.status === 'Scheduled' ? t.statusScheduled : appt.status}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button 
                        onClick={() => setSelectedInvoice(appt)}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px' }}
                      >
                        <FileText size={12} /> {t.viewInvoice}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>

          {/* Selected Invoice Print Layout */}
          {selectedInvoice && (
            <div className="glass-panel" id="invoice-print-area" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }}>{t.invoiceFirm}</h1>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.invoiceSub}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '1.1rem', color: '#fff' }}>{t.invoiceHeader}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.invoiceNo}: HG-{selectedInvoice.id}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.dateLabel}: {selectedInvoice.date}</p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '6px' }}>{t.billedTo}:</h4>
                <p style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{selectedInvoice.clientName}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.idLabel}: {selectedInvoice.id}</p>
              </div>

              <div style={{ marginTop: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>{t.colDesc}</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>{t.colAmount}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', textAlign: 'left' }}>
                        {lang === 'hi' ? 'ज्योतिषीय परामर्श' : 'Astrological Consultation'} - {selectedInvoice.type}
                        <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {lang === 'hi' ? 'इसमें जन्म कुंडली गणना और रत्न विश्लेषण शामिल हैं' : 'Includes Birth Chart calculations and Gemstone suitability diagnostics'}
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>₹{selectedInvoice.fee}.00</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>
                      <td style={{ padding: '10px', textAlign: 'left' }}>{t.colTotal}</td>
                      <td style={{ padding: '10px', textAlign: 'right', color: 'var(--accent-gold)', fontSize: '1.1rem' }}>₹{selectedInvoice.fee}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                  {selectedInvoice.paymentStatus === 'Paid' ? (
                    <>
                      <Check size={16} style={{ color: 'var(--accent-teal)' }} />
                      <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>{t.payRec}</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} style={{ color: 'var(--accent-gold)' }} />
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{t.payPen}</span>
                    </>
                  )}
                </div>
                
                <button 
                  onClick={handlePrintInvoice}
                  className="btn btn-secondary no-print" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                >
                  <Printer size={14} /> {t.printBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
