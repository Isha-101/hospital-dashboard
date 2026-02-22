import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const PAGE_TITLES = {
  '/admin/dashboard': { title: 'Command Center',    subtitle: "Today's operational overview" },
  '/admin/beds':      { title: 'Bed Management',    subtitle: 'Ward occupancy & availability' },
  '/admin/equipment': { title: 'Equipment Tracking',subtitle: 'Asset status & maintenance' },
  '/admin/staff':     { title: 'Staff Directory',   subtitle: 'Workforce management' },
  '/admin/emergency': { title: 'Emergency Monitor', subtitle: 'Real-time ER status' },

  '/staff/dashboard': { title: 'My Dashboard',      subtitle: "Today's clinical overview" },
  '/staff/schedule':  { title: 'My Schedule',       subtitle: 'Shift & assignment calendar' },
  '/staff/patients':  { title: 'Assigned Patients', subtitle: 'Your current patient list' },
  '/staff/notes':     { title: 'Patient Notes',     subtitle: 'Clinical notes & updates' },
  '/staff/alerts':    { title: 'Alerts & Notices',  subtitle: 'System and clinical alerts' },

  '/patient/dashboard':     { title: 'My Health Dashboard', subtitle: 'Your health at a glance' },
  '/patient/appointments':  { title: 'Appointments',        subtitle: 'Book & manage your appointments' },
  '/patient/results':       { title: 'Test Results',        subtitle: 'Lab & radiology reports' },
  '/patient/prescriptions': { title: 'Prescriptions',       subtitle: 'Your active medications' },
  '/patient/emergency':     { title: 'Emergency',           subtitle: 'Emergency contacts & ER status' },
};

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);

  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'MedCare', subtitle: '' };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div>
      <Sidebar activePath={location.pathname} onNavigate={navigate} />

      {/* TopBar */}
      <header className="topbar">
        <div style={{ flex: 1 }}>
          <div className="topbar-title">
            {pageInfo.title}
          </div>
          {pageInfo.subtitle && (
            <div className="topbar-subtitle">{pageInfo.subtitle}</div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#8B9DB5', marginRight: 8, whiteSpace: 'nowrap' }}>
          {currentDate}
        </div>

        <div className="topbar-actions">
          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button className="topbar-icon-btn" onClick={() => setNotifOpen(o => !o)}>
              <BellIcon />
              <span className="topbar-notif-dot" />
            </button>

            {notifOpen && (
              <div style={{
                position: 'absolute', top: 46, right: 0, width: 300,
                background: '#fff', borderRadius: 12, border: '1px solid #DDE4EF',
                boxShadow: '0 10px 30px rgba(15,28,46,0.12)',
                zIndex: 200, overflow: 'hidden',
              }}>
                <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid #EEF2F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>Notifications</span>
                  <span style={{ fontSize: 11, color: '#1D4ED8', fontWeight: 600, cursor: 'pointer' }}>Mark all read</span>
                </div>
                {[
                  { icon: '🔴', text: 'New test result available', time: '5m ago', unread: true },
                  { icon: '📅', text: 'Appointment tomorrow at 10:00 AM', time: '1h ago', unread: true },
                  { icon: '💊', text: 'Prescription ready for pickup', time: '3h ago', unread: false },
                ].map((n, i) => (
                  <div key={i} style={{
                    padding: '12px 18px',
                    borderBottom: '1px solid #F0F4F8',
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    background: n.unread ? '#FAFBFF' : '#fff',
                    cursor: 'pointer',
                  }}>
                    <span style={{ fontSize: 18 }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: n.unread ? 600 : 400, color: '#0F1C2E' }}>{n.text}</div>
                      <div style={{ fontSize: 11, color: '#8B9DB5', marginTop: 2 }}>{n.time}</div>
                    </div>
                    {n.unread && (
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#1D4ED8', marginTop: 4, flexShrink: 0 }} />
                    )}
                  </div>
                ))}
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: 12, color: '#1D4ED8', fontWeight: 600, cursor: 'pointer' }}>View all notifications</span>
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <div
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: user?.role === 'admin'
                ? 'linear-gradient(135deg,#7C3AED,#A78BFA)'
                : user?.role === 'staff'
                ? 'linear-gradient(135deg,#059669,#34D399)'
                : 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', flexShrink: 0,
            }}
            title={user?.name}
          >
            {user?.avatar || 'U'}
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="app-layout">
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
