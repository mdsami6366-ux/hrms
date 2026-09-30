import { employees } from '@/data/mockData';
import { Icon } from '@/components/Icon';
import { Avatar, ProgressBar } from '@/components/ui';

export function PerformancePage() {
  const reviews = employees.slice(0, 8).map((e, i) => ({
    ...e,
    rating: [4.2, 4.5, 4.8, 3.9, 4.1, 4.6, 3.5, 4.3][i],
    goals: [87, 92, 95, 78, 84, 91, 65, 89][i],
    cycle: 'Q3 2026',
    status: i === 6 ? 'Pending' : 'Completed',
  }));

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Performance</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track reviews, goals, and team performance</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
          <Icon name="Plus" size={16} /> Start Review
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Rating', value: '4.2', sub: 'Across 1,248 reviews', icon: 'Star', color: 'var(--primary)', bg: 'var(--primary-soft)' },
          { label: 'Goal Completion', value: '84%', sub: '+6% vs last quarter', icon: 'Target', color: 'var(--success)', bg: 'var(--success-soft)' },
          { label: 'Reviews Pending', value: '23', sub: '8 overdue', icon: 'Clock', color: 'var(--warning)', bg: 'var(--warning-soft)' },
          { label: 'Top Performers', value: '47', sub: 'Exceeds expectations', icon: 'Award', color: 'var(--info)', bg: 'var(--info-soft)' },
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
        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Performance Distribution</h3>
          <div className="flex flex-col gap-4">
            {[
              { label: 'Exceeds (4.5-5)', count: 187, pct: 15, color: 'var(--success)' },
              { label: 'Meets (3.5-4.4)', count: 842, pct: 68, color: 'var(--primary)' },
              { label: 'Below (2.5-3.4)', count: 178, pct: 14, color: 'var(--warning)' },
              { label: 'Needs Plan (<2.5)', count: 41, pct: 3, color: 'var(--danger)' },
            ].map(d => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.count}</span>
                </div>
                <ProgressBar value={d.pct} color={d.color} height={6} />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '260ms' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Q3 2026 Performance Reviews</h3>
          </div>
          <div className="hidden md:grid grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr] gap-4 px-5 py-2.5 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
            <span>Employee</span><span>Rating</span><span>Goal Completion</span><span>Cycle</span><span>Status</span>
          </div>
          {reviews.map(r => (
            <div key={r.id} className="grid grid-cols-1 md:grid-cols-[2fr_0.8fr_1fr_0.8fr_1fr] gap-3 md:gap-4 px-5 py-3 border-b last:border-0 items-center" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-3">
                <Avatar src={r.avatar} alt={r.name} size={32} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{r.name}</div>
                  <div className="text-[11px]" style={{ color: 'var(--muted)' }}>{r.department}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} style={{ color: 'var(--primary)' } as any} />
                <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{r.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 max-w-[80px]"><ProgressBar value={r.goals} color={r.goals >= 85 ? 'var(--success)' : r.goals >= 70 ? 'var(--primary)' : 'var(--warning)'} height={5} /></div>
                <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{r.goals}%</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{r.cycle}</span>
              <span className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold w-fit" style={{
                backgroundColor: r.status === 'Completed' ? 'var(--success-soft)' : 'var(--warning-soft)',
                color: r.status === 'Completed' ? 'var(--success)' : 'var(--warning)',
              }}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
