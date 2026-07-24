// Mock data for the Admin CRM Dashboard

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ServiceType = "Mosquito Control" | "Rodent Control" | "Bed Bug Treatment" | "Cockroach Control" | "Ant Control" | "Termite Inspection" | "Spider Control" | "Fly Control" | "General Pest Control";

export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  service: ServiceType;
  plan: "Essential" | "Complete" | "One-Time";
  scheduledDate: string; // ISO date string YYYY-MM-DD
  scheduledTime: string;
  status: BookingStatus;
  notes: string;
  sqFt: number;
  price: number;
  createdAt: string;
  technicianPhone?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  plan: "Essential" | "Complete" | "One-Time" | "None";
  totalBookings: number;
  lastService: string;
  joinedDate: string;
  totalSpent: number;
}

const currentYear = new Date().getFullYear();
const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-001",
    customerName: "Marcus Johnson",
    email: "marcus.johnson@email.com",
    phone: "+1 (917) 555-0142",
    address: "248 W 57th St",
    city: "New York",
    state: "NY",
    zip: "10107",
    service: "Bed Bug Treatment",
    plan: "Complete",
    scheduledDate: `${currentYear}-${currentMonth}-23`,
    scheduledTime: "09:00 AM",
    status: "pending",
    notes: "Customer reports activity in bedroom. Heavy infestation suspected.",
    sqFt: 1850,
    price: 549,
    createdAt: `${currentYear}-${currentMonth}-21T14:32:00Z`,
  },
  {
    id: "BK-002",
    customerName: "Sandra Rivera",
    email: "s.rivera@gmail.com",
    phone: "+1 (201) 555-0198",
    address: "142 Oak Avenue",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    service: "Rodent Control",
    plan: "Essential",
    scheduledDate: `${currentYear}-${currentMonth}-23`,
    scheduledTime: "01:00 PM",
    status: "confirmed",
    notes: "Mice spotted in kitchen and basement.",
    sqFt: 2200,
    price: 299,
    createdAt: `${currentYear}-${currentMonth}-20T09:15:00Z`,
  },
  {
    id: "BK-003",
    customerName: "David Park",
    email: "dpark@outlook.com",
    phone: "+1 (914) 555-0237",
    address: "55 Mamaroneck Ave",
    city: "White Plains",
    state: "NY",
    zip: "10601",
    service: "Mosquito Control",
    plan: "Complete",
    scheduledDate: `${currentYear}-${currentMonth}-24`,
    scheduledTime: "10:30 AM",
    status: "confirmed",
    notes: "Backyard mosquito treatment requested before outdoor event.",
    sqFt: 3400,
    price: 399,
    createdAt: `${currentYear}-${currentMonth}-19T16:45:00Z`,
  },
  {
    id: "BK-004",
    customerName: "Priya Patel",
    email: "priya.patel@yahoo.com",
    phone: "+1 (516) 555-0089",
    address: "38 Maple Drive",
    city: "Garden City",
    state: "NY",
    zip: "11530",
    service: "Termite Inspection",
    plan: "One-Time",
    scheduledDate: `${currentYear}-${currentMonth}-25`,
    scheduledTime: "11:00 AM",
    status: "pending",
    notes: "Pre-purchase home inspection. Need thorough report.",
    sqFt: 2850,
    price: 199,
    createdAt: `${currentYear}-${currentMonth}-22T08:00:00Z`,
  },
  {
    id: "BK-005",
    customerName: "Theresa Williams",
    email: "t.williams@email.com",
    phone: "+1 (718) 555-0374",
    address: "890 Eastern Pkwy",
    city: "Brooklyn",
    state: "NY",
    zip: "11213",
    service: "Cockroach Control",
    plan: "Complete",
    scheduledDate: `${currentYear}-${currentMonth}-22`,
    scheduledTime: "02:00 PM",
    status: "completed",
    notes: "German cockroach infestation in kitchen area. Follow-up in 2 weeks.",
    sqFt: 1600,
    price: 349,
    createdAt: `${currentYear}-${currentMonth}-15T11:20:00Z`,
  },
  {
    id: "BK-006",
    customerName: "Robert Chen",
    email: "rchen@company.com",
    phone: "+1 (203) 555-0156",
    address: "12 Riverside Drive",
    city: "Stamford",
    state: "CT",
    zip: "06902",
    service: "Ant Control",
    plan: "Essential",
    scheduledDate: `${currentYear}-${currentMonth}-26`,
    scheduledTime: "09:30 AM",
    status: "pending",
    notes: "Carpenter ants in wooden deck and garage.",
    sqFt: 2100,
    price: 249,
    createdAt: `${currentYear}-${currentMonth}-22T10:00:00Z`,
  },
  {
    id: "BK-007",
    customerName: "Angela Foster",
    email: "angela.foster@gmail.com",
    phone: "+1 (732) 555-0291",
    address: "567 Ocean Blvd",
    city: "Toms River",
    state: "NJ",
    zip: "08753",
    service: "General Pest Control",
    plan: "Complete",
    scheduledDate: `${currentYear}-${currentMonth}-18`,
    scheduledTime: "10:00 AM",
    status: "completed",
    notes: "Quarterly general treatment completed successfully.",
    sqFt: 2600,
    price: 399,
    createdAt: `${currentYear}-${currentMonth}-10T07:30:00Z`,
  },
  {
    id: "BK-008",
    customerName: "James O'Brien",
    email: "jobrien@icloud.com",
    phone: "+1 (212) 555-0413",
    address: "310 W 86th St",
    city: "New York",
    state: "NY",
    zip: "10024",
    service: "Spider Control",
    plan: "One-Time",
    scheduledDate: `${currentYear}-${currentMonth}-27`,
    scheduledTime: "03:00 PM",
    status: "pending",
    notes: "Large web formations in basement corners. Possible black widow.",
    sqFt: 1200,
    price: 179,
    createdAt: `${currentYear}-${currentMonth}-22T13:45:00Z`,
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "CX-001",
    name: "Marcus Johnson",
    email: "marcus.johnson@email.com",
    phone: "+1 (917) 555-0142",
    address: "248 W 57th St",
    city: "New York",
    state: "NY",
    zip: "10107",
    plan: "Complete",
    totalBookings: 3,
    lastService: `${currentYear}-06-15`,
    joinedDate: `${currentYear - 1}-11-01`,
    totalSpent: 1247,
  },
  {
    id: "CX-002",
    name: "Sandra Rivera",
    email: "s.rivera@gmail.com",
    phone: "+1 (201) 555-0198",
    address: "142 Oak Avenue",
    city: "Hoboken",
    state: "NJ",
    zip: "07030",
    plan: "Essential",
    totalBookings: 2,
    lastService: `${currentYear}-04-20`,
    joinedDate: `${currentYear - 1}-12-10`,
    totalSpent: 598,
  },
  {
    id: "CX-003",
    name: "David Park",
    email: "dpark@outlook.com",
    phone: "+1 (914) 555-0237",
    address: "55 Mamaroneck Ave",
    city: "White Plains",
    state: "NY",
    zip: "10601",
    plan: "Complete",
    totalBookings: 5,
    lastService: `${currentYear}-${currentMonth}-01`,
    joinedDate: `${currentYear - 1}-08-22`,
    totalSpent: 1995,
  },
  {
    id: "CX-004",
    name: "Priya Patel",
    email: "priya.patel@yahoo.com",
    phone: "+1 (516) 555-0089",
    address: "38 Maple Drive",
    city: "Garden City",
    state: "NY",
    zip: "11530",
    plan: "None",
    totalBookings: 1,
    lastService: "—",
    joinedDate: `${currentYear}-${currentMonth}-22`,
    totalSpent: 0,
  },
  {
    id: "CX-005",
    name: "Theresa Williams",
    email: "t.williams@email.com",
    phone: "+1 (718) 555-0374",
    address: "890 Eastern Pkwy",
    city: "Brooklyn",
    state: "NY",
    zip: "11213",
    plan: "Complete",
    totalBookings: 4,
    lastService: `${currentYear}-${currentMonth}-22`,
    joinedDate: `${currentYear - 1}-09-14`,
    totalSpent: 1396,
  },
  {
    id: "CX-006",
    name: "Robert Chen",
    email: "rchen@company.com",
    phone: "+1 (203) 555-0156",
    address: "12 Riverside Drive",
    city: "Stamford",
    state: "CT",
    zip: "06902",
    plan: "Essential",
    totalBookings: 2,
    lastService: `${currentYear}-05-12`,
    joinedDate: `${currentYear}-01-08`,
    totalSpent: 498,
  },
  {
    id: "CX-007",
    name: "Angela Foster",
    email: "angela.foster@gmail.com",
    phone: "+1 (732) 555-0291",
    address: "567 Ocean Blvd",
    city: "Toms River",
    state: "NJ",
    zip: "08753",
    plan: "Complete",
    totalBookings: 6,
    lastService: `${currentYear}-${currentMonth}-18`,
    joinedDate: `${currentYear - 1}-06-05`,
    totalSpent: 2394,
  },
  {
    id: "CX-008",
    name: "James O'Brien",
    email: "jobrien@icloud.com",
    phone: "+1 (212) 555-0413",
    address: "310 W 86th St",
    city: "New York",
    state: "NY",
    zip: "10024",
    plan: "None",
    totalBookings: 1,
    lastService: "—",
    joinedDate: `${currentYear}-${currentMonth}-22`,
    totalSpent: 0,
  },
];
