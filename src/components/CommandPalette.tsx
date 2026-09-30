import { useState, useEffect, useRef } from 'react';
import { commandItems } from '@/data/mockData';
import { Icon } from './Icon';

export function CommandPalette({
  open, onClose, onNavigate, onAction,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onAction: (action: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = commandItems.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const sections = [...new Set(filtered.map(i => i.section))];

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(s => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(s => Math.max(s - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = filtered[selected];
      if (item) {
        item.page ? onNavigate(item.page) : onAction(item.action!);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 animate-fade-in">
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,43,74,0.25)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in"
        style={{
          backgroundColor: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <Icon name="Search" size={18} className="shrink-0" style={{ color: 'var(--muted)' } as any} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            onKeyDown={handleKey}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--text)' }}
          />
          <kbd className="rounded-md px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: 'rgba(30,41,59,0.06)', color: 'var(--muted)' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>No results found</div>
          ) : (
            sections.map(section => (
              <div key={section}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--muted-light)' }}>{section}</div>
                {filtered.filter(i => i.section === section).map((item) => {
                  runningIndex++;
                  const idx = runningIndex;
                  const isSelected = idx === selected;
                  return (
                    <button
                      key={item.id}
                      onMouseEnter={() => setSelected(idx)}
                      onClick={() => {
                        item.page ? onNavigate(item.page) : onAction(item.action!);
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                      style={{ backgroundColor: isSelected ? 'var(--primary-soft)' : 'transparent' }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ backgroundColor: isSelected ? 'var(--primary)' : 'rgba(30,41,59,0.06)', color: isSelected ? '#fff' : 'var(--text-secondary)' }}>
                        <Icon name={item.icon} size={15} />
                      </div>
                      <span className="text-sm font-medium flex-1" style={{ color: 'var(--text)' }}>{item.label}</span>
                      {isSelected && <Icon name="ArrowRight" size={14} style={{ color: 'var(--primary)' } as any} />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
