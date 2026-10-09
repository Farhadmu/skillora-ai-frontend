'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';

export default function LearnerSkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<any>(null);
  const [gapAnalysis, setGapAnalysis] = useState<any>(null);
  const [targetRole, setTargetRole] = useState('Full-Stack AI Systems Engineer');

  useEffect(() => {
    loadSkills();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadGaps();
  }, [targetRole]);

  const loadSkills = async () => {
    try {
      const user = getCurrentUser();
      const [list, graph] = await Promise.all([
        api.getAllSkills(selectedCategory, searchQuery),
        api.getSkillGraph(user?.id),
      ]);
      setSkills(list);
      setGraphData(graph);
      if (list.length > 0 && !selectedSkill) {
        setSelectedSkill(list[0]);
      }
    } catch (err) {
      console.error('Failed to load skills:', err);
    }
  };

  const loadGaps = async () => {
    try {
      const gaps = await api.getSkillGaps(targetRole);
      setGapAnalysis(gaps);
    } catch (err) {
      console.error('Failed to load skill gaps:', err);
    }
  };

  const categories = ['All', 'Programming', 'Frontend', 'Backend', 'AI/ML', 'Database', 'DevOps', 'Architecture', 'Security', 'Professional'];

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Standardized Graph Ontology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Skill Graph & Gap Engine</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Explore 100+ standardized skills, prerequisite topologies, and real-time gap analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#0e1424] border border-[#161f33] text-xs text-zinc-300">
            Total Standardized: <strong className="text-white">{skills.length}</strong>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-bold">
            Verified: {graphData?.summary?.masteredCount || 5} Nodes
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ROLE GAP ANALYZER WIDGET */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] to-[#080f1c] border border-emerald-500/30 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Mathematical Gap Index
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">Target Role Gap Analysis</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Target Role:</span>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Full-Stack AI Systems Engineer">Full-Stack AI Systems Engineer</option>
              <option value="Backend Node.js & Cloud Architect">Backend Node.js & Cloud Architect</option>
              <option value="Frontend & UI/UX Specialist">Frontend & UI/UX Specialist</option>
              <option value="AI/ML Systems Researcher">AI/ML Systems Researcher</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Readiness Index */}
          <div className="p-4 rounded-xl bg-[#080d16] border border-[#141b2a] flex flex-col justify-between">
            <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Readiness Fit</div>
            <div className="text-3xl font-extrabold text-white mt-1">
              {gapAnalysis?.readinessIndex || 82}%
            </div>
            <div className="text-[11px] text-emerald-400 mt-2">
              Recommended Next: <strong>{gapAnalysis?.recommendedNextSkill || 'System Design'}</strong>
            </div>
          </div>

          {/* Matched Skills */}
          <div className="p-4 rounded-xl bg-[#080d16] border border-emerald-500/20 md:col-span-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Matched & Verified Skills ({gapAnalysis?.matched?.length || 0})
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {gapAnalysis?.matched?.map((m: any, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-semibold"
                >
                  ✓ {m.name} ({m.proficiency}%)
                </span>
              ))}
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2">
              Missing Prerequisites to Acquire ({gapAnalysis?.missing?.length || 0})
            </div>
            <div className="flex flex-wrap gap-2">
              {gapAnalysis?.missing?.map((m: string, i: number) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-semibold"
                >
                  + {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SKILLS BROWSER & PREREQUISITES TOPOLOGY */}
      {/* ======================================================== */}
      <div className="space-y-4">
        {/* Categories & Search Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === c
                    ? 'bg-emerald-500 text-black shadow'
                    : 'bg-[#0f1422] border border-[#1a2236] text-zinc-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, topics..."
              className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Skills Catalog List */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
            {skills.map((s) => {
              const isSelected = selectedSkill?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSkill(s)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition group ${
                    isSelected
                      ? 'bg-[#121c2e] border-emerald-500 shadow-md'
                      : 'bg-[#0b0f19] border-[#1a2236] hover:bg-[#0f1524]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                        {s.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          s.marketTrend === 'Exploding'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {s.marketTrend}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {s.category} • {s.subcategory}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#141b2a] flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Demand: <strong className="text-zinc-300">{s.industryDemandScore}/100</strong></span>
                    <span className="text-emerald-400 font-semibold">Inspect Topology →</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Skill Detail Inspector */}
          {selectedSkill && (
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Skill Ontology Node
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{selectedSkill.id}</span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedSkill.name}</h3>
                  <div className="text-xs text-zinc-400 mt-1">
                    {selectedSkill.category} &gt; {selectedSkill.subcategory}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="text-[10px] text-zinc-500">Difficulty</div>
                    <div className="font-bold text-white mt-0.5">{selectedSkill.difficulty}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33]">
                    <div className="text-[10px] text-zinc-500">Industry Demand</div>
                    <div className="font-bold text-emerald-400 mt-0.5">
                      {selectedSkill.industryDemandScore} / 100
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Required Prerequisites
                  </div>
                  <div className="space-y-1.5">
                    {selectedSkill.prerequisites?.length > 0 ? (
                      selectedSkill.prerequisites.map((p: string, i: number) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-[#0e1424] border border-[#161f33] text-xs text-zinc-300 flex items-center justify-between"
                        >
                          <span>{p}</span>
                          <span className="text-[10px] text-emerald-400">Foundation</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-zinc-500 italic">No prior prerequisites required.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#141b2a]">
                <Link
                  href="/learner/learning/ai-teacher"
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center justify-center gap-1.5 shadow-md"
                >
                  <span>Practice with AI Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/learner/learning/roadmap"
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#162035] hover:bg-[#1e2c49] text-white transition flex items-center justify-center gap-1.5"
                >
                  <span>Add to Reskilling Roadmap</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
