'use client';

import React, { useState } from 'react';
import { Bookmark, FileText, Plus, Trash2, Edit3, Save, Check } from 'lucide-react';

interface Note {
  id: string;
  topic: string;
  category: string;
  snippet: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'n-1',
      topic: 'NestJS Interceptors vs Middleware Execution Order',
      category: 'Backend',
      snippet: 'Middleware executes before route handler. Interceptors wrap execution around both handler and response stream (RxJS tap / map / catchError).',
      createdAt: 'Oct 3, 2026',
    },
    {
      id: 'n-2',
      topic: 'Vector DB Cosine Similarity Formula & Metric Caveat',
      category: 'AI / RAG',
      snippet: 'Dot product is identical to cosine similarity when embeddings are pre-normalized to unit vector length L2 = 1.0. Saves CPU time during matrix multiplication.',
      createdAt: 'Oct 1, 2026',
    },
    {
      id: 'n-3',
      topic: 'TypeScript infer keyword in conditional types',
      category: 'TypeScript',
      snippet: 'type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any; Use infer to dynamically deduce inner type parameters.',
      createdAt: 'Sep 28, 2026',
    },
  ]);

  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newSnippet, setNewSnippet] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (!newTopic.trim() || !newSnippet.trim()) return;
    const item: Note = {
      id: 'n-' + Date.now(),
      topic: newTopic,
      category: newCategory,
      snippet: newSnippet,
      createdAt: 'Just now',
    };
    setNotes([item, ...notes]);
    setNewTopic('');
    setNewSnippet('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Saved Notes & Revision Digest
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Recall System
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Personal engineering notes, memory formulas, and algorithmic caveats captured during Socratic practice.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Revision Note</span>
        </button>
      </div>

      {isAdding && (
        <div className="p-5 rounded-2xl bg-[#0c1220] border border-emerald-500/30 space-y-3 animate-in fade-in duration-150">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">New Engineering Note</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Topic title (e.g. Redis Cache Eviction Policy)"
              className="px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category (e.g. Distributed Systems)"
              className="px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <textarea
            value={newSnippet}
            onChange={(e) => setNewSnippet(e.target.value)}
            rows={3}
            placeholder="Technical note content, code syntax, or conceptual takeaway..."
            className="w-full p-3 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 font-mono text-[10px]">
                  {note.category}
                </span>
                <span className="text-zinc-500 font-mono text-[11px]">{note.createdAt}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">{note.topic}</h3>
              <p className="text-xs text-zinc-300 mt-2 font-mono bg-[#070a12] p-3 rounded-xl border border-[#151e30] leading-relaxed">
                {note.snippet}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleDelete(note.id)}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
