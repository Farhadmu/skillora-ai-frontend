'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Languages,
  Layers,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api, getCurrentUser } from '@/lib/api';

export default function TutorPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [subject, setSubject] = useState('Full-Stack Architecture');
  const [mode, setMode] = useState<'teach' | 'practice' | 'explain' | 'challenge' | 'revision' | 'interview'>('teach');
  const [bloomsLevel, setBloomsLevel] = useState('Analyze');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const [messages, setMessages] = useState<any[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      text: `Welcome to the Socratic AI Tutor Studio. I am grounded in verified architectural documentation and Bloom’s Taxonomy. 

We are currently exploring ${subject} in ${mode.toUpperCase()} mode. 

To begin: When architecting a high-throughput microservices gateway, how would you design the trade-off between strict request schema validation latency and fail-fast resilience?`,
      bloomsLevel: 'Analyze',
      socraticHint: 'Consider where validation pipes run relative to route guards and interceptors.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const user = getCurrentUser();
      const res = await api.chatWithTutor({
        message: currentInput,
        subject,
        mode,
        bloomsLevel,
        language,
        useRag: true,
      });

      setMessages((prev) => [...prev, res.reply]);
    } catch (err: any) {
      console.error('Tutor chat failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFlashcards = async () => {
    try {
      const cards = await api.getFlashcards(subject);
      setFlashcards(cards);
      setCurrentCardIdx(0);
      setIsFlipped(false);
      setShowFlashcards(true);
    } catch (err) {
      console.error('Failed to load flashcards:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* ======================================================== */}
        {/* CONTROL DECK: SUBJECT, MODE, BLOOM'S, LANGUAGE */}
        {/* ======================================================== */}
        <div className="p-4 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Selector */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Domain / Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Full-Stack Architecture">Full-Stack Architecture</option>
                <option value="TypeScript Enterprise Patterns">TypeScript Enterprise Patterns</option>
                <option value="NestJS & Inversion of Control">NestJS & Inversion of Control</option>
                <option value="RAG & Vector Embeddings">RAG & Vector Embeddings</option>
                <option value="MongoDB Indexing & Schema Design">MongoDB Indexing & Schema Design</option>
                <option value="Docker & Container Orchestration">Docker & Container Orchestration</option>
                <option value="Distributed System Design">Distributed System Design</option>
              </select>
            </div>

            {/* Tutor Mode */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Pedagogical Mode
              </label>
              <div className="flex rounded-xl bg-[#111726] border border-[#1e293b] p-0.5">
                {(['teach', 'practice', 'explain', 'challenge', 'revision'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                      mode === m
                        ? 'bg-emerald-500 text-black shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloom's Taxonomy Level */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Bloom&apos;s Level
              </label>
              <select
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value)}
                className="bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="Remember">Level 1: Remember</option>
                <option value="Understand">Level 2: Understand</option>
                <option value="Apply">Level 3: Apply</option>
                <option value="Analyze">Level 4: Analyze</option>
                <option value="Evaluate">Level 5: Evaluate</option>
                <option value="Create">Level 6: Create</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111726] border border-[#1e293b] text-xs font-bold hover:border-emerald-500 transition"
              title="Toggle English / Bengali"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'en' ? 'Language: EN' : 'Language: বাংলা'}</span>
            </button>

            {/* Flashcards */}
            <button
              onClick={loadFlashcards}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Flashcards</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CHAT SESSION CONTAINER & SOCRATIC HINTS */}
        {/* ======================================================== */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[550px]">
          {/* Main Socratic Chat Window */}
          <div className="lg:col-span-3 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-col overflow-hidden">
            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-emerald-500 text-black'
                        : 'bg-[#111828] text-emerald-400 border border-emerald-500/30 shadow'
                    }`}
                  >
                    {m.sender === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-2 max-w-[85%]">
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        m.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-[#0e1424] border border-[#192338] text-zinc-200 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* Socratic Hint & Citations (Tutor messages only) */}
                    {m.sender === 'tutor' && (
                      <div className="space-y-2">
                        {m.socraticHint && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>Socratic Hint:</strong> {m.socraticHint}
                            </div>
                          </div>
                        )}

                        {m.citations && m.citations.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-[#080d16] border border-[#161f33] text-[11px] text-zinc-400 space-y-1">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Grounded RAG Citations
                            </div>
                            {m.citations.map((c: any, i: number) => (
                              <div key={i} className="truncate">
                                • [{c.trustLevel}] <strong>{c.source}</strong>: {c.topic}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 p-3 text-xs text-zinc-500 italic">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Socratic Tutor is formulating next inquiry...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-[#1a2236] bg-[#070b13]">
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Explain your approach, ask for a Socratic hint, or analyze trade-offs..."
                  className="flex-1 bg-[#101726] border border-[#1e293b] rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Socratic Pedagogy Sidebar */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Pedagogical Framework
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">Bloom&apos;s Taxonomy Ladder</h4>
              </div>

              <div className="space-y-1.5 text-xs">
                {[
                  { lvl: 'Create', desc: 'Synthesizing novel architectures' },
                  { lvl: 'Evaluate', desc: 'Auditing code trade-offs & scale' },
                  { lvl: 'Analyze', desc: 'Deconstructing bottlenecks' },
                  { lvl: 'Apply', desc: 'Implementing production patterns' },
                  { lvl: 'Understand', desc: 'Explaining underlying principles' },
                  { lvl: 'Remember', desc: 'Recalling syntax & concepts' },
                ].map((b, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-left transition ${
                      bloomsLevel === b.lvl
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-[#0e1424] border-[#161f33] text-zinc-400'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span>{b.lvl}</span>
                      {bloomsLevel === b.lvl && <span className="text-[9px] text-emerald-400">Target</span>}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#090d16] border border-[#161f33] space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <Flame className="w-3.5 h-3.5" />
                Active Cognitive Friction
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Rather than delivering copy-paste solutions, the tutor guides you to discover answers yourself, building lasting neural pathways and job-ready problem-solving instincts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* FLASHCARD MODAL */}
      {/* ======================================================== */}
      {showFlashcards && flashcards.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0b0f19] border border-[#1e293b] p-6 shadow-2xl flex flex-col space-y-6">
            <div className="flex items-center justify-between border-b border-[#1a2236] pb-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Concept Flashcards • {subject}</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Card {currentCardIdx + 1} of {flashcards.length}
              </span>
            </div>

            {/* Flashcard interactive surface */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[220px] p-6 rounded-2xl bg-[#0e1424] border border-emerald-500/30 flex flex-col justify-between cursor-pointer hover:border-emerald-500 transition shadow-inner"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {isFlipped ? 'Answer & Architectural Rationale' : 'Conceptual Question (Click to Flip)'}
              </div>
              <div className="text-sm font-semibold text-white leading-relaxed my-auto text-center">
                {isFlipped ? flashcards[currentCardIdx].back : flashcards[currentCardIdx].front}
              </div>
              <div className="text-[10px] text-zinc-500 text-center">
                Click card to flip between question and explanation
              </div>
            </div>

            {/* Card controls */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={currentCardIdx === 0}
                onClick={() => {
                  setCurrentCardIdx((prev) => Math.max(prev - 1, 0));
                  setIsFlipped(false);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#162035] text-white disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => setShowFlashcards(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Close Deck
              </button>

              <button
                type="button"
                disabled={currentCardIdx === flashcards.length - 1}
                onClick={() => {
                  setCurrentCardIdx((prev) => Math.min(prev + 1, flashcards.length - 1));
                  setIsFlipped(false);
                }}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-40"
              >
                Next Card
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
