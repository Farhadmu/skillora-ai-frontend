'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, Building2, ArrowRight, Layers, FileText } from 'lucide-react';
import { api } from '@/lib/api';

export default function JobApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    try {
      const res = await api.getMyApplications();
      setApplications(res || []);
    } catch (e) {
      console.error(e);
      // Fallback sample applications
      setApplications([
        {
          id: 'app-1',
          jobTitle: 'Senior Full-Stack AI Engineer',
          company: 'TechScale AI',
          status: 'SHORTLISTED',
          submittedAt: 'Oct 3, 2026',
          matchScore: 94,
        },
        {
          id: 'app-2',
          jobTitle: 'Backend Node.js & Distributed Systems Architect',
          company: 'NeuralFlow Data',
          status: 'IN_REVIEW',
          submittedAt: 'Sep 29, 2026',
          matchScore: 89,
        },
      ]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Job Applications Tracker
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Active Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time status updates from employer talent ATS systems.
          </p>
        </div>

        <Link
          href="/learner/jobs"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Find More Roles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-emerald-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {app.matchScore}% Match
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-mono">Submitted: {app.submittedAt}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{app.jobTitle}</h3>
              <p className="text-xs text-zinc-400 mt-0.5 font-mono">{app.company}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  app.status === 'SHORTLISTED'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                }`}
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
