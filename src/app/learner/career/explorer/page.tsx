'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function CareerExplorerPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [roleA, setRoleA] = useState('Full-Stack AI Systems Engineer');
  const [roleB, setRoleB] = useState('Backend Node.js & Cloud Architect');
  const [comparison, setComparison] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [roleA, roleB]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [rList, comp] = await Promise.all([
        api.getCareerRoles(),
        api.compareRoles(roleA, roleB),
      ]);
      setRoles(rList);
      setComparison(comp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Career Explorer & Comparator
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Market Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Explore emerging industry positions, compare compensation ranges, and benchmark competency overlap.
          </p>
        </div>

        <Link
          href="/learner/career/skill-gap"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
        >
          <span>Run Skill Gap Audit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Role Comparison Selectors */}
      <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Primary Career Role
          </label>
          <select
            value={roleA}
            onChange={(e) => setRoleA(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#0e1422] border border-[#1e293b] text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {roles.map((r) => (
              <option key={r.id || r.title} value={r.title}>
                {r.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            Comparison Target Role
          </label>
          <select
            value={roleB}
            onChange={(e) => setRoleB(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-[#0e1422] border border-[#1e293b] text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            {roles.map((r) => (
              <option key={r.id || r.title} value={r.title}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix */}
      {comparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A */}
          <div className="p-6 rounded-2xl bg-[#090d16] border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Role A</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {comparison.roleA?.growthOutlook || '+28% YoY Growth'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white">{comparison.roleA?.title || roleA}</h3>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-mono">
              <DollarSign className="w-4 h-4" />
              <span>{comparison.roleA?.averageSalary || '$145,000 / yr'}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {comparison.roleA?.description ||
                'Architects full-stack workflows with generative models, vector search indexing, and resilient services.'}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#151e30]">
              <span className="text-xs font-bold text-zinc-400 uppercase">Key Required Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {(comparison.roleA?.coreSkills || comparison.roleA?.requiredSkills || []).map((s: string) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-[#101726] border border-[#1e293b] text-[11px] text-zinc-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card B */}
          <div className="p-6 rounded-2xl bg-[#090d16] border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">Role B</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {comparison.roleB?.growthOutlook || comparison.roleB?.marketGrowthRate || 'In Demand'}
              </span>
            </div>
            <h3 className="text-lg font-black text-white">{comparison.roleB?.title || roleB}</h3>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 font-mono">
              <DollarSign className="w-4 h-4" />
              <span>{comparison.roleB?.averageSalary || comparison.roleB?.salaryRange || 'Competitive'}</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {comparison.roleB?.description || ''}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#151e30]">
              <span className="text-xs font-bold text-zinc-400 uppercase">Key Required Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {(comparison.roleB?.coreSkills || comparison.roleB?.requiredSkills || []).map((s: string) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-[#101726] border border-[#1e293b] text-[11px] text-zinc-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transition Strategy Insights */}
      {comparison?.transitionInsights && (
        <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">AI Transition Strategy: Overlap & Delta</h3>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {comparison.transitionInsights}
          </p>
        </div>
      )}
    </div>
  );
}
