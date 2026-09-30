import { attendanceTrend, monthlyHires, departments } from '@/data/mockData';

export function AttendanceChart() {
  const data = attendanceTrend;
  const maxValue = 102;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3 px-2 pt-2" style={{ height: 200 }}>
        {data.map((d, i) => (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-col-reverse items-center justify-end gap-0.5" style={{ height: 160 }}>
              <div
                className="w-full max-w-[28px] rounded-t-lg animate-grow-bar"
                style={{
                  height: `${(d.present / maxValue) * 160}px`,
                  backgroundColor: 'var(--text)',
                  animationDelay: `${i * 80}ms`,
                }}
                title={`Present: ${d.present}%`}
              />
              <div
                className="w-full max-w-[28px] rounded-t-lg animate-grow-bar"
                style={{
                  height: `${(d.remote / maxValue) * 160}px`,
                  backgroundColor: 'var(--primary)',
                  animationDelay: `${i * 80 + 100}ms`,
                }}
                title={`Remote: ${d.remote}%`}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-5 px-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: 'var(--text)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: 'var(--primary)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Remote</span>
        </div>
      </div>
    </div>
  );
}

export function HiresLineChart() {
  const data = monthlyHires;
  const max = Math.max(...data.map(d => d.count));
  const w = 100;
  const h = 80
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.count / max) * (h - 10) - 5;
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height: 120 }}>
        <defs>
          <linearGradient id="hiresGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#hiresGrad)" />
        <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="animate-draw-line" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="var(--primary)" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between px-1">
        {data.map((d, i) => (
          <span key={i} className="text-[10px]" style={{ color: 'var(--muted-light)' }}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export function DepartmentDonut() {
  const total = departments.reduce((s, d) => s + d.count, 0);
  let offset = 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: 140, height: 140 }}>
        <svg viewBox="0 0 120 120" className="-rotate-90" style={{ width: 140, height: 140 }}>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(30,41,59,0.06)" strokeWidth="14" />
          {departments.map((d) => {
            const pct = d.count / total;
            const len = pct * circumference;
            const seg = (
              <circle
                key={d.name}
                cx="60" cy="60" r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth="14"
                strokeDasharray={`${len} ${circumference - len}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            );
            offset += len;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{total}</span>
          <span className="text-[10px] font-medium" style={{ color: 'var(--muted)' }}>Total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {departments.map((d) => (
          <div key={d.name} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
            <span className="text-xs font-medium flex-1" style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MiniBars({ values, color = 'var(--primary)' }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex items-end gap-1" style={{ height: 28 }}>
      {values.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: 0.3 + (v / max) * 0.7 }}
        />
      ))}
    </div>
  );
}
