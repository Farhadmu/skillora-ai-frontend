'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, TrendingUp, Compass, Award } from 'lucide-react';

export default function CareerRecommendationsPage() {
  const recommendations = [
    {
      title: 'Double Down on NestJS Dependency Injection Architecture',
      priority: 'CRITICAL',
      effort: '2 Days',
      readinessGain: '+5%',
      rationale:
        'Employers in enterprise fintech and AI infra prioritize clean architecture patterns. You already have 88% NestJS knowledge; verifying an end-to-end repository with custom interceptors will solidify your senior ranking.',
      actionUrl: '/learner/assessments',
      actionLabel: 'Take Proctored NestJS Exam',
    },
    {
      title: 'Build a Sandboxed Redis Queue for Async RAG Ingestion',
      priority: 'HIGH',
      effort: '4 Days',
      readinessGain: '+8%',
      rationale:
        'Resolves the largest gap on your target JD match. Real-time document parsing and queue-backed worker processing serves as primary portfolio proof.',
      actionUrl: '/learner/build/coding',
      actionLabel: 'Launch Coding Lab Drill',
    },
    {
      title: 'Complete Socratic Mock Interview on Distributed Fault Tolerance',
      priority: 'RECOMMENDED',
      effort: '30 Mins',
      readinessGain: '+4%',
      rationale:
        'Your technical coding score is strong (92/100), but communicative architecture articulation is currently untested by the AI proctor.',
      actionUrl: '/learner/interview',
      actionLabel: 'Start AI Interview',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Career Advisor & Strategic Recommendations
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Action Matrix
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Synthesized next-best steps calculated by the Skillora Neural Engine to maximize verified employability.
          </p>
        </div>

        <Link
          href="/learner/learning/roadmap"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Sync with Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.title}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">{rec.title}</h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-2">
                    <span>Est. Time: {rec.effort}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{rec.readinessGain} Readiness</span>
                  </div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold self-start sm:self-auto">
                {rec.priority}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c1220] border border-[#172338] text-xs text-zinc-300 leading-relaxed">
              <span className="font-bold text-emerald-400">Why this action: </span>
              {rec.rationale}
            </div>

            <div className="flex justify-end pt-1">
              <Link
                href={rec.actionUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111728] hover:bg-[#1a233c] border border-[#1e2d44] hover:border-emerald-500/40 text-white font-bold text-xs transition"
              >
                <span>{rec.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
