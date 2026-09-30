import { Icon } from '@/components/Icon';
import { Avatar, ProgressBar } from '@/components/ui';
import { employees } from '@/data/mockData';

export function PayrollPage() {
  const payroll = employees.slice(0, 8).map((e, i) => ({
    ...e,
    month: ['Sep 2026', 'Sep 2026', 'Sep 2026', 'Sep 2026', 'Sep 2026', 'Sep 2026', 'Aug 2026', 'Sep 2026'][i],
    status: i === 2 ? 'Processing' : i === 6 ? 'Pending' : 'Paid',
    net: e.salary - Math.round(e.salary * 0.22),
  }));

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Payroll</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage compensation and payment cycles</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
          <Icon name="Plus" size={16} /> Run Payroll
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Payroll', value: '$14.2M', sub: 'Monthly gross', icon: 'DollarSign', color: 'var(--primary)', bg: 'var(--primary-soft)' },
          { label: 'Net Payout', value: '$11.1M', sub: 'After deductions', icon: 'Wallet', color: 'var(--success)', bg: 'var(--success-soft)' },
          { label: 'Tax Deducted', value: '$3.1M', sub: 'PAYE + contributions', icon: 'Percent', color: 'var(--warning)', bg: 'var(--warning-soft)' },
          { label: 'Processed', value: '1,248', sub: 'of 1,248 employees', icon: 'CheckCircle2', color: 'var(--info)', bg: 'var(--info-soft)' },
        ].map((s, i) => (
          <div key={s.label} className="glass card-base p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: s.bg, color: s.color }}><Icon name={s.icon} size={15} /></div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Payroll Runs</h3>
          </div>
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-5 py-2.5 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <span>Employee</span><span>Month</span><span>Net Pay</span><span>Status</span>
          </div>
          {payroll.map(p => (
            <div key={p.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-3 md:gap-4 px-5 py-3 border-b last:border-0 items-center" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <Avatar src={p.avatar} alt={p.name} size={32} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{p.name}</div>
                  <div className="text-[11px]" style={{ color: 'var(--muted)' }}>{p.role}</div>
                </div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{p.month}</span>
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>${p.net.toLocaleString()}</span>
              <span>
                <span className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{
                  backgroundColor: p.status === 'Paid' ? 'var(--success-soft)' : p.status === 'Processing' ? 'var(--warning-soft)' : 'var(--danger-soft)',
                  color: p.status === 'Paid' ? 'var(--success)' : p.status === 'Processing' ? 'var(--warning)' : 'var(--danger)',
                }}>{p.status}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '260ms' }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Salary by Department</h3>
          <div className="flex flex-col gap-4">
            {[
              { dept: 'Engineering', avg: '$132K', pct: 92, color: 'var(--primary)' },
              { dept: 'Sales', avg: '$118K', pct: 82, color: 'var(--success)' },
              { dept: 'Marketing', avg: '$98K', pct: 68, color: 'var(--warning)' },
              { dept: 'Design', avg: '$105K', pct: 73, color: 'var(--info)' },
              { dept: 'Finance', avg: '$92K', pct: 64, color: 'var(--danger)' },
              { dept: 'HR', avg: '$87K', pct: 60, color: '#8b5cf6' },
            ].map(d => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d.dept}</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.avg}</span>
                </div>
                <ProgressBar value={d.pct} color={d.color} height={5} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
