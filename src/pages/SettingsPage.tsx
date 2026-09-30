import { useState } from 'react';
import { Icon } from '@/components/Icon';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Company');
  const tabs = ['Company', 'Attendance', 'Leave', 'Payroll', 'Notifications', 'Security'];
  const [toggles, setToggles] = useState({
    emailNotif: true,
    pushNotif: true,
    weeklyDigest: false,
    twoFactor: true,
    autoApprove: false,
    ipRestriction: true,
  });

  const toggle = (key: keyof typeof toggles) => setToggles(t => ({ ...t, [key]: !t[key] }));

  return (
    <div className="flex flex-col gap-5 p-6 max-w-[1000px] mx-auto">
      <div className="animate-slide-up">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Configure your HRMS preferences and policies</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Tab nav */}
        <div className="lg:w-52 shrink-0">
          <div className="glass card-base p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all whitespace-nowrap"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--text)' : 'transparent',
                  color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                }}
              >
                <Icon name={tabIcon(tab)} size={16} className="shrink-0" />
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 glass card-base p-6 animate-slide-up" style={{ animationDelay: '80ms' }}>
          {activeTab === 'Company' && (
            <div className="flex flex-col gap-5">
              <SectionTitle title="Company Profile" desc="Basic information about your organization" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Company Name" value="HCL Technologies" />
                <InputField label="Industry" value="Information Technology" />
                <InputField label="Founded" value="1976" />
                <InputField label="Employees" value="1,248" />
                <InputField label="Headquarters" value="Noida, India" />
                <InputField label="Website" value="hcl.com" />
              </div>
              <SaveBar />
            </div>
          )}

          {activeTab === 'Attendance' && (
            <div className="flex flex-col gap-5">
              <SectionTitle title="Attendance Policy" desc="Configure work hours and tracking rules" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Work Start Time" value="9:00 AM" />
                <InputField label="Work End Time" value="5:30 PM" />
                <InputField label="Grace Period (minutes)" value="15" />
                <InputField label="Min Hours / Day" value="8" />
              </div>
              <ToggleRow label="Auto clock-out" desc="Automatically clock out employees after 12 hours" on={toggles.autoApprove} onChange={() => toggle('autoApprove')} />
              <ToggleRow label="Geofence tracking" desc="Restrict check-in to office locations" on={toggles.ipRestriction} onChange={() => toggle('ipRestriction')} />
              <SaveBar />
            </div>
          )}

          {activeTab === 'Leave' && (
            <div className="flex flex-col gap-5">
              <SectionTitle title="Leave Policy" desc="Define leave types and allocation rules" />
              {[
                { type: 'Annual Leave', days: 24, carry: 10 },
                { type: 'Sick Leave', days: 12, carry: 0 },
                { type: 'Casual Leave', days: 8, carry: 0 },
                { type: 'Compensatory Off', days: 4, carry: 2 },
              ].map(l => (
                <div key={l.type} className="flex items-center gap-4 rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{l.type}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{l.days} days/year · {l.carry} carry-forward</div>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors" style={{ backgroundColor: 'rgba(30,41,59,0.06)', color: 'var(--text-secondary)' }}>
                    <Icon name="SlidersHorizontal" size={13} /> Edit
                  </button>
                </div>
              ))}
              <SaveBar />
            </div>
          )}

          {activeTab === 'Payroll' && (
            <div className="flex flex-col gap-5">
              <SectionTitle title="Payroll Configuration" desc="Set up payment cycles and tax rules" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Pay Cycle" value="Monthly" />
                <InputField label="Pay Day" value="Last day of month" />
                <InputField label="Currency" value="USD ($)" />
                <InputField label="Tax Method" value="PAYE" />
              </div>
              <SaveBar />
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="flex flex-col gap-4">
              <SectionTitle title="Notification Preferences" desc="Choose what alerts you receive" />
              <ToggleRow label="Email notifications" desc="Receive alerts via email" on={toggles.emailNotif} onChange={() => toggle('emailNotif')} />
              <ToggleRow label="Push notifications" desc="Browser push alerts" on={toggles.pushNotif} onChange={() => toggle('pushNotif')} />
              <ToggleRow label="Weekly digest" desc="Summary of HR activity every Monday" on={toggles.weeklyDigest} onChange={() => toggle('weeklyDigest')} />
              <ToggleRow label="Leave request alerts" desc="Notify on new leave submissions" on={true} onChange={() => {}} />
            </div>
          )}

          {activeTab === 'Security' && (
            <div className="flex flex-col gap-4">
              <SectionTitle title="Security Settings" desc="Protect your HRMS account" />
              <ToggleRow label="Two-factor authentication" desc="Require verification code on login" on={toggles.twoFactor} onChange={() => toggle('twoFactor')} />
              <ToggleRow label="IP restriction" desc="Limit access to specified IP ranges" on={toggles.ipRestriction} onChange={() => toggle('ipRestriction')} />
              <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--danger-soft)', border: '1px solid rgba(200,74,74,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={16} style={{ color: 'var(--danger)' } as any} />
                  <span className="text-sm font-bold" style={{ color: 'var(--danger)' }}>Danger Zone</span>
                </div>
                <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>Reset all settings to defaults or delete account data. This cannot be undone.</p>
                <button className="rounded-lg px-4 py-2 text-xs font-semibold transition-all" style={{ backgroundColor: 'var(--danger)', color: '#fff' }}>Reset All Settings</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function tabIcon(tab: string) {
  return { Company: 'Building2', Attendance: 'Clock', Leave: 'CalendarDays', Payroll: 'Wallet', Notifications: 'Bell', Security: 'Shield' }[tab] ?? 'Settings';
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-base font-bold" style={{ color: 'var(--text)' }}>{title}</h2>
      <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{desc}</p>
    </div>
  );
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold mb-1.5" style={{ color: 'var(--muted)' }}>{label}</label>
      <input
        defaultValue={value}
        className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none transition-all"
        style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid var(--border-strong)', color: 'var(--text)' }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--primary-soft)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

function ToggleRow({ label, desc, on, onChange }: { label: string; desc: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.4)', border: '1px solid var(--border)' }}>
      <div>
        <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{label}</div>
        <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{desc}</div>
      </div>
      <button
        onClick={onChange}
        className="relative rounded-full transition-all"
        style={{ width: 40, height: 22, backgroundColor: on ? 'var(--success)' : 'rgba(30,41,59,0.15)' }}
      >
        <span
          className="absolute top-0.5 rounded-full bg-white transition-all"
          style={{ width: 18, height: 18, left: on ? 20 : 2, boxShadow: 'var(--shadow-sm)' }}
        />
      </button>
    </div>
  );
}

function SaveBar() {
  return (
    <div className="flex items-center justify-end gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
      <button className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5" style={{ color: 'var(--text-secondary)' }}>Cancel</button>
      <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: 'var(--text)', color: '#fff' }}>
        <Icon name="Check" size={16} /> Save Changes
      </button>
    </div>
  );
}
