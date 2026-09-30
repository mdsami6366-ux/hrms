import { useState } from 'react';
import { employees, Employee, departments } from '@/data/mockData';
import { Icon } from '@/components/Icon';
import { Avatar, StatusBadge } from '@/components/ui';

export function EmployeesPage({
  onEmployeeClick, onAddEmployee,
}: {
  onEmployeeClick: (e: Employee) => void;
  onAddEmployee: () => void;
}) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('list');

  const filtered = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || e.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Employees</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{employees.length} employees across {departments.length} departments</p>
        </div>
        <button
          onClick={onAddEmployee}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 self-start"
          style={{ backgroundColor: 'var(--text)', color: '#fff' }}
        >
          <Icon name="Plus" size={16} /> Add Employee
        </button>
      </div>

      {/* Filters bar */}
      <div className="glass card-base p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-slide-up" style={{ animationDelay: '80ms' }}>
        <div className="flex items-center gap-2 flex-1 rounded-xl px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid var(--border)' }}>
          <Icon name="Search" size={15} style={{ color: 'var(--muted)' } as any} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or role…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--text)' }}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {['All', ...departments.map(d => d.name)].map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all"
              style={{
                backgroundColor: deptFilter === d ? 'var(--text)' : 'rgba(30,41,59,0.06)',
                color: deptFilter === d ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg p-0.5" style={{ backgroundColor: 'rgba(30,41,59,0.06)' }}>
          {(['list', 'grid'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} className="rounded-md px-2.5 py-1.5" style={view === v ? { backgroundColor: '#fff', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' } : { color: 'var(--muted)' }}>
              <Icon name={v === 'list' ? 'Menu' : 'LayoutDashboard'} size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Employee list/grid */}
      {view === 'list' ? (
        <div className="glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '140ms' }}>
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] gap-4 px-5 py-3 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <span>Employee</span>
            <span>Role</span>
            <span>Department</span>
            <span>Status</span>
            <span>Joined</span>
            <span></span>
          </div>
          {filtered.map((emp, i) => (
            <button
              key={emp.id}
              onClick={() => onEmployeeClick(emp)}
              className="w-full grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] gap-3 md:gap-4 px-5 py-3.5 text-left transition-colors hover:bg-black/[0.02] border-b last:border-0"
              style={{ borderColor: 'var(--border)', animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-center gap-3">
                <Avatar src={emp.avatar} alt={emp.name} size={36} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{emp.name}</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{emp.email}</div>
                </div>
              </div>
              <div className="text-xs font-medium self-center truncate" style={{ color: 'var(--text-secondary)' }}>{emp.role}</div>
              <div className="text-xs font-medium self-center" style={{ color: 'var(--text-secondary)' }}>{emp.department}</div>
              <div className="self-center"><StatusBadge status={emp.status} size="xs" /></div>
              <div className="text-xs self-center" style={{ color: 'var(--muted)' }}>{formatDate(emp.joiningDate)}</div>
              <div className="self-center flex justify-end">
                <Icon name="ChevronRight" size={16} style={{ color: 'var(--muted)' } as any} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '140ms' }}>
          {filtered.map(emp => (
            <button
              key={emp.id}
              onClick={() => onEmployeeClick(emp)}
              className="glass card-base hover-lift p-5 text-left"
            >
              <div className="flex items-start gap-3 mb-4">
                <Avatar src={emp.avatar} alt={emp.name} size={52} ring />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{emp.name}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>{emp.role}</div>
                  <div className="mt-2"><StatusBadge status={emp.status} size="xs" /></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                  <Icon name="Building2" size={12} /> {emp.department}
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                  <Icon name="MapPin" size={12} /> {emp.location.split(',')[0]}
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                  <Icon name="Calendar" size={12} /> {formatDate(emp.joiningDate)}
                </div>
                <div className="flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                  <Icon name="Mail" size={12} /> {emp.employeeId}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="glass card-base p-12 text-center">
          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>No employees found</p>
          <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
