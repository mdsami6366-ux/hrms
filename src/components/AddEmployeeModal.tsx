import { useState } from 'react';
import { Icon } from './Icon';
import { departments } from '@/data/mockData';

export function AddEmployeeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    role: '', department: '', location: '', salary: '',
    joiningDate: '', employeeType: 'Full-time',
  });

  const steps = ['Personal', 'Job Details', 'Review'];
  const isLast = step === steps.length - 1;

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const handleNext = () => {
    if (isLast) {
      onClose();
      setStep(0);
      setForm({ firstName: '', lastName: '', email: '', phone: '', role: '', department: '', location: '', salary: '', joiningDate: '', employeeType: 'Full-time' });
    } else {
      setStep(s => s + 1);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26,43,74,0.3)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden animate-scale-in"
        style={{
          backgroundColor: 'var(--glass-strong)',
          backdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div>
            <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>Add New Employee</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Step {step + 1} of {steps.length}</p>
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 px-6 py-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all"
                style={{
                  backgroundColor: i <= step ? 'var(--text)' : 'rgba(30,41,59,0.08)',
                  color: i <= step ? '#fff' : 'var(--muted)',
                }}
              >
                {i < step ? <Icon name="Check" size={14} /> : i + 1}
              </div>
              <span className="text-xs font-semibold" style={{ color: i <= step ? 'var(--text)' : 'var(--muted)' }}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px" style={{ backgroundColor: i < step ? 'var(--text)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="px-6 py-2 min-h-[240px]">
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <Field label="First Name" value={form.firstName} onChange={v => update('firstName', v)} placeholder="John" />
              <Field label="Last Name" value={form.lastName} onChange={v => update('lastName', v)} placeholder="Doe" />
              <Field label="Email" value={form.email} onChange={v => update('email', v)} placeholder="john.doe@hcl.com" full />
              <Field label="Phone" value={form.phone} onChange={v => update('phone', v)} placeholder="+1 234 567 8900" full />
              <Field label="Location" value={form.location} onChange={v => update('location', v)} placeholder="New York, US" full />
            </div>
          )}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <Field label="Job Title" value={form.role} onChange={v => update('role', v)} placeholder="Software Engineer" full />
              <SelectField label="Department" value={form.department} onChange={v => update('department', v)} options={departments.map(d => d.name)} />
              <SelectField label="Employee Type" value={form.employeeType} onChange={v => update('employeeType', v)} options={['Full-time', 'Part-time', 'Contract', 'Intern']} />
              <Field label="Annual Salary ($)" value={form.salary} onChange={v => update('salary', v)} placeholder="95000" />
              <Field label="Joining Date" value={form.joiningDate} onChange={v => update('joiningDate', v)} placeholder="2026-10-01" full type="date" />
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--primary-soft)', border: '1px solid var(--primary-border)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Sparkles" size={16} style={{ color: '#a07d20' } as any} />
                  <span className="text-sm font-bold" style={{ color: '#a07d20' }}>Review Details</span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Confirm the information below before creating the employee record.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ReviewItem label="Name" value={`${form.firstName || '—'} ${form.lastName || ''}`} />
                <ReviewItem label="Email" value={form.email || '—'} />
                <ReviewItem label="Role" value={form.role || '—'} />
                <ReviewItem label="Department" value={form.department || '—'} />
                <ReviewItem label="Location" value={form.location || '—'} />
                <ReviewItem label="Salary" value={form.salary ? `$${form.salary}` : '—'} />
                <ReviewItem label="Joining" value={form.joiningDate || '—'} />
                <ReviewItem label="Type" value={form.employeeType} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : onClose()}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5"
            style={{ color: 'var(--text-secondary)' }}
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: 'var(--text)', color: '#fff' }}
          >
            {isLast ? 'Create Employee' : 'Continue'}
            <Icon name={isLast ? 'Check' : 'ArrowRight'} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, full, type = 'text',
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; full?: boolean; type?: string }) {
  return (
    <div className={full ? 'col-span-2' : ''}>
      <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2"
        style={{
          backgroundColor: 'rgba(255,255,255,0.6)',
          border: '1px solid var(--border-strong)',
          color: 'var(--text)',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-soft)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-strong)', color: 'var(--text)' }}
      >
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
      <div className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>{label}</div>
      <div className="text-xs font-semibold mt-0.5 truncate" style={{ color: 'var(--text)' }}>{value}</div>
    </div>
  );
}
