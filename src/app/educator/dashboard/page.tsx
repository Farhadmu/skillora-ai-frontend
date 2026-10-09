'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  Clock,
  TrendingUp,
  Plus,
  Brain,
  Award,
  Send,
  X,
  Check,
  ChevronRight,
  Play,
} from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';
import { apiClient } from '@/lib/api/client';
import { educatorApi } from '@/lib/api/educator';

export default function EducatorPage() {
  const [cohortData, setCohortData] = useState<any>(null);
  const [marketDemand, setMarketDemand] = useState<any>(null);

  // Modal States
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [interventionModalOpen, setInterventionModalOpen] = useState(false);
  const [cohortModalOpen, setCohortModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Quiz Generator Form State
  const [quizTopic, setQuizTopic] = useState('Distributed Systems & Raft Consensus');
  const [quizCategory, setQuizCategory] = useState('Architecture');
  const [quizDifficulty, setQuizDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Advanced');
  const [quizCount, setQuizCount] = useState<number>(4);
  const [quizGenerating, setQuizGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);
  const [quizSuccessToast, setQuizSuccessToast] = useState('');

  // Intervention State
  const [interventionAction, setInterventionAction] = useState('Socratic Practice Lab on TypeScript & Backend Patterns');
  const [interventionNote, setInterventionNote] = useState('Focus on memory leaks and non-blocking I/O callbacks.');
  const [dispatchingIntervention, setDispatchingIntervention] = useState(false);
  const [interventionToast, setInterventionToast] = useState('');

  // Cohort Form State
  const [cohortName, setCohortName] = useState('Fall 2026 AI Systems & Distributed Engineering Cohort');
  const [cohortTargetRole, setCohortTargetRole] = useState('Full-Stack AI Systems Engineer');
  const [cohortDescription, setCohortDescription] = useState('Intensive 8-week production engineering track with verified skills.');
  const [cohortToast, setCohortToast] = useState('');

  useEffect(() => {
    loadCohort();
  }, []);

  const loadCohort = async () => {
    try {
      const data = await api.getCohortOverview();
      setCohortData(data);
    } catch (err) {
      console.error('Failed to load cohort data:', err);
    }

    try {
      const demand = await educatorApi.getMarketDemand();
      setMarketDemand(demand);
    } catch (err) {
      console.error('Failed to load market demand:', err);
    }
  };

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setQuizGenerating(true);
    setGeneratedQuiz(null);

    try {
      const data = await apiClient<any>('/api/educator/generate-quiz', {
        method: 'POST',
        body: JSON.stringify({
          topic: quizTopic,
          category: quizCategory,
          difficulty: quizDifficulty,
          questionCount: quizCount,
          publishDirectly: true,
        }),
      });

      if (data?.assessment) {
        setGeneratedQuiz(data.assessment);
        setQuizSuccessToast(`Assessment "${data.assessment.title}" published directly to live student catalog!`);
        setTimeout(() => setQuizSuccessToast(''), 4000);
      } else {
        throw new Error('Assessment generation did not return valid data');
      }
    } catch (err: any) {
      setQuizSuccessToast(err?.message || 'AI Quiz generation is temporarily unavailable. Please try again.');
      setTimeout(() => setQuizSuccessToast(''), 4000);
    } finally {
      setQuizGenerating(false);
    }
  };

  const handleDispatchIntervention = async () => {
    if (!selectedStudent) return;
    setDispatchingIntervention(true);

    try {
      await apiClient<any>('/api/educator/interventions', {
        method: 'POST',
        body: JSON.stringify({
          learnerId: selectedStudent.learnerId,
          interventionNote,
          actionType: interventionAction,
        }),
      });
      setInterventionToast(`Socratic drill dispatched to ${selectedStudent.name}!`);
      setTimeout(() => setInterventionToast(''), 4000);
      setInterventionModalOpen(false);
    } catch (e: any) {
      setInterventionToast(e?.message || `Failed to dispatch intervention`);
      setTimeout(() => setInterventionToast(''), 4000);
      setInterventionModalOpen(false);
    } finally {
      setDispatchingIntervention(false);
    }
  };

  const handleCreateCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient<any>('/api/educator/cohort', {
        method: 'POST',
        body: JSON.stringify({
          name: cohortName,
          targetRole: cohortTargetRole,
          description: cohortDescription,
        }),
      });
      setCohortToast(`Cohort "${cohortName}" created successfully!`);
      setTimeout(() => setCohortToast(''), 4000);
      setCohortModalOpen(false);
    } catch (e: any) {
      setCohortToast(e?.message || `Failed to create cohort`);
      setTimeout(() => setCohortToast(''), 4000);
      setCohortModalOpen(false);
    }
  };

  return (
    <div className="select-none">
      {/* Global Toast Alerts */}
      {(quizSuccessToast || interventionToast || cohortToast) && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{quizSuccessToast || interventionToast || cohortToast}</span>
        </div>
      )}

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Institutional Cohort Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Educator Console</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Monitor student progression, curriculum mastery, and generate AI technical verification assessments.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/assessments"
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              Live Student Catalog
            </Link>

            <button
              onClick={() => setCohortModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              New Cohort
            </button>

            <button
              onClick={() => setQuizModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 transition shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Quiz Generator
            </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="text-xs text-zinc-400 font-medium mb-1">Active Students</div>
            <div className="text-2xl font-black text-white">{cohortData?.totalLearners || 10}</div>
            <div className="text-[11px] text-zinc-500 mt-1">In 8 active technical tracks</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="text-xs text-zinc-400 font-medium mb-1">Cohort Avg Readiness</div>
            <div className="text-2xl font-black text-emerald-400">{cohortData?.averageReadiness || 78}%</div>
            <div className="text-[11px] text-zinc-500 mt-1">+4.2% from last milestone</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="text-xs text-zinc-400 font-medium mb-1">Intervention Alerts</div>
            <div className="text-2xl font-black text-amber-400">{cohortData?.activeInterventionsCount || 2}</div>
            <div className="text-[11px] text-zinc-500 mt-1">Students requiring 1-on-1 drill</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e293b]">
            <div className="text-xs text-zinc-400 font-medium mb-1">Verified Skills Issued</div>
            <div className="text-2xl font-black text-cyan-400">142</div>
            <div className="text-[11px] text-zinc-500 mt-1">Cryptographic badges verified</div>
          </div>
        </div>

        {cohortData && (
          <div className="space-y-8">
            {/* Early Intervention Alerts */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Automated Early Intervention Alerts ({cohortData.activeInterventionsCount})
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-400">
                  AI predicts students requiring targeted Socratic support
                </span>
              </div>

              <div className="space-y-3">
                {cohortData.alerts?.map((alert: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0e1424] border border-[#1b2438] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{alert.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {alert.alertType}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Target Role: <strong className="text-zinc-200">{alert.targetRole}</strong> • Readiness:{' '}
                        <strong>{alert.readinessScore}%</strong> • Weekly Engagement:{' '}
                        <strong>{alert.weeklyHours} hrs</strong>
                      </div>
                      <div className="text-xs text-emerald-300 mt-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Recommended Intervention: {alert.recommendedIntervention}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedStudent(alert);
                        setInterventionAction(alert.recommendedIntervention);
                        setInterventionModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#162035] hover:bg-emerald-500 hover:text-black text-white transition self-start sm:self-center flex items-center gap-1.5 active:scale-95"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      Dispatch Socratic Drill
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Modules Telemetry */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Curriculum Module Mastery Rates
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Live telemetry tracking cohort completion across verified skill units.
                  </p>
                </div>
                <button
                  onClick={() => setQuizModalOpen(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Assessment for Module
                </button>
              </div>

              <div className="space-y-3">
                {cohortData.curriculumModules?.map((mod: any) => (
                  <div key={mod.id} className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white">{mod.title}</span>
                      <span className="font-mono font-bold text-emerald-400">{mod.completionRate}% Cohort Pass</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#141b2a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                        style={{ width: `${mod.completionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow 3: Employer Skill Demand & Curriculum Alignment */}
            {marketDemand && (
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-cyan-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Real Employer Skill Demand Telemetry (Workflow 3)
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono">
                        {marketDemand.totalJobsAnalyzed} Jobs Indexed
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Aggregated demand data directly from active employer job requisitions. Align syllabi and coursework with industry shortages.
                    </p>
                  </div>
                  <Link
                    href="/educator/content"
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs font-mono transition"
                  >
                    Adjust Coursework
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {(marketDemand.topSkillsDemand || []).slice(0, 8).map((item: any, idx: number) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white font-mono">{item.skill}</span>
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">{item.count} Openings</span>
                      </div>
                      <div className="w-full h-1 bg-[#141b2a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min(item.percentage, 100)}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">In {item.percentage}% of employer posts</div>
                    </div>
                  ))}
                </div>

                {marketDemand.curriculumRecommendations?.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#0a101d] border border-cyan-500/20 text-xs text-zinc-300 space-y-1.5 mt-2">
                    <span className="font-bold text-cyan-300 uppercase tracking-wide text-[10px] font-mono block">
                      Curriculum Alignment Recommendations:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-400 text-[11px]">
                      {marketDemand.curriculumRecommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* AI Quiz Generator Studio Modal */}
        {quizModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0b0f19] border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setQuizModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">AI Assessment & Quiz Generator Studio</h3>
                  <p className="text-xs text-zinc-400">
                    Generates authentic multiple-choice questions with real-world scenarios and explanations.
                  </p>
                </div>
              </div>

              {!generatedQuiz ? (
                <form onSubmit={handleGenerateQuiz} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Target Subject / Topic
                    </label>
                    <input
                      type="text"
                      required
                      value={quizTopic}
                      onChange={(e) => setQuizTopic(e.target.value)}
                      placeholder="e.g. Distributed Caching with Redis & Go, Next.js 16 App Router"
                      className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Category</label>
                      <select
                        value={quizCategory}
                        onChange={(e) => setQuizCategory(e.target.value)}
                        className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Architecture">Architecture</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Security">Security</option>
                        <option value="AI/ML">AI / ML</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Difficulty</label>
                      <select
                        value={quizDifficulty}
                        onChange={(e) => setQuizDifficulty(e.target.value as any)}
                        className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Beginner">Beginner (Foundations)</option>
                        <option value="Intermediate">Intermediate (Production)</option>
                        <option value="Advanced">Advanced (Scale & Trade-offs)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Question Count ({quizCount} questions)
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={8}
                      value={quizCount}
                      onChange={(e) => setQuizCount(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Auto-publishes to the live student examination catalog with instant grading key.</span>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setQuizModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={quizGenerating}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 transition shadow-md shadow-emerald-500/20 disabled:opacity-40"
                    >
                      {quizGenerating ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          Generating with AI Cascade...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          Generate Assessment Now
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 mt-6">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                    <div>
                      <strong className="block text-white font-bold">{generatedQuiz.title}</strong>
                      <span>{generatedQuiz.questionsCount} Questions • {generatedQuiz.durationMinutes} Minutes</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Published Live
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
                    {generatedQuiz.questions?.map((q: any, i: number) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#06080d] border border-zinc-800 text-xs space-y-1.5">
                        <div className="font-semibold text-white">Q{i + 1}: {q.prompt}</div>
                        <div className="text-emerald-400">
                          Correct: {q.options?.[q.correctAnswer] || q.options?.[0]}
                        </div>
                        <div className="text-zinc-500 text-[11px]">{q.explanation}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => setGeneratedQuiz(null)}
                      className="text-xs text-zinc-400 hover:text-white font-semibold"
                    >
                      ← Generate Another
                    </button>
                    <Link
                      href="/assessments"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Take Live in Exam Center
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dispatch Intervention Modal */}
        {interventionModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b0f19] border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setInterventionModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dispatch Socratic Intervention</h3>
                  <p className="text-xs text-zinc-400">Student: {selectedStudent.name}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Action Type</label>
                  <input
                    type="text"
                    value={interventionAction}
                    onChange={(e) => setInterventionAction(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Targeted Diagnostic Guidance
                  </label>
                  <textarea
                    rows={3}
                    value={interventionNote}
                    onChange={(e) => setInterventionNote(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => setInterventionModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDispatchIntervention}
                    disabled={dispatchingIntervention}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Socratic Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Cohort Modal */}
        {cohortModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0b0f19] border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setCohortModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-1">Create Institutional Cohort</h3>
              <p className="text-xs text-zinc-400 mb-4">Set up a specialized engineering cohort with tailored milestones.</p>

              <form onSubmit={handleCreateCohort} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Cohort Name</label>
                  <input
                    type="text"
                    required
                    value={cohortName}
                    onChange={(e) => setCohortName(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Target Career Role</label>
                  <input
                    type="text"
                    required
                    value={cohortTargetRole}
                    onChange={(e) => setCohortTargetRole(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Description & Goal</label>
                  <textarea
                    rows={2}
                    value={cohortDescription}
                    onChange={(e) => setCohortDescription(e.target.value)}
                    className="w-full bg-[#06080d] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setCohortModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition"
                  >
                    Create Cohort
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
