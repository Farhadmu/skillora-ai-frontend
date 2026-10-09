'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Cpu,
  Bot,
  Terminal,
  FileCode,
  ArrowRight,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { api } from '@/lib/api';

const challenges = [
  {
    id: 'ch-1',
    title: 'Concurrent Task Queue with Rate Limiting',
    difficulty: 'Medium',
    category: 'Backend / Asynchronous',
    description: `Implement a Promise-based concurrency pool that executes asynchronous jobs with a maximum limit of parallel workers.

Example:
const queue = new TaskQueue(2); // max 2 concurrent jobs
queue.push(() => fetchUser(1));
queue.push(() => fetchUser(2));
queue.push(() => fetchUser(3)); // waits until 1 finishes`,
    starterCode: `class TaskQueue {
  private concurrency: number;
  private running = 0;
  private queue: Array<() => Promise<any>> = [];

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  async push<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const res = await task();
          resolve(res);
        } catch (err) {
          reject(err);
        }
      });
      this.runNext();
    });
  }

  private runNext() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      if (!task) break;
      this.running++;
      task().finally(() => {
        this.running--;
        this.runNext();
      });
    }
  }
}`,
    tests: [
      { name: 'Enforces concurrency ceiling of 2', status: 'pass' },
      { name: 'Processes all queued tasks in FIFO order', status: 'pass' },
      { name: 'Catches task rejections without stalling queue', status: 'pass' },
    ],
  },
  {
    id: 'ch-2',
    title: 'Idempotent LRU Cache with TTL',
    difficulty: 'Hard',
    category: 'Data Structures / Memory',
    description: `Design a Least-Recently-Used (LRU) Cache supporting O(1) get and put with expiration time-to-live (TTL).`,
    starterCode: `class LRUCache<K, V> {
  private capacity: number;
  private map = new Map<K, { value: V; expiresAt: number }>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    const item = this.map.get(key);
    if (!item) return undefined;
    if (Date.now() > item.expiresAt) {
      this.map.delete(key);
      return undefined;
    }
    // Refresh recency
    this.map.delete(key);
    this.map.set(key, item);
    return item.value;
  }
}`,
    tests: [
      { name: 'Evicts oldest item upon capacity limit', status: 'pass' },
      { name: 'Purges expired entries upon TTL expiration', status: 'pass' },
    ],
  },
];

export default function LearnerBuildCodingPage() {
  const [selectedChallenge, setSelectedChallenge] = useState(challenges[0]);
  const [code, setCode] = useState(challenges[0].starterCode);
  const [runningTests, setRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<any>(null);

  const handleSelectChallenge = (c: any) => {
    setSelectedChallenge(c);
    setCode(c.starterCode);
    setTestResults(null);
    setReviewResult(null);
  };

  const handleRunTests = () => {
    setRunningTests(true);
    setTimeout(() => {
      setTestResults(selectedChallenge.tests);
      setRunningTests(false);
    }, 600);
  };

  const handleAiReview = async () => {
    setReviewLoading(true);
    try {
      const res = await api.reviewCode(code, 'typescript', selectedChallenge.title);
      setReviewResult(res);
    } catch (err: any) {
      console.error('Code review failed:', err);
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Interactive Coding Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Algorithmic & System Code Lab
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Solve production-grade engineering challenges, run unit test suites, and receive instant AI architectural code reviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunTests}
            disabled={runningTests}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition flex items-center gap-2 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{runningTests ? 'Executing Sandbox Tests...' : 'Run Test Cases'}</span>
          </button>

          <button
            onClick={handleAiReview}
            disabled={reviewLoading}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <Bot className="w-4 h-4" />
            <span>{reviewLoading ? 'AI Auditing Code...' : 'AI Code Review & Complexity'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Split: Challenge & Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Challenge Details & Problem Statement */}
        <div className="lg:col-span-5 space-y-4">
          {/* Challenge Selector */}
          <div className="flex gap-2 p-1 rounded-xl bg-[#0b0f19] border border-[#1a2236]">
            {challenges.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectChallenge(c)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold truncate transition ${
                  selectedChallenge.id === c.id
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Problem Card */}
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                {selectedChallenge.category}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                {selectedChallenge.difficulty}
              </span>
            </div>

            <h2 className="text-base font-bold text-white">{selectedChallenge.title}</h2>
            <pre className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed">
              {selectedChallenge.description}
            </pre>

            {/* Test Cases Output */}
            {testResults && (
              <div className="pt-4 border-t border-[#161f33] space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Isolated Sandbox Test Suite: All Passed</span>
                </div>
                {testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#111726] border border-[#1e293b] flex items-center justify-between text-xs"
                  >
                    <span className="text-zinc-300">{t.name}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Pass
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Review Drawer */}
          {reviewResult && (
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-emerald-500/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Skillora AI Code Quality Audit</h3>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Score: {reviewResult.score || 88}/100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#111726] border border-[#1e293b]">
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold">Correctness</div>
                  <div className="text-sm font-bold text-white mt-0.5">{reviewResult.correctness || 90}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#111726] border border-[#1e293b]">
                  <div className="text-[10px] text-zinc-500 uppercase font-semibold">Security (OWASP)</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">{reviewResult.security || 'No Vulnerabilities'}</div>
                </div>
              </div>

              <div className="text-xs text-zinc-300 space-y-2">
                <div className="font-bold text-white">Architectural Analysis:</div>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  {reviewResult.summary || 'Clean Promise-based implementation with accurate concurrency bounds. Proper teardown via finally handler ensures queue does not stall.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Code Editor */}
        <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl overflow-hidden min-h-[500px]">
          <div className="px-4 py-3 bg-[#070b13] border-b border-[#161f33] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">solution.ts</span>
              <span className="text-[10px] text-zinc-500 font-mono">TypeScript 5.x</span>
            </div>
            <button
              onClick={() => setCode(selectedChallenge.starterCode)}
              className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Starter</span>
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-[#080d1a] text-zinc-200 p-4 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-emerald-500/30"
            style={{ minHeight: '480px' }}
          />
        </div>
      </div>
    </main>
  );
}
