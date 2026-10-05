'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, ArrowRight, Building2, MapPin, DollarSign } from 'lucide-react';

export default function SavedJobsPage() {
  const savedJobs = [
    {
      id: 'sj-1',
      title: 'Senior Full-Stack AI Systems Engineer',
      company: 'TechScale AI',
      location: 'Remote',
      salary: '$140,000 - $170,000 USD',
      matchScore: '94%',
    },
    {
      id: 'sj-2',
      title: 'Backend Node.js & Distributed Systems Architect',
      company: 'NeuralFlow Data',
      location: 'San Francisco, CA / Remote',
      salary: '$150,000 - $185,000 USD',
      matchScore: '89%',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Saved Jobs & Bookmarks
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Shortlist
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track bookmarked positions and apply with verified skill proof dossiers.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {savedJobs.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h3 className="text-base font-bold text-white">{job.title}</h3>
              <div className="text-xs text-zinc-400 font-mono mt-1 flex flex-wrap items-center gap-2">
                <span className="text-zinc-300 font-semibold">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{job.salary}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                {job.matchScore} Match
              </span>
              <Link
                href="/learner/jobs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
