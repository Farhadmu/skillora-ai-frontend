'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Calendar, ArrowRight, CheckCircle2, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { educatorApi } from '@/lib/api/educator';

export default function EducatorCohortsPage() {
  const [cohorts, setCohorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Full-Stack AI Systems Engineer');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchCohorts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await educatorApi.getCohorts();
      setCohorts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load cohorts:', err);
      setError(err?.message || 'Failed to fetch cohorts from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCohorts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      setCreating(true);
      await educatorApi.createCohort({
        name: name.trim(),
        targetRole: role.trim(),
        description: description.trim(),
      });
      setName('');
      setDescription('');
      setModalOpen(false);
      await fetchCohorts();
    } catch (err: any) {
      alert(err?.message || 'Failed to create cohort');
    } finally {
      setCreating(false);
    }
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
              Live MongoDB Data
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

      {loading && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
          <p className="text-xs font-mono">Loading cohort rosters from MongoDB...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Failed to load cohorts</span>
          </div>
          <p className="text-xs">{error}</p>
          <button
            onClick={fetchCohorts}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono font-bold transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && cohorts.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <GraduationCap className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Cohorts Created Yet</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            You haven't launched any cohorts yet. Click &quot;Launch New Cohort&quot; to organize learners into curriculum tracks with synchronized deadlines and assignments.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
          >
            Launch First Cohort
          </button>
        </div>
      )}

      {!loading && !error && cohorts.length > 0 && (
        <div className="space-y-4">
          {cohorts.map((c) => (
            <div
              key={c.id || c._id}
              className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {c.status || 'ACTIVE'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">Target: {c.targetRole || 'Full-Stack Developer'}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">{c.name}</h3>
                {c.description && (
                  <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{c.description}</p>
                )}
                <div className="text-xs text-zinc-400 font-mono mt-2 flex items-center gap-4">
                  <span>{c.learnersCount || (c.learners || []).length || 0} Enrolled Students</span>
                  <span>•</span>
                  <span>Created {new Date(c.createdAt || Date.now()).toLocaleDateString()}</span>
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
      )}

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
                  required
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
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Cohort goals and syllabus overview..."
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
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Cohort'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
