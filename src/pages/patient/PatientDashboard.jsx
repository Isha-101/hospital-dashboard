import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { patientAppointments, testResults, prescriptions, nearbyHospitals } from '../../data/mockData';

const nextAppt = patientAppointments.find(a => a.status === 'confirmed' || a.status === 'pending');
const activeRx  = prescriptions.filter(p => p.status === 'active');
const abnormal  = testResults.filter(t => t.status !== 'normal');

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const firstName = user?.name?.split(' ')[0] || 'Patient';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(120deg, #1D4ED8 0%, #0EA5E9 100%)',
        borderRadius: 16,
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', top: -80, right: 80 }} />
        <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: '50%', bottom: -60, right: -20 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 6, fontWeight: 500 }}>
            {greeting},
          </div>
          <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 800, letterSpacing: -0.5, marginBottom: 10 }}>
            {firstName} 👋
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 420, lineHeight: 1.6 }}>
            Your health summary is up to date. You have {nextAppt ? '1 upcoming appointment' : 'no upcoming appointments'} and {abnormal.length > 0 ? `${abnormal.length} test result${abnormal.length > 1 ? 's' : ''} requiring attention` : 'all test results normal'}.
          </p>
          {user?.patientId && (
            <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 14px', backdropFilter: 'blur(8px)' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>Patient ID</span>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'IBM Plex Mono, monospace' }}>{user.patientId}</span>
            </div>
          )}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {nextAppt ? (
            <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 14, padding: '18px 22px', backdropFilter: 'blur(8px)', minWidth: 220 }}>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Next Appointment</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{nextAppt.doctor}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>{nextAppt.department}</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{nextAppt.date} · {nextAppt.time}</div>
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => navigate('/patient/appointments')}
                  style={{ background: '#fff', color: '#1D4ED8', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/patient/appointments')}
              style={{ background: '#fff', color: '#1D4ED8', border: 'none', borderRadius: 12, padding: '14px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              + Book Appointment
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <KPICard
          color="blue"
          icon="📅"
          value={patientAppointments.filter(a => a.status !== 'completed').length}
          label="Upcoming Appointments"
          sub="Next: Feb 28"
          onClick={() => navigate('/patient/appointments')}
        />
        <KPICard
          color={abnormal.length > 0 ? 'red' : 'green'}
          icon="🧪"
          value={testResults.length}
          label="Test Results"
          sub={abnormal.length > 0 ? `${abnormal.length} need attention` : 'All normal'}
          onClick={() => navigate('/patient/results')}
        />
        <KPICard
          color="amber"
          icon="💊"
          value={activeRx.length}
          label="Active Prescriptions"
          sub="Refills available"
          onClick={() => navigate('/patient/prescriptions')}
        />
        <KPICard
          color="sky"
          icon="🆘"
          value="25 min"
          label="Current ER Wait"
          sub="MedCare Central"
          onClick={() => navigate('/patient/emergency')}
        />
      </div>

      {/* Row 2: Health Profile + Recent Activity */}
      <div className="grid-2-1">

        {/* Recent Test Results */}
        <div className="card fade-up fade-up-2">
          <div className="card-header">
            <div>
              <div className="card-title">Recent Test Results</div>
              <div className="card-subtitle">Latest lab & radiology reports</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/patient/results')}>View all →</button>
          </div>
          <div style={{ padding: '8px 0' }}>
            {testResults.slice(0, 4).map(result => (
              <div key={result.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 24px',
                borderBottom: '1px solid #F0F4F8',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              onClick={() => navigate('/patient/results')}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: result.status === 'critical' ? '#FEF2F2' : result.status === 'attention' ? '#FFFBEB' : '#ECFDF5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>
                  {result.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F1C2E', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.name}</div>
                  <div style={{ fontSize: 12, color: '#8B9DB5' }}>{result.type} · {result.date}</div>
                </div>
                <StatusBadge status={result.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Health Profile */}
          <div className="card fade-up fade-up-3">
            <div className="card-header">
              <div className="card-title">Health Profile</div>
            </div>
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['Blood Group', user?.bloodGroup || 'O+'],
                ['Date of Birth', user?.dateOfBirth || '1990-03-15'],
                ['Phone', user?.phone || '—'],
                ['Insurance', user?.insurance?.provider || 'BlueCross BlueShield'],
                ['Policy No', user?.insurance?.policyNo || 'BCB-7734-2090'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, color: '#8B9DB5', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0F1C2E' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card fade-up fade-up-4" style={{ borderLeft: '3px solid #DC2626' }}>
            <div className="card-header">
              <div className="card-title" style={{ color: '#DC2626' }}>🆘 Emergency Contact</div>
            </div>
            <div style={{ padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Name', user?.emergencyContact?.name || 'Robert Thompson'],
                ['Relation', user?.emergencyContact?.relation || 'Spouse'],
                ['Phone', user?.emergencyContact?.phone || '+1 (555) 100-9999'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#8B9DB5', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0F1C2E' }}>{value}</span>
                </div>
              ))}
              <button
                onClick={() => navigate('/patient/emergency')}
                className="btn btn-danger btn-sm"
                style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}
              >
                🚑 Emergency Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Prescriptions */}
      <div className="card fade-up fade-up-3">
        <div className="card-header">
          <div>
            <div className="card-title">Active Prescriptions</div>
            <div className="card-subtitle">Current medications</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/patient/prescriptions')}>View all →</button>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Frequency</th>
                <th>Doctor</th>
                <th>Expires</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activeRx.map(rx => (
                <tr key={rx.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{rx.medication}</div>
                    <div style={{ fontSize: 12, color: '#8B9DB5' }}>{rx.brandName}</div>
                  </td>
                  <td><span className="mono" style={{ fontSize: 13 }}>{rx.dosage}</span></td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{rx.frequency}</td>
                  <td style={{ fontSize: 13 }}>{rx.doctor}</td>
                  <td style={{ fontSize: 13 }}>{rx.endDate}</td>
                  <td><span className="badge badge-success">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
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

function StatusBadge({ status }) {
  const map = {
    normal:    'badge-success',
    attention: 'badge-warning',
    critical:  'badge-danger',
  };
  return (
    <span className={`badge ${map[status] || 'badge-neutral'}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
