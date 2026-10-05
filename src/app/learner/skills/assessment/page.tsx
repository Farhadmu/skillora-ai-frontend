'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Clock, ArrowRight, ShieldCheck, CheckCircle2, Play, AlertCircle } from 'lucide-react';

export default function SkillAssessmentPage() {
  const [selectedTopic, setSelectedTopic] = useState('NestJS Enterprise Architecture');

  const assessments = [
    {
      id: 'as-1',
      title: 'NestJS Dependency Injection & Dynamic Modules',
      level: 'Advanced',
      questions: 15,
      duration: '25 mins',
      format: 'Adaptive MCQ + Coding',
      status: 'VERIFIED',
      score: '94%',
    },
    {
      id: 'as-2',
      title: 'Vector Databases, Embeddings & RAG Optimization',
      level: 'Advanced',
      questions: 12,
      duration: '20 mins',
      format: 'Algorithmic + Code Review',
      status: 'VERIFIED',
      score: '88%',
    },
    {
      id: 'as-3',
      title: 'Distributed Caching Invalidation & Redis Patterns',
      level: 'Intermediate',
      questions: 10,
      duration: '18 mins',
      format: 'Scenario Based',
      status: 'PENDING',
      score: null,
    },
    {
      id: 'as-4',
      title: 'Kubernetes Container Lifecycle & Helm Deployment',
      level: 'Intermediate',
      questions: 14,
      duration: '22 mins',
      format: 'Architecture Drill',
      status: 'NOT_STARTED',
      score: null,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Skill Assessments & Verification Drills
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Diagnostic Testing
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Proctored, multi-format assessments that calibrate the Skillora 7-Dimension Employability score.
          </p>
        </div>

        <Link
          href="/learner/assessments"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition"
        >
          <span>Open Full Testing Center</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessments.map((a) => (
          <div
            key={a.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 font-mono text-[10px]">
                  {a.level}
                </span>
                <span
                  className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                    a.status === 'VERIFIED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : a.status === 'PENDING'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {a.status}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white mt-2 leading-tight">
                {a.title}
              </h3>

              <div className="mt-3 flex items-center gap-4 text-xs text-zinc-400 font-mono">
                <span>{a.questions} Questions</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {a.duration}
                </span>
                <span>•</span>
                <span>{a.format}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#151e30] flex items-center justify-between">
              {a.score ? (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Score: {a.score}</span>
                </div>
              ) : (
                <span className="text-xs text-zinc-500 font-mono">Unverified</span>
              )}

              <Link
                href="/learner/assessments"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition"
              >
                <Play className="w-3 h-3 fill-purple-400" />
                <span>{a.status === 'VERIFIED' ? 'Retake Exam' : 'Start Assessment'}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
