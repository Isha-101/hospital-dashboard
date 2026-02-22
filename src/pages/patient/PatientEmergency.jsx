import React, { useState, useEffect } from 'react';
import { emergencyContacts, nearbyHospitals } from '../../data/mockData';

export default function PatientEmergency() {
  const [ambulanceCalled, setAmbulanceCalled] = useState(false);
  const [waitTime, setWaitTime] = useState(25);
  const [erLoad] = useState(80);

  useEffect(() => {
    const t = setInterval(() => {
      setWaitTime(w => Math.max(18, Math.min(35, w + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const callAmbulance = () => {
    setAmbulanceCalled(true);
    setTimeout(() => setAmbulanceCalled(false), 8000);
  };

  const erLoadColor = erLoad < 60 ? '#059669' : erLoad < 80 ? '#D97706' : '#DC2626';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Critical Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
        borderRadius: 16, padding: '28px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: 200, height: 200, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', top: -60, right: 100 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🚨 EMERGENCY SERVICES</div>
          <h1 style={{ color: '#fff', fontSize: 42, fontWeight: 900, letterSpacing: -1, margin: 0 }}>911</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8 }}>
            For life-threatening emergencies, call 911 immediately
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="tel:911">
            <button style={{
              background: '#fff', color: '#DC2626', border: 'none',
              borderRadius: 12, padding: '14px 28px', fontSize: 16,
              fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}>
              📞 Call 911
            </button>
          </a>
          <button
            onClick={callAmbulance}
            disabled={ambulanceCalled}
            style={{
              background: ambulanceCalled ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: 12, padding: '14px 28px', fontSize: 15,
              fontWeight: 700, cursor: ambulanceCalled ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
          >
            {ambulanceCalled ? '🚑 Ambulance Dispatched!' : '🚑 Request Ambulance'}
          </button>
        </div>
      </div>

      {ambulanceCalled && (
        <div className="alert alert-danger" style={{ background: '#FEF2F2', border: '2px solid #DC2626' }}>
          <span style={{ fontSize: 22 }}>🚑</span>
          <div>
            <strong>Ambulance Dispatched!</strong> ETA approximately 8 minutes. Stay calm and remain at your location.
            Emergency services have been notified. Keep your phone line open.
          </div>
        </div>
      )}

      {/* ER Status + Live Wait */}
      <div className="grid-3">
        <LiveStat
          label="Current ER Wait"
          value={`${waitTime} min`}
          sub="MedCare Central · Live"
          color={waitTime > 30 ? '#DC2626' : waitTime > 20 ? '#D97706' : '#059669'}
          live
        />
        <LiveStat
          label="ER Occupancy"
          value={`${erLoad}%`}
          sub="24/30 bays occupied"
          color={erLoadColor}
          live
        />
        <LiveStat
          label="ER Staff On Duty"
          value="8"
          sub="Doctors + Nurses"
          color="#1D4ED8"
        />
      </div>

      {/* ER load bar */}
      <div className="card fade-up fade-up-2">
        <div className="card-header">
          <div>
            <div className="card-title">MedCare ER Live Status</div>
            <div className="card-subtitle">Real-time emergency room load</div>
          </div>
          <span style={{ fontSize: 11, background: '#ECFDF5', color: '#059669', borderRadius: 8, padding: '4px 10px', fontWeight: 700 }}>● LIVE</span>
        </div>
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Critical Cases',  count: 3, total: 30, color: '#DC2626' },
            { label: 'Moderate Cases',  count: 12, total: 30, color: '#D97706' },
            { label: 'Minor Cases',     count: 9, total: 30, color: '#059669' },
            { label: 'Available Bays',  count: 6, total: 30, color: '#0EA5E9' },
          ].map(item => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#4A5E78', fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.count}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(item.count / item.total) * 100}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card fade-up fade-up-3">
        <div className="card-header">
          <div className="card-title">Emergency Contacts</div>
          <div className="card-subtitle">Tap to call</div>
        </div>
        <div style={{ padding: '8px 0' }}>
          {emergencyContacts.map((c, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px',
              borderBottom: '1px solid #F0F4F8', cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#FAFBFF'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: c.type === 'emergency' ? '#FEF2F2' : c.type === 'hospital' ? '#EFF6FF' : '#F0FDF4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              }}>
                {c.type === 'emergency' ? '🚨' : c.type === 'hospital' ? '🏥' : c.type === 'poison' ? '☠️' : '📞'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F1C2E' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#8B9DB5', marginTop: 2 }}>Available: {c.available}</div>
              </div>
              <a href={`tel:${c.number}`} onClick={e => e.stopPropagation()}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#DC2626', fontFamily: 'IBM Plex Mono, monospace' }}>{c.number}</div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div className="card fade-up fade-up-4">
        <div className="card-header">
          <div className="card-title">Nearby Hospitals</div>
          <div className="card-subtitle">Emergency facilities near you</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {nearbyHospitals.map((h, i) => (
            <div key={i} style={{
              padding: '18px 24px',
              borderBottom: i < nearbyHospitals.length - 1 ? '1px solid #F0F4F8' : 'none',
              display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0F1C2E', marginBottom: 4 }}>{h.name}</div>
                <div style={{ fontSize: 13, color: '#8B9DB5' }}>{h.address} · {h.distance}</div>
              </div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: h.erLoad > 70 ? '#DC2626' : '#D97706', fontFamily: 'IBM Plex Mono, monospace' }}>{h.erWait}</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 600 }}>ER Wait</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: h.erLoad > 70 ? '#DC2626' : '#059669', fontFamily: 'IBM Plex Mono, monospace' }}>{h.erLoad}%</div>
                  <div style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 600 }}>Load</div>
                </div>
                <a href={`tel:${h.phone}`}>
                  <button className="btn btn-danger btn-sm">📞 Call ER</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveStat({ label, value, sub, color, live }) {
  return (
    <div className="card fade-up" style={{ padding: '22px 24px', position: 'relative' }}>
      {live && (
        <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#059669', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>LIVE</span>
        </div>
      )}
      <div style={{ fontSize: 36, fontWeight: 900, color, fontFamily: 'IBM Plex Mono, monospace', letterSpacing: -1 }}>{value}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#0F1C2E', marginTop: 4 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#8B9DB5', marginTop: 4 }}>{sub}</div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
