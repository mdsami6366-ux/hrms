import { navItems } from '@/data/mockData';
import { Icon } from './Icon';

export function Sidebar({
  active, onNavigate, collapsed, onToggleCollapse,
}: {
  active: string;
  onNavigate: (page: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col transition-all duration-300 ${collapsed ? 'w-[72px]' : 'w-[248px]'}`}
      style={{
        backgroundColor: 'var(--glass-strong)',
        backdropFilter: 'blur(24px) saturate(160%)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 38, height: 38, background: 'linear-gradient(135deg, var(--text) 0%, #2d4470 100%)' }}>
          <span className="text-base font-bold" style={{ color: 'var(--primary)' }}>H</span>
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <div className="text-sm font-bold tracking-tight" style={{ color: 'var(--text)' }}>HCL HRMS</div>
            <div className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>Human Resources</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {!collapsed && (
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-light)' }}>
            Menu
          </div>
        )}
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${collapsed ? 'justify-center' : ''}`}
                style={{
                  backgroundColor: isActive ? 'var(--text)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon name={item.icon} size={18} className="shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {!collapsed && isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t px-3 py-3" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={onToggleCollapse}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} className="shrink-0" />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
