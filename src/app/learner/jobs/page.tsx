'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Search,
  Sparkles,
  ArrowRight,
  Building2,
  MapPin,
  DollarSign,
  CheckCircle2,
  Clock,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';

export default function LearnerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'applications'>('browse');
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedMode, setSelectedMode] = useState('all');
  const [selectedExp, setSelectedExp] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, [selectedMode, selectedExp, searchQuery]);

  const loadJobs = async () => {
    try {
      const user = getCurrentUser();
      const list = await api.getJobs({
        mode: selectedMode,
        experienceLevel: selectedExp,
        query: searchQuery,
        userId: user?.id,
      });
      setJobs(list);
      if (list.length > 0 && !selectedJob) {
        setSelectedJob(list[0]);
      }
    } catch (err) {
      console.error('Failed to load jobs:', err);
    }
  };

  const loadApplications = async () => {
    try {
      const apps = await api.getMyApplications();
      setApplications(apps);
    } catch (err) {
      console.error('Failed to load applications:', err);
    }
  };

  const handleApply = async (jobId: string) => {
    setApplying(true);
    setApplySuccess(null);
    try {
      await api.applyForJob(jobId);
      setApplySuccess('Application successfully submitted with verified readiness credentials!');
      loadApplications();
    } catch (err) {
      console.error('Application failed:', err);
    } finally {
      setApplying(false);
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Verified Talent Matching Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Global Talent Marketplace</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Connect directly with verified tech employers using transparent, bias-free AI competency matching.
          </p>
        </div>

        <div className="flex items-center rounded-xl bg-[#111726] border border-[#1e293b] p-1">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'browse'
                ? 'bg-emerald-500 text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Browse Roles ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'applications'
                ? 'bg-emerald-500 text-black shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Applications ({applications.length})
          </button>
        </div>
      </div>

      {activeTab === 'browse' ? (
        <div className="space-y-6">
          {/* Filters */}
          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Work Modes</option>
                <option value="remote">Remote Only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>

              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Seniority Levels</option>
                <option value="Entry">Entry Level</option>
                <option value="Mid">Mid Level</option>
                <option value="Senior">Senior Level</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, company, skill..."
                className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Split Screen Layout: List + Detail Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Listings Column */}
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {jobs.map((job) => {
                const isSel = selectedJob?.id === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => {
                      setSelectedJob(job);
                      setApplySuccess(null);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left flex flex-col justify-between transition group ${
                      isSel
                        ? 'bg-[#101828] border-emerald-500 shadow-md'
                        : 'bg-[#0b0f19] border-[#1a2236] hover:bg-[#0e1424]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {job.matchScore || 90}% Match
                        </span>
                        <span className="text-xs font-mono text-zinc-400">{job.salaryRange}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">
                        {job.title}
                      </h4>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {job.companyName} • {job.location} ({job.mode})
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#141b2a] flex items-center justify-between text-[11px] text-zinc-500">
                      <span>{job.experienceLevel} Level</span>
                      <span>{job.applicantsCount} Applicants</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Job Detail Inspector */}
            {selectedJob && (
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-6">
                {applySuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{applySuccess}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#1a2236] pb-6">
                  <div>
                    <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                      {selectedJob.companyName} • {selectedJob.department}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      {selectedJob.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {selectedJob.location} ({selectedJob.mode})
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" /> {selectedJob.salaryRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Posted {selectedJob.postedAt}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={applying}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
                  >
                    {applying ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Apply with Verified Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* AI Match Explanation */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#0c182b] to-[#080f1c] border border-emerald-500/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Explainable AI Competency Match ({selectedJob.matchScore}%)
                    </div>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{selectedJob.matchExplanation}</p>
                </div>

                {/* Required & Preferred Skills */}
                <div>
                  <div className="text-xs font-bold text-white mb-2">Required Core Competencies</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requiredSkills?.map((s: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#111726] border border-[#1e293b] text-xs font-medium text-emerald-300"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description & Responsibilities */}
                <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Role Overview</div>
                  <p>{selectedJob.description}</p>

                  <div className="text-xs font-bold text-white uppercase tracking-wider pt-2">
                    Core Responsibilities
                  </div>
                  <ul className="space-y-1.5">
                    {selectedJob.responsibilities?.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-400">
                        <span className="text-emerald-400">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* APPLICATION TRACKER */
        /* ======================================================== */
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Your Submitted Job Applications</h3>
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{app.jobTitle}</span>
                    <span className="text-xs text-zinc-400">• {app.companyName}</span>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Applied on {app.appliedAt} • Match Potential:{' '}
                    <strong className="text-emerald-400 font-mono">{app.matchScore}%</strong>
                  </div>
                  {app.notes && (
                    <div className="text-[11px] text-zinc-500 mt-1 italic">{app.notes}</div>
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-center ${
                    app.status === 'interviewing'
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : app.status === 'offered'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  Stage: {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
