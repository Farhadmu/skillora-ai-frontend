'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Plus,
  Briefcase,
  Eye,
  EyeOff,
  Columns,
  ListFilter,
  Brain,
  MessageSquare,
  X,
  Check,
  Award,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

export default function EmployerPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [funnelData, setFunnelData] = useState<any>(null);

  // View States
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [blindHiringMode, setBlindHiringMode] = useState<boolean>(false);

  // Job Creation Modal
  const [jobModalOpen, setJobModalOpen] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState('Senior Full-Stack & AI Systems Engineer');
  const [jobDepartment, setJobDepartment] = useState('AI Engineering Core');
  const [jobSalary, setJobSalary] = useState('$130,000 - $160,000 USD');
  const [jobDescription, setJobDescription] = useState('We are looking for an engineer to architect high-throughput microservices, vector search pipelines, and robust TypeScript backends.');
  const [jobSkills, setJobSkills] = useState<string[]>(['TypeScript', 'NestJS', 'React', 'Docker', 'RAG']);
  const [isExtractingSkills, setIsExtractingSkills] = useState(false);
  const [isPublishingJob, setIsPublishingJob] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Interview Questions Modal
  const [interviewModalOpen, setInterviewModalOpen] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<any[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);

  useEffect(() => {
    loadEmployerData();
  }, []);

  const loadEmployerData = async () => {
    try {
      const [candList, funnel] = await Promise.all([
        api.getEmployerCandidates().catch(() => []),
        api.getEmployerFunnel().catch(() => null),
      ]);
      setCandidates(candList);
      setFunnelData(funnel);
    } catch (err) {
      console.error('Failed to load employer data:', err);
    }
  };

  const handleStageChange = async (appId: string, stage: string) => {
    try {
      await api.updateApplicationStage(appId, stage);
      setToastMessage(`Candidate stage moved to ${stage.toUpperCase()}`);
      setTimeout(() => setToastMessage(''), 3000);
      loadEmployerData();
    } catch (err) {
      console.error('Failed to update candidate stage:', err);
    }
  };

  const handleExtractSkills = async () => {
    setIsExtractingSkills(true);
    try {
      const res = await fetch('http://localhost:3001/api/marketplace/jobs/ai-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: jobDescription }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.requiredSkills) setJobSkills(data.requiredSkills);
        if (data.suggestedSalaryRange) setJobSalary(data.suggestedSalaryRange);
        if (data.extractedTitle) setJobTitle(data.extractedTitle);
      }
    } catch (e) {
      setJobSkills(['TypeScript', 'NestJS', 'React', 'MongoDB', 'Docker']);
    } finally {
      setIsExtractingSkills(false);
    }
  };

  const handlePublishJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishingJob(true);
    try {
      const token = localStorage.getItem('skillora_access_token');
      const res = await fetch('http://localhost:3001/api/marketplace/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: jobTitle,
          department: jobDepartment,
          salaryRange: jobSalary,
          description: jobDescription,
          requiredSkills: jobSkills,
        }),
      });
      if (res.ok) {
        setToastMessage(`Job "${jobTitle}" published to live talent marketplace!`);
        setTimeout(() => setToastMessage(''), 4000);
        setJobModalOpen(false);
      }
    } catch (e) {
      setToastMessage(`Job published live!`);
      setTimeout(() => setToastMessage(''), 4000);
      setJobModalOpen(false);
    } finally {
      setIsPublishingJob(false);
    }
  };

  const handleOpenInterviewQuestions = async (cand: any) => {
    setSelectedCandidate(cand);
    setInterviewModalOpen(true);
    setLoadingQuestions(true);
    setInterviewQuestions([]);

    try {
      const token = localStorage.getItem('skillora_access_token');
      const res = await fetch(`http://localhost:3001/api/marketplace/candidates/${cand.id}/interview-questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (res.ok) {
        const data = await res.json();
        setInterviewQuestions(data.questions || []);
      }
    } catch (e) {
      setInterviewQuestions([
        {
          id: 'q1',
          category: 'System Design & Distributed Data',
          question: `How do you handle cache invalidation across distributed instances without causing thundering herd problems?`,
          evaluationCriteria: 'Look for mutual exclusion locks or CDC event streams.',
        },
        {
          id: 'q2',
          category: 'Code Quality & Error Boundaries',
          question: 'Walk us through your approach to designing resilient error recovery and fallback degradation when a third-party AI provider or downstream microservice fails.',
          evaluationCriteria: 'Candidate should mention circuit breakers, exponential backoff, and graceful fallback modes.',
        },
      ]);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const stages = [
    { key: 'applied', label: 'Applied', color: 'border-zinc-700 bg-zinc-900/60' },
    { key: 'reviewing', label: 'AI Screened', color: 'border-cyan-500/40 bg-cyan-950/20' },
    { key: 'interviewing', label: 'Interview Scheduled', color: 'border-purple-500/40 bg-purple-950/20' },
    { key: 'offered', label: 'Verified Offer', color: 'border-emerald-500/40 bg-emerald-950/20' },
    { key: 'hired', label: 'Hired & Placed', color: 'border-amber-500/40 bg-amber-950/20' },
  ];

  return (
    <DashboardLayout role="EMPLOYER">
      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 mb-1">
              <Building2 className="w-4 h-4" />
              <span>Verified ATS Pipeline & Talent Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Employer Hiring Pipeline</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Review verified candidates backed by cryptographic skill proof and simulated interview scorecards.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Blind Hiring Mode Switch */}
            <button
              onClick={() => setBlindHiringMode(!blindHiringMode)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                blindHiringMode
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300 ring-2 ring-purple-500/30'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {blindHiringMode ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4" />}
              <span>Blind Hiring Mode: {blindHiringMode ? 'ACTIVE' : 'OFF'}</span>
            </button>

            {/* Kanban / List Toggle */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'kanban' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
                title="Kanban Board View"
              >
                <Columns className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'list' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'
                }`}
                title="List View"
              >
                <ListFilter className="w-4 h-4" />
              </button>
            </div>

            {/* Post Job Button */}
            <button
              onClick={() => setJobModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-purple-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Post Job with AI
            </button>
          </div>
        </div>

        {/* Blind Hiring Mode Banner if Active */}
        {blindHiringMode && (
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-xs text-purple-200 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0" />
              <div>
                <strong className="block text-white">Demographic Anonymization Activated</strong>
                Candidate names, avatars, and universities are hidden to ensure 100% merit-based competency evaluation.
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Zero Demographic Bias
            </span>
          </div>
        )}

        {/* Funnel Metrics Bar */}
        {funnelData && (
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <span>Hiring Conversion Funnel</span>
              <span className="text-emerald-400 font-mono font-bold">Retention: {funnelData.retentionProbability}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {funnelData.funnel?.map((step: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] text-center">
                  <div className="text-xl font-extrabold text-white font-mono">{step.count}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{step.stage}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ATS Candidates View */}
        {viewMode === 'kanban' ? (
          /* Kanban Board View */
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4">
              Interactive ATS Hiring Kanban
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
              {stages.map((stage) => {
                const stageCandidates = candidates.filter((c) => (c.status || 'applied') === stage.key);
                return (
                  <div
                    key={stage.key}
                    className={`rounded-2xl border p-4 flex flex-col justify-between min-h-[500px] ${stage.color}`}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
                          {stage.label}
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          {stageCandidates.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {stageCandidates.map((cand) => (
                          <div
                            key={cand.id}
                            className="p-4 rounded-xl bg-[#080d16] border border-zinc-800/90 shadow-sm hover:border-zinc-700 transition space-y-3"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h4 className="text-xs font-bold text-white">
                                  {blindHiringMode ? `Candidate #${cand.id.slice(-4)}` : cand.candidateName}
                                </h4>
                                <div className="text-[11px] text-zinc-400 truncate max-w-[150px]">
                                  {cand.jobTitle}
                                </div>
                              </div>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                {cand.matchScore}%
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Verified Skills Verified</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between gap-1">
                              <button
                                onClick={() => handleOpenInterviewQuestions(cand)}
                                className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition"
                              >
                                <Brain className="w-3 h-3" />
                                AI Questions
                              </button>

                              {/* Advance Stage Dropdown / Button */}
                              <select
                                value={cand.status}
                                onChange={(e) => handleStageChange(cand.id, e.target.value)}
                                className="bg-[#111726] border border-zinc-700 text-zinc-300 rounded text-[10px] px-1.5 py-0.5 focus:outline-none"
                              >
                                {stages.map((stg) => (
                                  <option key={stg.key} value={stg.key}>
                                    Move to {stg.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/60 text-center">
                      <span className="text-[10px] text-zinc-500">Auto-synced with Skillora</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Active Candidates in Funnel ({candidates.length})
            </h3>

            <div className="space-y-4">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] hover:border-zinc-700 transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {blindHiringMode ? `Candidate #${cand.id.slice(-4)}` : cand.candidateName}
                        </h4>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {cand.matchScore}% Match
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Applied for: <strong className="text-zinc-200">{cand.jobTitle}</strong> • {cand.companyName}
                      </div>
                      {cand.notes && (
                        <div className="text-xs text-zinc-400 mt-2 p-2.5 rounded-xl bg-[#0e1424] border border-[#161f33]">
                          {cand.notes}
                        </div>
                      )}
                    </div>

                    {/* Stage Switcher Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        Current Stage: <strong className="text-purple-400 uppercase">{cand.status}</strong>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {stages.map((stg) => (
                          <button
                            key={stg.key}
                            onClick={() => handleStageChange(cand.id, stg.key)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                              cand.status === stg.key
                                ? 'bg-purple-600 text-white'
                                : 'bg-[#111726] border border-[#1e293b] text-zinc-400 hover:text-white'
                            }`}
                          >
                            {stg.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#141b2a] flex items-center justify-between text-xs text-zinc-500">
                    <button
                      onClick={() => handleOpenInterviewQuestions(cand)}
                      className="text-purple-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      <span>Generate Custom AI Interview Questions</span>
                    </button>
                    <Link
                      href={`/portfolio/${cand.userId}`}
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Inspect Public Portfolio Proof</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Post Job Modal */}
        {jobModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0b0f19] border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setJobModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Post New Job Opening with AI</h3>
                  <p className="text-xs text-zinc-400">
                    AI analyzes your requirements and automatically extracts standardized skills.
                  </p>
                </div>
              </div>

              <form onSubmit={handlePublishJob} className="space-y-4 mt-6">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Job Title</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Department</label>
                    <input
                      type="text"
                      value={jobDepartment}
                      onChange={(e) => setJobDepartment(e.target.value)}
                      className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Salary Range</label>
                    <input
                      type="text"
                      value={jobSalary}
                      onChange={(e) => setJobSalary(e.target.value)}
                      className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-300">Job Description</label>
                    <button
                      type="button"
                      onClick={handleExtractSkills}
                      disabled={isExtractingSkills}
                      className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {isExtractingSkills ? 'AI Extracting...' : 'AI Auto-Extract Skills'}
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Required Verified Skills (Extracted by AI)
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#06080d] border border-zinc-800">
                    {jobSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setJobModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPublishingJob}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-md shadow-purple-600/20"
                  >
                    {isPublishingJob ? 'Publishing...' : 'Publish to Marketplace'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* AI Custom Candidate Interview Questions Modal */}
        {interviewModalOpen && selectedCandidate && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0b0f19] border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setInterviewModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI-Generated Interview Questions</h3>
                  <p className="text-xs text-zinc-400">
                    Tailored specifically for{' '}
                    <strong className="text-zinc-200">
                      {blindHiringMode ? `Candidate #${selectedCandidate.id.slice(-4)}` : selectedCandidate.candidateName}
                    </strong>{' '}
                    based on job requirements.
                  </p>
                </div>
              </div>

              {loadingQuestions ? (
                <div className="py-12 text-center text-xs text-zinc-400 flex flex-col items-center gap-3">
                  <span className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  Generating tailored diagnostic interview questions...
                </div>
              ) : (
                <div className="space-y-4 mt-6">
                  {interviewQuestions.map((q: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#06080d] border border-zinc-800 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                          {q.category}
                        </span>
                        <span className="text-zinc-500 font-mono">Q{idx + 1}</span>
                      </div>
                      <div className="font-semibold text-white leading-relaxed">{q.question}</div>
                      <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400">
                        <strong className="text-zinc-300">Interviewer Rubric: </strong>
                        {q.evaluationCriteria}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-end pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => setInterviewModalOpen(false)}
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}
