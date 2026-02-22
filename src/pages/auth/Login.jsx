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

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// Demo credentials helper
const DEMO_CREDS = [
  { role: 'Admin',   email: 'admin@medcare.com',   password: 'admin123',   color: '#7C3AED' },
  { role: 'Staff',   email: 'staff@medcare.com',   password: 'staff123',   color: '#059669' },
  { role: 'Patient', email: 'patient@medcare.com', password: 'patient123', color: '#1D4ED8' },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const result = await login(form.email, form.password);
    if (!result.success) { setServerError(result.error); return; }

    const { role } = result.user;
    if (role === 'admin')   navigate('/admin/dashboard');
    else if (role === 'staff') navigate('/staff/dashboard');
    else navigate('/patient/dashboard');
  };

  const fillDemo = cred => setForm({ email: cred.email, password: cred.password });

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
            Intelligent Healthcare<br />for Modern Hospitals
          </h1>

          {/* Feature bullets */}
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['🔒', 'Role-based secure access control'],
              ['📊', 'Real-time clinical analytics'],
              ['🏥', 'Multi-department coordination'],
              ['📱', 'Accessible on all devices'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18, width: 28, textAlign: 'center' }}>{icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-brand-stats">
          {[['320+', 'Beds'], ['148', 'Staff'], ['24/7', 'Support']].map(([v, l]) => (
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
            <h2 className="auth-form-title">Welcome back</h2>
            <p className="auth-form-subtitle">Sign in to your MedCare account to continue</p>
          </div>

          {/* Demo credentials */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#8B9DB5', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 10 }}>
              Quick Demo Access
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {DEMO_CREDS.map(c => (
                <button
                  key={c.role}
                  type="button"
                  onClick={() => fillDemo(c)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: `1.5px solid ${c.color}22`,
                    background: `${c.color}10`,
                    color: c.color,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: 'inherit',
                  }}
                >
                  {c.role}
                </button>
              ))}
            </div>
          </div>

          {serverError && (
            <div className="alert alert-danger" style={{ marginBottom: 20, borderRadius: 10 }}>
              <span>⚠️</span>
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrap">
                <span className="form-input-icon"><MailIcon /></span>
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
              <label className="form-label">
                <span>Password</span>
              </label>
              <div className="form-input-wrap">
                <span className="form-input-icon"><LockIcon /></span>
                <input
                  type={showPw ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set('password')}
                  autoComplete="current-password"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" className="form-input-toggle" onClick={() => setShowPw(s => !s)}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {errors.password && <div className="form-error">⚠ {errors.password}</div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, marginTop: -8 }}>
              <a href="#" style={{ fontSize: 13, color: '#1D4ED8', fontWeight: 600, textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/>
                  </svg>
                  Signing in…
                </>
              ) : 'Sign In to MedCare →'}
            </button>
          </form>

          <div className="form-divider">
            <div className="form-divider-line" />
            <span className="form-divider-text">New to MedCare?</span>
            <div className="form-divider-line" />
          </div>

          <Link to="/register" style={{ display: 'block' }}>
            <button type="button" className="btn btn-secondary btn-full">
              Create an Account
            </button>
          </Link>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#8B9DB5', marginTop: 28, lineHeight: 1.6 }}>
            Protected by enterprise-grade encryption.<br />
            By signing in you agree to MedCare's <a href="#" style={{ color: '#1D4ED8' }}>Terms</a> &amp; <a href="#" style={{ color: '#1D4ED8' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
