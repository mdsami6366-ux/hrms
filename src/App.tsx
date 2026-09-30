import { useState, useEffect, useCallback } from 'react';
import { Employee } from '@/data/mockData';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { CommandPalette } from '@/components/CommandPalette';
import { ProfileDrawer } from '@/components/ProfileDrawer';
import { AddEmployeeModal } from '@/components/AddEmployeeModal';
import { LeaveDrawer } from '@/components/LeaveDrawer';
import { DashboardPage } from '@/pages/DashboardPage';
import { EmployeesPage } from '@/pages/EmployeesPage';
import { AttendancePage } from '@/pages/AttendancePage';
import { LeavePage } from '@/pages/LeavePage';
import { PayrollPage } from '@/pages/PayrollPage';
import { RecruitmentPage } from '@/pages/RecruitmentPage';
import { PerformancePage } from '@/pages/PerformancePage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileEmployee, setProfileEmployee] = useState<Employee | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const handleNavigate = useCallback((page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleEmployeeClick = useCallback((emp: Employee) => {
    setProfileEmployee(emp);
    setProfileOpen(true);
  }, []);

  const handleAction = useCallback((action: string) => {
    if (action === 'addEmployee') setAddEmployeeOpen(true);
    if (action === 'searchEmployees') handleNavigate('employees');
    if (action === 'approveLeaves') setLeaveOpen(true);
  }, [handleNavigate]);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const sidebarWidth = sidebarCollapsed ? 72 : 248;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <Sidebar
        active={activePage}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
      />

      <div className="transition-all duration-300" style={{ marginLeft: sidebarWidth }}>
        <Topbar onOpenSearch={() => setSearchOpen(true)} onOpenNotifications={() => {}} />

        <main className="min-h-[calc(100vh-64px)]">
          {activePage === 'dashboard' && (
            <DashboardPage
              onEmployeeClick={handleEmployeeClick}
              onNavigate={handleNavigate}
              onAddEmployee={() => setAddEmployeeOpen(true)}
              onLeaveApprove={() => setLeaveOpen(true)}
            />
          )}
          {activePage === 'employees' && (
            <EmployeesPage onEmployeeClick={handleEmployeeClick} onAddEmployee={() => setAddEmployeeOpen(true)} />
          )}
          {activePage === 'attendance' && <AttendancePage />}
          {activePage === 'leave' && <LeavePage onApprove={() => setLeaveOpen(true)} />}
          {activePage === 'payroll' && <PayrollPage />}
          {activePage === 'recruitment' && <RecruitmentPage />}
          {activePage === 'performance' && <PerformancePage />}
          {activePage === 'reports' && <ReportsPage />}
          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
        onAction={handleAction}
      />

      <ProfileDrawer
        employee={profileEmployee}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <AddEmployeeModal open={addEmployeeOpen} onClose={() => setAddEmployeeOpen(false)} />

      <LeaveDrawer open={leaveOpen} onClose={() => setLeaveOpen(false)} />
    </div>
  );
}

export default App;
