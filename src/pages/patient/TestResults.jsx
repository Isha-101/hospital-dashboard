import React, { useState } from 'react';
import { testResults } from '../../data/mockData';

const statusCls = { normal: 'badge-success', attention: 'badge-warning', critical: 'badge-danger' };
const statusBg  = { normal: '#ECFDF5', attention: '#FFFBEB', critical: '#FEF2F2' };
const statusClr = { normal: '#059669', attention: '#D97706', critical: '#DC2626' };

export default function TestResults() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? testResults : testResults.filter(t => t.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Alert for critical/abnormal */}
      {testResults.some(t => t.status === 'critical') && (
        <div className="alert alert-danger fade-up">
          <span style={{ fontSize: 20 }}>🔴</span>
          <div>
            <strong>Action Required:</strong> You have critical test results that require immediate attention.
            Please contact your doctor or visit the clinic as soon as possible.
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#8B9DB5', fontWeight: 600, marginRight: 4 }}>Filter:</span>
        {['all', 'normal', 'attention', 'critical'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              border: `1.5px solid ${filter === f ? '#1D4ED8' : '#DDE4EF'}`,
              background: filter === f ? '#1D4ED8' : '#fff',
              color: filter === f ? '#fff' : '#4A5E78',
              fontSize: 12, fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: '#8B9DB5' }}>{filtered.length} results</span>
      </div>

      {/* Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map((result, i) => (
          <div
            key={result.id}
            className="card fade-up"
            style={{
              animationDelay: `${i * 0.06}s`,
              cursor: 'pointer',
              borderLeft: `4px solid ${statusClr[result.status]}`,
            }}
            onClick={() => setSelected(result)}
          >
            <div style={{ padding: '20px 20px 8px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 12, flexShrink: 0,
                background: statusBg[result.status],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                {result.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F1C2E', marginBottom: 3 }}>{result.name}</div>
                <div style={{ fontSize: 12, color: '#8B9DB5', marginBottom: 8 }}>{result.type} · {result.date}</div>
                <span className={`badge ${statusCls[result.status]}`}>
                  {result.status === 'critical' ? '⚠ ' : result.status === 'attention' ? '! ' : ''}
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </span>
              </div>
            </div>

            {result.values.length > 0 && (
              <div style={{ padding: '12px 20px 16px' }}>
                {result.values.slice(0, 2).map(v => (
                  <div key={v.parameter} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F0F4F8', fontSize: 12 }}>
                    <span style={{ color: '#4A5E78' }}>{v.parameter}</span>
                    <span style={{ fontWeight: 700, color: v.status === 'normal' ? '#059669' : v.status === 'attention' ? '#D97706' : '#DC2626' }}>
                      {v.value}
                    </span>
                  </div>
                ))}
                {result.values.length > 2 && (
                  <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 6 }}>+{result.values.length - 2} more parameters</div>
                )}
              </div>
            )}

            {result.reportSummary && (
              <div style={{ padding: '0 20px 16px', fontSize: 12, color: '#4A5E78', lineHeight: 1.6,
                overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {result.reportSummary}
              </div>
            )}

            <div style={{ padding: '12px 20px', borderTop: '1px solid #F0F4F8', display: 'flex', gap: 8 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={e => { e.stopPropagation(); setSelected(result); }}
              >
                View Details
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={e => { e.stopPropagation(); alert('Download functionality coming soon'); }}
              >
                ⬇ Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: statusBg[selected.status], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {selected.icon}
                </div>
                <div>
                  <div className="modal-title">{selected.name}</div>
                  <div style={{ fontSize: 13, color: '#8B9DB5', marginTop: 2 }}>{selected.type} · {selected.date}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#8B9DB5', lineHeight: 1, padding: 4 }}>×</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <InfoPill label="Ordered By" value={selected.orderedBy} />
                <InfoPill label="Date" value={selected.date} />
                <InfoPill label="Result ID" value={selected.id} mono />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={`badge ${statusCls[selected.status]}`} style={{ fontSize: 12 }}>
                    {selected.status === 'critical' ? '⚠ Critical' : selected.status === 'attention' ? '! Needs Attention' : '✓ Normal'}
                  </span>
                </div>
              </div>

              {selected.values.length > 0 && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Test Parameters</div>
                  <div style={{ border: '1px solid #DDE4EF', borderRadius: 10, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#F5F8FD' }}>
                          <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: '#8B9DB5', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Parameter</th>
                          <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 700, color: '#8B9DB5', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Result</th>
                          <th style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 700, color: '#8B9DB5', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Normal Range</th>
                          <th style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 700, color: '#8B9DB5', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selected.values.map(v => (
                          <tr key={v.parameter} style={{ borderTop: '1px solid #F0F4F8', background: v.status !== 'normal' ? `${statusBg[v.status]}55` : 'transparent' }}>
                            <td style={{ padding: '12px 16px', fontWeight: 500 }}>{v.parameter}</td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: statusClr[v.status], fontFamily: 'IBM Plex Mono, monospace', fontSize: 13 }}>{v.value}</td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', color: '#8B9DB5', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12 }}>{v.range}</td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              <span className={`badge ${statusCls[v.status]}`} style={{ fontSize: 11 }}>
                                {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {selected.reportSummary && (
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Report Summary</div>
                  <div style={{ background: '#F8FAFF', border: '1px solid #DDE4EF', borderRadius: 10, padding: '16px', fontSize: 14, color: '#4A5E78', lineHeight: 1.7 }}>
                    {selected.reportSummary}
                  </div>
                </div>
              )}

              {selected.status !== 'normal' && (
                <div className="alert alert-warning">
                  <span>⚠️</span>
                  <span>This result requires follow-up. Please consult with {selected.orderedBy} or your primary physician at the earliest.</span>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary btn-sm" onClick={() => alert('Download PDF — coming soon')}>⬇ Download Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoPill({ label, value, mono }) {
  return (
    <div style={{ background: '#F5F8FD', borderRadius: 8, padding: '6px 14px' }}>
      <div style={{ fontSize: 10, color: '#8B9DB5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#0F1C2E', fontFamily: mono ? 'IBM Plex Mono, monospace' : 'inherit' }}>{value}</div>
    </div>
  );
}
