'use client';

import React from 'react';
import { CreditCard, DollarSign, Download, CheckCircle2, Clock } from 'lucide-react';

export default function AdminBillingPage() {
  const subscriptions = [
    { customer: 'TechScale AI Enterprises', plan: 'Enterprise ATS Unlimited', status: 'ACTIVE', mrr: '$2,400/mo', renewal: 'Nov 1, 2026' },
    { customer: 'Skillora Institute of AI', plan: 'Faculty Multi-Cohort Pro', status: 'ACTIVE', mrr: '$1,800/mo', renewal: 'Dec 15, 2026' },
    { customer: 'NeuralFlow Data Systems', plan: 'Enterprise ATS Standard', status: 'ACTIVE', mrr: '$1,200/mo', renewal: 'Oct 28, 2026' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Enterprise Billing & Subscriptions
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Revenue Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage institutional licenses, corporate ATS subscriptions, and usage-based AI token quotas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Current Monthly Recurring Revenue
          </span>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-2">$54,200</div>
          <p className="text-[11px] text-zinc-500 mt-1">+12% from last cycle</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Active Enterprise Contracts
          </span>
          <div className="text-3xl font-black text-white font-mono mt-2">24</div>
          <p className="text-[11px] text-zinc-500 mt-1">100% collection rate</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236]">
          <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            AI Token Utilization Margin
          </span>
          <div className="text-3xl font-black text-cyan-400 font-mono mt-2">82.4%</div>
          <p className="text-[11px] text-zinc-500 mt-1">Optimized by free-tier cascade</p>
        </div>
      </div>

      <div className="space-y-3">
        {subscriptions.map((s) => (
          <div
            key={s.customer}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <span className="font-bold text-white text-sm">{s.customer}</span>
              <div className="text-zinc-400 font-mono mt-0.5">
                Plan: {s.plan} • Renews: {s.renewal}
              </div>
            </div>

            <div className="flex items-center gap-4 font-mono">
              <span className="text-emerald-400 font-bold text-sm">{s.mrr}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold">
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
