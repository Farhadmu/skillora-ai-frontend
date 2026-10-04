'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Cpu,
  Activity,
  Users,
  Briefcase,
  Layers,
  Database,
  Lock,
  Clock,
  Sparkles,
  Server,
  DollarSign,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function AdminPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getAdminStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Platform Operations & AI Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Command Center</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Monitor neural model inference telemetry, token consumption, cluster health, and audit trails.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM STATUS: HEALTHY
            </span>
          </div>
        </div>

        {stats && (
          <div className="space-y-8">
            {/* Overview Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Total Accounts</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalUsers || 19}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  {stats.overview?.learnersCount} Learners • {stats.overview?.employersCount} Employers
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Job Listings</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalJobs || 32}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">Across 10 verified companies</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Skill Nodes</div>
                <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                  {stats.overview?.totalSkillsStandardized || 100}+
                </div>
                <div className="text-[11px] text-cyan-400 mt-1">Standardized Ontology</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Verified Badges</div>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  {stats.overview?.verifiedSkillsAwarded || 142}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">Through automated tests & code</div>
              </div>
            </div>

            {/* AI Governance & Token Metering */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] to-[#080f1c] border border-emerald-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Foundation Model Governance
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">AI Inference & Cost Metering</h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Est. Cost: {stats.aiGovernance?.costEstimateUsd || '$18.42'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Inference Requests</div>
                  <div className="text-xl font-bold text-white mt-1 font-mono">
                    {stats.aiGovernance?.totalInferenceRequests?.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Tokens Processed</div>
                  <div className="text-xl font-bold text-white mt-1 font-mono">
                    {(stats.aiGovernance?.estimatedTokensUsed / 1000000).toFixed(1)}M
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Average Latency</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                    {stats.aiGovernance?.averageLatencyMs} ms
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a]">
                  <div className="text-zinc-500 text-[10px] uppercase">Fallback Engine Ratio</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1 font-mono">
                    {stats.aiGovernance?.fallbackEngineHitRatio}
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                System Audit Trail & Security Telemetry
              </h3>
              <div className="space-y-2 text-xs">
                {stats.auditLogs?.map((log: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-zinc-500">
                        {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Just now'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#141d2f] text-emerald-400 border border-emerald-500/20">
                        {log.action}
                      </span>
                      <span className="text-zinc-200">{log.detail}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">Actor: {log.actor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
