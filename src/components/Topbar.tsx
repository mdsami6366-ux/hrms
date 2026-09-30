import { useState } from 'react';
import { Icon } from './Icon';
import { Avatar, IconButton } from './ui';
import { notifications } from '@/data/mockData';

export function Topbar({
  onOpenSearch, onOpenNotifications,
}: {
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotif = () => {
    setNotifOpen(!notifOpen);
    onOpenNotifications();
  };

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 h-16"
      style={{
        backgroundColor: 'var(--glass)',
        backdropFilter: 'blur(20px) saturate(140%)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Search trigger */}
      <button
        onClick={onOpenSearch}
        className="group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all hover:scale-[1.01] w-full max-w-md"
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          border: '1px solid var(--border)',
        }}
      >
        <Icon name="Search" size={16} className="shrink-0" style={{ color: 'var(--muted)' } as any} />
        <span className="text-sm" style={{ color: 'var(--muted)' }}>Search employees, pages, actions…</span>
        <span className="ml-auto flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(30,41,59,0.06)', color: 'var(--muted)' }}>
          <span>⌘K</span>
        </span>
      </button>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <IconButton icon="Bell" onClick={handleNotif} label="Notifications" />
        <div className="h-6 w-px" style={{ backgroundColor: 'var(--border)' }} />
        <div className="flex items-center gap-3 pr-1">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-semibold leading-tight" style={{ color: 'var(--text)' }}>Priya Sharma</div>
            <div className="text-[11px]" style={{ color: 'var(--muted)' }}>HR Administrator</div>
          </div>
          <Avatar src="https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&h=200&w=200" alt="Priya Sharma" size={36} ring />
        </div>
      </div>

      {/* Notification dropdown */}
      {notifOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
          <div
            className="absolute right-6 top-14 z-40 w-80 rounded-2xl p-2 animate-scale-in"
            style={{
              backgroundColor: 'var(--glass-strong)',
              backdropFilter: 'blur(24px) saturate(160%)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Notifications</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: 'var(--primary-soft)', color: '#a07d20' }}>{unreadCount} new</span>
            </div>
            <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-black/[0.03]"
                  style={{ backgroundColor: n.unread ? 'var(--primary-soft)' : 'transparent' }}
                >
                  <div className="mt-0.5 shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: n.unread ? 'var(--primary)' : 'rgba(30,41,59,0.06)', color: n.unread ? '#fff' : 'var(--text-secondary)' }}>
                      <Icon name={notifIconMap[n.type]} size={15} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{n.title}</div>
                    <div className="text-xs truncate" style={{ color: 'var(--muted)' }}>{n.desc}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--muted-light)' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-1 w-full rounded-xl py-2 text-xs font-semibold transition-colors hover:bg-black/[0.04]" style={{ color: 'var(--text-secondary)' }}>
              View all notifications
            </button>
          </div>
        </>
      )}
    </header>
  );
}

const notifIconMap: Record<string, string> = {
  leave: 'CalendarDays',
  payroll: 'Wallet',
  hire: 'UserPlus',
  review: 'TrendingUp',
  policy: 'FileText',
};
