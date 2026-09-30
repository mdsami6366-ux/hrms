import { EmployeeStatus } from '@/data/mockData';
import { Icon } from './Icon';

export function StatusBadge({ status, size = 'sm' }: { status: EmployeeStatus; size?: 'sm' | 'xs' }) {
  const config: Record<EmployeeStatus, { bg: string; color: string; dot: string }> = {
    'Active': { bg: 'var(--success-soft)', color: 'var(--success)', dot: 'var(--success)' },
    'On Leave': { bg: 'var(--warning-soft)', color: 'var(--warning)', dot: 'var(--warning)' },
    'Remote': { bg: 'var(--info-soft)', color: 'var(--info)', dot: 'var(--info)' },
    'Probation': { bg: 'var(--primary-soft)', color: '#a07d20', dot: 'var(--primary)' },
  };
  const c = config[status];
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${pad}`}
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.dot }} />
      {status}
    </span>
  );
}

export function Avatar({
  src, alt, size = 40, ring = false,
}: { src: string; alt: string; size?: number; ring?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover ${ring ? 'ring-2 ring-white shadow-sm' : ''}`}
      style={{ width: size, height: size }}
    />
  );
}

export function ProgressBar({
  value, color = 'var(--primary)', height = 6, trackColor = 'rgba(30,41,59,0.06)',
}: { value: number; color?: string; height?: number; trackColor?: string }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: trackColor }}>
      <div
        className="rounded-full transition-all duration-700 ease-out"
        style={{ width: `${Math.min(value, 100)}%`, height, backgroundColor: color }}
      />
    </div>
  );
}

export function Chip({
  children, color, bg,
}: { children: React.ReactNode; color?: string; bg?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: bg ?? 'rgba(30,41,59,0.06)', color: color ?? 'var(--text-secondary)' }}
    >
      {children}
    </span>
  );
}

export function IconButton({
  icon, onClick, label, active, size = 36,
}: { icon: string; onClick?: () => void; label?: string; active?: boolean; size?: number }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex items-center justify-center rounded-xl transition-all hover:scale-105 active:scale-95"
      style={{
        width: size, height: size,
        backgroundColor: active ? 'var(--text)' : 'rgba(255,255,255,0.5)',
        color: active ? '#fff' : 'var(--text-secondary)',
        border: `1px solid ${active ? 'transparent' : 'var(--border)'}`,
      }}
    >
      <Icon name={icon} size={size * 0.44} />
    </button>
  );
}

