'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Activity, ShieldCheck } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Ecosystem Platform Telemetry & Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              System Metrics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Global metrics tracking platform engagement, verified workforce readiness growth, and hiring yield.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Total Users
          </span>
          <div className="text-3xl font-black text-white font-mono mt-2">1,280</div>
          <p className="text-[11px] text-emerald-400 mt-1">+24% month over month</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Verified Proof Nodes
          </span>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-2">4,812</div>
          <p className="text-[11px] text-zinc-500 mt-1">Cryptographically attested</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Job Match Invocations
          </span>
          <div className="text-3xl font-black text-purple-400 font-mono mt-2">14,920</div>
          <p className="text-[11px] text-zinc-500 mt-1">Zero-bias fair evaluations</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            System Uptime
          </span>
          <div className="text-3xl font-black text-cyan-400 font-mono mt-2">99.99%</div>
          <p className="text-[11px] text-zinc-500 mt-1">Zero unplanned outages</p>
        </div>
      </div>
    </div>
  );
}
