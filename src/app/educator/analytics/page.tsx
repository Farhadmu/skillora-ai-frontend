'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function EducatorAnalyticsPage() {
  const cohortMetrics = [
    { cohort: 'Fall 2026 AI Systems', activeLearners: 42, avgReadiness: 84, completionRate: '78%', status: 'Healthy' },
    { cohort: 'Full-Stack Distributed Core', activeLearners: 36, avgReadiness: 76, completionRate: '64%', status: 'Monitoring' },
    { cohort: 'Cloud Native & Docker Lab', activeLearners: 28, avgReadiness: 89, completionRate: '88%', status: 'Exceeding' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Cohort Telemetry & Outcome Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Learning Analytics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Aggregated institutional benchmarks, skill gap distributions, and predictive intervention telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Total Active Students
          </span>
          <div className="text-3xl font-black text-white font-mono mt-2">106</div>
          <p className="text-[11px] text-emerald-400 mt-1">+14 enrolled this month</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Average Employability Score
          </span>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-2">83.0 / 100</div>
          <p className="text-[11px] text-zinc-500 mt-1">Top tier across regional institutions</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Intervention Success Rate
          </span>
          <div className="text-3xl font-black text-cyan-400 font-mono mt-2">91.4%</div>
          <p className="text-[11px] text-cyan-400 mt-1">Struggling learners returned to on-track</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Cohort Performance Matrix</span>
        </h3>

        <div className="space-y-3">
          {cohortMetrics.map((cm) => (
            <div
              key={cm.cohort}
              className="p-4 rounded-xl bg-[#0c1220] border border-[#162136] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-white text-sm">{cm.cohort}</span>
                <div className="text-zinc-400 font-mono mt-0.5">
                  {cm.activeLearners} Enrolled Students • Status: {cm.status}
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono">
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{cm.avgReadiness}/100</div>
                  <div className="text-[10px] text-zinc-500">Readiness</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-cyan-400">{cm.completionRate}</div>
                  <div className="text-[10px] text-zinc-500">Completion</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
