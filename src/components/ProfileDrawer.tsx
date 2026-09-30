import { Employee } from '@/data/mockData';
import { Icon } from './Icon';
import { Avatar, StatusBadge, ProgressBar } from './ui';

export function ProfileDrawer({
  employee, open, onClose,
}: { employee: Employee | null; open: boolean; onClose: () => void }) {
  if (!employee) return null;

  const attendance = [88, 92, 95, 90, 94, 87, 96, 91, 93, 89, 95, 92];
  const avgAttendance = Math.round(attendance.reduce((a, b) => a + b, 0) / attendance.length);
  const leaveBalance = { casual: 8, sick: 6, annual: 15, total: 24, used: 11 };
  const performance = { rating: 4.2, goals: 87, reviews: 3, projects: 12 };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(26,43,74,0.3)', backdropFilter: 'blur(3px)' }}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          backgroundColor: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(160%)',
          borderLeft: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Hero header */}
        <div className="relative px-6 pt-6 pb-5" style={{ background: 'linear-gradient(180deg, var(--primary-soft) 0%, transparent 100%)' }}>
          <div className="flex items-start justify-between mb-4">
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>Employee Profile</span>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Avatar src={employee.avatar} alt={employee.name} size={76} ring />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold leading-tight" style={{ color: 'var(--text)' }}>{employee.name}</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>{employee.role}</p>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge status={employee.status} size="xs" />
                <span className="text-xs" style={{ color: 'var(--muted)' }}>· {employee.department}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-8">
          {/* Basic info */}
          <section>
            <SectionTitle icon="User" title="Basic Information" />
            <div className="grid grid-cols-2 gap-3">
              <InfoCell icon="Building2" label="Employee ID" value={employee.employeeId} />
              <InfoCell icon="Calendar" label="Joined" value={formatDate(employee.joiningDate)} />
              <InfoCell icon="Mail" label="Email" value={employee.email} />
              <InfoCell icon="Phone" label="Phone" value={employee.phone} />
              <InfoCell icon="MapPin" label="Location" value={employee.location} />
              <InfoCell icon="DollarSign" label="Salary" value={`$${employee.salary.toLocaleString()}`} />
            </div>
          </section>

          {/* Attendance summary */}
          <section>
            <SectionTitle icon="Clock" title="Attendance Summary" />
            <div className="card-base p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>12-month average</span>
                <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{avgAttendance}%</span>
              </div>
              <div className="flex items-end gap-1.5 mb-3" style={{ height: 36 }}>
                {attendance.map((v, i) => (
                  <div key={i} className="flex-1 rounded-t" style={{ height: `${v}%`, backgroundColor: v > 90 ? 'var(--success)' : v > 85 ? 'var(--primary)' : 'var(--warning)', opacity: 0.4 + (v / 100) * 0.6 }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px]" style={{ color: 'var(--muted-light)' }}>
                <span>Jan</span><span>Mar</span><span>Jun</span><span>Sep</span><span>Dec</span>
              </div>
            </div>
          </section>

          {/* Leave balance */}
          <section>
            <SectionTitle icon="CalendarDays" title="Leave Balance" />
            <div className="grid grid-cols-2 gap-3">
              <LeaveCell label="Annual" used={leaveBalance.used} total={leaveBalance.annual} color="var(--primary)" />
              <LeaveCell label="Casual" used={3} total={leaveBalance.casual} color="var(--info)" />
              <LeaveCell label="Sick" used={2} total={leaveBalance.sick} color="var(--warning)" />
              <LeaveCell label="Comp-off" used={1} total={4} color="var(--success)" />
            </div>
          </section>

          {/* Performance snapshot */}
          <section>
            <SectionTitle icon="TrendingUp" title="Performance Snapshot" />
            <div className="card-base p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{performance.rating}</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Icon key={i} name="Star" size={12} style={{ color: i <= Math.round(performance.rating) ? 'var(--primary)' : 'rgba(30,41,59,0.15)', fill: i <= Math.round(performance.rating) ? 'var(--primary)' : 'transparent' }} />
                    ))}
                    <span className="ml-1.5 text-xs" style={{ color: 'var(--muted)' }}>out of 5</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-lg px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: 'var(--success-soft)', color: 'var(--success)' }}>Exceeds</span>
                  <span className="text-[10px]" style={{ color: 'var(--muted)' }}>Q3 2026 Review</span>
                </div>
              </div>
              <div className="space-y-3">
                <StatBar label="Goal Completion" value={performance.goals} color="var(--primary)" />
                <StatBar label="Project Delivery" value={92} color="var(--success)" />
                <StatBar label="Team Collaboration" value={88} color="var(--info)" />
              </div>
            </div>
          </section>

          {/* Recent activity */}
          <section>
            <SectionTitle icon="ActivityIcon" title="Recent Activity" />
            <div className="flex flex-col gap-2">
              {[
                { text: 'Completed Q3 performance review', time: '2 days ago', icon: 'CheckCircle2' },
                { text: 'Submitted annual leave request', time: '5 days ago', icon: 'CalendarDays' },
                { text: 'Updated personal information', time: '1 week ago', icon: 'User' },
                { text: 'Completed security training', time: '2 weeks ago', icon: 'Shield' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0" style={{ backgroundColor: 'var(--primary-soft)', color: '#a07d20' }}>
                    <Icon name={a.icon} size={13} />
                  </div>
                  <span className="text-xs font-medium flex-1" style={{ color: 'var(--text)' }}>{a.text}</span>
                  <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{a.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
              View Full Profile
            </button>
            <button className="flex items-center justify-center rounded-xl px-4 transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              <Icon name="Mail" size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2.5">
      <Icon name={icon} size={14} style={{ color: 'var(--muted)' } as any} />
      <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{title}</h3>
    </div>
  );
}

function InfoCell({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon name={icon} size={12} style={{ color: 'var(--muted)' } as any} />
        <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{label}</span>
      </div>
      <div className="text-xs font-semibold truncate" style={{ color: 'var(--text)' }}>{value}</div>
    </div>
  );
}

function LeaveCell({ label, used, total, color }: { label: string; used: number; total: number; color: string }) {
  const remaining = total - used;
  return (
    <div className="card-base p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color: color }}>{remaining}/{total}</span>
      </div>
      <ProgressBar value={(remaining / total) * 100} color={color} height={5} />
      <div className="mt-1.5 text-[10px]" style={{ color: 'var(--muted)' }}>{used} used · {remaining} left</div>
    </div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{value}%</span>
      </div>
      <ProgressBar value={value} color={color} height={5} />
    </div>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
