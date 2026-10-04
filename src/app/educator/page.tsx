'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function EducatorPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [cohortData, setCohortData] = useState<any>(null);

  useEffect(() => {
    loadCohort();
  }, []);

  const loadCohort = async () => {
    try {
      const data = await api.getCohortOverview();
      setCohortData(data);
    } catch (err) {
      console.error('Failed to load cohort data:', err);
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
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Institutional Cohort Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Educator Console</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Monitor student progression, curriculum mastery, and automated AI early intervention alerts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0e1424] border border-[#161f33] text-xs text-zinc-300">
              Active Learners: <strong className="text-white">{cohortData?.totalLearners || 10}</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-bold">
              Avg Readiness: {cohortData?.averageReadiness || 78}%
            </div>
          </div>
        </div>

        {cohortData && (
          <div className="space-y-8">
            {/* Early Intervention Alerts */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Automated Early Intervention Alerts ({cohortData.activeInterventionsCount})
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400">
                  AI predicts students requiring targeted Socratic support
                </span>
              </div>

              <div className="space-y-3">
                {cohortData.alerts?.map((alert: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0e1424] border border-[#1b2438] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{alert.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {alert.alertType}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Readiness: <strong>{alert.readinessScore}%</strong> • Weekly Engagement:{' '}
                        <strong>{alert.weeklyHours} hrs</strong>
                      </div>
                      <div className="text-xs text-emerald-300 mt-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Recommended Intervention: {alert.recommendedIntervention}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Intervention dispatched for student ${alert.name}`)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#162035] hover:bg-emerald-500 hover:text-black text-white transition self-start sm:self-center"
                    >
                      Trigger Socratic Lab
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules Telemetry */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Curriculum Module Mastery Rates
              </h3>
              <div className="space-y-3">
                {cohortData.curriculumModules?.map((mod: any) => (
                  <div key={mod.id} className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white">{mod.title}</span>
                      <span className="font-mono font-bold text-emerald-400">{mod.completionRate}% Cohort Pass</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#141b2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                        style={{ width: `${mod.completionRate}%` }}
                      />
                    </div>
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
