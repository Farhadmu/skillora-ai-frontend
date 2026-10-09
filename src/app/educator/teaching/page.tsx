'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Edit3,
  Eye,
  ArrowRight,
  GraduationCap,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { educatorApi } from '@/lib/api/educator';

export default function EducatorTeachingPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [targetSkill, setTargetSkill] = useState('TypeScript');
  const [creating, setCreating] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await educatorApi.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error('Failed to load courses:', err);
      setError(err?.message || 'Failed to fetch courses from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      setCreating(true);
      await educatorApi.createCourse({
        title: newTitle.trim(),
        targetSkill: targetSkill.trim(),
        modules: [
          {
            title: 'Foundations & Architectural Overview',
            lessons: [{ title: 'Overview & Design Principles', type: 'article' }],
          },
        ],
      });
      setNewTitle('');
      setCreateModalOpen(false);
      await fetchCourses();
    } catch (err: any) {
      alert(err?.message || 'Failed to create course');
    } finally {
      setCreating(false);
    }
  };

  const togglePublish = async (course: any) => {
    const newStatus = course.status === 'published' ? 'draft' : 'published';
    try {
      await educatorApi.updateCourse(course.id || course._id, { status: newStatus });
      setCourses((prev) =>
        prev.map((c) =>
          (c.id || c._id) === (course.id || course._id) ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (err: any) {
      alert(err?.message || 'Failed to update course status');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Curriculum & Course Studio
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Live Syllabus Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Author modules, configure lesson checkpoints, assign proctored assessments, and manage publishing states.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {loading && (
        <div className="p-12 text-center rounded-2xl bg-[#090d16] border border-[#1a2236] text-zinc-400 space-y-3">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
          <p className="text-xs font-mono">Loading curriculum courses from database...</p>
        </div>
      )}

      {error && !loading && (
        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Failed to load courses</span>
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
            You haven't authored any courses yet. Click &quot;Create New Course&quot; to build a structured curriculum connected to assessments and skill evidence.
          </p>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
          >
            Author First Course
          </button>
        </div>
      )}

      {/* Course List */}
      {!loading && !error && courses.length > 0 && (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id || course._id}
              className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider font-mono ${
                      course.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {course.status ? course.status.toUpperCase() : 'DRAFT'}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    Target Skill: {course.targetSkill || 'Software Engineering'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{course.title}</h3>
                <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                  <span>{(course.modules || []).length} Modules</span>
                  <span>•</span>
                  <span>{course.enrolledCount || 0} Enrolled</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePublish(course)}
                  className="px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition bg-[#111728] border-[#1e2d44] text-zinc-300 hover:text-white"
                >
                  {course.status === 'published' ? 'Unpublish' : 'Publish to Catalog'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {createModalOpen && (
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
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced TypeScript & NestJS Enterprise Architecture"
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Target Skill
                </label>
                <input
                  type="text"
                  required
                  value={targetSkill}
                  onChange={(e) => setTargetSkill(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition disabled:opacity-50"
                >
                  {creating ? 'Saving...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
