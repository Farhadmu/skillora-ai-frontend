'use client';

import React, { useState } from 'react';
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
} from 'lucide-react';

export default function EducatorTeachingPage() {
  const [courses, setCourses] = useState([
    {
      id: 'c-1',
      title: 'Advanced TypeScript & NestJS Enterprise Architecture',
      modulesCount: 5,
      lessonsCount: 14,
      enrolledLearners: 84,
      status: 'PUBLISHED',
      completionRate: '78%',
    },
    {
      id: 'c-2',
      title: 'Vector Search, RAG Pipelines & Gemini Embeddings',
      modulesCount: 4,
      lessonsCount: 10,
      enrolledLearners: 62,
      status: 'PUBLISHED',
      completionRate: '65%',
    },
    {
      id: 'c-3',
      title: 'Distributed Systems & Raft Consensus Mechanisms',
      modulesCount: 6,
      lessonsCount: 18,
      enrolledLearners: 45,
      status: 'DRAFT',
      completionRate: '0%',
    },
  ]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Backend');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newCourse = {
      id: 'c-' + Date.now(),
      title: newTitle,
      modulesCount: 1,
      lessonsCount: 3,
      enrolledLearners: 0,
      status: 'DRAFT',
      completionRate: '0%',
    };
    setCourses([newCourse, ...courses]);
    setNewTitle('');
    setCreateModalOpen(false);
  };

  const togglePublish = (id: string) => {
    setCourses(
      courses.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED' }
          : c,
      ),
    );
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
              Course Builder
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

      {/* Course List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider font-mono ${
                    course.status === 'PUBLISHED'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}
                >
                  {course.status}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  {course.modulesCount} Modules • {course.lessonsCount} Lessons
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">{course.title}</h3>

              <div className="text-xs text-zinc-400 font-mono flex items-center gap-4">
                <span>{course.enrolledLearners} Enrolled Students</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">Avg Completion: {course.completionRate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => togglePublish(course.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  course.status === 'PUBLISHED'
                    ? 'bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {course.status === 'PUBLISHED' ? 'Unpublish' : 'Publish Course'}
              </button>

              <Link
                href="/educator/ai"
                className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Assist</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for new course */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Course Curriculum</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus & Raft in Go"
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
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs"
                >
                  Create Course Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
