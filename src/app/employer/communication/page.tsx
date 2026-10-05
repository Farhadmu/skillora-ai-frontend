'use client';

import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle2, User } from 'lucide-react';

export default function EmployerCommunicationPage() {
  const [candidate, setCandidate] = useState('Candidate #8841');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setToast(`Confidential message dispatched to ${candidate} via Skillora Secure ATS Relay`);
    setMessage('');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>{toast}</span>
          <button onClick={() => setToast('')} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Candidate Communication Relay
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-bold font-mono">
              Secure Messaging
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Send interview invitations, technical lab debriefs, and offer packets directly to shortlisted candidates.
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] max-w-2xl space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
          Direct Candidate Message
        </h3>

        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Recipient Candidate
            </label>
            <select
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Candidate #8841">Candidate #8841 (Full-Stack AI Systems)</option>
              <option value="Candidate #9102">Candidate #9102 (Backend Node.js)</option>
              <option value="Candidate #7419">Candidate #7419 (Platform Reliability)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Hi there, your verified skill dossier in NestJS and RAG was reviewed by our engineering panel..."
              className="w-full p-3 rounded-xl bg-[#05070d] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-purple-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Secure Message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
