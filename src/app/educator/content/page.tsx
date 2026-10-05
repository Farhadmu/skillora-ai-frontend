'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, FileText, Video, Plus, Search, ExternalLink, Clock } from 'lucide-react';

export default function EducatorContentPage() {
  const [contentList, setContentList] = useState([
    {
      id: 'cnt-1',
      title: 'NestJS Interceptor Architecture & Stream Transformation Lecture',
      type: 'Video + Code Repo',
      duration: '45 mins',
      assignedTo: '3 Cohorts',
      status: 'PUBLISHED',
    },
    {
      id: 'cnt-2',
      title: 'Vector Space Similarity Mathematics & Embedding Splitting Guide',
      type: 'Interactive Doc',
      duration: '25 mins',
      assignedTo: '2 Cohorts',
      status: 'PUBLISHED',
    },
    {
      id: 'cnt-3',
      title: 'Docker Alpine Container Hardening Technical Specification',
      type: 'Lab Blueprint',
      duration: '60 mins',
      assignedTo: '1 Cohort',
      status: 'PUBLISHED',
    },
  ]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Faculty Content Repository
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Asset Library
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage reusable lectures, architectural blueprints, slide decks, and code challenge templates.
          </p>
        </div>

        <Link
          href="/educator/ai"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Content with AI</span>
        </Link>
      </div>

      <div className="space-y-4">
        {contentList.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold text-[10px]">
                  {item.type}
                </span>
                <span className="text-zinc-500 font-mono">{item.assignedTo}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1.5">{item.title}</h3>
              <div className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{item.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
