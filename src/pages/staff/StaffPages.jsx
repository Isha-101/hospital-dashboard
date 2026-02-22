// ─── Staff Schedule ────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { staffSchedule, assignedPatients, staffAlerts } from '../../data/mockData';

export function StaffSchedule() {
  const shiftColors = { completed: '#8B9DB5', today: '#1D4ED8', upcoming: '#059669', off: '#DDE4EF' };
  const shiftBgs    = { completed: '#F5F8FD', today: '#EFF6FF', upcoming: '#ECFDF5', off: '#FAFBFD' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Weekly grid */}
      <div className="card fade-up">
        <div className="card-header">
          <div>
            <div className="card-title">Weekly Schedule</div>
            <div className="card-subtitle">Current week — Feb 24 – Mar 2, 2025</div>
          </div>
          <span className="badge badge-info">Week 9</span>
        </div>
        <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
          {staffSchedule.weeklyShifts.map((shift, i) => (
            <div key={i} style={{
              background: shiftBgs[shift.status],
              border: `2px solid ${shiftColors[shift.status]}30`,
              borderRadius: 12, padding: '14px',
              borderTop: `3px solid ${shiftColors[shift.status]}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: shiftColors[shift.status], marginBottom: 6 }}>{shift.day}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: shift.status === 'off' ? '#C5D0E0' : '#0F1C2E', lineHeight: 1.4 }}>{shift.shift}</div>
              {shift.status !== 'off' && (
                <>
                  <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 4 }}>{shift.department}</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5' }}>{shift.ward}</div>
                  {shift.patients > 0 && (
                    <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, color: shiftColors[shift.status] }}>{shift.patients} patients</div>
                  )}
                </>
              )}
              {shift.status === 'today' && (
                <div style={{ marginTop: 8, background: '#1D4ED8', color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: 6, padding: '3px 8px', display: 'inline-block' }}>TODAY</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming shifts */}
      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div className="card-title">Upcoming Shifts</div>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr><th>Date</th><th>Shift</th><th>Department</th><th>Type</th></tr>
            </thead>
            <tbody>
              {staffSchedule.upcomingShifts.map((s, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{s.date}</td>
                  <td>{s.shift}</td>
                  <td>{s.department}</td>
                  <td>
                    <span className={`badge ${s.type === 'emergency' ? 'badge-danger' : 'badge-info'}`}>
                      {s.type === 'emergency' ? '🚨 On-Call Emergency' : '📅 Regular'}
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

// ─── Assigned Patients ────────────────────────────────────────────────────────
export function AssignedPatients() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = assignedPatients.filter(p => {
    const matchesFilter = filter === 'all' || p.ward.toLowerCase() === filter || p.condition === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200, maxWidth: 300 }}>
          <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#8B9DB5' }}>🔍</span>
          <input
            type="text"
            placeholder="Search patients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', height: 38, padding: '0 12px 0 36px', border: '1.5px solid #DDE4EF', borderRadius: 10, fontFamily: 'inherit', fontSize: 13, outline: 'none' }}
          />
        </div>
        {['all','ICU','General','critical','stable'].map(f => (
          <button key={f}
            onClick={() => setFilter(f)}
            style={{ padding: '6px 16px', borderRadius: 20, border: `1.5px solid ${filter === f ? '#1D4ED8' : '#DDE4EF'}`,
              background: filter === f ? '#1D4ED8' : '#fff', color: filter === f ? '#fff' : '#4A5E78',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Patient Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="card fade-up" style={{ animationDelay: `${i * 0.06}s`, borderLeft: `4px solid ${p.condition === 'critical' ? '#DC2626' : p.condition === 'fair' ? '#D97706' : '#059669'}` }}>
            <div style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div className={`avatar avatar-lg ${p.condition === 'critical' ? 'avatar-red' : p.condition === 'fair' ? 'avatar-amber' : 'avatar-green'}`}>
                  {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ fontSize: 12, color: '#8B9DB5', fontFamily: 'IBM Plex Mono, monospace' }}>{p.id}</span>
                    <span className={`badge ${p.condition === 'critical' ? 'badge-danger' : p.condition === 'fair' ? 'badge-warning' : 'badge-success'}`}>
                      {p.condition.charAt(0).toUpperCase() + p.condition.slice(1)}
                    </span>
                    <span className="badge badge-info">{p.ward}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#4A5E78', marginBottom: 8 }}>
                    {p.age}y {p.sex} · Room {p.room} · Admitted {p.admissionDate}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1C2E' }}>Dx: {p.diagnosis}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 600, marginBottom: 4 }}>Treatment Progress</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ width: 120 }}>
                        <div className="progress-fill" style={{ width: `${p.treatmentProgress}%`, background: p.treatmentProgress > 70 ? '#059669' : p.treatmentProgress > 40 ? '#D97706' : '#DC2626' }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{p.treatmentProgress}%</span>
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">View Notes</button>
                </div>
              </div>

              {p.notes && (
                <div style={{ marginTop: 14, background: '#F8FAFF', border: '1px solid #DDE4EF', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#4A5E78', lineHeight: 1.6 }}>
                  📋 {p.notes}
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <div className="empty-state-title">No patients found</div>
            <div className="empty-state-desc">Try adjusting your search or filter.</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Patient Notes ─────────────────────────────────────────────────────────────
export function PatientNotes() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [status, setStatus] = useState('stable');
  const [savedNote, setSavedNote] = useState(false);

  const saveNote = () => {
    if (!noteText.trim()) return;
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 3000);
    setNoteText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="grid-1-2">
        {/* Patient list */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Select Patient</div>
          </div>
          <div>
            {assignedPatients.map(p => (
              <div key={p.id}
                onClick={() => setSelectedPatient(p)}
                style={{
                  padding: '14px 20px', cursor: 'pointer',
                  background: selectedPatient?.id === p.id ? '#EFF6FF' : 'transparent',
                  borderLeft: selectedPatient?.id === p.id ? '3px solid #1D4ED8' : '3px solid transparent',
                  borderBottom: '1px solid #F0F4F8',
                  display: 'flex', gap: 12, alignItems: 'center',
                }}>
                <div className={`avatar avatar-sm ${p.condition === 'critical' ? 'avatar-red' : p.condition === 'fair' ? 'avatar-amber' : 'avatar-green'}`}>
                  {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5' }}>Room {p.room} · {p.condition}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes form */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Clinical Notes</div>
            {selectedPatient && <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8' }}>{selectedPatient.name}</span>}
          </div>
          <div style={{ padding: 24 }}>
            {!selectedPatient ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-title">Select a patient</div>
                <div className="empty-state-desc">Choose a patient from the list to add notes.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {savedNote && (
                  <div className="alert alert-success">✅ Note saved successfully.</div>
                )}

                {selectedPatient.notes && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Previous Notes</div>
                    <div style={{ background: '#F8FAFF', border: '1px solid #DDE4EF', borderRadius: 10, padding: 14, fontSize: 13, color: '#4A5E78', lineHeight: 1.7 }}>
                      {selectedPatient.notes}
                    </div>
                  </div>
                )}

                <div>
                  <label className="form-label">Update Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #DDE4EF', borderRadius: 10, fontFamily: 'inherit', fontSize: 14, outline: 'none' }}
                  >
                    <option value="stable">Stable</option>
                    <option value="fair">Fair / Improving</option>
                    <option value="critical">Critical</option>
                    <option value="improving">Improving</option>
                    <option value="discharge-ready">Discharge Ready</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Add Clinical Note</label>
                  <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                    placeholder="Enter clinical observations, treatment updates, medication changes…"
                    rows={6}
                    style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #DDE4EF', borderRadius: 10, fontFamily: 'inherit', fontSize: 14, resize: 'vertical', outline: 'none', lineHeight: 1.6 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-secondary btn-sm">Cancel</button>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={saveNote} disabled={!noteText.trim()}>
                    Save Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Staff Alerts ─────────────────────────────────────────────────────────────
export function StaffAlerts() {
  const [alerts, setAlerts] = useState(staffAlerts);

  const acknowledge = id => setAlerts(a => a.map(al => al.id === id ? { ...al, acknowledged: true } : al));

  const unread = alerts.filter(a => !a.acknowledged);
  const read   = alerts.filter(a => a.acknowledged);

  const alertBg  = { critical: '#FEF2F2', warning: '#FFFBEB', info: '#F0F9FF' };
  const alertBdr = { critical: '#FCA5A5', warning: '#FCD34D', info: '#7DD3FC' };
  const alertIcon= { critical: '🔴', warning: '⚠️', info: 'ℹ️' };

  const renderAlert = (alert) => (
    <div key={alert.id} style={{
      background: alert.acknowledged ? '#FAFBFD' : alertBg[alert.type],
      border: `1.5px solid ${alert.acknowledged ? '#DDE4EF' : alertBdr[alert.type]}`,
      borderRadius: 12, padding: '18px 20px',
      display: 'flex', gap: 14, alignItems: 'flex-start',
      opacity: alert.acknowledged ? 0.7 : 1,
    }}>
      <span style={{ fontSize: 24, flexShrink: 0 }}>{alertIcon[alert.type]}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0F1C2E', marginBottom: 4 }}>{alert.title}</div>
        <div style={{ fontSize: 13, color: '#4A5E78', lineHeight: 1.6, marginBottom: 6 }}>{alert.message}</div>
        <div style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 500 }}>{alert.time}</div>
      </div>
      <div>
        {!alert.acknowledged ? (
          <button className="btn btn-secondary btn-sm" onClick={() => acknowledge(alert.id)}>Acknowledge</button>
        ) : (
          <span style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>✓ Acknowledged</span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {unread.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#DC2626', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>Unread Alerts</span>
            <span style={{ background: '#DC2626', color: '#fff', borderRadius: 10, padding: '1px 8px', fontSize: 11 }}>{unread.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {unread.map(renderAlert)}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#8B9DB5', marginBottom: 12 }}>Acknowledged</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {read.map(renderAlert)}
          </div>
        </div>
      )}

      {alerts.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <div className="empty-state-title">All clear!</div>
          <div className="empty-state-desc">No active alerts at this time.</div>
        </div>
      )}
    </div>
  );
}
