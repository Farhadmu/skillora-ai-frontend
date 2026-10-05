'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldAlert, Lock, Server } from 'lucide-react';

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('Skillora AI Workforce Intelligence OS');
  const [environment, setEnvironment] = useState('production-v2');
  const [rateLimitRps, setRateLimitRps] = useState('100');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
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
          <span>System configuration and security policies saved.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Global System Configuration & Policies
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Infrastructure
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Core environment variables, rate limiting parameters, CORS origins, and maintenance state.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-2xl space-y-5">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Platform Instance Name
            </label>
            <input
              type="text"
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Runtime Environment
              </label>
              <input
                type="text"
                disabled
                value={environment}
                className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-zinc-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Rate Limit Threshold (RPS / IP)
              </label>
              <input
                type="number"
                value={rateLimitRps}
                onChange={(e) => setRateLimitRps(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#05070d] border border-[#162136]">
            <div>
              <span className="text-xs font-bold text-white block">
                Platform Maintenance Mode
              </span>
              <span className="text-[11px] text-zinc-400">
                Temporarily pause public registrations and non-admin write operations during database migrations.
              </span>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Commit Configuration Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
}
