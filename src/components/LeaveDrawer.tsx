import { useState } from 'react';
import { leaveRequests, LeaveRequest } from '@/data/mockData';
import { Icon } from './Icon';
import { Avatar } from './ui';

export function LeaveDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [requests, setRequests] = useState(leaveRequests);
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('Pending');

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const handleAction = (id: string, status: 'Approved' | 'Rejected') => {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status } : r));
  };

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
        <div className="sticky top-0 z-10 px-6 py-4 border-b" style={{ backgroundColor: 'var(--glass-strong)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>Leave Approvals</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{requests.filter(r => r.status === 'Pending').length} pending requests</p>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="flex gap-1.5">
            {(['Pending', 'Approved', 'Rejected', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: filter === f ? 'var(--text)' : 'rgba(30,41,59,0.06)',
                  color: filter === f ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 p-5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-3" style={{ backgroundColor: 'var(--success-soft)' }}>
                <Icon name="CheckCircle2" size={24} style={{ color: 'var(--success)' } as any} />
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>All caught up!</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>No {filter.toLowerCase()} requests</p>
            </div>
          ) : (
            filtered.map(req => <LeaveCard key={req.id} req={req} onAction={handleAction} />)
          )}
        </div>
      </div>
    </>
  );
}

function LeaveCard({ req, onAction }: { req: LeaveRequest; onAction: (id: string, status: 'Approved' | 'Rejected') => void }) {
  const statusConfig = {
    Pending: { bg: 'var(--warning-soft)', color: 'var(--warning)', icon: 'Clock3' },
    Approved: { bg: 'var(--success-soft)', color: 'var(--success)', icon: 'CheckCircle2' },
    Rejected: { bg: 'var(--danger-soft)', color: 'var(--danger)', icon: 'XCircle' },
  };
  const c = statusConfig[req.status];

  return (
    <div className="rounded-xl p-4 animate-slide-up" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid var(--border)' }}>
      <div className="flex items-start gap-3 mb-3">
        <Avatar src={req.avatar} alt={req.employeeName} size={40} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{req.employeeName}</div>
          <div className="text-xs" style={{ color: 'var(--muted)' }}>{req.type}</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: c.bg, color: c.color }}>
          <Icon name={c.icon} size={11} />
          {req.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(30,41,59,0.04)' }}>
          <div className="text-[9px] uppercase font-bold" style={{ color: 'var(--muted)' }}>From</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{req.from}</div>
        </div>
        <div className="rounded-lg p-2" style={{ backgroundColor: 'rgba(30,41,59,0.04)' }}>
          <div className="text-[9px] uppercase font-bold" style={{ color: 'var(--muted)' }}>To</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--text)' }}>{req.to}</div>
        </div>
        <div className="rounded-lg p-2" style={{ backgroundColor: 'var(--primary-soft)' }}>
          <div className="text-[9px] uppercase font-bold" style={{ color: '#a07d20' }}>Days</div>
          <div className="text-xs font-semibold mt-0.5" style={{ color: '#a07d20' }}>{req.days}</div>
        </div>
      </div>
      <p className="text-xs mb-3 italic" style={{ color: 'var(--text-secondary)' }}>"{req.reason}"</p>
      {req.status === 'Pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => onAction(req.id, 'Approved')}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--success)', color: '#fff' }}
          >
            <Icon name="Check" size={14} /> Approve
          </button>
          <button
            onClick={() => onAction(req.id, 'Rejected')}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--danger-soft)', color: 'var(--danger)', border: '1px solid var(--danger-soft)' }}
          >
            <Icon name="X" size={14} /> Reject
          </button>
        </div>
      )}
    </div>
  );
}
