'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, EyeOff, ShieldCheck, Users } from 'lucide-react';

export default function EmployerSettingsPage() {
  const [blindHiringDefault, setBlindHiringDefault] = useState(true);
  const [minMatchThreshold, setMinMatchThreshold] = useState('80');
  const [autoRejectBelowThreshold, setAutoRejectBelowThreshold] = useState(false);
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
          <span>Talent acquisition policies and ATS configuration saved.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              ATS & Recruitment Settings
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              ATS Configuration
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure bias-free blind hiring defaults, minimum candidate match thresholds, and team permissions.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-2xl space-y-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#05070d] border border-[#162136]">
            <div>
              <span className="text-xs font-bold text-white block">
                Zero-Bias Blind Hiring by Default
              </span>
              <span className="text-[11px] text-zinc-400">
                Obfuscate candidate names, gender, photos, and universities until technical interview offer.
              </span>
            </div>
            <input
              type="checkbox"
              checked={blindHiringDefault}
              onChange={(e) => setBlindHiringDefault(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Minimum AI Competency Match Score for Sourcing (%)
            </label>
            <input
              type="number"
              value={minMatchThreshold}
              onChange={(e) => setMinMatchThreshold(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save ATS Configuration</span>
          </button>
        </form>
      </div>
    </div>
  );
}
