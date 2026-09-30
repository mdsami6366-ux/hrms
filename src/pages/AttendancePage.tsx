import { attendanceTrend, employees } from '@/data/mockData';
import { Icon } from '@/components/Icon';
import { Avatar, StatusBadge, ProgressBar } from '@/components/ui';

export function AttendancePage() {
  const todayList = employees.slice(0, 8).map((e, i) => ({
    ...e,
    checkIn: ['8:45 AM', '9:02 AM', '8:30 AM', '9:15 AM', '—', '8:50 AM', '10:20 AM', '9:05 AM'][i],
    checkOut: ['5:30 PM', '5:45 PM', '5:15 PM', '—', '—', '6:00 PM', '—', '5:50 PM'][i],
    hours: [8.75, 8.72, 8.75, 0, 0, 9.17, 0, 8.92][i],
    status: i === 3 || i === 6 ? 'Late' : i === 4 ? 'Absent' : 'Present',
  }));

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Attendance</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track and analyze employee attendance patterns</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Present Today', value: '1,067', pct: '85.5%', icon: 'UserCheck', color: 'var(--success)', bg: 'var(--success-soft)' },
          { label: 'Remote Today', value: '142', pct: '11.4%', icon: 'Home', color: 'var(--info)', bg: 'var(--info-soft)' },
          { label: 'Absent Today', value: '39', pct: '3.1%', icon: 'UserX', color: 'var(--danger)', bg: 'var(--danger-soft)' },
          { label: 'Avg Hours', value: '8.4h', pct: '+0.2h', icon: 'Clock', color: 'var(--primary)', bg: 'var(--primary-soft)' },
        ].map((s, i) => (
          <div key={s.label} className="glass card-base p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: s.bg, color: s.color }}>
                <Icon name={s.icon} size={15} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{s.value}</div>
            <div className="text-[11px] mt-1" style={{ color: 'var(--muted)' }}>{s.pct} of workforce</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass card-base p-5 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Weekly Attendance Rate</h3>
          <p className="text-xs mb-4" style={{ color: 'var(--muted)' }}>Daily breakdown of presence vs absence</p>
          <div className="flex items-end justify-between gap-3 pt-2" style={{ height: 200 }}>
            {attendanceTrend.map((d, i) => {
              const total = d.present + d.remote;
              return (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="text-xs font-bold" style={{ color: 'var(--text)' }}>{total}%</div>
                  <div className="flex w-full flex-col-reverse items-center rounded-lg overflow-hidden" style={{ height: 140, backgroundColor: 'rgba(30,41,59,0.04)' }}>
                    <div className="w-full" style={{ height: `${(d.present / 100) * 140}px`, backgroundColor: 'var(--text)' }} />
                    <div className="w-full" style={{ height: `${(d.remote / 100) * 140}px`, backgroundColor: 'var(--primary)' }} />
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{d.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-5 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: 'var(--text)' }} /><span className="text-xs" style={{ color: 'var(--muted)' }}>Present</span></div>
            <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: 'var(--primary)' }} /><span className="text-xs" style={{ color: 'var(--muted)' }}>Remote</span></div>
          </div>
        </div>

        <div className="glass card-base p-5 animate-slide-up" style={{ animationDelay: '260ms' }}>
          <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>Department Attendance</h3>
          <div className="flex flex-col gap-4">
            {[
              { dept: 'Engineering', rate: 92, color: 'var(--primary)' },
              { dept: 'Design', rate: 88, color: 'var(--info)' },
              { dept: 'Sales', rate: 79, color: 'var(--success)' },
              { dept: 'Marketing', rate: 85, color: 'var(--warning)' },
              { dept: 'Finance', rate: 94, color: 'var(--danger)' },
            ].map(d => (
              <div key={d.dept}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{d.dept}</span>
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.rate}%</span>
                </div>
                <ProgressBar value={d.rate} color={d.color} height={6} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '320ms' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Today's Log</h3>
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors" style={{ backgroundColor: 'rgba(30,41,59,0.06)', color: 'var(--text-secondary)' }}>
            <Icon name="Download" size={13} /> Export
          </button>
        </div>
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-2.5 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          <span>Employee</span><span>Check In</span><span>Check Out</span><span>Hours</span><span>Status</span>
        </div>
        {todayList.map(e => (
          <div key={e.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-3 md:gap-4 px-5 py-3 border-b last:border-0 items-center" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Avatar src={e.avatar} alt={e.name} size={32} />
              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{e.name}</div>
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{e.checkIn}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{e.checkOut}</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{e.hours > 0 ? `${e.hours}h` : '—'}</span>
            <span>
              <span className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{
                backgroundColor: e.status === 'Present' ? 'var(--success-soft)' : e.status === 'Late' ? 'var(--warning-soft)' : 'var(--danger-soft)',
                color: e.status === 'Present' ? 'var(--success)' : e.status === 'Late' ? 'var(--warning)' : 'var(--danger)',
              }}>
                <Icon name={e.status === 'Present' ? 'CheckCircle2' : e.status === 'Late' ? 'Clock3' : 'XCircle'} size={10} />
                {e.status}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
