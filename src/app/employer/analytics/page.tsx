'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, ShieldCheck } from 'lucide-react';

export default function EmployerAnalyticsPage() {
  const metrics = [
    { label: 'Time-to-Hire (Avg)', value: '14 Days', change: '-40% vs industry avg', color: 'text-emerald-400' },
    { label: 'Verified Pipeline Conversion', value: '48.2%', change: '+18% vs unverified resumes', color: 'text-purple-400' },
    { label: 'Technical Screening Pass Rate', value: '88.5%', change: 'Zero drop-off on verified skills', color: 'text-cyan-400' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Talent Acquisition Telemetry & Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              ATS Analytics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Recruiting funnel velocity, verified skill yield, and diversity metrics through blind hiring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              {m.label}
            </span>
            <div className={`text-3xl font-black font-mono mt-2 ${m.color}`}>{m.value}</div>
            <p className="text-[11px] text-zinc-500 mt-1">{m.change}</p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span>Competency Distribution Across Applicant Pool</span>
        </h3>

        <div className="space-y-3">
          {[
            { skill: 'TypeScript', count: 48, percentage: 92 },
            { skill: 'NestJS Clean Architecture', count: 38, percentage: 76 },
            { skill: 'Vector Search & RAG', count: 31, percentage: 62 },
            { skill: 'Docker Containerization', count: 42, percentage: 84 },
          ].map((item) => (
            <div key={item.skill} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 font-semibold">{item.skill}</span>
                <span className="text-purple-400 font-bold">{item.count} Candidates ({item.percentage}%)</span>
              </div>
              <div className="h-2 rounded-full bg-[#121929] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
