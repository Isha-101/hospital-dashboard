import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ── Styles ───────────────────────────────────────────────────────────────────
import './styles/index.css';

// ── Auth ──────────────────────────────────────────────────────────────────────
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// ── Auth Pages ────────────────────────────────────────────────────────────────
import Login    from './pages/auth/Login';
import Register from './pages/auth/Register';

// ── Patient Pages ─────────────────────────────────────────────────────────────
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment  from './pages/patient/BookAppointment';
import TestResults      from './pages/patient/TestResults';
import Prescriptions    from './pages/patient/Prescriptions';
import PatientEmergency from './pages/patient/PatientEmergency';

// ── Staff Pages ───────────────────────────────────────────────────────────────
import StaffDashboard from './pages/staff/StaffDashboard';
import { StaffSchedule, AssignedPatients, PatientNotes, StaffAlerts } from './pages/staff/StaffPages';

// ── Admin Pages (existing views from original project, enhanced) ──────────────
// These import from the original views folder — kept intact per requirements
// If the originals don't exist yet, simple placeholders are provided below.
import AdminDashboard  from './pages/admin/AdminDashboard';
import AdminBeds       from './pages/admin/AdminBeds';
import AdminEquipment  from './pages/admin/AdminEquipment';
import AdminStaff      from './pages/admin/AdminStaff';
import AdminEmergency  from './pages/admin/AdminEmergency';

// ─────────────────────────────────────────────────────────────────────────────
// Root redirect — send to correct portal based on role
// ─────────────────────────────────────────────────────────────────────────────
function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin')   return <Navigate to="/admin/dashboard" replace />;
  if (user.role === 'staff')   return <Navigate to="/staff/dashboard" replace />;
  return <Navigate to="/patient/dashboard" replace />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Route wrapper: protected + layout
// ─────────────────────────────────────────────────────────────────────────────
function AppRoute({ element, allowedRoles }) {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Layout>{element}</Layout>
    </ProtectedRoute>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Root redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* ── Patient routes ── */}
      <Route path="/patient/dashboard"    element={<AppRoute element={<PatientDashboard />} allowedRoles={['patient']} />} />
      <Route path="/patient/appointments" element={<AppRoute element={<BookAppointment />}  allowedRoles={['patient']} />} />
      <Route path="/patient/results"      element={<AppRoute element={<TestResults />}      allowedRoles={['patient']} />} />
      <Route path="/patient/prescriptions"element={<AppRoute element={<Prescriptions />}   allowedRoles={['patient']} />} />
      <Route path="/patient/emergency"    element={<AppRoute element={<PatientEmergency />}allowedRoles={['patient']} />} />

      {/* ── Staff routes ── */}
      <Route path="/staff/dashboard" element={<AppRoute element={<StaffDashboard />}  allowedRoles={['staff']} />} />
      <Route path="/staff/schedule"  element={<AppRoute element={<StaffSchedule />}   allowedRoles={['staff']} />} />
      <Route path="/staff/patients"  element={<AppRoute element={<AssignedPatients />}allowedRoles={['staff']} />} />
      <Route path="/staff/notes"     element={<AppRoute element={<PatientNotes />}    allowedRoles={['staff']} />} />
      <Route path="/staff/alerts"    element={<AppRoute element={<StaffAlerts />}     allowedRoles={['staff']} />} />

      {/* ── Admin routes ── */}
      <Route path="/admin/dashboard" element={<AppRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
      <Route path="/admin/beds"      element={<AppRoute element={<AdminBeds />}      allowedRoles={['admin']} />} />
      <Route path="/admin/equipment" element={<AppRoute element={<AdminEquipment />} allowedRoles={['admin']} />} />
      <Route path="/admin/staff"     element={<AppRoute element={<AdminStaff />}     allowedRoles={['admin']} />} />
      <Route path="/admin/emergency" element={<AppRoute element={<AdminEmergency />} allowedRoles={['admin']} />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
