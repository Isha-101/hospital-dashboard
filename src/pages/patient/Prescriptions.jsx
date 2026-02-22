import React, { useState } from 'react';
import { prescriptions } from '../../data/mockData';

export default function Prescriptions() {
  const [tab, setTab] = useState('active');
  const [selected, setSelected] = useState(null);

  const filtered = prescriptions.filter(p => tab === 'all' ? true : p.status === tab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header pills/tabs */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="tabs" style={{ marginBottom: 0, border: 'none' }}>
          {['active', 'completed', 'all'].map(t => (
            <button
              key={t}
              className={`tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t !== 'all' && (
                <span style={{ marginLeft: 6, fontSize: 11, background: tab === t ? 'rgba(29,78,216,0.1)' : '#EEF2F7', color: tab === t ? '#1D4ED8' : '#8B9DB5', borderRadius: 10, padding: '1px 7px', fontWeight: 700 }}>
                  {prescriptions.filter(p => p.status === t).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => alert('Download all — coming soon')}
          style={{ marginLeft: 'auto' }}
        >
          ⬇ Download All
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((rx, i) => (
          <div
            key={rx.id}
            className="card fade-up"
            style={{ animationDelay: `${i * 0.06}s`, cursor: 'pointer', borderLeft: rx.status === 'active' ? '4px solid #059669' : '4px solid #DDE4EF' }}
            onClick={() => setSelected(rx)}
          >
            <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center' }}>
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: rx.status === 'active' ? '#ECFDF5' : '#F5F8FD',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
              }}>
                💊
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#0F1C2E' }}>{rx.medication}</span>
                  <span style={{ fontSize: 13, color: '#8B9DB5' }}>{rx.brandName}</span>
                  <span className={`badge ${rx.status === 'active' ? 'badge-success' : 'badge-neutral'}`}>
                    {rx.status.charAt(0).toUpperCase() + rx.status.slice(1)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 8, flexWrap: 'wrap' }}>
                  <PillInfo label="Dose" value={rx.dosage} mono />
                  <PillInfo label="Frequency" value={rx.frequency} />
                  <PillInfo label="Doctor" value={rx.doctor} />
                  <PillInfo label="Duration" value={rx.duration} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                <div style={{ fontSize: 12, color: '#8B9DB5', textAlign: 'right' }}>
                  {rx.status === 'active' ? (
                    <>Expires <strong style={{ color: '#0F1C2E' }}>{rx.endDate}</strong></>
                  ) : (
                    <>Completed {rx.endDate}</>
                  )}
                </div>
                {rx.status === 'active' && rx.refills > 0 && (
                  <span style={{ fontSize: 11, background: '#EFF6FF', color: '#1D4ED8', padding: '3px 10px', borderRadius: 10, fontWeight: 600 }}>
                    {rx.refills} Refill{rx.refills > 1 ? 's' : ''} Left
                  </span>
                )}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); setSelected(rx); }}>Details</button>
                  <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); alert('Download PDF — coming soon'); }}>⬇</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">💊</div>
            <div className="empty-state-title">No {tab} prescriptions</div>
            <div className="empty-state-desc">When your doctor prescribes medications, they'll appear here.</div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">{selected.medication} — {selected.dosage}</div>
                <div style={{ fontSize: 13, color: '#8B9DB5', marginTop: 3 }}>Prescription ID: {selected.id}</div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#8B9DB5', padding: 4 }}>×</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Brand Name', selected.brandName],
                  ['Dosage', selected.dosage],
                  ['Frequency', selected.frequency],
                  ['Duration', selected.duration],
                  ['Start Date', selected.startDate],
                  ['End Date', selected.endDate],
                  ['Prescribed By', selected.doctor],
                  ['Department', selected.department],
                  ['Refills Remaining', `${selected.refills} refills`],
                  ['Status', selected.status],
                ].map(([label, value]) => (
                  <div key={label} style={{ background: '#F8FAFF', borderRadius: 8, padding: '10px 14px' }}>
                    <div style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0F1C2E' }}>{value}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Instructions</div>
                <div style={{ background: '#FFFBEB', border: '1px solid rgba(217,119,6,0.2)', borderRadius: 10, padding: '14px 18px', fontSize: 14, color: '#92400E', lineHeight: 1.7 }}>
                  ⚠️ {selected.instructions}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Download PDF — coming soon')}>⬇ Download Prescription</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PillInfo({ label, value, mono }) {
  return (
    <div>
      <span style={{ fontSize: 11, color: '#8B9DB5', fontWeight: 600 }}>{label}: </span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#4A5E78', fontFamily: mono ? 'IBM Plex Mono, monospace' : 'inherit' }}>{value}</span>
    </div>
  );
}
