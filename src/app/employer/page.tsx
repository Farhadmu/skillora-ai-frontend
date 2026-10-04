'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function EmployerPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [candidates, setCandidates] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any>(null);

  useEffect(() => {
    loadEmployerData();
  }, []);

  const loadEmployerData = async () => {
    try {
      const [candList, funnel] = await Promise.all([
        api.getEmployerCandidates().catch(() => []),
        api.getEmployerFunnel().catch(() => null),
      ]);
      setCandidates(candList);
      setFunnelData(funnel);
    } catch (err) {
      console.error('Failed to load employer data:', err);
    }
  };

  const handleStageChange = async (appId: string, stage: string) => {
    try {
      await api.updateApplicationStage(appId, stage);
      loadEmployerData();
    } catch (err) {
      console.error('Failed to update candidate stage:', err);
    }
  };

  const stages = ['applied', 'reviewing', 'interviewing', 'offered', 'rejected'] as const;

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
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span>Verified ATS Pipeline & Talent Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Employer Hiring Pipeline</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Review verified candidates backed by cryptographic skill proof and simulated interview scorecards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0e1424] border border-[#161f33] text-xs text-zinc-300">
              Active Candidates: <strong className="text-white">{candidates.length}</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 font-bold">
              Avg Time-to-Hire: {funnelData?.averageTimeToHireDays || 14} Days
            </div>
          </div>
        </div>

        {/* Funnel Metrics Bar */}
        {funnelData && (
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <span>Hiring Conversion Funnel</span>
              <span className="text-emerald-400 font-mono font-bold">Retention: {funnelData.retentionProbability}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {funnelData.funnel?.map((step: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] text-center">
                  <div className="text-xl font-extrabold text-white font-mono">{step.count}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{step.stage}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Pipeline Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Active Candidates in Funnel ({candidates.length})
          </h3>

          <div className="space-y-4">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] hover:border-zinc-700 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{cand.candidateName}</h4>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {cand.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Applied for: <strong className="text-zinc-200">{cand.jobTitle}</strong> • {cand.companyName}
                    </div>
                    {cand.notes && (
                      <div className="text-xs text-zinc-400 mt-2 p-2.5 rounded-xl bg-[#0e1424] border border-[#161f33]">
                        {cand.notes}
                      </div>
                    )}
                  </div>

                  {/* Stage Switcher Controls */}
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Current Stage: <strong className="text-purple-400 uppercase">{cand.status}</strong>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {stages.map((stg) => (
                        <button
                          key={stg}
                          onClick={() => handleStageChange(cand.id, stg)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                            cand.status === stg
                              ? 'bg-purple-500 text-white'
                              : 'bg-[#111726] border border-[#1e293b] text-zinc-400 hover:text-white'
                          }`}
                        >
                          {stg}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#141b2a] flex items-center justify-between text-xs text-zinc-500">
                  <span>Applied on {cand.appliedAt}</span>
                  <Link
                    href={`/portfolio/${cand.userId}`}
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Inspect Public Portfolio Proof</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
