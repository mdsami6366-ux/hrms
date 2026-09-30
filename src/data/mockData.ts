export type EmployeeStatus = 'Active' | 'On Leave' | 'Remote' | 'Probation';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  joiningDate: string;
  email: string;
  phone: string;
  location: string;
  employeeId: string;
  salary: number;
}

export interface KPIData {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
  accent: 'primary' | 'success' | 'warning' | 'info';
  sub: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  avatar: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Activity {
  id: string;
  type: 'hire' | 'leave' | 'review' | 'payroll' | 'attendance' | 'policy';
  text: string;
  time: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  category: 'holiday' | 'birthday' | 'meeting' | 'review' | 'training';
  time?: string;
}

export const employees: Employee[] = [
  { id: '1', name: 'Arjun Mehta', avatar: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Senior Software Engineer', department: 'Engineering', status: 'Active', joiningDate: '2022-03-15', email: 'arjun.mehta@hcl.com', phone: '+91 98765 43210', location: 'Bangalore, IN', employeeId: 'HCL-0421', salary: 145000 },
  { id: '2', name: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Product Designer', department: 'Design', status: 'Remote', joiningDate: '2021-08-02', email: 'sarah.chen@hcl.com', phone: '+1 415 555 0142', location: 'San Francisco, US', employeeId: 'HCL-0387', salary: 132000 },
  { id: '3', name: 'Marcus Johnson', avatar: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Engineering Manager', department: 'Engineering', status: 'Active', joiningDate: '2020-01-10', email: 'marcus.j@hcl.com', phone: '+1 212 555 0198', location: 'New York, US', employeeId: 'HCL-0201', salary: 178000 },
  { id: '4', name: 'Priya Sharma', avatar: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'HR Business Partner', department: 'Human Resources', status: 'Active', joiningDate: '2023-02-20', email: 'priya.s@hcl.com', phone: '+91 99876 12345', location: 'Noida, IN', employeeId: 'HCL-0512', salary: 98000 },
  { id: '5', name: 'David Okafor', avatar: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=200&w=200', role: 'DevOps Engineer', department: 'Engineering', status: 'On Leave', joiningDate: '2022-11-05', email: 'david.o@hcl.com', phone: '+44 20 7946 0823', location: 'London, UK', employeeId: 'HCL-0488', salary: 125000 },
  { id: '6', name: 'Elena Volkov', avatar: 'https://images.pexels.com/photos/11701102/pexels-photo-11701102.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Marketing Lead', department: 'Marketing', status: 'Active', joiningDate: '2021-05-18', email: 'elena.v@hcl.com', phone: '+49 30 901820', location: 'Berlin, DE', employeeId: 'HCL-0365', salary: 118000 },
  { id: '7', name: 'James Park', avatar: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Finance Analyst', department: 'Finance', status: 'Probation', joiningDate: '2024-06-01', email: 'james.p@hcl.com', phone: '+1 312 555 0177', location: 'Chicago, US', employeeId: 'HCL-0601', salary: 87000 },
  { id: '8', name: 'Aisha Patel', avatar: 'https://images.pexels.com/photos/15827758/pexels-photo-15827758.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'UX Researcher', department: 'Design', status: 'Active', joiningDate: '2023-09-12', email: 'aisha.p@hcl.com', phone: '+91 90123 45678', location: 'Hyderabad, IN', employeeId: 'HCL-0534', salary: 102000 },
  { id: '9', name: 'Thomas Wright', avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Sales Director', department: 'Sales', status: 'Active', joiningDate: '2019-04-22', email: 'thomas.w@hcl.com', phone: '+1 646 555 0134', location: 'New York, US', employeeId: 'HCL-0156', salary: 165000 },
  { id: '10', name: 'Yuki Tanaka', avatar: 'https://images.pexels.com/photos/11156392/pexels-photo-11156392.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Backend Developer', department: 'Engineering', status: 'Remote', joiningDate: '2023-07-03', email: 'yuki.t@hcl.com', phone: '+81 3 5555 0199', location: 'Tokyo, JP', employeeId: 'HCL-0528', salary: 115000 },
  { id: '11', name: 'Nina Brooks', avatar: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Talent Acquisition', department: 'Human Resources', status: 'Active', joiningDate: '2022-09-14', email: 'nina.b@hcl.com', phone: '+1 408 555 0166', location: 'Austin, US', employeeId: 'HCL-0467', salary: 95000 },
  { id: '12', name: 'Rohan Kapoor', avatar: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&h=200&w=200', role: 'QA Engineer', department: 'Engineering', status: 'Probation', joiningDate: '2024-08-15', email: 'rohan.k@hcl.com', phone: '+91 98300 11222', location: 'Pune, IN', employeeId: 'HCL-0612', salary: 78000 },
];

export const kpis: KPIData[] = [
  { id: 'k1', label: 'Total Employees', value: '1,248', change: 4.2, trend: 'up', icon: 'Users', accent: 'primary', sub: '32 new this quarter' },
  { id: 'k2', label: 'Present Today', value: '1,067', change: 2.1, trend: 'up', icon: 'UserCheck', accent: 'success', sub: '85.5% attendance rate' },
  { id: 'k3', label: 'Pending Leaves', value: '23', change: 12.5, trend: 'up', icon: 'CalendarClock', accent: 'warning', sub: '8 awaiting approval' },
  { id: 'k4', label: 'Open Positions', value: '17', change: 5.8, trend: 'down', icon: 'Briefcase', accent: 'info', sub: '5 in final round' },
];

export const attendanceTrend = [
  { day: 'Mon', present: 94, remote: 6, absent: 2 },
  { day: 'Tue', present: 91, remote: 8, absent: 3 },
  { day: 'Wed', present: 96, remote: 4, absent: 1 },
  { day: 'Thu', present: 89, remote: 9, absent: 4 },
  { day: 'Fri', present: 82, remote: 14, absent: 6 },
  { day: 'Sat', present: 45, remote: 20, absent: 35 },
  { day: 'Sun', present: 28, remote: 12, absent: 60 },
];

export const monthlyHires = [
  { month: 'Jan', count: 8 },
  { month: 'Feb', count: 12 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 10 },
  { month: 'May', count: 18 },
  { month: 'Jun', count: 22 },
  { month: 'Jul', count: 14 },
  { month: 'Aug', count: 19 },
  { month: 'Sep', count: 24 },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'l1', employeeName: 'David Okafor', avatar: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=200&w=200', type: 'Annual Leave', from: 'Oct 3, 2026', to: 'Oct 7, 2026', days: 4, reason: 'Family vacation to Spain', status: 'Pending' },
  { id: 'l2', employeeName: 'Aisha Patel', avatar: 'https://images.pexels.com/photos/15827758/pexels-photo-15827758.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', type: 'Sick Leave', from: 'Sep 30, 2026', to: 'Oct 1, 2026', days: 2, reason: 'Flu recovery', status: 'Pending' },
  { id: 'l3', employeeName: 'James Park', avatar: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', type: 'Personal', from: 'Oct 10, 2026', to: 'Oct 10, 2026', days: 1, reason: 'Apartment moving', status: 'Pending' },
  { id: 'l4', employeeName: 'Rohan Kapoor', avatar: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&h=200&w=200', type: 'Annual Leave', from: 'Oct 15, 2026', to: 'Oct 18, 2026', days: 3, reason: 'Wedding ceremony', status: 'Pending' },
];

export const activities: Activity[] = [
  { id: 'a1', type: 'hire', text: 'Rohan Kapoor joined as QA Engineer', time: '2 hours ago' },
  { id: 'a2', type: 'leave', text: 'David Okafor submitted a 4-day leave request', time: '4 hours ago' },
  { id: 'a3', type: 'review', text: 'Q3 performance reviews completed for Engineering', time: '6 hours ago' },
  { id: 'a4', type: 'payroll', text: 'September payroll processed successfully', time: 'Yesterday' },
  { id: 'a5', type: 'attendance', text: 'Attendance anomaly flagged for 3 employees', time: 'Yesterday' },
  { id: 'a6', type: 'policy', text: 'Remote work policy updated v3.2', time: '2 days ago' },
];

export const events: EventItem[] = [
  { id: 'e1', title: 'Diwali Celebration', date: 'Oct 21', day: '21', month: 'Oct', category: 'holiday', time: 'All day' },
  { id: 'e2', title: 'Sarah Chen Birthday', date: 'Oct 05', day: '05', month: 'Oct', category: 'birthday', time: 'All day' },
  { id: 'e3', title: 'Q4 All-Hands Meeting', date: 'Oct 08', day: '08', month: 'Oct', category: 'meeting', time: '10:00 AM' },
  { id: 'e4', title: 'Engineering Sprint Review', date: 'Oct 12', day: '12', month: 'Oct', category: 'review', time: '2:00 PM' },
  { id: 'e5', title: 'Leadership Training', date: 'Oct 15', day: '15', month: 'Oct', category: 'training', time: '9:00 AM' },
];

export const departments = [
  { name: 'Engineering', count: 142, color: 'var(--primary)' },
  { name: 'Design', count: 38, color: 'var(--info)' },
  { name: 'Sales', count: 67, color: 'var(--success)' },
  { name: 'Marketing', count: 45, color: 'var(--warning)' },
  { name: 'Finance', count: 29, color: 'var(--danger)' },
  { name: 'Human Resources', count: 24, color: '#8b5cf6' },
];

export const needsAttention = [
  { id: 'n1', name: 'David Okafor', avatar: 'https://images.pexels.com/photos/13392786/pexels-photo-13392786.png?auto=compress&cs=tinysrgb&h=200&w=200', issue: 'Exceeding leave limit', severity: 'warning' as const, department: 'Engineering' },
  { id: 'n2', name: 'James Park', avatar: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', issue: 'Pending onboarding tasks', severity: 'info' as const, department: 'Finance' },
  { id: 'n3', name: 'Rohan Kapoor', avatar: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&h=200&w=200', issue: 'Incomplete profile', severity: 'warning' as const, department: 'Engineering' },
];

export const notifications = [
  { id: 'nt1', title: 'New leave request', desc: 'David Okafor requested 4 days off', time: '10 min ago', unread: true, type: 'leave' },
  { id: 'nt2', title: 'Payroll processed', desc: 'September payroll for 1,248 employees', time: '2 hours ago', unread: true, type: 'payroll' },
  { id: 'nt3', title: 'New employee onboarded', desc: 'Rohan Kapoor joined Engineering', time: '4 hours ago', unread: true, type: 'hire' },
  { id: 'nt4', title: 'Performance review due', desc: '5 reviews pending in Sales', time: '5 hours ago', unread: false, type: 'review' },
  { id: 'nt5', title: 'Policy updated', desc: 'Remote work policy v3.2 published', time: '1 day ago', unread: false, type: 'policy' },
];

export const commandItems = [
  { id: 'c1', label: 'Go to Dashboard', page: 'dashboard', icon: 'LayoutDashboard', section: 'Navigation' },
  { id: 'c2', label: 'Go to Employees', page: 'employees', icon: 'Users', section: 'Navigation' },
  { id: 'c3', label: 'Go to Attendance', page: 'attendance', icon: 'Clock', section: 'Navigation' },
  { id: 'c4', label: 'Go to Leave Management', page: 'leave', icon: 'CalendarDays', section: 'Navigation' },
  { id: 'c5', label: 'Go to Payroll', page: 'payroll', icon: 'Wallet', section: 'Navigation' },
  { id: 'c6', label: 'Go to Recruitment', page: 'recruitment', icon: 'UserPlus', section: 'Navigation' },
  { id: 'c7', label: 'Go to Performance', page: 'performance', icon: 'TrendingUp', section: 'Navigation' },
  { id: 'c8', label: 'Go to Reports', page: 'reports', icon: 'BarChart3', section: 'Navigation' },
  { id: 'c9', label: 'Go to Settings', page: 'settings', icon: 'Settings', section: 'Navigation' },
  { id: 'c10', label: 'Add New Employee', action: 'addEmployee', icon: 'UserPlus', section: 'Actions' },
  { id: 'c11', label: 'Search Employees', action: 'searchEmployees', icon: 'Search', section: 'Actions' },
  { id: 'c12', label: 'Approve Leave Requests', action: 'approveLeaves', icon: 'CheckSquare', section: 'Actions' },
];

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'employees', label: 'Employees', icon: 'Users' },
  { id: 'attendance', label: 'Attendance', icon: 'Clock' },
  { id: 'leave', label: 'Leave Management', icon: 'CalendarDays' },
  { id: 'payroll', label: 'Payroll', icon: 'Wallet' },
  { id: 'recruitment', label: 'Recruitment', icon: 'UserPlus' },
  { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
  { id: 'reports', label: 'Reports', icon: 'BarChart3' },
  { id: 'settings', label: 'Settings', icon: 'Settings' },
];
