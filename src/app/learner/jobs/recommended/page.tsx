'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Building2, MapPin, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RecommendedJobsPage() {
  const recommendedJobs = [
    {
      id: 'job-1',
      title: 'Senior Full-Stack AI Systems Engineer',
      company: 'TechScale AI',
      location: 'Remote (US / Canada / Global)',
      salary: '$140,000 - $170,000 USD',
      matchScore: 94,
      whyMatch: 'Strongest match in your verified graph: NestJS, TypeScript, and Vector RAG pipelines align 100% with their tech stack.',
      skills: ['TypeScript', 'NestJS', 'RAG', 'Vector DB'],
    },
    {
      id: 'job-2',
      title: 'Backend Node.js & Distributed Systems Architect',
      company: 'NeuralFlow Data',
      location: 'Hybrid (San Francisco, CA / Remote)',
      salary: '$150,000 - $185,000 USD',
      matchScore: 89,
      whyMatch: 'Your microservices Docker lab and Redis caching diagnostics satisfy 4 of their 5 core requirements.',
      skills: ['Node.js', 'Redis', 'Docker', 'PostgreSQL'],
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Job Recommendations
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Competency Calibrated
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Roles automatically curated based on verified skill proof without using protected demographic characteristics.
          </p>
        </div>

        <Link
          href="/learner/jobs/matches"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Deep Match Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {recommendedJobs.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono mt-1">
                  <span className="text-zinc-300 font-semibold">{job.company}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">{job.salary}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-mono font-black">
                  {job.matchScore}% Match
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0c1220] border border-[#162136] text-xs text-zinc-300">
              <span className="font-bold text-emerald-400">Why this matches: </span>
              {job.whyMatch}
            </div>

            <div className="pt-2 border-t border-[#151e30] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-cyan-300 text-[11px] font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Link
                href="/learner/jobs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition self-end sm:self-auto"
              >
                <span>Apply with Skillora Proof Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
