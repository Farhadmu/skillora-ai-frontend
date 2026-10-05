'use client';

import React, { useState } from 'react';
import { Building2, Globe, MapPin, Users, Save, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function EmployerCompanyPage() {
  const [name, setName] = useState('TechScale AI Enterprises');
  const [industry, setIndustry] = useState('Artificial Intelligence & Cloud Computing');
  const [size, setSize] = useState('250 - 500 Employees');
  const [website, setWebsite] = useState('https://techscale.ai');
  const [location, setLocation] = useState('San Francisco, CA / London / Remote');
  const [description, setDescription] = useState(
    'TechScale AI builds enterprise workforce intelligence and autonomous agent orchestration pipelines for Fortune 500 organizations.',
  );
  const [culture, setCulture] = useState(
    'Engineering-first, asynchronous documentation culture, high emphasis on verified competencies and rigorous clean architecture.',
  );
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
          <span>Company profile and recruitment preferences saved successfully.</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Company Dossier & Branding
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Employer Profile
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Candidate-facing company identity, verified tech stack specifications, and cultural values.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-3xl space-y-4">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Primary Industry
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Company Size
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                Website URL
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Operating Locations
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              About the Company
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Engineering Culture & Hiring Ethos
            </label>
            <textarea
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Company Dossier</span>
          </button>
        </form>
      </div>
    </div>
  );
}
