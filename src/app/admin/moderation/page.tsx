'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

export default function AdminModerationPage() {
  const [reports, setReports] = useState([
    { id: 'rep-1', item: 'Community post containing unauthorized promotional link', reportedBy: 'System Auto-Filter', date: '3 hours ago', status: 'PENDING' },
    { id: 'rep-2', item: 'Suspected duplicate assessment attempt with proxy IP', reportedBy: 'Neural Proctor Heuristics', date: 'Yesterday', status: 'RESOLVED' },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Trust, Safety & Community Moderation
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono">
              Moderation Desk
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review reported discussions, suspicious proctor attempts, and automated integrity warnings.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{r.item}</span>
              <div className="text-zinc-400 font-mono mt-0.5">
                Reported by: {r.reportedBy} • {r.date}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                  r.status === 'RESOLVED'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                }`}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
