'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  FileText,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Layers,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

export default function CareerPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [roleA, setRoleA] = useState('Full-Stack AI Systems Engineer');
  const [roleB, setRoleB] = useState('Backend Node.js & Cloud Architect');
  const [comparison, setComparison] = useState<any>(null);

  // JD Analyzer state
  const [jdText, setJdText] = useState(
    `We are looking for a Senior Full-Stack AI Engineer. Requirements: TypeScript, Next.js, NestJS, MongoDB, Vector RAG Search, Docker, and experience with Gemini or OpenAI models. Preferred: Kubernetes, Microservices, and Redis.`,
  );
  const [jdResult, setJdResult] = useState<any>(null);
  const [analyzingJd, setAnalyzingJd] = useState(false);

  useEffect(() => {
    loadRolesAndComparison();
  }, [roleA, roleB]);

  const loadRolesAndComparison = async () => {
    try {
      const [rList, comp] = await Promise.all([
        api.getCareerRoles(),
        api.compareRoles(roleA, roleB),
      ]);
      setRoles(rList);
      setComparison(comp);
    } catch (err) {
      console.error('Failed to load career data:', err);
    }
  };

  const handleAnalyzeJd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdText.trim()) return;
    setAnalyzingJd(true);

    try {
      const res = await api.analyzeJobDescription(jdText);
      setJdResult(res);
    } catch (err) {
      console.error('JD analysis error:', err);
    } finally {
      setAnalyzingJd(false);
    }
  };

  return (
    <DashboardLayout role="LEARNER">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <Compass className="w-4 h-4" />
              <span>Career Navigation & Market Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Career Navigator</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Compare commercial career trajectories, analyze transferable skills, and evaluate real job descriptions.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SIDE-BY-SIDE ROLE COMPARISON ENGINE */}
        {/* ======================================================== */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Career Trajectory Match
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">Role Comparison Matrix</h3>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={roleA}
                onChange={(e) => setRoleA(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.title}>
                    Role A: {r.title}
                  </option>
                ))}
              </select>

              <span className="text-xs font-bold text-zinc-500">VS</span>

              <select
                value={roleB}
                onChange={(e) => setRoleB(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.title}>
                    Role B: {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {comparison && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role A Card */}
              <div className="p-5 rounded-2xl bg-[#0e1424] border border-[#1a2338] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{comparison.roleA.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-xs">
                    {comparison.roleA.userMatchPercentage}% Match
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                    <div className="text-[10px] text-zinc-500">Compensation</div>
                    <div className="font-bold text-white mt-0.5">{comparison.roleA.salaryRange}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                    <div className="text-[10px] text-zinc-500">Growth Velocity</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{comparison.roleA.marketGrowthRate}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-zinc-400 mb-2">Core Required Competencies</div>
                  <div className="flex flex-wrap gap-1.5">
                    {comparison.roleA.coreSkills?.map((s: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#111726] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role B Card */}
              <div className="p-5 rounded-2xl bg-[#0e1424] border border-[#1a2338] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">{comparison.roleB.title}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 font-bold text-xs">
                    {comparison.roleB.userMatchPercentage}% Match
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                    <div className="text-[10px] text-zinc-500">Compensation</div>
                    <div className="font-bold text-white mt-0.5">{comparison.roleB.salaryRange}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#090d16] border border-[#141b2a]">
                    <div className="text-[10px] text-zinc-500">Growth Velocity</div>
                    <div className="font-bold text-cyan-400 mt-0.5">{comparison.roleB.marketGrowthRate}</div>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-zinc-400 mb-2">Core Required Competencies</div>
                  <div className="flex flex-wrap gap-1.5">
                    {comparison.roleB.coreSkills?.map((s: string, i: number) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#111726] text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {comparison?.recommendation && (
            <div className="p-3.5 rounded-xl bg-[#0a121f] border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{comparison.recommendation}</span>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* JOB DESCRIPTION (JD) INTELLIGENCE ANALYZER */}
        {/* ======================================================== */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Job Description Intelligence
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Paste Any Real Job Post to Instantaneously Extract Skills & Compute Match
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Skillora AI parses requirements, identifies your strong matches, detects missing competencies, and builds a targeted action plan.
            </p>
          </div>

          <form onSubmit={handleAnalyzeJd} className="space-y-4">
            <textarea
              rows={4}
              required
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description text from LinkedIn, Indeed, or company careers page..."
              className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
            />

            <button
              type="submit"
              disabled={analyzingJd || !jdText.trim()}
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 disabled:opacity-50"
            >
              {analyzingJd ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Job Requirements</span>
                </>
              )}
            </button>
          </form>

          {/* JD Analysis Results */}
          {jdResult && (
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-[#1b253b] space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#161f33] pb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Detected Target Role
                  </div>
                  <h4 className="text-base font-bold text-white mt-0.5">{jdResult.role}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Match Potential:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {jdResult.matchScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strong Matches */}
                <div className="p-4 rounded-xl bg-[#090d16] border border-emerald-500/20">
                  <div className="text-[11px] font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Strong Verified Matches ({jdResult.strongMatches?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {jdResult.strongMatches?.map((s: string, i: number) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-4 rounded-xl bg-[#090d16] border border-red-500/20">
                  <div className="text-[11px] font-bold text-red-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Missing Required Skills ({jdResult.missingSkills?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {jdResult.missingSkills?.map((s: string, i: number) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-red-500/10 text-red-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Plan */}
              {jdResult.actionPlan && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white">Recommended Action Plan to Reach 100% Fit:</div>
                  <div className="space-y-1.5">
                    {jdResult.actionPlan.map((act: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-[#090d16] border border-[#141b2a] text-xs text-zinc-300 flex items-center gap-2"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
