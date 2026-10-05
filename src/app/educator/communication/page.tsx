'use client';

import React, { useState } from 'react';
import { Send, MessageSquare, Bell, CheckCircle2, Sparkles } from 'lucide-react';

export default function EducatorCommunicationPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [targetCohort, setTargetCohort] = useState('ALL');
  const [sentToast, setSentToast] = useState('');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSentToast(`Broadcast announcement successfully dispatched to ${targetCohort === 'ALL' ? 'all cohorts' : targetCohort}`);
    setSubject('');
    setMessage('');
    setTimeout(() => setSentToast(''), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {sentToast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>{sentToast}</span>
          <button onClick={() => setSentToast('')} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Communication & Broadcast Console
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Announcements
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Dispatch announcements, proctored test deadline reminders, and academic notifications to student cohorts.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-2xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          New Cohort Announcement
        </h3>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Recipient Audience
            </label>
            <select
              value={targetCohort}
              onChange={(e) => setTargetCohort(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Active Cohorts (106 Students)</option>
              <option value="Fall 2026 AI Systems">Fall 2026 AI Systems (42 Students)</option>
              <option value="Full-Stack Distributed Core">Full-Stack Distributed Core (36 Students)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Announcement Title / Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Checkpoint Exam 2: Redis Invalidation Window Open"
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Enter message details, submission instructions, or feedback..."
              className="w-full p-3 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
