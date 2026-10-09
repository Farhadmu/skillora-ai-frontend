'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, FileText, Video, Plus, Search, ExternalLink, Clock, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { educatorApi } from '@/lib/api/educator';

export default function EducatorContentPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [targetSkill, setTargetSkill] = useState('TypeScript');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await educatorApi.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load courses:', err);
      setError(err?.message || 'Failed to fetch course content from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setCreating(true);
      await educatorApi.createCourse({
        title: title.trim(),
        targetSkill: targetSkill.trim(),
        level,
        description: description.trim(),
        modules: [
          {
            title: 'Core Fundamentals & Architecture',
            duration: '45 mins',
            lessons: [{ title: 'Module 1: Production Patterns', type: 'article' }],
          },
        ],
      });
      setTitle('');
      setDescription('');
      setModalOpen(false);
      await fetchCourses();
    } catch (err: any) {
      alert(err?.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Faculty Course & Curriculum Hub
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Live Syllabus Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Author and publish verified learning tracks, syllabus modules, and skill-aligned curricula stored in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/educator/ai"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111728] hover:bg-[#1a233c] border border-[#1e2d44] text-white font-bold text-xs transition"
          >
            <span>AI Syllabus Draft</span>
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
          <p className="text-xs font-mono">Loading course curriculum records from MongoDB...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Failed to load curriculum</span>
          </div>
          <p className="text-xs">{error}</p>
          <button
            onClick={fetchCourses}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono font-bold transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <BookOpen className="w-8 h-8 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No Courses Created Yet</h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            You haven&apos;t created any curriculum courses yet. Start authoring learning programs with linked assignments and verified target skills.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
          >
            Create First Course
          </button>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="space-y-4">
          {courses.map((c) => (
            <div
              key={c.id || c._id}
              className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold text-[10px]">
                    {c.level || 'Intermediate'}
                  </span>
                  <span className="text-zinc-400 font-mono">Target Skill: {c.targetSkill || 'Full-Stack'}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">{c.title}</h3>
                {c.description && <p className="text-xs text-zinc-400 max-w-2xl">{c.description}</p>}
                <div className="text-xs text-zinc-500 font-mono flex items-center gap-3">
                  <span>{(c.modules || []).length} Modules</span>
                  <span>•</span>
                  <span>{c.enrolledCount || 0} Learners Enrolled</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
                  c.status === 'published'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  {c.status ? c.status.toUpperCase() : 'DRAFT'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Curriculum Course</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Production Distributed Microservices in NestJS"
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Primary Target Skill
                </label>
                <input
                  type="text"
                  required
                  value={targetSkill}
                  onChange={(e) => setTargetSkill(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Difficulty Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Course learning outcomes and objectives..."
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
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
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition disabled:opacity-50"
                >
                  {creating ? 'Saving...' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
