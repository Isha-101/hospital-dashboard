import React, { useState } from 'react';
import { bedData, equipmentData, staffList, erData } from '../../data/mockData';

// ─── Admin Beds ────────────────────────────────────────────────────────────────
export function AdminBeds() {
  const total = bedData.reduce((s, w) => s + w.total, 0);
  const occupied = bedData.reduce((s, w) => s + w.occupied, 0);
  const available = total - occupied;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="kpi-grid">
        {[
          { color:'blue', icon:'🛏️', value:total,     label:'Total Beds',      sub:'All wards' },
          { color:'red',  icon:'👤', value:occupied,  label:'Occupied',        sub:`${Math.round(occupied/total*100)}% occupancy` },
          { color:'green',icon:'✅', value:available,  label:'Available Beds',  sub:'Ready for admission' },
          { color:'amber',icon:'🏥', value:8,          label:'Wards / Units',   sub:'Active' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color} fade-up`}>
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div style={{ fontSize: 12, color: '#8B9DB5' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div className="card-title">Ward-by-Ward Occupancy</div>
          <div className="card-subtitle">Live bed management</div>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr><th>Ward / Unit</th><th>Total Beds</th><th>Occupied</th><th>Available</th><th>Load</th><th>Status</th></tr>
            </thead>
            <tbody>
              {bedData.map(ward => (
                <tr key={ward.ward}>
                  <td style={{ fontWeight: 600 }}>{ward.ward}</td>
                  <td className="mono">{ward.total}</td>
                  <td className="mono" style={{ color: '#0F1C2E', fontWeight: 600 }}>{ward.occupied}</td>
                  <td className="mono" style={{ color: ward.available < 5 ? '#DC2626' : '#059669', fontWeight: 600 }}>{ward.available}</td>
                  <td style={{ minWidth: 160 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${ward.load}%`, background: ward.load > 85 ? '#DC2626' : ward.load > 70 ? '#D97706' : '#059669' }} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: ward.load > 85 ? '#DC2626' : ward.load > 70 ? '#D97706' : '#059669', minWidth: 36 }}>{ward.load}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${ward.load > 85 ? 'badge-danger' : ward.load > 70 ? 'badge-warning' : 'badge-success'}`}>
                      {ward.load > 85 ? 'Critical' : ward.load > 70 ? 'High Load' : 'Normal'}
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

// ─── Admin Equipment ───────────────────────────────────────────────────────────
export function AdminEquipment() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? equipmentData : equipmentData.filter(e => e.status === filter);

  const statusCls = { 'in-use': 'badge-info', 'available': 'badge-success', 'maintenance': 'badge-warning' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="kpi-grid">
        {[
          { color:'blue',  icon:'⚙️', value:equipmentData.length,                               label:'Total Equipment',  sub:'Tracked assets' },
          { color:'sky',   icon:'🔄', value:equipmentData.filter(e=>e.status==='in-use').length, label:'In Use',           sub:'Currently deployed' },
          { color:'green', icon:'✅', value:equipmentData.filter(e=>e.status==='available').length,label:'Available',      sub:'Ready to deploy' },
          { color:'amber', icon:'🔧', value:equipmentData.filter(e=>e.status==='maintenance').length,label:'Maintenance', sub:'Under service' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color} fade-up`}>
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            <div style={{ fontSize: 12, color: '#8B9DB5' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div className="card-title">Equipment Inventory</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all','in-use','available','maintenance'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding:'5px 14px', borderRadius: 20, border:`1.5px solid ${filter===f?'#1D4ED8':'#DDE4EF'}`,
                  background: filter===f?'#1D4ED8':'#fff', color: filter===f?'#fff':'#4A5E78',
                  fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                {f.charAt(0).toUpperCase()+f.slice(1).replace('-',' ')}
              </button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr><th>ID</th><th>Equipment</th><th>Category</th><th>Location</th><th>Last Service</th><th>Next Service</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(eq => (
                <tr key={eq.id}>
                  <td className="mono" style={{ fontSize: 12, color: '#8B9DB5' }}>{eq.id}</td>
                  <td style={{ fontWeight: 600 }}>{eq.name}</td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{eq.category}</td>
                  <td style={{ fontSize: 13 }}>{eq.location}</td>
                  <td style={{ fontSize: 13, color: '#8B9DB5' }}>{eq.lastService}</td>
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{eq.nextService}</td>
                  <td><span className={`badge ${statusCls[eq.status] || 'badge-neutral'}`}>{eq.status.replace('-',' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Staff ────────────────────────────────────────────────────────────────
export function AdminStaff() {
  const [search, setSearch] = useState('');
  const filtered = staffList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase()) ||
    s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div className="kpi-grid">
        {[
          { color:'blue',   icon:'👥', value:staffList.length,                               label:'Total Staff' },
          { color:'green',  icon:'👨‍⚕️',value:staffList.filter(s=>s.role==='Doctor').length,  label:'Doctors' },
          { color:'sky',    icon:'🩺', value:staffList.filter(s=>s.role==='Nurse').length,   label:'Nurses' },
          { color:'amber',  icon:'📋', value:staffList.filter(s=>s.role==='Admin').length,   label:'Admin Staff' },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color} fade-up`}>
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div className="card-title">Staff Directory</div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#8B9DB5', fontSize: 14 }}>🔍</span>
            <input
              type="text" placeholder="Search staff…" value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1.5px solid #DDE4EF', borderRadius: 10, fontFamily: 'inherit', fontSize: 13, outline: 'none', width: 240 }}
            />
          </div>
        </div>
        <div className="table-wrap">
          <table className="pro-table">
            <thead>
              <tr><th>Staff Member</th><th>Role</th><th>Department</th><th>Specialization</th><th>Shift</th><th>Patients</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(s => (
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
                  <td style={{ fontSize: 13, color: '#4A5E78' }}>{s.specialization}</td>
                  <td style={{ fontSize: 13 }}>{s.shift}</td>
                  <td className="mono" style={{ fontSize: 13 }}>{s.patients}</td>
                  <td><span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{s.status === 'on-call' ? '📟 On-Call' : '● Active'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Emergency ──────────────────────────────────────────────────────────
export function AdminEmergency() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      <div style={{ background: 'linear-gradient(135deg,#B91C1C,#DC2626)', borderRadius: 16, padding: '24px 32px', color: '#fff', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 6 }}>🚨 EMERGENCY COMMAND</div>
          <div style={{ fontSize: 28, fontWeight: 900 }}>ER Status: HIGH LOAD</div>
          <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
            {erData.occupiedBays}/{erData.totalBays} bays occupied · {erData.staffOnDuty} staff on duty
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Wait Time', value: `${erData.currentWaitTime} min` },
            { label: 'ER Load',   value: `${erData.erLoad}%` },
            { label: 'Critical',  value: erData.criticalCases },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 20px' }}>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: 'IBM Plex Mono, monospace' }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="kpi-grid">
        {[
          { color:'red',   icon:'🔴', value:erData.criticalCases,  label:'Critical Cases'  },
          { color:'amber', icon:'🟡', value:erData.moderateCases,  label:'Moderate Cases'  },
          { color:'green', icon:'🟢', value:erData.minorCases,     label:'Minor Cases'     },
          { color:'blue',  icon:'👨‍⚕️',value:erData.staffOnDuty,   label:'Staff On Duty'   },
        ].map(k => (
          <div key={k.label} className={`kpi-card ${k.color} fade-up`}>
            <div className={`kpi-icon ${k.color}`}>{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="card fade-up fade-up-3">
        <div className="card-header">
          <div className="card-title">Active ER Alerts</div>
          <span style={{ fontSize: 11, background: '#ECFDF5', color: '#059669', borderRadius: 8, padding: '4px 10px', fontWeight: 700 }}>● LIVE</span>
        </div>
        <div style={{ padding: '8px 0' }}>
          {erData.alerts.map(alert => (
            <div key={alert.id} style={{
              display: 'flex', gap: 14, padding: '16px 24px', borderBottom: '1px solid #F0F4F8', alignItems: 'flex-start',
              background: alert.type === 'critical' ? '#FEF2F200' : 'transparent',
            }}>
              <span style={{ fontSize: 22 }}>{alert.type === 'critical' ? '🔴' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F1C2E' }}>{alert.message}</div>
                <div style={{ fontSize: 12, color: '#8B9DB5', marginTop: 3 }}>{alert.time}</div>
              </div>
              <span className={`badge ${alert.type === 'critical' ? 'badge-danger' : alert.type === 'warning' ? 'badge-warning' : 'badge-info'}`}>
                {alert.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
