'use client';

import React, { useState } from 'react';
import { FileText, Video, ExternalLink, Bookmark, Search, Download, Filter } from 'lucide-react';

export default function ResourcesPage() {
  const [filter, setFilter] = useState<'ALL' | 'DOCS' | 'VIDEO' | 'PDF'>('ALL');

  const resources = [
    {
      id: 'res-1',
      title: 'NestJS Dependency Injection & Scoped Instances In-Depth Guide',
      type: 'DOCS',
      source: 'Skillora Engineering Handbook',
      readTime: '15 mins',
      category: 'Backend',
      url: 'https://docs.nestjs.com',
    },
    {
      id: 'res-2',
      title: 'Vector Similarity, Approximate Nearest Neighbors & HNSW Indexing',
      type: 'VIDEO',
      source: 'Stanford AI Systems Lecture',
      readTime: '42 mins',
      category: 'AI / RAG',
      url: 'https://youtube.com',
    },
    {
      id: 'res-3',
      title: 'Production Dockerfile Multi-Stage Best Practices Cheatsheet',
      type: 'PDF',
      source: 'Cloud Native Computing Foundation',
      readTime: '8 pages',
      category: 'DevOps',
      url: '#',
    },
    {
      id: 'res-4',
      title: 'Advanced TypeScript: Conditional Types and Template String Literals',
      type: 'DOCS',
      source: 'TypeScript Handbook Official',
      readTime: '20 mins',
      category: 'Languages',
      url: 'https://www.typescriptlang.org/docs',
    },
  ];

  const filtered = resources.filter((r) => {
    if (filter === 'ALL') return true;
    return r.type === filter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Learning Resources & Documentation
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Knowledge Repository
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Curated papers, architectural guides, video breakdowns, and technical specifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {(['ALL', 'DOCS', 'VIDEO', 'PDF'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filter === t
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-[10px]">
                  {item.type}
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">{item.readTime}</span>
              </div>

              <h3 className="text-sm font-bold text-white mt-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{item.source}</p>
            </div>

            <div className="pt-3 border-t border-[#151e30] flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">{item.category}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold transition"
              >
                <span>Open Resource</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
