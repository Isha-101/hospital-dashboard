// ─────────────────────────────────────────────────────────────────────────────
//  MedCare — Mock Data (all portals)
// ─────────────────────────────────────────────────────────────────────────────

// ── STAFF LIST ────────────────────────────────────────────────────────────────
export const staffList = [
  { id: 'DOC-042', name: 'Dr. James Okafor',    role: 'Doctor',  department: 'Cardiology',    specialization: 'Interventional Cardiologist', shift: 'Morning',   status: 'active',   patients: 8,  avatar: 'JO', avatarColor: 'blue' },
  { id: 'DOC-031', name: 'Dr. Priya Sharma',    role: 'Doctor',  department: 'Neurology',     specialization: 'Neurologist',                 shift: 'Morning',   status: 'active',   patients: 6,  avatar: 'PS', avatarColor: 'purple' },
  { id: 'DOC-019', name: 'Dr. Michael Chen',    role: 'Doctor',  department: 'Orthopedics',   specialization: 'Orthopedic Surgeon',          shift: 'Evening',   status: 'active',   patients: 5,  avatar: 'MC', avatarColor: 'green' },
  { id: 'DOC-055', name: 'Dr. Fatima Al-Rashid',role: 'Doctor',  department: 'General Medicine','specialization':'General Physician',         shift: 'Morning',   status: 'on-call',  patients: 10, avatar: 'FA', avatarColor: 'amber' },
  { id: 'NUR-008', name: 'Rebecca Harris',      role: 'Nurse',   department: 'ICU',           specialization: 'Critical Care',              shift: 'Night',     status: 'active',   patients: 4,  avatar: 'RH', avatarColor: 'sky' },
  { id: 'NUR-017', name: 'Marcus Johnson',      role: 'Nurse',   department: 'General',       specialization: 'General Care',               shift: 'Evening',   status: 'active',   patients: 6,  avatar: 'MJ', avatarColor: 'green' },
  { id: 'ADM-003', name: 'Linda Torres',        role: 'Admin',   department: 'Reception',     specialization: 'Patient Coordination',       shift: 'Morning',   status: 'active',   patients: 0,  avatar: 'LT', avatarColor: 'red' },
];

// ── DEPARTMENTS ───────────────────────────────────────────────────────────────
export const departments = [
  { id: 'cardio',   name: 'Cardiology',     icon: '❤️',  doctors: ['Dr. James Okafor', 'Dr. Elena Vasquez'] },
  { id: 'neuro',    name: 'Neurology',      icon: '🧠',  doctors: ['Dr. Priya Sharma', 'Dr. Nathan Brooks'] },
  { id: 'ortho',    name: 'Orthopedics',    icon: '🦴',  doctors: ['Dr. Michael Chen', 'Dr. Aisha Patel'] },
  { id: 'general',  name: 'General Medicine',icon: '🩺', doctors: ['Dr. Fatima Al-Rashid', 'Dr. Tom Walker'] },
  { id: 'derma',    name: 'Dermatology',    icon: '💊',  doctors: ['Dr. Sofia Lee', 'Dr. Chris Evans'] },
  { id: 'peds',     name: 'Pediatrics',     icon: '👶',  doctors: ['Dr. Anna Kim', 'Dr. David Reyes'] },
  { id: 'ophtha',   name: 'Ophthalmology',  icon: '👁️',  doctors: ['Dr. Rachel White'] },
  { id: 'radiology',name: 'Radiology',      icon: '🔬',  doctors: ['Dr. Frank Ng', 'Dr. Carol Smith'] },
];

