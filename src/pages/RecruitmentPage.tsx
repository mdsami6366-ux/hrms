import { Icon } from '@/components/Icon';
import { Avatar, ProgressBar } from '@/components/ui';

const candidates = [
  { id: 'c1', name: 'Alex Rivera', avatar: 'https://images.pexels.com/photos/37273005/pexels-photo-37273005.png?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Senior Frontend Engineer', stage: 'Final Interview', match: 94, applied: '3 days ago' },
  { id: 'c2', name: 'Maya Singh', avatar: 'https://images.pexels.com/photos/15827758/pexels-photo-15827758.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Product Manager', stage: 'Technical Round', match: 88, applied: '5 days ago' },
  { id: 'c3', name: 'Carlos Mendez', avatar: 'https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Data Scientist', stage: 'HR Screening', match: 76, applied: '1 week ago' },
  { id: 'c4', name: 'Sofia Lindberg', avatar: 'https://images.pexels.com/photos/11701102/pexels-photo-11701102.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'UX Designer', stage: 'Offer Pending', match: 91, applied: '1 week ago' },
  { id: 'c5', name: 'Kwame Asante', avatar: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', role: 'Backend Engineer', stage: 'Final Interview', match: 85, applied: '2 weeks ago' },
];

const openings = [
  { id: 'o1', title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 42, stage: '4 in final round', urgency: 'High' },
  { id: 'o2', title: 'Product Manager', dept: 'Product', applicants: 28, stage: '2 in final round', urgency: 'Medium' },
  { id: 'o3', title: 'Data Scientist', dept: 'Engineering', applicants: 51, stage: '6 in screening', urgency: 'High' },
  { id: 'o4', title: 'UX Designer', dept: 'Design', applicants: 19, stage: '1 offer extended', urgency: 'Low' },
  { id: 'o5', title: 'Backend Engineer', dept: 'Engineering', applicants: 37, stage: '3 in final round', urgency: 'Medium' },
];

export function RecruitmentPage() {
  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Recruitment</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage job openings and candidate pipelines</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
          <Icon name="Plus" size={16} /> Post Opening
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Open Positions', value: '17', sub: '5 in final stage', icon: 'Briefcase', color: 'var(--primary)', bg: 'var(--primary-soft)' },
          { label: 'Total Candidates', value: '284', sub: '42 new this week', icon: 'Users', color: 'var(--info)', bg: 'var(--info-soft)' },
          { label: 'Hired This Month', value: '12', sub: '92% acceptance', icon: 'UserCheck', color: 'var(--success)', bg: 'var(--success-soft)' },
          { label: 'Avg Time to Hire', value: '21 days', sub: '5 days faster', icon: 'Clock', color: 'var(--warning)', bg: 'var(--warning-soft)' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Openings */}
        <div className="glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Active Openings</h3>
          </div>
          {openings.map(o => (
            <div key={o.id} className="flex items-center gap-3 px-5 py-3.5 border-b last:border-0 transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--border)' }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0" style={{ backgroundColor: 'var(--primary-soft)', color: '#a07d20' }}>
                <Icon name="Briefcase" size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{o.title}</div>
                <div className="text-[11px]" style={{ color: 'var(--muted)' }}>{o.dept} · {o.applicants} applicants · {o.stage}</div>
              </div>
              <span className="inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{
                backgroundColor: o.urgency === 'High' ? 'var(--danger-soft)' : o.urgency === 'Medium' ? 'var(--warning-soft)' : 'var(--success-soft)',
                color: o.urgency === 'High' ? 'var(--danger)' : o.urgency === 'Medium' ? 'var(--warning)' : 'var(--success)',
              }}>{o.urgency}</span>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '260ms' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Candidate Pipeline</h3>
          </div>
          {candidates.map(c => (
            <div key={c.id} className="flex items-center gap-3 px-5 py-3.5 border-b last:border-0 transition-colors hover:bg-black/[0.02]" style={{ borderColor: 'var(--border)' }}>
              <Avatar src={c.avatar} alt={c.name} size={38} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: 'var(--text)' }}>{c.name}</div>
                <div className="text-[11px] truncate" style={{ color: 'var(--muted)' }}>{c.role}</div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 w-20">
                <div className="flex items-center gap-1 text-[10px] font-bold" style={{ color: c.match >= 90 ? 'var(--success)' : 'var(--primary)' }}>
                  <Icon name="Target" size={11} /> {c.match}% match
                </div>
                <ProgressBar value={c.match} color={c.match >= 90 ? 'var(--success)' : 'var(--primary)'} height={4} />
              </div>
              <span className="rounded-lg px-2 py-1 text-[10px] font-bold whitespace-nowrap" style={{ backgroundColor: 'var(--info-soft)', color: 'var(--info)' }}>{c.stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
