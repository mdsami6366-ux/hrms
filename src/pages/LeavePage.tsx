import { leaveRequests } from '@/data/mockData';
import { Icon } from '@/components/Icon';
import { Avatar, ProgressBar } from '@/components/ui';

export function LeavePage({ onApprove }: { onApprove: () => void }) {
  const balances = [
    { type: 'Annual Leave', used: 342, total: 500, color: 'var(--primary)' },
    { type: 'Sick Leave', used: 128, total: 300, color: 'var(--warning)' },
    { type: 'Casual Leave', used: 87, total: 200, color: 'var(--info)' },
    { type: 'Comp-off', used: 23, total: 100, color: 'var(--success)' },
  ];

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Leave Management</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage leave requests and balances</p>
        </div>
        <button onClick={onApprove} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
          <Icon name="CheckSquare" size={16} /> Review Requests
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {balances.map((b, i) => (
          <div key={b.type} className="glass card-base p-4 animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{b.type}</div>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{b.used}</span>
              <span className="text-xs" style={{ color: 'var(--muted)' }}>/ {b.total} days</span>
            </div>
            <ProgressBar value={(b.used / b.total) * 100} color={b.color} height={5} />
            <div className="text-[10px] mt-1.5" style={{ color: 'var(--muted)' }}>{b.total - b.used} days remaining</div>
          </div>
        ))}
      </div>

      <div className="glass card-base overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>Recent Leave Requests</h3>
        </div>
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.8fr_1fr] gap-4 px-5 py-2.5 border-b text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
          <span>Employee</span><span>Type</span><span>Duration</span><span>Days</span><span>Status</span>
        </div>
        {leaveRequests.map(req => (
          <div key={req.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_0.8fr_1fr] gap-3 md:gap-4 px-5 py-3.5 border-b last:border-0 items-center" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Avatar src={req.avatar} alt={req.employeeName} size={32} />
              <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{req.employeeName}</div>
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{req.type}</span>
            <span className="text-xs" style={{ color: 'var(--muted)' }}>{req.from} → {req.to}</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{req.days} days</span>
            <span>
              <span className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold" style={{
                backgroundColor: req.status === 'Approved' ? 'var(--success-soft)' : req.status === 'Pending' ? 'var(--warning-soft)' : 'var(--danger-soft)',
                color: req.status === 'Approved' ? 'var(--success)' : req.status === 'Pending' ? 'var(--warning)' : 'var(--danger)',
              }}>{req.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
