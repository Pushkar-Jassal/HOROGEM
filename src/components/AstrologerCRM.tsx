import React, { useState } from 'react';
import { calculateKundali, KundaliResult } from '../engine/astrology';
import { User, Calendar, CreditCard, Plus, Search, FileText, Check, AlertCircle, Printer } from 'lucide-react';

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
  type: string; // Gemstone analysis, General reading, Dasha transit
  status: 'Scheduled' | 'Rescheduled' | 'Completed' | 'Cancelled';
  fee: number;
  paymentStatus: 'Paid' | 'Pending';
}

interface AstrologerCRMProps {
  onLoadClient: (result: KundaliResult, name: string, dob: string) => void;
}

export const AstrologerCRM: React.FC<AstrologerCRMProps> = ({ onLoadClient }) => {
  // Mock Clients Database
  const [clients, setClients] = useState<CRMClient[]>([
    {
      id: 'c1',
      name: 'Amit Sharma',
      dob: '1989-05-15',
      tob: '08:45',
      place: 'New Delhi, Delhi, India',
      gender: 'Male',
      occupation: 'Tech Lead',
      notes: 'Consulted for career delays and business stability. Saturn Sade Sati active.'
    },
    {
      id: 'c2',
      name: 'Priya Patel',
      dob: '1995-11-23',
      tob: '16:20',
      place: 'Mumbai, Maharashtra, India',
      gender: 'Female',
      occupation: 'Designer',
      notes: 'Interested in marriage compatibility and gemstone suitabilities. Exalted Moon.'
    },
    {
      id: 'c3',
      name: 'Rohan Mehta',
      dob: '1992-03-08',
      tob: '12:10',
      place: 'Ahmedabad, Gujarat, India',
      gender: 'Male',
      occupation: 'Exporter',
      notes: 'Lal Kitab remedies recommended for financial blockage. Ruby suitable.'
    }
  ]);

  // Mock Appointments Database
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'a1',
      clientName: 'Amit Sharma',
      date: '2026-06-14',
      time: '11:00',
      type: 'General Reading',
      status: 'Scheduled',
      fee: 2100,
      paymentStatus: 'Paid'
    },
    {
      id: 'a2',
      clientName: 'Priya Patel',
      date: '2026-06-15',
      time: '15:30',
      type: 'Gemstone Suitability',
      status: 'Scheduled',
      fee: 1500,
      paymentStatus: 'Pending'
    },
    {
      id: 'a3',
      clientName: 'Rohan Mehta',
      date: '2026-06-12',
      time: '09:00',
      type: 'Lal Kitab Remedies',
      status: 'Completed',
      fee: 2500,
      paymentStatus: 'Paid'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'clients' | 'appointments' | 'payments'>('clients');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Forms states
  const [showAddClientForm, setShowAddClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '', dob: '', tob: '', place: '', gender: 'Male', occupation: '', notes: ''
  });

  const [showAddApptForm, setShowAddApptForm] = useState(false);
  const [newAppt, setNewAppt] = useState({
    clientName: '', date: '', time: '', type: 'Gemstone Analysis', fee: 1500, paymentStatus: 'Pending' as 'Paid' | 'Pending'
  });

  const [selectedInvoice, setSelectedInvoice] = useState<Appointment | null>(null);

  // Load Client Birth details to calculate Kundali and update active platform state
  const handleLoadClientDetails = (client: CRMClient) => {
    const res = calculateKundali(client.dob, client.tob, client.place, 28.6139, 77.2090);
    onLoadClient(res, client.name, client.dob);
    alert(`Chart and recommendations successfully updated for ${client.name}! Go to the Kundali Chart / Gemstone tabs to view details.`);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.dob || !newClient.place) {
      alert('Please fill Name, Date and Place');
      return;
    }
    const created: CRMClient = {
      id: String(Date.now()),
      ...newClient
    };
    setClients([...clients, created]);
    setNewClient({ name: '', dob: '', tob: '', place: '', gender: 'Male', occupation: '', notes: '' });
    setShowAddClientForm(false);
  };

  const handleAddAppt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.clientName || !newAppt.date || !newAppt.time) {
      alert('Please fill Client, Date and Time');
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
    setAppointments([...appointments, created]);
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
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className={`btn ${activeTab === 'clients' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('clients')}
          >
            <User size={16} /> Clients Database ({clients.length})
          </button>
          <button 
            className={`btn ${activeTab === 'appointments' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('appointments')}
          >
            <Calendar size={16} /> Booking Calendar ({appointments.length})
          </button>
          <button 
            className={`btn ${activeTab === 'payments' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard size={16} /> Invoice & Payments
          </button>
        </div>
      </div>

      {/* 1. Clients Tab */}
      {activeTab === 'clients' && (
        <div className="grid-3 no-print">
          {/* List panel */}
          <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>✦ Client Catalog</h3>
              <button onClick={() => setShowAddClientForm(!showAddClientForm)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                <Plus size={16} /> {showAddClientForm ? 'Hide Form' : 'Register Client'}
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search clients by name, occupation..."
                style={{ paddingLeft: '40px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredClients.map(c => (
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
                      {c.gender} • DOB: {c.dob} ({c.tob}) • {c.place}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginTop: '4px' }}>
                      <strong>Occupation:</strong> {c.occupation || 'N/A'}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', background: 'rgba(0,0,0,0.15)', padding: '8px 12px', borderRadius: '6px' }}>
                      <strong>Consult Notes:</strong> {c.notes}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => handleLoadClientDetails(c)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                      Load Profile & Chart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Form panel */}
          <div className="glass-panel" style={{ height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-purple)', marginBottom: '16px' }}>
              ✦ Quick Registration Form
            </h3>
            
            <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  value={newClient.dob}
                  onChange={(e) => setNewClient({ ...newClient, dob: e.target.value })}
                />
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Time (HH:MM)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 10:15"
                    value={newClient.tob}
                    onChange={(e) => setNewClient({ ...newClient, tob: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    value={newClient.gender}
                    onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Place of Birth</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="City, Country"
                  value={newClient.place}
                  onChange={(e) => setNewClient({ ...newClient, place: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Occupation</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Business Manager"
                  value={newClient.occupation}
                  onChange={(e) => setNewClient({ ...newClient, occupation: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Special Consulting Notes</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  placeholder="Describe main concern..."
                  value={newClient.notes}
                  onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                Save Client Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Appointments Tab */}
      {activeTab === 'appointments' && (
        <div className="grid-3 no-print">
          {/* List panel */}
          <div className="glass-panel" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>✦ Booked Appointments Calendar</h3>
              <button onClick={() => setShowAddApptForm(!showAddApptForm)} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                <Plus size={16} /> Schedule Session
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
                      Date: <strong>{appt.date}</strong> at <strong>{appt.time}</strong> • Type: {appt.type}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Session Fee: ₹{appt.fee} • Payment Status: <span style={{ color: appt.paymentStatus === 'Paid' ? 'var(--accent-teal)' : 'var(--accent-gold)' }}>{appt.paymentStatus}</span>
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className={`badge ${
                      appt.status === 'Completed' ? 'badge-teal' :
                      appt.status === 'Cancelled' ? 'badge-red' : 'badge-gold'
                    }`} style={{ alignSelf: 'center' }}>
                      {appt.status}
                    </span>
                    {appt.status === 'Scheduled' && (
                      <button 
                        onClick={() => {
                          setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'Completed', paymentStatus: 'Paid' } : a));
                        }}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                      >
                        Complete Session
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
              ✦ Schedule New Session
            </h3>
            
            <form onSubmit={handleAddAppt} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Select Registered Client</label>
                <select
                  className="form-select"
                  value={newAppt.clientName}
                  onChange={(e) => setNewAppt({ ...newAppt, clientName: e.target.value })}
                >
                  <option value="">-- Choose Client --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Session Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Session Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Consultation Category</label>
                <select
                  className="form-select"
                  value={newAppt.type}
                  onChange={(e) => setNewAppt({ ...newAppt, type: e.target.value })}
                >
                  <option value="Gemstone Analysis">Gemstone Suitability</option>
                  <option value="General Reading">Birth Horoscope D1 Reading</option>
                  <option value="Lal Kitab Remedies">Lal Kitab remedies Analysis</option>
                  <option value="Dasha Transit">Dasha period analysis</option>
                </select>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Fee (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={newAppt.fee}
                    onChange={(e) => setNewAppt({ ...newAppt, fee: Number(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Payment Status</label>
                  <select
                    className="form-select"
                    value={newAppt.paymentStatus}
                    onChange={(e) => setNewAppt({ ...newAppt, paymentStatus: e.target.value as 'Paid' | 'Pending' })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                Schedule Appointment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Payments Tab */}
      {activeTab === 'payments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel no-print" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>✦ Billings & Invoice Ledger</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Track consulting earnings and generate printable client invoices.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--accent-gold)' }}>
                  <th style={{ padding: '12px' }}>Client Name</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Fee (₹)</th>
                  <th style={{ padding: '12px' }}>Payment</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Invoice</th>
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
                        {appt.paymentStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{appt.status}</td>
                    <td style={{ padding: '12px' }}>
                      <button 
                        onClick={() => setSelectedInvoice(appt)}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem', gap: '4px' }}
                      >
                        <FileText size={12} /> View Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Invoice Print Layout */}
          {selectedInvoice && (
            <div className="glass-panel" id="invoice-print-area" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '1.6rem', color: 'var(--accent-gold)' }}>HOROGEM INC.</h1>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Astrology & Gemstone Advisory Services</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '1.1rem', color: '#fff' }}>INVOICE</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Invoice No: HG-{selectedInvoice.id}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date: {selectedInvoice.date}</p>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-purple)', marginBottom: '6px' }}>Billed To:</h4>
                <p style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{selectedInvoice.clientName}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Consultation Member client profile ID: {selectedInvoice.id}</p>
              </div>

              <div style={{ marginTop: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ padding: '10px', textAlign: 'left' }}>Service Description</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', textAlign: 'left' }}>
                        Astrological Consultation - {selectedInvoice.type}
                        <br />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Includes Birth Chart calculations and Gemstone suitability diagnostics</span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>₹{selectedInvoice.fee}.00</td>
                    </tr>
                    <tr style={{ borderTop: '2px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>
                      <td style={{ padding: '10px', textAlign: 'left' }}>Total Due</td>
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
                      <span style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>Payment Received</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} style={{ color: 'var(--accent-gold)' }} />
                      <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>Payment Pending</span>
                    </>
                  )}
                </div>
                
                <button 
                  onClick={handlePrintInvoice}
                  className="btn btn-secondary no-print" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '6px' }}
                >
                  <Printer size={14} /> Print Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
