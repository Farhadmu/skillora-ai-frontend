'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  BookOpen,
  Bot,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Zap,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function LearnerLearnPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loadingFlashcards, setLoadingFlashcards] = useState(false);

  const modules = [
    {
      id: 'mod-1',
      title: 'Advanced TypeScript & NestJS Enterprise Architecture',
      instructor: 'Dr. Alan Mitchell',
      domain: 'Backend & Systems',
      level: 'Advanced',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      duration: '6.5 hours',
      skillsCovered: ['TypeScript', 'NestJS', 'Dependency Injection', 'Decorators'],
      activeLesson: 'Lesson 10: Dynamic Modules and Scoped Providers in Production',
      status: 'in-progress',
    },
    {
      id: 'mod-2',
      title: 'Vector Search, RAG Pipelines & Gemini Embeddings',
      instructor: 'Prof. Sumaiya Begum',
      domain: 'AI & Machine Learning',
      level: 'Advanced',
      progress: 40,
      totalLessons: 10,
      completedLessons: 4,
      duration: '8.0 hours',
      skillsCovered: ['RAG', 'Vector Embeddings', 'Qdrant', 'Gemini AI'],
      activeLesson: 'Lesson 5: Hybrid Sparse-Dense Retrieval and BM25 Reranking',
      status: 'in-progress',
    },
    {
      id: 'mod-3',
      title: 'Modern Next.js 16 App Router & Server Components',
      instructor: 'Elena Rostova',
      domain: 'Frontend Engineering',
      level: 'Intermediate',
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      duration: '5.0 hours',
      skillsCovered: ['Next.js', 'React 19', 'Server Actions', 'Streaming'],
      activeLesson: 'Completed (Verified Certificate Available)',
      status: 'completed',
    },
    {
      id: 'mod-4',
      title: 'Distributed Systems & Microservices Reliability',
      instructor: 'Dr. Alan Mitchell',
      domain: 'Architecture',
      level: 'Advanced',
      progress: 15,
      totalLessons: 14,
      completedLessons: 2,
      duration: '10.5 hours',
      skillsCovered: ['System Design', 'Kafka', 'Redis', 'Circuit Breakers'],
      activeLesson: 'Lesson 3: Sagas Pattern vs Two-Phase Commit',
      status: 'in-progress',
    },
    {
      id: 'mod-5',
      title: 'Production Docker, Kubernetes & CI/CD Pipelines',
      instructor: 'Victor Vance',
      domain: 'DevOps & Cloud',
      level: 'Intermediate',
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      duration: '7.0 hours',
      skillsCovered: ['Docker', 'Kubernetes', 'GitHub Actions', 'Helm'],
      activeLesson: 'Not Started',
      status: 'saved',
    },
  ];

  useEffect(() => {
    fetchFlashcards('TypeScript');
  }, []);

  const fetchFlashcards = async (topic: string) => {
    setLoadingFlashcards(true);
    try {
      const cards = await api.getFlashcards(topic);
      setFlashcards(cards || []);
    } catch {
      setFlashcards([
        {
          id: 'fc-1',
          front: 'What is Declaration Merging in TypeScript interfaces?',
          back: 'Interfaces can be defined across multiple files or blocks; TypeScript compiler automatically unites their definitions into a unified contract.',
        },
        {
          id: 'fc-2',
          front: 'Why avoid Request-Scoped providers in high-throughput NestJS microservices?',
          back: 'They force re-instantiation of the entire dependent subtree for every HTTP request, defeating singleton memory pooling.',
        },
      ]);
    } finally {
      setLoadingFlashcards(false);
    }
  };

  const filteredModules = modules.filter((m) => {
    if (activeTab === 'in-progress' && m.status !== 'in-progress') return false;
    if (activeTab === 'saved' && m.status !== 'saved') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.skillsCovered.some((s) => s.toLowerCase().includes(q)) ||
        m.domain.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Learning Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              My Learning & Knowledge Hub
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Targeted workforce modules mapped directly to your Career Goal & Skill Gap Roadmap
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/learner/ai-teacher"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-95 transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Bot className="w-4 h-4" />
              <span>Launch Socratic AI Teacher</span>
            </Link>
          </div>
        </div>

        {/* Continue Learning Spotlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c192d] via-[#091424] to-[#060b13] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-3 h-3" />
                <span>Active Learning Session • 75% Complete</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                Advanced TypeScript & NestJS Enterprise Architecture
              </h2>
              <p className="text-xs text-zinc-400">
                Current Lesson: <strong className="text-zinc-200">Dynamic Modules and Scoped Providers in Production</strong>
              </p>
              <div className="pt-2">
                <div className="w-full h-2 bg-[#121c2e] rounded-full overflow-hidden max-w-md">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                    style={{ width: '75%' }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1 max-w-md">
                  <span>9 of 12 Lessons Completed</span>
                  <span>75%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/learner/ai-teacher"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <span>Ask AI Tutor to Explain</span>
              </Link>

              <Link
                href="/learner/assessments"
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Resume Lesson</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0b0f19] border border-[#1a2236]">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'in-progress', label: 'In Progress' },
              { id: 'saved', label: 'Saved for Later' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search courses or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b0f19] border border-[#1a2236] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] hover:border-emerald-500/30 transition flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#161f33] text-zinc-400 font-mono border border-zinc-700/50">
                    {mod.domain}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mod.level === 'Advanced'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}
                  >
                    {mod.level}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition line-clamp-2">
                  {mod.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Instructor: {mod.instructor}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {mod.skillsCovered.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#111726] text-zinc-300 border border-[#1e293b]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#161f33] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {mod.duration}
                  </span>
                  <span className="font-bold text-white">{mod.progress}% Complete</span>
                </div>

                <div className="w-full h-1.5 bg-[#141b2b] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      mod.progress === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                    }`}
                    style={{ width: `${mod.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-zinc-500">
                    {mod.completedLessons} / {mod.totalLessons} Lessons
                  </span>
                  <Link
                    href={`/learner/ai-teacher?subject=${encodeURIComponent(mod.skillsCovered[0])}`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>{mod.progress === 100 ? 'Review with AI' : 'Continue'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick AI Flashcard Revision Section */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Daily AI Flashcard Concept Booster</h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {(['TypeScript', 'NestJS', 'RAG Systems', 'System Design'] as const).map((topic) => (
                <button
                  key={topic}
                  onClick={() => fetchFlashcards(topic)}
                  className="px-2.5 py-1 rounded-lg bg-[#111726] border border-[#1e293b] text-zinc-400 hover:text-white hover:border-emerald-500/30 transition text-[11px]"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.slice(0, 2).map((fc, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#111726] border border-[#1e293b] space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Concept Prompt #{i + 1}
                </div>
                <div className="text-xs font-bold text-white">{fc.front}</div>
                <div className="text-xs text-zinc-400 pt-2 border-t border-[#1e293b] leading-relaxed">
                  {fc.back}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
