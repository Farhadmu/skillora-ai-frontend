'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Play, Clock, CheckCircle2, BookOpen, Search, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const [filter, setFilter] = useState('ALL');

  const courses = [
    {
      id: 'c-1',
      title: 'Production NestJS & Clean Architecture Microservices',
      instructor: 'Dr. Alan Mitchell',
      level: 'Advanced',
      lessonsCount: 14,
      completedLessons: 10,
      progress: 71,
      category: 'Backend',
      duration: '7.5h',
    },
    {
      id: 'c-2',
      title: 'Vector Search, RAG Pipelines & Gemini Embeddings',
      instructor: 'Prof. Sumaiya Begum',
      level: 'Advanced',
      lessonsCount: 10,
      completedLessons: 4,
      progress: 40,
      category: 'AI',
      duration: '8.0h',
    },
    {
      id: 'c-3',
      title: 'Type-Level TypeScript & Metaprogramming Patterns',
      instructor: 'Elena Rostova',
      level: 'Expert',
      lessonsCount: 8,
      completedLessons: 8,
      progress: 100,
      category: 'Languages',
      duration: '5.0h',
    },
    {
      id: 'c-4',
      title: 'Docker Orchestration & Multi-Stage Deployment',
      instructor: 'Marcus Vance',
      level: 'Intermediate',
      lessonsCount: 12,
      completedLessons: 6,
      progress: 50,
      category: 'DevOps',
      duration: '6.0h',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Curated Courses & Modules
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              Enrolled Curriculum
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Modular learning pathways structured with theory, code drills, and verified checkpoint tests.
          </p>
        </div>

        <Link
          href="/learner/learning/ai-teacher"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs transition"
        >
          <span>Ask Socratic AI to Explain Concept</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-cyan-500/30 transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-mono text-cyan-400 font-bold uppercase">{course.category}</span>
                <span className="px-2 py-0.5 rounded bg-[#101726] border border-[#1e293b] text-zinc-300 text-[10px]">
                  {course.level}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2 leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">Instructor: {course.instructor}</p>

              {/* Progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono">
                    {course.completedLessons} / {course.lessonsCount} Lessons
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">{course.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#121929] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#151e30] flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.duration}
              </span>

              <Link
                href="/learner/learning"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition"
              >
                <Play className="w-3 h-3 fill-emerald-400" />
                <span>Continue Lesson</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
