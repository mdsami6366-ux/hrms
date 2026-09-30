import { Icon } from '@/components/Icon';
import { DepartmentDonut, HiresLineChart } from '@/components/Charts';

export function ReportsPage() {
  const reports = [
    { id: 'r1', name: 'Monthly Headcount Report', desc: 'Employee count by department and location', date: 'Sep 30, 2026', icon: 'Users', format: 'PDF' },
    { id: 'r2', name: 'Attendance Summary', desc: 'Daily and weekly attendance analytics', date: 'Sep 28, 2026', icon: 'Clock', format: 'Excel' },
    { id: 'r3', name: 'Payroll Register', desc: 'Complete payroll breakdown for the month', date: 'Sep 25, 2026', icon: 'Wallet', format: 'PDF' },
    { id: 'r4', name: 'Leave Utilization', desc: 'Leave balances and usage patterns', date: 'Sep 20, 2026', icon: 'CalendarDays', format: 'Excel' },
    { id: 'r5', name: 'Performance Overview', desc: 'Quarterly performance ratings by team', date: 'Sep 15, 2026', icon: 'TrendingUp', format: 'PDF' },
    { id: 'r6', name: 'Turnover Analysis', desc: 'Attrition rates and exit interview insights', date: 'Sep 10, 2026', icon: 'BarChart3', format: 'PDF' },
  ];

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Reports</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Generate and download HR analytics reports</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
          <Icon name="Plus" size={16} /> Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass card-base p-5 animate-slide-up">
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Headcount by Department</h3>
          <DepartmentDonut />
        </div>
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Monthly Hires (2026)</h3>
          <HiresLineChart />
        </div>
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '140ms' }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Attrition Rate', value: '8.2%', trend: '-1.4%', icon: 'ArrowDownRight', color: 'var(--success)' },
              { label: 'Retention', value: '91.8%', trend: '+1.4%', icon: 'ArrowUpRight', color: 'var(--success)' },
              { label: 'Avg Tenure', value: '3.4 yrs', trend: '+0.2', icon: 'ArrowUpRight', color: 'var(--primary)' },
              { label: 'Diversity', value: '47%', trend: '+3%', icon: 'ArrowUpRight', color: 'var(--info)' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
                <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <div className="text-xl font-bold mt-1" style={{ color: 'var(--text)' }}>{s.value}</div>
                <div className="flex items-center gap-1 text-[10px] font-bold mt-1" style={{ color: s.color }}>
                  <Icon name={s.icon} size={11} /> {s.trend}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <button key={r.id} className="glass card-base hover-lift p-5 text-left animate-slide-up" style={{ animationDelay: `${200 + i * 60}ms` }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--primary-soft)', color: '#a07d20' }}>
                <Icon name={r.icon} size={18} />
              </div>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'rgba(30,41,59,0.06)', color: 'var(--text-secondary)' }}>{r.format}</span>
            </div>
            <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>{r.name}</h4>
            <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>{r.desc}</p>
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="text-[10px]" style={{ color: 'var(--muted)' }}>{r.date}</span>
              <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                <Icon name="Download" size={13} /> Download
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
