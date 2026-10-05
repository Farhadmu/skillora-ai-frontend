'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, ExternalLink, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function SavedLearningPage() {
  const savedItems = [
    {
      id: 's-1',
      title: 'Advanced TypeScript & NestJS Enterprise Architecture',
      type: 'Module',
      progress: '75% Complete',
      href: '/learner/learning',
    },
    {
      id: 's-2',
      title: 'Stanford AI Systems: Approximate Nearest Neighbors & HNSW Indexing',
      type: 'Video Lecture',
      progress: 'Saved for Revision',
      href: '/learner/learning/resources',
    },
    {
      id: 's-3',
      title: 'Production Dockerfile Multi-Stage Best Practices Cheatsheet',
      type: 'Specification PDF',
      progress: 'Bookmarked',
      href: '/learner/learning/resources',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Saved Bookmarks & Pathways
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Bookmarks
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Fast access to bookmarked technical materials and queued courses.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {savedItems.map((item) => (
          <div
            key={item.id}
            className="p-4 sm:p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <div className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">{item.type}</span>
                  <span>•</span>
                  <span>{item.progress}</span>
                </div>
              </div>
            </div>

            <Link
              href={item.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition self-end sm:self-auto"
            >
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
