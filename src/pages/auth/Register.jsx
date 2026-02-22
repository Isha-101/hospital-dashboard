import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const EyeIcon = ({ open }) => open ? (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const roles = [
  { value: 'patient', label: 'Patient',       desc: 'Access your medical records, appointments & results',    icon: '🧑‍⚕️' },
  { value: 'staff',   label: 'Staff / Doctor',desc: 'Manage patients, schedules & clinical operations',         icon: '👨‍⚕️' },
  { value: 'admin',   label: 'Administrator', desc: 'Full access to hospital management & reporting',           icon: '🏥' },
];

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));
  const setRole = role => setForm(f => ({ ...f, role }));

  const pwStrength = pw => {
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['', '#DC2626', '#D97706', '#0EA5E9', '#059669'];
    return { score, label: labels[score], color: colors[score] };
  };

  const strength = pwStrength(form.password);

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().split(' ').length < 2)
      errs.name = 'Enter your full name (first and last)';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirm) errs.confirm = 'Please confirm your password';
    else if (form.confirm !== form.password) errs.confirm = 'Passwords do not match';
    if (!form.role) errs.role = 'Please select your role';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await register(form);
    if (!result.success) { setServerError(result.error); return; }

    const { role } = result.user;
    if (role === 'admin')   navigate('/admin/dashboard');
    else if (role === 'staff') navigate('/staff/dashboard');
    else navigate('/patient/dashboard');
  };

  return (
    <div className="auth-root">
      {/* ── Brand Panel ────────────────────────────── */}
      <div className="auth-brand">
        <div className="auth-brand-content">
          <div className="auth-brand-logo">
            <div className="auth-brand-logo-icon">🏥</div>
            <div>
              <div className="auth-brand-name">MedCare</div>
              <div className="auth-brand-tagline">Health Management System</div>
            </div>
          </div>

          <h1 className="auth-brand-headline">
            Join MedCare's<br />Digital Health Platform
          </h1>
          <p className="auth-brand-desc">
            Create your secure account and get instant access to your healthcare
            portal — tailored to your role within the MedCare ecosystem.
          </p>

          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {roles.map(r => (
              <div key={r.value} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span style={{ fontSize: 22, width: 30, flexShrink: 0, marginTop: 2 }}>{r.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{r.label}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-brand-stats">
          {[['HIPAA', 'Compliant'], ['256-bit', 'Encryption'], ['99.9%', 'Uptime']].map(([v, l]) => (
            <div key={l}>
              <div className="auth-brand-stat-value">{v}</div>
              <div className="auth-brand-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form Panel ─────────────────────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Fill in your details to get started with MedCare</p>
          </div>

          {serverError && (
            <div className="alert alert-danger" style={{ marginBottom: 20, borderRadius: 10 }}>
              <span>⚠️</span>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Role Selector */}
            <div className="form-group">
              <label className="form-label">I am a…</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {roles.map(r => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    style={{
                      padding: '10px 6px',
                      borderRadius: 10,
                      border: `2px solid ${form.role === r.value ? '#1D4ED8' : '#DDE4EF'}`,
                      background: form.role === r.value ? 'rgba(29,78,216,0.06)' : '#FAFBFD',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ fontSize: 20, marginBottom: 4 }}>{r.icon}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 700,
                      color: form.role === r.value ? '#1D4ED8' : '#4A5E78',
                    }}>
                      {r.label}
                    </div>
                  </button>
                ))}
              </div>
              {errors.role && <div className="form-error">⚠ {errors.role}</div>}
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="form-input-wrap">
                <span className="form-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'has-error' : ''}`}
                  placeholder="John Smith"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
              </div>
              {errors.name && <div className="form-error">⚠ {errors.name}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrap">
                <span className="form-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </span>
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </div>
              {errors.email && <div className="form-error">⚠ {errors.email}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrap">
                <span className="form-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="new-password"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" className="form-input-toggle" onClick={() => setShowPw(s => !s)}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 3,
                        background: i <= strength.score ? strength.color : '#DDE4EF',
                        transition: 'background 0.2s',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, color: strength.color, fontWeight: 600 }}>
                    {strength.label} password
                  </span>
                </div>
              )}
              {errors.password && <div className="form-error">⚠ {errors.password}</div>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="form-input-wrap">
                <span className="form-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </span>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className={`form-input ${errors.confirm ? 'has-error' : ''}`}
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={set('confirm')}
                  autoComplete="new-password"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" className="form-input-toggle" onClick={() => setShowConfirm(s => !s)}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirm && <div className="form-error">⚠ {errors.confirm}</div>}
              {!errors.confirm && form.confirm && form.confirm === form.password && (
                <div style={{ fontSize: 12, color: '#059669', marginTop: 5, fontWeight: 600 }}>✓ Passwords match</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? 'Creating Account…' : 'Create My Account →'}
            </button>
          </form>

          <div className="form-divider">
            <div className="form-divider-line" />
            <span className="form-divider-text">Already registered?</span>
            <div className="form-divider-line" />
          </div>

          <Link to="/login" style={{ display: 'block' }}>
            <button type="button" className="btn btn-secondary btn-full">
              Sign In Instead
            </button>
          </Link>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#8B9DB5', marginTop: 24, lineHeight: 1.6 }}>
            By registering you agree to MedCare's <a href="#" style={{ color: '#1D4ED8' }}>Terms of Service</a>{' '}
            and <a href="#" style={{ color: '#1D4ED8' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
