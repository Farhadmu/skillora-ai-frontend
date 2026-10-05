'use client';

import React from 'react';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  ArrowRight,
  GitBranch,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  GitPullRequest,
  TrendingUp,
} from 'lucide-react';

export default function BuildHubPage() {
  const coreFeatures = [
    {
      title: 'Active & Recommended Projects',
      description: 'Production-grade engineering projects engineered to satisfy target employer competency matrices.',
      href: '/learner/build/projects',
      badge: 'Portfolio Ready',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      icon: Code2,
    },
    {
      title: 'Sandboxed Coding Lab',
      description: 'Run TypeScript, Node.js, and algorithmic benchmarks directly in an interactive cloud container.',
      href: '/learner/build/coding',
      badge: 'Interactive REPL',
      badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
      icon: Terminal,
    },
    {
      title: 'AI Code Review & Security Audit',
      description: 'Static analysis, algorithmic complexity scoring (Big O), bug detection, and refactoring tips.',
      href: '/learner/build/code-review',
      badge: 'Neural Proctor',
      badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      icon: GitPullRequest,
    },
    {
      title: 'GitHub Workspace Sync',
      description: 'Sync live commits and pull requests from public repositories to automatically generate skill evidence.',
      href: '/learner/build/github',
      badge: 'CI / CD Sync',
      badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      icon: FolderGit2,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Engineering Build Hub
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Proof by Construction
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Build production software to prove verified skills, populate your public portfolio, and power the 7-D readiness score.
          </p>
        </div>

        <Link
          href="/learner/build/coding"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Open Coding Lab</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Critical Core Loop Diagram */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-emerald-500/25">
        <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Verification Loop</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black text-white">
          <span className="px-3 py-1 rounded-xl bg-[#090d16] border border-emerald-500/30">PROJECT</span>
          <span className="text-emerald-400">→</span>
          <span className="px-3 py-1 rounded-xl bg-[#090d16] border border-cyan-500/30">SKILL EVIDENCE</span>
          <span className="text-cyan-400">→</span>
          <span className="px-3 py-1 rounded-xl bg-[#090d16] border border-purple-500/30">SKILL GRAPH</span>
          <span className="text-purple-400">→</span>
          <span className="px-3 py-1 rounded-xl bg-[#090d16] border border-amber-500/30 text-amber-400">READINESS SCORE</span>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coreFeatures.map((feat) => {
          const Icon = feat.icon;
          return (
            <Link
              key={feat.title}
              href={feat.href}
              className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/40 transition flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#111828] border border-[#1e2a40] text-emerald-400 flex items-center justify-center group-hover:scale-105 transition">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider border ${feat.badgeColor}`}>
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-400 transition">
                  {feat.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#151e30] flex items-center justify-between text-xs text-emerald-400 font-bold">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
