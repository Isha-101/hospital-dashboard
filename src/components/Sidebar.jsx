import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icon = ({ d, d2, circle, rect, poly, line, path2 }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d && <path d={d} />}
    {d2 && <path d={d2} />}
    {path2 && <path d={path2} />}
    {circle && <circle cx={circle[0]} cy={circle[1]} r={circle[2]} />}
    {rect && <rect x={rect[0]} y={rect[1]} width={rect[2]} height={rect[3]} rx={rect[4] || 0} />}
    {poly && <polyline points={poly} />}
    {line && <line x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} />}
  </svg>
);

const Icons = {
  home:       <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" d2="M9 22V12h6v10" />,
  calendar:   <Icon d="M8 2v4M16 2v4M3 10h18" rect={[3,4,18,18,2]} />,
  beaker:     <Icon d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" d2="M8.5 2h7" />,
  pill:       <Icon d="M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2" d2="M12 16h10" path2="M17 11v10" />,
  emergency:  <Icon d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  users:      <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" circle={[9,7,4]} d2="M23 21v-2a4 4 0 0 0-3-3.87" path2="M16 3.13a4 4 0 0 1 0 7.75" />,
  bed:        <Icon d="M2 4v16M2 8h18a2 2 0 0 1 2 2v6H2" d2="M2 17h20" />,
  equipment:  <Icon d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  chart:      <Icon d="M18 20V10M12 20V4M6 20v-6" />,
  schedule:   <Icon d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" d2="M12 6v6l4 2" />,
  alert:      <Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" d2="M12 9v4M12 17h.01" />,
  notes:      <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" d2="M14 2v6h6M16 13H8M16 17H8M10 9H8" />,
  logout:     <Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" poly="16 17 21 12 16 7" d2="M21 12H9" />,
  person:     <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" circle={[12,7,4]} />,
  staff:      <Icon d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" rect={[8,2,8,4,1]} />,
};

// ─── Nav configs per role ─────────────────────────────────────────────────────
const NAV = {
  admin: [
    {
      section: 'Overview',
      links: [
        { label: 'Command Center',  icon: Icons.home,      path: '/admin/dashboard' },
        { label: 'Analytics',       icon: Icons.chart,     path: '/admin/analytics' },
      ],
    },
    {
      section: 'Operations',
      links: [
        { label: 'Bed Management',  icon: Icons.bed,       path: '/admin/beds' },
        { label: 'Equipment',       icon: Icons.equipment, path: '/admin/equipment' },
        { label: 'Staff Directory', icon: Icons.users,     path: '/admin/staff' },
        { label: 'Emergency (ER)',  icon: Icons.emergency, path: '/admin/emergency', badge: '3' },
      ],
    },
  ],
  staff: [
    {
      section: 'Overview',
      links: [
        { label: 'My Dashboard',    icon: Icons.home,      path: '/staff/dashboard' },
        { label: 'My Schedule',     icon: Icons.schedule,  path: '/staff/schedule' },
      ],
    },
    {
      section: 'Patients',
      links: [
        { label: 'Assigned Patients',icon: Icons.users,    path: '/staff/patients' },
        { label: 'Patient Notes',   icon: Icons.notes,     path: '/staff/notes' },
      ],
    },
    {
      section: 'Alerts',
      links: [
        { label: 'Alerts & Notices',icon: Icons.alert,     path: '/staff/alerts', badge: '2' },
      ],
    },
  ],
  patient: [
    {
      section: 'My Health',
      links: [
        { label: 'My Dashboard',    icon: Icons.home,      path: '/patient/dashboard' },
        { label: 'Book Appointment',icon: Icons.calendar,  path: '/patient/appointments' },
        { label: 'Test Results',    icon: Icons.beaker,    path: '/patient/results' },
        { label: 'Prescriptions',   icon: Icons.pill,      path: '/patient/prescriptions' },
      ],
    },
    {
      section: 'Support',
      links: [
        { label: 'Emergency',       icon: Icons.emergency, path: '/patient/emergency' },
      ],
    },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Sidebar({ activePath, onNavigate }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  const nav = NAV[user.role] || [];
  const initials = user.avatar || user.name?.slice(0, 2).toUpperCase() || '??';
  const roleLabel = user.role === 'admin' ? 'Administrator' : user.role === 'staff' ? 'Clinical Staff' : 'Patient Portal';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🏥</div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-name">MedCare</div>
          <div className="sidebar-logo-role">{roleLabel}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {nav.map(section => (
          <div key={section.section}>
            <div className="sidebar-section-label">{section.section}</div>
            {section.links.map(link => {
              const isActive = activePath === link.path || activePath?.startsWith(link.path + '/');
              return (
                <button
                  key={link.path}
                  className={`sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => onNavigate(link.path)}
                  title={link.label}
                >
                  <span className="sidebar-link-icon">{link.icon}</span>
                  <span style={{ flex: 1 }}>{link.label}</span>
                  {link.badge && (
                    <span className="sidebar-link-badge">{link.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer: User + Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div
            className="sidebar-user-avatar"
            style={{
              background: user.role === 'admin'
                ? 'linear-gradient(135deg,#7C3AED,#A78BFA)'
                : user.role === 'staff'
                ? 'linear-gradient(135deg,#059669,#34D399)'
                : 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
            }}
          >
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-role">
              {user.employeeId || user.patientId || user.email}
            </div>
          </div>
        </div>

        <button
          className="sidebar-link"
          onClick={logout}
          style={{ color: '#F87171', marginTop: 4 }}
        >
          <span className="sidebar-link-icon">{Icons.logout}</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