// ── TIME SLOTS ─────────────────────────────────────────────────────────────────
export const timeSlots = [
  { time: '09:00 AM', available: true },
  { time: '09:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '12:00 PM', available: false },
  { time: '02:00 PM', available: true },
  { time: '02:30 PM', available: true },
  { time: '03:00 PM', available: false },
  { time: '03:30 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '04:30 PM', available: false },
  { time: '05:00 PM', available: true },
];

// ── PATIENT APPOINTMENTS ───────────────────────────────────────────────────────
export const patientAppointments = [
  { id: 'APT-001', date: '2025-02-28', time: '10:00 AM', doctor: 'Dr. James Okafor',    department: 'Cardiology',     type: 'Follow-up',      status: 'confirmed', notes: 'Annual cardiac review', location: 'Room 204' },
  { id: 'APT-002', date: '2025-03-05', time: '02:30 PM', doctor: 'Dr. Priya Sharma',    department: 'Neurology',      type: 'Consultation',   status: 'pending',   notes: 'Migraine assessment', location: 'Room 310' },
  { id: 'APT-003', date: '2025-01-15', time: '09:00 AM', doctor: 'Dr. Michael Chen',    department: 'Orthopedics',    type: 'Post-Op Review', status: 'completed', notes: 'Post knee surgery review', location: 'Room 105' },
  { id: 'APT-004', date: '2025-01-22', time: '11:30 AM', doctor: 'Dr. Fatima Al-Rashid',department: 'General Medicine','type': 'Routine Checkup','status':'completed',notes: 'Annual health checkup', location: 'Room 101' },
  { id: 'APT-005', date: '2025-03-12', time: '04:00 PM', doctor: 'Dr. Sofia Lee',       department: 'Dermatology',    type: 'New Consultation','status':'confirmed', notes: 'Skin allergy review', location: 'Room 402' },
];

// ── TEST RESULTS ───────────────────────────────────────────────────────────────
export const testResults = [
  {
    id: 'TST-001',
    name: 'Complete Blood Count (CBC)',
    type: 'Blood Test',
    date: '2025-02-10',
    orderedBy: 'Dr. Fatima Al-Rashid',
    status: 'normal',
    icon: '🩸',
    values: [
      { parameter: 'Hemoglobin',       value: '13.8 g/dL',     range: '12.0–16.0',  status: 'normal' },
      { parameter: 'WBC Count',        value: '7,200 /µL',     range: '4,500–11,000', status: 'normal' },
      { parameter: 'Platelet Count',   value: '245,000 /µL',   range: '150,000–400,000', status: 'normal' },
      { parameter: 'RBC Count',        value: '4.8 M/µL',      range: '4.2–5.4',    status: 'normal' },
    ],
  },
  {
    id: 'TST-002',
    name: 'Lipid Profile',
    type: 'Blood Test',
    date: '2025-02-10',
    orderedBy: 'Dr. James Okafor',
    status: 'attention',
    icon: '🩸',
    values: [
      { parameter: 'Total Cholesterol',value: '218 mg/dL',     range: '<200',       status: 'attention' },
      { parameter: 'LDL Cholesterol',  value: '142 mg/dL',     range: '<130',       status: 'attention' },
      { parameter: 'HDL Cholesterol',  value: '52 mg/dL',      range: '>40',        status: 'normal' },
      { parameter: 'Triglycerides',    value: '160 mg/dL',     range: '<150',       status: 'attention' },
    ],
  },
  {
    id: 'TST-003',
    name: 'Chest X-Ray',
    type: 'Radiology',
    date: '2025-01-28',
    orderedBy: 'Dr. James Okafor',
    status: 'normal',
    icon: '🔬',
    values: [],
    reportSummary: 'No significant cardiopulmonary abnormalities detected. Lung fields are clear. Cardiac silhouette is normal in size. No pleural effusion.',
  },
  {
    id: 'TST-004',
    name: 'ECG / EKG',
    type: 'Cardiac',
    date: '2025-01-28',
    orderedBy: 'Dr. James Okafor',
    status: 'normal',
    icon: '💓',
    values: [],
    reportSummary: 'Normal sinus rhythm at 72 bpm. PR interval 160ms. QRS duration 90ms. No ST segment changes. No arrhythmias detected.',
  },
  {
    id: 'TST-005',
    name: 'Blood Glucose (HbA1c)',
    type: 'Blood Test',
    date: '2025-02-10',
    orderedBy: 'Dr. Fatima Al-Rashid',
    status: 'critical',
    icon: '🩸',
    values: [
      { parameter: 'HbA1c',           value: '8.2%',           range: '<5.7%',      status: 'critical' },
      { parameter: 'Fasting Glucose', value: '156 mg/dL',      range: '70–100',     status: 'critical' },
    ],
  },
  {
    id: 'TST-006',
    name: 'CT Scan — Abdomen',
    type: 'Radiology',
    date: '2024-12-15',
    orderedBy: 'Dr. Priya Sharma',
    status: 'normal',
    icon: '🔬',
    values: [],
    reportSummary: 'Abdominal CT scan shows no acute abnormality. Liver, spleen, kidneys, and pancreas appear normal. No lymphadenopathy.',
  },
];

// ── PRESCRIPTIONS ──────────────────────────────────────────────────────────────
export const prescriptions = [
  {
    id: 'RX-001',
    medication: 'Atorvastatin',
    brandName: 'Lipitor',
    dosage: '20mg',
    frequency: 'Once daily at bedtime',
    duration: '3 months',
    startDate: '2025-02-10',
    endDate: '2025-05-10',
    doctor: 'Dr. James Okafor',
    department: 'Cardiology',
    status: 'active',
    instructions: 'Take at bedtime. Avoid grapefruit juice. Report any muscle pain immediately.',
    refills: 2,
  },
  {
    id: 'RX-002',
    medication: 'Metformin HCl',
    brandName: 'Glucophage',
    dosage: '500mg',
    frequency: 'Twice daily with meals',
    duration: '6 months',
    startDate: '2025-02-10',
    endDate: '2025-08-10',
    doctor: 'Dr. Fatima Al-Rashid',
    department: 'General Medicine',
    status: 'active',
    instructions: 'Take with food to reduce GI side effects. Monitor blood glucose regularly.',
    refills: 5,
  },
  {
    id: 'RX-003',
    medication: 'Amlodipine',
    brandName: 'Norvasc',
    dosage: '5mg',
    frequency: 'Once daily',
    duration: '3 months',
    startDate: '2025-02-10',
    endDate: '2025-05-10',
    doctor: 'Dr. James Okafor',
    department: 'Cardiology',
    status: 'active',
    instructions: 'Monitor blood pressure regularly. Do not stop suddenly.',
    refills: 2,
  },
  {
    id: 'RX-004',
    medication: 'Ibuprofen',
    brandName: 'Advil',
    dosage: '400mg',
    frequency: 'Three times daily as needed',
    duration: '2 weeks',
    startDate: '2025-01-15',
    endDate: '2025-01-29',
    doctor: 'Dr. Michael Chen',
    department: 'Orthopedics',
    status: 'completed',
    instructions: 'Take with food. Do not exceed 3 doses/day. Stop if GI upset occurs.',
    refills: 0,
  },
];

// ── PATIENT EMERGENCY DATA ─────────────────────────────────────────────────────
export const emergencyContacts = [
  { name: 'Emergency Services',          number: '911',          type: 'emergency', available: '24/7' },
  { name: 'MedCare ER — Direct Line',    number: '+1 555-ER-CARE', type: 'hospital',  available: '24/7' },
  { name: 'Poison Control Center',       number: '1-800-222-1222',type: 'poison',    available: '24/7' },
  { name: 'MedCare Nurse Helpline',      number: '+1 555-NURSE-1', type: 'helpline',  available: '24/7' },
  { name: 'MedCare Patient Services',    number: '+1 555-MED-CARE',type: 'patient',   available: 'Mon–Fri 8am–8pm' },
];

export const nearbyHospitals = [
  { name: 'MedCare Central Hospital',    address: '100 Healthcare Blvd',    distance: '0.2 mi',  erWait: '12 min',  erLoad: 42,  phone: '+1 555-MED-CARE' },
  { name: 'City General Medical Center', address: '500 Grand Avenue',        distance: '1.4 mi',  erWait: '34 min',  erLoad: 78,  phone: '+1 555-CITY-GEN' },
  { name: 'Northside Community Hospital',address: '2200 Northside Drive',    distance: '2.8 mi',  erWait: '18 min',  erLoad: 55,  phone: '+1 555-NORTH-CH' },
];

// ── STAFF SCHEDULE ─────────────────────────────────────────────────────────────
export const staffSchedule = {
  weeklyShifts: [
    { day: 'Monday',    shift: 'Morning (7AM–3PM)',   department: 'Cardiology', ward: 'Ward 2B', patients: 8, status: 'completed' },
    { day: 'Tuesday',   shift: 'Morning (7AM–3PM)',   department: 'Cardiology', ward: 'Ward 2B', patients: 6, status: 'completed' },
    { day: 'Wednesday', shift: 'Morning (7AM–3PM)',   department: 'Cardiology', ward: 'Ward 2B', patients: 7, status: 'today' },
    { day: 'Thursday',  shift: 'Morning (7AM–3PM)',   department: 'Cardiology', ward: 'Ward 2B', patients: 8, status: 'upcoming' },
    { day: 'Friday',    shift: 'On-Call (3PM–11PM)',  department: 'Emergency',  ward: 'ER',      patients: 0, status: 'upcoming' },
    { day: 'Saturday',  shift: 'Off',                 department: '—',          ward: '—',       patients: 0, status: 'off' },
    { day: 'Sunday',    shift: 'Off',                 department: '—',          ward: '—',       patients: 0, status: 'off' },
  ],
  upcomingShifts: [
    { date: '2025-03-01', shift: 'Morning', department: 'Cardiology', type: 'regular' },
    { date: '2025-03-07', shift: 'On-Call', department: 'Emergency',  type: 'emergency' },
    { date: '2025-03-14', shift: 'Morning', department: 'Cardiology', type: 'regular' },
  ],
};

// ── ASSIGNED PATIENTS (STAFF) ─────────────────────────────────────────────────
export const assignedPatients = [
  {
    id: 'PAT-20890',
    name: 'Ava Thompson',
    age: 34, sex: 'F',
    room: '204-A',
    ward: 'General',
    admissionDate: '2025-02-08',
    diagnosis: 'Hypertension + Dyslipidemia',
    condition: 'stable',
    treatmentProgress: 60,
    doctor: 'Dr. James Okafor',
    notes: 'Patient responding well to Amlodipine therapy. BP stabilising at 130/85.',
  },
  {
    id: 'PAT-18234',
    name: 'Robert Kwan',
    age: 67, sex: 'M',
    room: 'ICU-03',
    ward: 'ICU',
    admissionDate: '2025-02-20',
    diagnosis: 'Acute Myocardial Infarction',
    condition: 'critical',
    treatmentProgress: 30,
    doctor: 'Dr. James Okafor',
    notes: 'Post-PTCA day 3. Troponin trending down. Continuous monitoring.',
  },
  {
    id: 'PAT-30011',
    name: 'Maria Santos',
    age: 52, sex: 'F',
    room: '208-B',
    ward: 'General',
    admissionDate: '2025-02-18',
    diagnosis: 'Heart Failure (EF 35%)',
    condition: 'fair',
    treatmentProgress: 50,
    doctor: 'Dr. James Okafor',
    notes: 'Diuresis improving. Fluid balance monitored daily. Echo scheduled Friday.',
  },
  {
    id: 'PAT-41122',
    name: 'David Petrov',
    age: 45, sex: 'M',
    room: '201-C',
    ward: 'General',
    admissionDate: '2025-02-22',
    diagnosis: 'Atrial Fibrillation',
    condition: 'stable',
    treatmentProgress: 70,
    doctor: 'Dr. James Okafor',
    notes: 'Rate controlled. Anticoagulation started. Cardioversion planned.',
  },
  {
    id: 'PAT-55789',
    name: 'Ellen Marsh',
    age: 78, sex: 'F',
    room: 'ICU-05',
    ward: 'ICU',
    admissionDate: '2025-02-19',
    diagnosis: 'Cardiogenic Shock',
    condition: 'critical',
    treatmentProgress: 20,
    doctor: 'Dr. James Okafor',
    notes: 'On vasopressors. IAB pump support. Family counselled. Intensivist co-managing.',
  },
];

// ── ADMIN KPI DATA ─────────────────────────────────────────────────────────────
export const adminKPIs = {
  totalBeds: 320,
  occupiedBeds: 247,
  availableBeds: 73,
  icuBeds: 40,
  icuOccupied: 32,
  totalPatients: 247,
  totalStaff: 148,
  activeStaff: 127,
  erWaitTime: 25,
  erPatients: 18,
  surgeriesToday: 12,
  admissionsToday: 8,
  dischargeToday: 11,
  revenue: 284500,
  monthlyRevenue: [
    { month: 'Sep', value: 240000 },
    { month: 'Oct', value: 258000 },
    { month: 'Nov', value: 271000 },
    { month: 'Dec', value: 263000 },
    { month: 'Jan', value: 278000 },
    { month: 'Feb', value: 284500 },
  ],
};

// ── BED DATA ──────────────────────────────────────────────────────────────────
export const bedData = [
  { ward: 'ICU',             total: 40, occupied: 32, available: 8,  load: 80 },
  { ward: 'General Medicine',total: 80, occupied: 61, available: 19, load: 76 },
  { ward: 'Cardiology',      total: 40, occupied: 34, available: 6,  load: 85 },
  { ward: 'Orthopedics',     total: 30, occupied: 22, available: 8,  load: 73 },
  { ward: 'Neurology',       total: 30, occupied: 25, available: 5,  load: 83 },
  { ward: 'Pediatrics',      total: 40, occupied: 28, available: 12, load: 70 },
  { ward: 'Maternity',       total: 30, occupied: 21, available: 9,  load: 70 },
  { ward: 'Emergency',       total: 30, occupied: 24, available: 6,  load: 80 },
];

// ── EQUIPMENT DATA ─────────────────────────────────────────────────────────────
export const equipmentData = [
  { id: 'EQ-001', name: 'Ventilator Pro X5',        category: 'ICU Equipment',   status: 'in-use',      location: 'ICU-03',        lastService: '2025-01-15', nextService: '2025-04-15', condition: 'good' },
  { id: 'EQ-002', name: 'ECG Monitor 12-Lead',      category: 'Cardiac',         status: 'available',   location: 'Equipment Room', lastService: '2025-02-01', nextService: '2025-05-01', condition: 'excellent' },
  { id: 'EQ-003', name: 'MRI Scanner 3T',           category: 'Radiology',       status: 'in-use',      location: 'Radiology Suite',lastService: '2025-01-20', nextService: '2025-04-20', condition: 'good' },
  { id: 'EQ-004', name: 'Defibrillator AED',        category: 'Emergency',       status: 'available',   location: 'ER Bay 2',       lastService: '2025-02-10', nextService: '2025-05-10', condition: 'excellent' },
  { id: 'EQ-005', name: 'Infusion Pump IV',         category: 'General',         status: 'maintenance', location: 'Workshop',       lastService: '2024-12-01', nextService: '2025-03-01', condition: 'fair' },
  { id: 'EQ-006', name: 'Ultrasound System GE',     category: 'Radiology',       status: 'in-use',      location: 'OPD Suite 3',    lastService: '2025-01-10', nextService: '2025-04-10', condition: 'good' },
  { id: 'EQ-007', name: 'Anesthesia Machine',       category: 'Surgery',         status: 'in-use',      location: 'OR-2',           lastService: '2025-02-15', nextService: '2025-05-15', condition: 'excellent' },
  { id: 'EQ-008', name: 'Patient Monitor Philips',  category: 'Monitoring',      status: 'available',   location: 'Ward 2B',        lastService: '2025-02-05', nextService: '2025-05-05', condition: 'good' },
];

// ── EMERGENCY / ER DATA ────────────────────────────────────────────────────────
export const erData = {
  currentWaitTime: 25,
  erLoad: 80,
  totalBays: 30,
  occupiedBays: 24,
  criticalCases: 3,
  moderateCases: 12,
  minorCases: 9,
  staffOnDuty: 8,
  alerts: [
    { id: 'ALT-001', type: 'critical', message: 'Multiple vehicle accident incoming — 3 casualties', time: '2 min ago' },
    { id: 'ALT-002', type: 'warning',  message: 'ICU capacity at 80% — consider transfer protocol', time: '15 min ago' },
    { id: 'ALT-003', type: 'info',     message: 'Blood bank: O- supply low — reorder initiated',    time: '1 hr ago' },
  ],
};

// ── STAFF ALERTS ───────────────────────────────────────────────────────────────
export const staffAlerts = [
  { id: 'SA-001', type: 'critical', title: 'Code Blue — ICU-05',          message: 'Immediate response required. Patient: Ellen Marsh, Cardiogenic Shock.', time: '3 min ago',  acknowledged: false },
  { id: 'SA-002', type: 'warning',  title: 'ICU Capacity Warning',        message: 'ICU now at 80% capacity. Review discharge eligibility.', time: '18 min ago', acknowledged: false },
  { id: 'SA-003', type: 'warning',  title: 'Lab Result Ready',            message: 'Troponin result for PAT-18234 (Robert Kwan) is ready.', time: '32 min ago', acknowledged: true },
  { id: 'SA-004', type: 'info',     title: 'Equipment Maintenance Alert', message: 'Infusion Pump EQ-005 due for maintenance. Please arrange replacement.', time: '2 hrs ago', acknowledged: true },
];
