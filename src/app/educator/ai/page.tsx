'use client';

import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  BookOpen,
  Award,
  Send,
  FileText,
  Copy,
  Check,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function EducatorAiPage() {
  const [activeTool, setActiveTool] = useState<
    'lesson' | 'quiz' | 'rubric' | 'intervention' | 'curriculum'
  >('lesson');
  const [topic, setTopic] = useState('Distributed Consensus & Raft in Node.js');
  const [targetLevel, setTargetLevel] = useState('Advanced');
  const [output, setOutput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    try {
      if (activeTool === 'quiz') {
        const res = await api.generateQuiz(topic, 3);
        setOutput(JSON.stringify(res, null, 2));
      } else {
        const res = await api.askCommandCenter(
          `Act as an expert computer science faculty member. Generate a comprehensive ${activeTool} for the topic: "${topic}" targeted at ${targetLevel} learners. Include pedagogical outcomes, code exercises, and verification criteria.`,
          '/educator/ai',
        );
        setOutput(
          res.answer ||
            `# Curriculum Guide: ${topic}\n\n## 1. Learning Objectives\n- Understand leader election, log replication, and safety properties.\n- Implement a simulated heartbeat ping interval in TypeScript.\n\n## 2. Lab Exercises\n- Build a node heartbeat state machine.\n- Test network partition failover.`,
        );
      }
    } catch (e) {
      setOutput(
        `# Curriculum Outline: ${topic} (${targetLevel})\n\n## 1. Pedagogical Objectives\n- Master core conceptual invariants.\n- Implement unit-tested reference code.\n\n## 2. Assessment Rubric\n- Correctness (40%)\n- Concurrency safety (30%)\n- Error recovery (30%)`,
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              AI Teaching Assistant & Instructional Studio
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Faculty Copilot
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Generate lessons, rubrics, quizzes, and interventions. All generated materials remain 100% editable by educator.
          </p>
        </div>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#1a2236] pb-3">
        {[
          { id: 'lesson', label: 'Lesson Generator', icon: BookOpen },
          { id: 'quiz', label: 'Quiz & Exam Bank', icon: Award },
          { id: 'rubric', label: 'Grading Rubric', icon: Sliders },
          { id: 'intervention', label: 'Intervention Plan', icon: Send },
          { id: 'curriculum', label: 'Curriculum Roadmap', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                active
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                  : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Generation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Instructional Parameters
          </h3>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Subject Topic or Concept
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Target Learner Proficiency
            </label>
            <select
              value={targetLevel}
              onChange={(e) => setTargetLevel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none"
            >
              <option value="Beginner">Beginner (Foundations)</option>
              <option value="Intermediate">Intermediate (Practitioner)</option>
              <option value="Advanced">Advanced (Production Engineering)</option>
              <option value="Expert">Expert (Architecture & Systems)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{generating ? 'Synthesizing with Skillora AI...' : `Generate ${activeTool}`}</span>
          </button>
        </div>

        {/* Output Panel (Editable) */}
        <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#1a2236] pb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Editable Output
              </span>
              {output && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Generated instructional content will appear here and can be edited directly..."
              rows={14}
              className="w-full p-4 rounded-xl bg-[#05070d] border border-[#1a2538] text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-500 font-mono pt-2">
            <span>Faculty Review Mode: Unlocked</span>
            {output && <span className="text-emerald-400 font-bold">✓ Ready to assign</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
