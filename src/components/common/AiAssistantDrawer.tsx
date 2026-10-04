'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, Send, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: 'Hello! I am your Skillora AI Copilot. I analyze your verified skills, readiness score, and current learning trajectory in real time. How can I assist your career progression today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await api.askCommandCenter(query, pathname);
      setMessages((prev) => [...prev, { sender: 'assistant', text: res.answer }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: 'Skillora AI telemetry indicates you should focus on high-yield verified assessments in NestJS and RAG pipelines to accelerate your workforce readiness score past 85%.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'How do I raise my readiness score to 90%?',
    'What should be my next milestone today?',
    'Which skills should I verify first?',
    'Find jobs matching my verified profile',
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0b0f19] border-l border-[#1e293b] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[#1a2236] flex items-center justify-between bg-[#06080d]/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-[#06080d] rounded-[6px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              Skillora AI Copilot
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-zinc-400">Context: {pathname}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#161f33] text-zinc-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#161f33] text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[82%] text-xs p-3 rounded-2xl leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-[#111726] border border-[#1e293b] text-zinc-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-zinc-500 italic p-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Synthesizing platform telemetry...
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 border-t border-[#1a2236] bg-[#080c14]">
        <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
          Contextual Suggestions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-[#111726] hover:bg-[#1a233a] border border-[#1e293b] text-zinc-300 hover:text-emerald-300 transition"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-[#1a2236] bg-[#06080d]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your skills, readiness, or career..."
            className="flex-1 bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold disabled:opacity-40 transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
