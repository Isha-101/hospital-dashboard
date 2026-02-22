import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// ── Mock user database ──────────────────────────────────────
const MOCK_USERS = [
  {
    id: 'admin-001',
    name: 'Dr. Sarah Mitchell',
    email: 'admin@medcare.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    avatar: 'SM',
    employeeId: 'ADM-001',
    phone: '+1 (555) 001-0001',
  },
  {
    id: 'staff-001',
    name: 'Dr. James Okafor',
    email: 'staff@medcare.com',
    password: 'staff123',
    role: 'staff',
    department: 'Cardiology',
    avatar: 'JO',
    employeeId: 'DOC-042',
    specialization: 'Cardiologist',
    phone: '+1 (555) 002-0042',
  },
  {
    id: 'patient-001',
    name: 'Ava Thompson',
    email: 'patient@medcare.com',
    password: 'patient123',
    role: 'patient',
    avatar: 'AT',
    patientId: 'PAT-20890',
    dateOfBirth: '1990-03-15',
    bloodGroup: 'O+',
    phone: '+1 (555) 100-2089',
    address: '142 Maple Street, Chicago, IL 60601',
    emergencyContact: { name: 'Robert Thompson', relation: 'Spouse', phone: '+1 (555) 100-9999' },
    insurance: { provider: 'BlueCross BlueShield', policyNo: 'BCB-7734-2090', validity: '2025-12-31' },
  },
];

// ── Helpers ─────────────────────────────────────────────────
const STORAGE_KEY = 'medcare_auth';

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [loading, setLoading] = useState(false);

  // Keep localStorage in sync
  useEffect(() => {
    if (user) saveSession(user);
    else clearSession();
  }, [user]);

  // ── login ────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700)); // simulate network

    const found = MOCK_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    setLoading(false);

    if (!found) {
      return { success: false, error: 'Invalid email or password. Please try again.' };
    }

    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { success: true, user: safeUser };
  };

  // ── register ─────────────────────────────────────────────
  const register = async ({ name, email, password, role }) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const exists = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    setLoading(false);

    if (exists) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      role,
      avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      patientId: role === 'patient' ? `PAT-${Math.floor(10000 + Math.random() * 90000)}` : undefined,
      employeeId: role !== 'patient' ? `EMP-${Math.floor(1000 + Math.random() * 9000)}` : undefined,
      department: role === 'admin' ? 'Administration' : role === 'staff' ? 'General Medicine' : undefined,
      bloodGroup: role === 'patient' ? 'Unknown' : undefined,
    };

    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // ── logout ───────────────────────────────────────────────
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
