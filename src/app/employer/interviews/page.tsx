'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, Plus, Play, Sparkles, ArrowRight } from 'lucide-react';

export default function EmployerInterviewsPage() {
  const [interviews, setInterviews] = useState([
    {
      id: 'int-1',
      candidateAlias: 'Candidate #8841',
      interviewer: 'David Chen (Principal Architect)',
      date: 'Thursday, Oct 8, 2026',
      time: '2:00 PM EST',
      type: 'Technical & System Architecture Round',
      status: 'SCHEDULED',
      suggestedQuestions: [
        'How do you handle Redis cache stampede when multiple workers request an invalidated vector key?',
        'Walk through your NestJS custom dependency injection interceptor implementation.',
      ],
    },
    {
      id: 'int-2',
      candidateAlias: 'Candidate #9102',
      interviewer: 'Sarah Jenkins (VP of Engineering)',
      date: 'Friday, Oct 9, 2026',
      time: '11:00 AM EST',
      type: 'Technical Deep-Dive & Coding Lab Review',
      status: 'SCHEDULED',
      suggestedQuestions: [
        'Explain how you structured your promise pooling concurrency limiter to prevent event loop lag.',
      ],
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [candidate, setCandidate] = useState('Candidate #7419');
  const [interviewerName, setInterviewerName] = useState('Marcus Vance');
  const [time, setTime] = useState('3:00 PM EST');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setInterviews([
      ...interviews,
      {
        id: 'int-' + Date.now(),
        candidateAlias: candidate,
        interviewer: interviewerName,
        date: 'Next Monday, Oct 12, 2026',
        time,
        type: 'General Technical & Systems Evaluation',
        status: 'SCHEDULED',
        suggestedQuestions: [
          'Discuss your experience optimizing Alpine multi-stage Dockerfiles.',
        ],
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Technical Interview Management
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Evaluation Center
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Coordinate technical panels, review auto-generated proctor questions, and log structured candidate evaluations.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Technical Interview</span>
        </button>
      </div>

      <div className="space-y-4">
        {interviews.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-purple-500/30 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-white">{item.candidateAlias}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    {item.status}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">
                  {item.type} • Interviewer: {item.interviewer}
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>
                  {item.date} at {item.time}
                </span>
              </div>
            </div>

            {/* Suggested Interview Questions */}
            <div className="p-4 rounded-xl bg-[#0c1220] border border-[#162136] space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Suggested Technical Probes:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {item.suggestedQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Schedule Interview Round</h3>
            <form onSubmit={handleSchedule} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Candidate
                </label>
                <input
                  type="text"
                  value={candidate}
                  onChange={(e) => setCandidate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Lead Interviewer
                </label>
                <input
                  type="text"
                  value={interviewerName}
                  onChange={(e) => setInterviewerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Time Slot
                </label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
