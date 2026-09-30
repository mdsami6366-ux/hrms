import { kpis, employees, activities, events, needsAttention, attendanceTrend } from '@/data/mockData';
import { Icon } from '@/components/Icon';
import { Avatar, StatusBadge } from '@/components/ui';
import { AttendanceChart, HiresLineChart } from '@/components/Charts';
import { Employee } from '@/data/mockData';

export function DashboardPage({
  onEmployeeClick, onNavigate, onAddEmployee, onLeaveApprove,
}: {
  onEmployeeClick: (e: Employee) => void;
  onNavigate: (page: string) => void;
  onAddEmployee: () => void;
  onLeaveApprove: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-slide-up">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Good morning, Priya</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Here's what's happening across your organization today.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={onLeaveApprove}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-strong)', color: 'var(--text-secondary)' }}
          >
            <Icon name="CheckSquare" size={16} />
            <span className="hidden sm:inline">Approve Leaves</span>
            <span className="rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--warning-soft)', color: 'var(--warning)' }}>8</span>
          </button>
          <button
            onClick={onAddEmployee}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--text)', color: '#fff' }}
          >
            <Icon name="Plus" size={16} />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <button
            key={kpi.id}
            onClick={() => onNavigate(kpi.id === 'k1' ? 'employees' : kpi.id === 'k2' ? 'attendance' : kpi.id === 'k3' ? 'leave' : 'recruitment')}
            className="glass card-base hover-lift p-4 text-left animate-slide-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ backgroundColor: accentSoft(kpi.accent), color: accentColor(kpi.accent) }}
              >
                <Icon name={kpi.icon} size={17} />
              </div>
              <div className="flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[10px] font-bold" style={{ backgroundColor: kpi.trend === 'up' ? 'var(--success-soft)' : 'var(--danger-soft)', color: kpi.trend === 'up' ? 'var(--success)' : 'var(--danger)' }}>
                <Icon name={kpi.trend === 'up' ? 'ArrowUpRight' : 'ArrowDownRight'} size={11} />
                {kpi.change}%
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>{kpi.value}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>{kpi.label}</div>
            <div className="text-[10px] mt-2 pt-2 border-t" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>{kpi.sub}</div>
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Attendance chart - 2 cols */}
        <div className="lg:col-span-2 glass card-base p-5 animate-slide-up" style={{ animationDelay: '240ms' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Attendance Trend</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Weekly presence breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg p-0.5" style={{ backgroundColor: 'rgba(30,41,59,0.06)' }}>
                {['Week', 'Month', 'Quarter'].map((t, i) => (
                  <button key={t} className={`rounded-md px-2.5 py-1 text-[11px] font-semibold ${i === 0 ? '' : ''}`} style={i === 0 ? { backgroundColor: '#fff', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' } : { color: 'var(--muted)' }}>{t}</button>
                ))}
              </div>
              <button onClick={() => onNavigate('attendance')} className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-black/5" style={{ color: 'var(--muted)' }}>
                <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          </div>
          <AttendanceChart />
        </div>

        {/* Needs attention */}
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--warning-soft)' }}>
                <Icon name="AlertTriangle" size={14} style={{ color: 'var(--warning)' } as any} />
              </div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Needs Attention</h3>
            </div>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--warning-soft)', color: 'var(--warning)' }}>{needsAttention.length}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {needsAttention.map(person => (
              <button
                key={person.id}
                onClick={() => {
                  const emp = employees.find(e => e.name === person.name);
                  if (emp) onEmployeeClick(emp);
                }}
                className="flex items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-black/[0.03]"
                style={{ backgroundColor: 'rgba(255,255,255,0.35)', border: '1px solid var(--border)' }}
              >
                <Avatar src={person.avatar} alt={person.name} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{person.name}</div>
                  <div className="text-[11px] truncate" style={{ color: person.severity === 'warning' ? 'var(--warning)' : 'var(--info)' }}>{person.issue}</div>
                </div>
                <Icon name="ChevronRight" size={14} style={{ color: 'var(--muted)' } as any} />
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '360ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Upcoming Events</h3>
            <button className="text-[11px] font-semibold transition-colors" style={{ color: 'var(--muted)' }}>View all</button>
          </div>
          <div className="flex flex-col gap-2.5">
            {events.slice(0, 4).map(ev => (
              <div key={ev.id} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-black/[0.02]">
                <div className="flex flex-col items-center justify-center rounded-xl shrink-0" style={{ width: 44, height: 44, backgroundColor: eventBg(ev.category), border: `1px solid ${eventBorder(ev.category)}` }}>
                  <span className="text-base font-bold leading-none" style={{ color: eventColor(ev.category) }}>{ev.day}</span>
                  <span className="text-[8px] font-bold uppercase" style={{ color: eventColor(ev.category) }}>{ev.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{ev.title}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted)' }}>{ev.time}</div>
                </div>
                <Icon name={eventIcon(ev.category)} size={14} style={{ color: eventColor(ev.category) } as any} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent employees */}
        <div className="lg:col-span-2 glass card-base p-5 animate-slide-up" style={{ animationDelay: '420ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Employees</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Recently joined or updated</p>
            </div>
            <button onClick={() => onNavigate('employees')} className="flex items-center gap-1 text-[11px] font-semibold transition-colors" style={{ color: 'var(--text-secondary)' }}>
              View all <Icon name="ArrowRight" size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {employees.slice(0, 6).map(emp => (
              <button
                key={emp.id}
                onClick={() => onEmployeeClick(emp)}
                className="flex items-center gap-3 rounded-xl p-3 text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}
              >
                <Avatar src={emp.avatar} alt={emp.name} size={38} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{emp.name}</div>
                  <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{emp.role}</div>
                </div>
                <StatusBadge status={emp.status} size="xs" />
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '480ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Activity</h3>
          </div>
          <div className="relative flex flex-col gap-0">
            {activities.slice(0, 6).map((act, i) => (
              <div key={act.id} className="flex gap-3 pb-4 last:pb-0">
                {i < 5 && <div className="absolute left-[15px] top-8 bottom-0 w-px" style={{ backgroundColor: 'var(--border)' }} />}
                <div className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 z-10" style={{ backgroundColor: activityBg(act.type), color: activityColor(act.type), border: '2px solid var(--bg)' }}>
                  <Icon name={activityIcon(act.type)} size={13} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-xs font-medium leading-snug" style={{ color: 'var(--text)' }}>{act.text}</p>
                  <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function accentSoft(a: string) { return { primary: 'var(--primary-soft)', success: 'var(--success-soft)', warning: 'var(--warning-soft)', info: 'var(--info-soft)' }[a] ?? 'var(--primary-soft)'; }
function accentColor(a: string) { return { primary: '#a07d20', success: 'var(--success)', warning: 'var(--warning)', info: 'var(--info)' }[a] ?? '#a07d20'; }
function eventBg(c: string) { return { holiday: 'var(--primary-soft)', birthday: 'var(--danger-soft)', meeting: 'var(--info-soft)', review: 'var(--success-soft)', training: 'var(--warning-soft)' }[c] ?? 'rgba(30,41,59,0.04)'; }
function eventBorder(c: string) { return { holiday: 'var(--primary-border)', birthday: 'rgba(200,74,74,0.2)', meeting: 'rgba(91,141,239,0.2)', review: 'rgba(74,157,110,0.2)', training: 'rgba(224,146,47,0.2)' }[c] ?? 'var(--border)'; }
function eventColor(c: string) { return { holiday: '#a07d20', birthday: 'var(--danger)', meeting: 'var(--info)', review: 'var(--success)', training: 'var(--warning)' }[c] ?? 'var(--muted)'; }
function eventIcon(c: string) { return { holiday: 'PartyPopper', birthday: 'Cake', meeting: 'Video', review: 'TrendingUp', training: 'GraduationCap' }[c] ?? 'Calendar'; }
function activityBg(t: string) { return { hire: 'var(--success-soft)', leave: 'var(--warning-soft)', review: 'var(--info-soft)', payroll: 'var(--primary-soft)', attendance: 'var(--danger-soft)', policy: 'rgba(139,92,246,0.12)' }[t] ?? 'rgba(30,41,59,0.06)'; }
function activityColor(t: string) { return { hire: 'var(--success)', leave: 'var(--warning)', review: 'var(--info)', payroll: '#a07d20', attendance: 'var(--danger)', policy: '#8b5cf6' }[t] ?? 'var(--muted)'; }
function activityIcon(t: string) { return { hire: 'UserPlus', leave: 'CalendarDays', review: 'TrendingUp', payroll: 'Wallet', attendance: 'Clock', policy: 'FileText' }[t] ?? 'ActivityIcon'; }
