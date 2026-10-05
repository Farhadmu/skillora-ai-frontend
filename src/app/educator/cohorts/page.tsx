'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Calendar, ArrowRight, CheckCircle2, Send, GraduationCap } from 'lucide-react';

export default function EducatorCohortsPage() {
  const [cohorts, setCohorts] = useState([
    {
      id: 'coh-1',
      name: 'Fall 2026 AI Systems & Distributed Engineering Cohort',
      targetRole: 'Full-Stack AI Systems Engineer',
      learnersCount: 42,
      startDate: 'Sep 1, 2026',
      endDate: 'Dec 15, 2026',
      status: 'ACTIVE',
    },
    {
      id: 'coh-2',
      name: 'Cloud Native Microservices & Docker Infrastructure Track',
      targetRole: 'Platform Reliability & DevOps Engineer',
      learnersCount: 28,
      startDate: 'Aug 15, 2026',
      endDate: 'Nov 30, 2026',
      status: 'ACTIVE',
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Full-Stack AI Systems Engineer');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCohorts([
      ...cohorts,
      {
        id: 'coh-' + Date.now(),
        name,
        targetRole: role,
        learnersCount: 0,
        startDate: 'Oct 2026',
        endDate: 'Jan 2027',
        status: 'ACTIVE',
      },
    ]);
    setName('');
    setModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Cohort Management & Enrolment
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Class Operations
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Group learners into structured cohorts, assign syllabi, monitor collective velocity, and broadcast announcements.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Cohort</span>
        </button>
      </div>

      <div className="space-y-4">
        {cohorts.map((c) => (
          <div
            key={c.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  {c.status}
                </span>
                <span className="text-xs text-zinc-400 font-mono">Target: {c.targetRole}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">{c.name}</h3>
              <div className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-4">
                <span>{c.learnersCount} Enrolled Students</span>
                <span>•</span>
                <span>
                  {c.startDate} → {c.endDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/educator/learners"
                className="px-3.5 py-2 rounded-xl bg-[#111728] hover:bg-[#1a233c] border border-[#1e2d44] text-white font-bold text-xs transition"
              >
                Inspect Learners
              </Link>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Student Cohort</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Cohort Title
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Winter 2026 Microservices Cohort"
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs"
                >
                  Create Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
