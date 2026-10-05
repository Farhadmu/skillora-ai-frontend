'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Award, Plus, Sparkles, CheckCircle2, Clock, Brain, Edit3, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function EducatorAssessmentsPage() {
  const [assessments, setAssessments] = useState([
    {
      id: 'as-1',
      title: 'NestJS Clean Architecture & Interceptor Exam',
      difficulty: 'Advanced',
      questionsCount: 15,
      submissionsCount: 78,
      avgScore: '86%',
      status: 'ACTIVE',
    },
    {
      id: 'as-2',
      title: 'Vector Search Cosine Distance & Embeddings Drill',
      difficulty: 'Advanced',
      questionsCount: 12,
      submissionsCount: 54,
      avgScore: '79%',
      status: 'ACTIVE',
    },
    {
      id: 'as-3',
      title: 'TypeScript Type-Level Recursive Conditioning Test',
      difficulty: 'Expert',
      questionsCount: 10,
      submissionsCount: 65,
      avgScore: '91%',
      status: 'ACTIVE',
    },
  ]);

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [topic, setTopic] = useState('Redis Cache Invalidation & Pub/Sub');
  const [difficulty, setDifficulty] = useState('Advanced');
  const [generating, setGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      const res = await api.generateQuiz(topic, 4);
      setGeneratedQuestions(res?.questions || [
        {
          question: 'What is the primary trade-off of using Redis Pub/Sub for cache invalidation across distributed pods?',
          options: ['Zero network overhead', 'At-most-once delivery without persistence', 'Guaranteed synchronous ACK', 'Built-in disk backup'],
          answer: 1,
        },
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Assessment Studio & Question Bank
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Proctored Exams
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Author adaptive evaluations, configure rubrics, and leverage AI to synthesize high-yield technical question banks.
          </p>
        </div>

        <button
          onClick={() => setAiModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Question Generator</span>
        </button>
      </div>

      <div className="space-y-4">
        {assessments.map((a) => (
          <div
            key={a.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  {a.status}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{a.difficulty} Difficulty</span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">{a.title}</h3>
              <div className="text-xs text-zinc-400 font-mono mt-1 flex items-center gap-3">
                <span>{a.questionsCount} Questions</span>
                <span>•</span>
                <span>{a.submissionsCount} Submissions Graded</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center font-mono">
                <div className="text-lg font-bold text-emerald-400">{a.avgScore}</div>
                <div className="text-[10px] text-zinc-500">Cohort Average</div>
              </div>

              <Link
                href="/assessments"
                className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 font-bold text-xs transition"
              >
                Inspect Questions
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generator Modal */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-lg w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1a2236] pb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  AI Question Generator Studio
                </h3>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-zinc-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Topic / Conceptual Domain
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={generating}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{generating ? 'Synthesizing...' : 'Generate 4 Questions'}</span>
                </button>
              </div>
            </form>

            {generatedQuestions.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-[#1a2236]">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Generated Questions (Editable by Educator):
                </span>
                {generatedQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#070a12] border border-[#162136] text-xs space-y-2">
                    <div className="font-semibold text-white">{q.question}</div>
                    <div className="space-y-1">
                      {q.options?.map((opt: string, optIdx: number) => (
                        <div
                          key={optIdx}
                          className={`p-1.5 rounded text-[11px] font-mono ${
                            optIdx === q.answer
                              ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                              : 'text-zinc-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}) {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
