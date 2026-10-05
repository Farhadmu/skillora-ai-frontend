'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Code2, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

export default function RecommendedProjectsPage() {
  const [generating, setGenerating] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 'rec-1',
      title: 'High-Throughput Redis Cache Proxy with Invalidation Pub/Sub',
      skillsTargeted: ['Redis', 'NestJS', 'BullMQ'],
      readinessImpact: '+8% Employability',
      difficulty: 'Advanced',
      estHours: '14 Hours',
      description: 'Architect a caching middleware for an enterprise API that guarantees zero stale reads across distributed pods using Redis Pub/Sub events.',
      milestones: [
        'Define Redis Cluster connection with connection pooling',
        'Implement cache-aside pattern with dynamic TTL calculation',
        'Add Pub/Sub invalidation event listener on update operations',
        'Write end-to-end concurrency load tests with 5,000 simulated requests',
      ],
    },
    {
      id: 'rec-2',
      title: 'Vector Search Knowledge Ingestion Pipeline with Qdrant & Gemini',
      skillsTargeted: ['Vector Databases', 'RAG', 'TypeScript'],
      readinessImpact: '+9% Employability',
      difficulty: 'Advanced',
      estHours: '18 Hours',
      description: 'Build an asynchronous ETL pipeline that chunks PDF documentation, generates dense vector embeddings, and exposes hybrid BM25 + dense search.',
      milestones: [
        'Document chunking with recursive semantic splitting',
        'Batch vector generation via Google Gemini API',
        'Qdrant payload indexing and filter optimization',
        'Cosine distance similarity benchmark suite',
      ],
    },
  ]);

  const handleGenerateMore = async () => {
    setGenerating(true);
    try {
      const res = await api.getProjectRecommendations();
      if (res && res.length > 0) {
        setProjects(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Project Recommendations
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Tailored to Target Gap
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Projects specifically synthesized to close your active skill gaps and generate verified portfolio evidence.
          </p>
        </div>

        <button
          onClick={handleGenerateMore}
          disabled={generating}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${generating ? 'animate-spin' : ''}`} />
          <span>Generate Fresh Recommendations</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((proj) => (
          <div
            key={proj.title}
            className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">{proj.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs text-zinc-400 font-mono">Est: {proj.estHours}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                    {proj.readinessImpact}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 text-[11px] font-mono">
                    {proj.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                {proj.skillsTargeted.map((s: string) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-[#111728] border border-[#1e293b] text-cyan-300 text-xs font-mono font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {proj.description}
            </p>

            {/* Milestones list */}
            {proj.milestones && (
              <div className="p-4 rounded-xl bg-[#0c1220] border border-[#162136] space-y-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                  Project Milestones:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {proj.milestones.map((m: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-zinc-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <Link
                href="/learner/build/coding"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
              >
                <span>Start in Coding Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
