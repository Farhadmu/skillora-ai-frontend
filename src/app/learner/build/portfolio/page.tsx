'use client';

import React from 'react';
import Link from 'next/link';
import { User, Code2, ExternalLink, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function BuildPortfolioPage() {
  const verifiedProjects = [
    {
      title: 'Enterprise Distributed NestJS Microservices',
      skills: ['NestJS', 'TypeScript', 'Docker', 'Redis'],
      verificationScore: '94 / 100',
      description: 'Production event-driven architecture featuring RabbitMQ brokers, rate limiting, and automated proctored tests.',
    },
    {
      title: 'Hybrid Sparse-Dense Vector RAG Pipeline',
      skills: ['Vector DB', 'Gemini AI', 'Cosine Similarity', 'Python'],
      verificationScore: '91 / 100',
      description: 'Document extraction and embedding engine handling 100,000+ technical docs with sub-50ms latency.',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Portfolio Project Proofs
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Recruiter Showcase
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Production projects featuring cryptographic proctor badges exposed on your public dossier.
          </p>
        </div>

        <Link
          href="/learner/portfolio"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>View Public Dossier</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verifiedProjects.map((p) => (
          <div
            key={p.title}
            className="p-6 rounded-2xl bg-[#090d16] border border-emerald-500/30 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified: {p.verificationScore}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-3 leading-tight">
                {p.title}
              </h3>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#151e30] flex flex-wrap gap-1.5">
              {p.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-cyan-300 text-[11px] font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
