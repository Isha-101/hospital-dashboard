import React from 'react';
import { useNavigate } from 'react-router-dom';
import { adminKPIs, bedData, staffList, erData } from '../../data/mockData';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {erData.alerts.filter(a => a.type === 'critical').map(alert => (
        <div key={alert.id} className="alert alert-danger fade-up">
          <span>🔴</span>
          <div style={{ flex: 1 }}><strong>ER Alert:</strong> {alert.message}</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/emergency')}>View ER →</button>
        </div>
      ))}

      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'🛏️', value:`${adminKPIs.occupiedBeds}/${adminKPIs.totalBeds}`, label:'Beds Occupied', sub:`${adminKPIs.availableBeds} available` },
          { color:'red',   icon:'🚨', value:adminKPIs.erPatients,    label:'ER Patients',      sub:`${adminKPIs.erWaitTime} min wait` },
          { color:'green', icon:'👥', value:`${adminKPIs.activeStaff}/${adminKPIs.totalStaff}`, label:'Staff Active', sub:'On duty today' },
          { color:'amber', icon:'🔪', value:adminKPIs.surgeriesToday, label:'Surgeries Today',  sub:'Scheduled' },
          { color:'sky',   icon:'📋', value:adminKPIs.admissionsToday,label:'Admissions',       sub:'Today' },
          { color:'green', icon:'📤', value:adminKPIs.dischargeToday, label:'Discharges',       sub:'Today' },
        ].map(kpi => (
          <div key={kpi.label} className={`kpi-card ${kpi.color} fade-up`} style={{ cursor: 'default' }}>
            <div className={`kpi-icon ${kpi.color}`}>{kpi.icon}</div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
            <div style={{ fontSize: 12, color: '#8B9DB5' }}>{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Bed occupancy by ward */}
        <div className="card fade-up fade-up-2">
          <div className="card-header">
            <div>
              <div className="card-title">Ward Occupancy</div>
              <div className="card-subtitle">Live bed status by department</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/beds')}>Full View →</button>
          </div>
          <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bedData.map(ward => (
              <div key={ward.ward}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{ward.ward}</span>
                  <span style={{ fontSize: 13, fontFamily: 'IBM Plex Mono, monospace', color: ward.load > 80 ? '#DC2626' : ward.load > 70 ? '#D97706' : '#059669', fontWeight: 700 }}>
                    {ward.occupied}/{ward.total} ({ward.load}%)
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${ward.load}%`, background: ward.load > 80 ? '#DC2626' : ward.load > 70 ? '#D97706' : '#059669' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ER Status */}
        <div className="card fade-up fade-up-3">
          <div className="card-header">
            <div>
              <div className="card-title">Emergency Room</div>
              <div className="card-subtitle">Live status</div>
            </div>
            <span style={{ fontSize: 11, background: '#ECFDF5', color: '#059669', borderRadius: 8, padding: '4px 10px', fontWeight: 700 }}>● LIVE</span>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { value: `${erData.erWaitTime} min`, label: 'Wait Time', color: '#D97706' },
                { value: `${erData.erLoad}%`,         label: 'ER Load',   color: '#DC2626' },
                { value: erData.criticalCases,         label: 'Critical',  color: '#DC2626' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', background: '#F8FAFF', borderRadius: 10, padding: '14px 8px' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'IBM Plex Mono, monospace' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
            {erData.alerts.map(alert => (
              <div key={alert.id} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #F0F4F8', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 16 }}>{alert.type === 'critical' ? '🔴' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1C2E' }}>{alert.message}</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 2 }}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Staff on duty */}
      <div className="card fade-up fade-up-4">
        <div className="card-header">
          <div className="card-title">Staff On Duty Today</div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/admin/staff')}>Directory →</button>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr><th>Staff</th><th>Role</th><th>Department</th><th>Shift</th><th>Patients</th><th>Status</th></tr>
            </thead>
            <tbody>
              {staffList.slice(0, 5).map(s => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className={`avatar avatar-sm avatar-${s.avatarColor}`}>{s.avatar}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: '#8B9DB5' }}>{s.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{s.role}</td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{s.department}</td>
                  <td style={{ fontSize: 13 }}>{s.shift}</td>
                  <td style={{ fontSize: 13, fontFamily: 'IBM Plex Mono, monospace' }}>{s.patients}</td>
                  <td>
                    <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {s.status === 'on-call' ? '📟 On-Call' : '● Active'}
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
