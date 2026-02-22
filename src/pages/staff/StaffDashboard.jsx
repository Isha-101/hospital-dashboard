import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { assignedPatients, staffSchedule, staffAlerts, adminKPIs } from '../../data/mockData';

const conditionCls = { stable: 'badge-success', fair: 'badge-warning', critical: 'badge-danger' };

export default function StaffDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const todayShift = staffSchedule.weeklyShifts.find(s => s.status === 'today');
  const unacknowledgedAlerts = staffAlerts.filter(a => !a.acknowledged);
  const criticalPatients = assignedPatients.filter(p => p.condition === 'critical');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Welcome + Shift Banner */}
      <div style={{
        background: 'linear-gradient(120deg, #0B1527 0%, #1E3A5F 60%, #1D4ED8 100%)',
        borderRadius: 16, padding: '28px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 280, height: 280, background: 'rgba(29,78,216,0.15)', borderRadius: '50%', top: -80, right: 100 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 6 }}>Clinical Staff Portal</div>
          <h1 style={{ color: '#fff', fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>
            Good morning, {user?.name?.split(' ')[0] || 'Doctor'} 👨‍⚕️
          </h1>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {user?.employeeId && (
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.8)', fontFamily: 'IBM Plex Mono, monospace' }}>
                {user.employeeId}
              </div>
            )}
            {user?.department && (
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                {user.department}
              </div>
            )}
            {user?.specialization && (
              <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                {user.specialization}
              </div>
            )}
          </div>
        </div>
        {todayShift && (
          <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '18px 24px', backdropFilter: 'blur(8px)', minWidth: 220, position: 'relative', zIndex: 1 }}>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Today's Shift</div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{todayShift.shift}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{todayShift.department} · {todayShift.ward}</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>{assignedPatients.length} Patients Assigned</div>
          </div>
        )}
      </div>

      {/* Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {unacknowledgedAlerts.map(alert => (
            <div key={alert.id} className={`alert ${alert.type === 'critical' ? 'alert-danger' : 'alert-warning'} fade-up`}>
              <span style={{ fontSize: 20 }}>{alert.type === 'critical' ? '🔴' : '⚠️'}</span>
              <div style={{ flex: 1 }}>
                <strong>{alert.title}</strong> — {alert.message}
                <span style={{ fontSize: 11, marginLeft: 10, opacity: 0.7 }}>{alert.time}</span>
              </div>
              <button onClick={() => navigate('/staff/alerts')} className="btn btn-ghost btn-sm">View</button>
            </div>
          ))}
        </div>
      )}

      {/* KPIs */}
      <div className="kpi-grid">
        <KPICard color="blue"  icon="👥" value={assignedPatients.length} label="Assigned Patients" sub="Today" onClick={() => navigate('/staff/patients')} />
        <KPICard color="red"   icon="⚠️" value={criticalPatients.length} label="Critical Cases" sub="Requires attention" onClick={() => navigate('/staff/patients')} />
        <KPICard color="green" icon="📋" value={staffSchedule.weeklyShifts.filter(s => s.status !== 'off').length} label="Shifts This Week" sub="3 remaining" onClick={() => navigate('/staff/schedule')} />
        <KPICard color="amber" icon="🔔" value={unacknowledgedAlerts.length} label="Unread Alerts" sub="Action required" onClick={() => navigate('/staff/alerts')} />
      </div>

      {/* Row: Patients + Schedule */}
      <div className="grid-2-1">

        {/* Assigned Patients table */}
        <div className="card fade-up fade-up-2">
          <div className="card-header">
            <div>
              <div className="card-title">Assigned Patients</div>
              <div className="card-subtitle">Current patient load</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/staff/patients')}>View all →</button>
          </div>
          <div className="table-wrap">
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Room</th>
                  <th>Diagnosis</th>
                  <th>Condition</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {assignedPatients.slice(0, 4).map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className={`avatar avatar-sm ${p.condition === 'critical' ? 'avatar-red' : p.condition === 'fair' ? 'avatar-amber' : 'avatar-green'}`}>
                          {p.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: '#8B9DB5' }}>{p.age}y {p.sex} · {p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 13, fontFamily: 'IBM Plex Mono, monospace', color: '#4A5E78' }}>{p.room}</td>
                    <td style={{ fontSize: 12, color: '#4A5E78', maxWidth: 160 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.diagnosis}</div>
                    </td>
                    <td>
                      <span className={`badge ${conditionCls[p.condition] || 'badge-neutral'}`}>
                        {p.condition.charAt(0).toUpperCase() + p.condition.slice(1)}
                      </span>
                    </td>
                    <td style={{ minWidth: 100 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ flex: 1 }}>
                          <div className="progress-fill" style={{ width: `${p.treatmentProgress}%`, background: p.treatmentProgress > 70 ? '#059669' : p.treatmentProgress > 40 ? '#D97706' : '#DC2626' }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#8B9DB5', flexShrink: 0 }}>{p.treatmentProgress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly schedule */}
        <div className="card fade-up fade-up-3">
          <div className="card-header">
            <div className="card-title">This Week's Shifts</div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/staff/schedule')}>Full →</button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {staffSchedule.weeklyShifts.map((shift, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px',
                borderLeft: shift.status === 'today' ? '3px solid #1D4ED8' : shift.status === 'off' ? '3px solid #DDE4EF' : '3px solid transparent',
                background: shift.status === 'today' ? '#F8FAFF' : 'transparent',
                borderBottom: '1px solid #F0F4F8',
              }}>
                <div style={{ width: 26, fontSize: 13, fontWeight: 700, color: shift.status === 'off' ? '#DDE4EF' : shift.status === 'today' ? '#1D4ED8' : '#8B9DB5' }}>
                  {shift.day.slice(0, 3)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: shift.status === 'off' ? '#C5D0E0' : '#0F1C2E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {shift.shift}
                  </div>
                  {shift.status !== 'off' && (
                    <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 1 }}>{shift.department}</div>
                  )}
                </div>
                {shift.status === 'today' && (
                  <span style={{ background: '#1D4ED8', color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>TODAY</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ color, icon, value, label, sub, onClick }) {
  return (
    <div className={`kpi-card ${color} fade-up`} style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className={`kpi-icon ${color}`}>{icon}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      <div style={{ fontSize: 12, color: '#8B9DB5', fontWeight: 500 }}>{sub}</div>
    </div>
  );
}
