'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Users,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dept, setDept] = useState('Core Engineering');
  const [salary, setSalary] = useState('$130,000 - $160,000 USD');
  const [jdText, setJdText] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [savingJob, setSavingJob] = useState(false);

  React.useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const list = await api.getJobs();
      setJobs(list && list.length > 0 ? list : []);
    } catch (e) {
      console.error('Failed to load jobs:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleExtractSkills = async () => {
    if (!jdText.trim()) return;
    setExtracting(true);
    try {
      const res = await api.analyzeJd(jdText);
      const extracted = res?.extractedSkills || [];
      if (extracted.length > 0) {
        setSkills(Array.from(new Set([...skills, ...extracted])));
      }
    } catch (e) {
      console.error('Failed to extract skills:', e);
    } finally {
      setExtracting(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || savingJob) return;
    setSavingJob(true);

    try {
      const created = await api.createJob({
        title,
        department: dept,
        salaryRange: salary,
        requiredSkills: skills,
        preferredSkills: [],
        description: jdText || `Join our engineering team as ${title}.`,
        mode: 'remote',
        experienceLevel: 'Mid',
        responsibilities: [
          'Design and implement high-performance cloud services',
          'Collaborate across cross-functional product and engineering teams',
        ],
        requirements: [
          'Strong practical experience in relevant tech stacks',
          'Commitment to software craftsmanship and verifiable tests',
        ],
      });
      setJobs([created, ...jobs]);
      setTitle('');
      setJdText('');
      setSkills([]);
      setModalOpen(false);
    } catch (err: any) {
      console.error('Failed to create job:', err);
    } finally {
      setSavingJob(false);
    }
  };

  const toggleStatus = (id: string) => {
    setJobs(
      jobs.map((j) =>
        j.id === id
          ? { ...j, status: j.status === 'PUBLISHED' || j.status === 'published' ? 'DRAFT' : 'PUBLISHED' }
          : j,
      ),
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Job Openings & Requisitions
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Requisition Management
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Publish competency-calibrated job listings with automated AI skill extraction and zero-bias matching.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Requisition</span>
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono tracking-wider ${
                    job.status === 'PUBLISHED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {job.status}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{job.department}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">{job.title}</h3>
              <div className="text-xs text-emerald-400 font-mono font-bold">{job.salary}</div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skills.map((s: string) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 text-[11px] font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center font-mono">
                <div className="text-lg font-bold text-white">{job.applicantsCount}</div>
                <div className="text-[10px] text-zinc-500">Applicants</div>
              </div>

              <div className="text-center font-mono">
                <div className="text-lg font-bold text-purple-400">{job.shortlistedCount}</div>
                <div className="text-[10px] text-zinc-500">Shortlisted</div>
              </div>

              <button
                onClick={() => toggleStatus(job.id)}
                className="px-3.5 py-2 rounded-xl bg-[#111728] hover:bg-[#1a233c] border border-[#1e2d44] text-zinc-300 hover:text-white font-bold text-xs transition"
              >
                {job.status === 'PUBLISHED' ? 'Unpublish' : 'Publish Requisition'}
              </button>

              <Link
                href="/employer/pipeline"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition"
              >
                <span>Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">Create Job Requisition</h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Job Role Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Microservices Engineer"
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Paste Job Description to Auto-Extract Skills
                  </label>
                  <button
                    type="button"
                    onClick={handleExtractSkills}
                    disabled={extracting}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{extracting ? 'Extracting...' : 'AI Extract'}</span>
                  </button>
                </div>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  rows={4}
                  placeholder="Paste raw JD to automatically normalize competencies..."
                  className="w-full p-3 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {skills.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase">Normalized Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[11px] font-mono"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-[#1a2236]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md shadow-purple-500/20"
                >
                  Save Requisition Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
