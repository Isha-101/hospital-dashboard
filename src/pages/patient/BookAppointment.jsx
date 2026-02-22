import React, { useState } from 'react';
import { departments, timeSlots, patientAppointments } from '../../data/mockData';

const statusClass = { confirmed: 'badge-success', pending: 'badge-warning', completed: 'badge-neutral' };

export default function BookAppointment() {
  const [step, setStep] = useState(1); // 1=dept, 2=doctor+date, 3=slot, 4=confirm, 5=success
  const [form, setForm] = useState({ dept: null, doctor: '', date: '', slot: '' });
  const [history] = useState(patientAppointments);

  const selectedDept = departments.find(d => d.id === form.dept);

  const handleBook = () => {
    setStep(5);
    setTimeout(() => setStep(1), 5000);
    setForm({ dept: null, doctor: '', date: '', slot: '' });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Booking wizard */}
      <div className="card fade-up">
        <div className="card-header">
          <div>
            <div className="card-title">Book an Appointment</div>
            <div className="card-subtitle">Step {Math.min(step, 4)} of 4</div>
          </div>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[1,2,3,4].map(s => (
              <div key={s} style={{
                width: s <= step ? (s === step ? 28 : 10) : 10,
                height: 10,
                borderRadius: 5,
                background: s < step ? '#059669' : s === step ? '#1D4ED8' : '#DDE4EF',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>
        </div>

        <div style={{ padding: '28px 28px' }}>
          {step === 5 ? (
            <SuccessState onBook={() => setStep(1)} />
          ) : step === 1 ? (
            // STEP 1: Department
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Select Department</h3>
              <p style={{ fontSize: 13, color: '#8B9DB5', marginBottom: 20 }}>Choose the medical department for your appointment</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {departments.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => { setForm(f => ({ ...f, dept: dept.id })); setStep(2); }}
                    style={{
                      padding: '18px 14px',
                      borderRadius: 12,
                      border: `2px solid ${form.dept === dept.id ? '#1D4ED8' : '#DDE4EF'}`,
                      background: form.dept === dept.id ? 'rgba(29,78,216,0.05)' : '#FAFBFD',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{dept.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F1C2E' }}>{dept.name}</div>
                    <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 3 }}>{dept.doctors.length} doctors</div>
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            // STEP 2: Doctor + Date
            <div>
              <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 20, fontFamily: 'inherit' }}>← Back</button>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Select Doctor & Date</h3>
              <p style={{ fontSize: 13, color: '#8B9DB5', marginBottom: 20 }}>{selectedDept?.name} — choose your preferred doctor</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Doctor</label>
                  <select
                    className="form-select form-input-no-icon"
                    value={form.doctor}
                    onChange={e => setForm(f => ({ ...f, doctor: e.target.value }))}
                    style={{ paddingLeft: 14 }}
                  >
                    <option value="">— Select a doctor —</option>
                    {selectedDept?.doctors.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Appointment Date</label>
                  <input
                    type="date"
                    className="form-input form-input-no-icon"
                    min={today}
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Appointment Type</label>
                  <select className="form-select form-input-no-icon" style={{ paddingLeft: 14 }}>
                    <option>New Consultation</option>
                    <option>Follow-up</option>
                    <option>Routine Checkup</option>
                    <option>Post-Operative Review</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  disabled={!form.doctor || !form.date}
                  onClick={() => setStep(3)}
                >
                  View Available Slots →
                </button>
              </div>
            </div>
          ) : step === 3 ? (
            // STEP 3: Time Slot
            <div>
              <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 20, fontFamily: 'inherit' }}>← Back</button>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Select Time Slot</h3>
              <p style={{ fontSize: 13, color: '#8B9DB5', marginBottom: 20 }}>{form.doctor} — {form.date}</p>

              <div style={{ marginBottom: 20, display: 'flex', gap: 16, fontSize: 12, color: '#8B9DB5', flexWrap: 'wrap' }}>
                <span>🟢 Available</span>
                <span>🔴 Taken</span>
                <span>🔵 Selected</span>
              </div>

              <div className="slot-grid">
                {timeSlots.map(slot => (
                  <button
                    key={slot.time}
                    className={`slot-btn ${!slot.available ? 'taken' : form.slot === slot.time ? 'selected' : ''}`}
                    disabled={!slot.available}
                    onClick={() => slot.available && setForm(f => ({ ...f, slot: slot.time }))}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-primary"
                disabled={!form.slot}
                onClick={() => setStep(4)}
                style={{ marginTop: 24 }}
              >
                Confirm Slot: {form.slot || '—'} →
              </button>
            </div>
          ) : step === 4 ? (
            // STEP 4: Confirm
            <div>
              <button onClick={() => setStep(3)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 20, fontFamily: 'inherit' }}>← Back</button>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Confirm Booking</h3>
              <p style={{ fontSize: 13, color: '#8B9DB5', marginBottom: 24 }}>Please review your appointment details</p>

              <div style={{ background: '#F8FAFF', border: '1px solid #DDE4EF', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
                {[
                  ['Department', selectedDept?.name],
                  ['Doctor', form.doctor],
                  ['Date', form.date],
                  ['Time', form.slot],
                  ['Location', 'MedCare Central Hospital'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #EEF2F7' }}>
                    <span style={{ fontSize: 13, color: '#8B9DB5', fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0F1C2E' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div className="alert alert-info" style={{ marginBottom: 20 }}>
                <span>ℹ️</span>
                <span>Please arrive 15 minutes before your appointment. Bring a valid photo ID and insurance card.</span>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleBook} style={{ flex: 1, justifyContent: 'center' }}>
                  ✓ Confirm Appointment
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Appointment History */}
      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div>
            <div className="card-title">Appointment History</div>
            <div className="card-subtitle">All past and upcoming appointments</div>
          </div>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(appt => (
                <tr key={appt.id}>
                  <td className="mono" style={{ fontSize: 12, color: '#8B9DB5' }}>{appt.id}</td>
                  <td style={{ fontWeight: 600, fontSize: 14 }}>{appt.doctor}</td>
                  <td style={{ fontSize: 13 }}>{appt.department}</td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{appt.type}</td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{appt.date}</div>
                    <div style={{ fontSize: 12, color: '#8B9DB5' }}>{appt.time}</div>
                  </td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{appt.location}</td>
                  <td>
                    <span className={`badge ${statusClass[appt.status] || 'badge-neutral'}`}>
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ onBook }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 24px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 20px' }}>
        ✅
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0F1C2E', marginBottom: 10 }}>Appointment Confirmed!</h3>
      <p style={{ fontSize: 14, color: '#8B9DB5', marginBottom: 24, lineHeight: 1.6 }}>
        Your appointment has been successfully booked. A confirmation will be sent to your registered email.
      </p>
      <button className="btn btn-primary" onClick={onBook}>Book Another</button>
    </div>
  );
}
