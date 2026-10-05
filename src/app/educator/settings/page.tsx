'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, User } from 'lucide-react';

export default function EducatorSettingsPage() {
  const [institution, setInstitution] = useState('Skillora Institute of AI & Software Engineering');
  const [department, setDepartment] = useState('Department of Computer Science & Distributed Systems');
  const [passingThreshold, setPassingThreshold] = useState('75');
  const [aiAssistanceLevel, setAiAssistanceLevel] = useState('Enabled with Faculty Confirmation');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {saved && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Institutional configuration successfully updated.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Faculty & Institutional Settings
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage academic policies, grading passing thresholds, and AI teaching assistant autonomy.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-2xl space-y-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Institution Name
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Academic Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Minimum Assessment Passing Threshold (%)
            </label>
            <input
              type="number"
              value={passingThreshold}
              onChange={(e) => setPassingThreshold(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              AI Intervention Autonomy Mode
            </label>
            <select
              value={aiAssistanceLevel}
              onChange={(e) => setAiAssistanceLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Enabled with Faculty Confirmation">Manual Confirmation Required Before Dispatch</option>
              <option value="Autonomous for Struggling Students">Autonomous Dispatch for Students below 65%</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </form>
      </div>
    </div>
  );
}
