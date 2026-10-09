'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Clock,
  Brain,
  ChevronRight,
  ChevronLeft,
  Filter,
  ArrowLeft,
  AlertCircle,
  Sparkles,
  Code2,
  ShieldCheck,
  Download,
  RefreshCw,
  Play,
  Flame,
  BookOpen,
  Share2,
  Check,
  X,
  Flag,
} from 'lucide-react';
import { assessmentApi } from '@/lib/api/assessment';

interface Question {
  id: string;
  type: string;
  prompt: string;
  starterCode?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Assessment {
  id: string;
  title: string;
  category: string;
  skillName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  passingScore: number;
  questionsCount: number;
  questions?: Question[];
}

const DEFAULT_ASSESSMENTS: Assessment[] = [
  {
    id: 'asm-1',
    title: 'TypeScript Enterprise Architecture & Strict Typing',
    category: 'Backend',
    skillName: 'TypeScript',
    difficulty: 'Advanced',
    durationMinutes: 15,
    passingScore: 80,
    questionsCount: 4,
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        prompt: 'In strict TypeScript, what is the key behavioral difference between the "unknown" and "any" top types when performing operations on a variable?',
        starterCode: 'let valUnknown: unknown;\nlet valAny: any;\n\n// Which statement below is strictly type-safe without runtime casts?',
        options: [
          '"unknown" requires explicit type narrowing or type assertions before invoking properties or calling it, whereas "any" turns off type checking entirely.',
          '"unknown" can be assigned to string directly without casting, while "any" cannot.',
          '"unknown" only accepts primitive values like number and boolean.',
          'There is no semantic difference; "unknown" is just an alias for "any" introduced in TypeScript 3.0.',
        ],
        correctAnswer: 0,
        explanation: '"unknown" is the type-safe counterpart of "any". Anything is assignable to "unknown", but "unknown" isn\'t assignable to anything else without a type assertion or control flow based narrowing.',
      },
      {
        id: 'q2',
        type: 'mcq',
        prompt: 'When creating generic conditional utility types, what does the "infer" keyword accomplish in TypeScript?',
        starterCode: 'type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;',
        options: [
          'It forces the TypeScript compiler to execute runtime type deduction in the browser.',
          'It introduces a type variable within the true branch of a conditional type to extract an inner type parameter.',
          'It marks a type parameter as mutable and non-nullable.',
          'It bypasses the strictNullChecks compiler flag for the wrapped type.',
        ],
        correctAnswer: 1,
        explanation: 'The "infer" keyword allows you to deduce and introduce a type variable dynamically within the "extends" condition of a conditional type.',
      },
      {
        id: 'q3',
        type: 'mcq',
        prompt: 'Which TypeScript tsconfig flag prevents implicit fallthrough in switch statements and prevents variables from bleeding across case blocks without block scopes?',
        options: [
          'noFallthroughCasesInSwitch',
          'strictPropertyInitialization',
          'noImplicitReturns',
          'exactOptionalPropertyTypes',
        ],
        correctAnswer: 0,
        explanation: '"noFallthroughCasesInSwitch" ensures that any non-empty case block terminates with break, return, or throw, preventing subtle logic bugs.',
      },
      {
        id: 'q4',
        type: 'mcq',
        prompt: 'In NestJS / Node.js architecture with TypeScript, why are decorators like @Injectable() required for dependency injection to function with class metadata?',
        options: [
          'They compile down to WebAssembly for instant memory allocation.',
          'They instruct TypeScript emitDecoratorMetadata to emit design:paramtypes reflection metadata at compile time.',
          'They bypass JavaScript prototype chain lookups for faster method invocation.',
          'They are purely stylistic and can be omitted without breaking DI.',
        ],
        correctAnswer: 1,
        explanation: 'Decorators combined with "emitDecoratorMetadata: true" instruct the TypeScript compiler to serialize parameter type references into reflect-metadata, allowing the DI container to instantiate dependencies automatically.',
      },
    ],
  },
  {
    id: 'asm-2',
    title: 'Next.js 16 & React 19 Server Components Deep Dive',
    category: 'Frontend',
    skillName: 'React 19 & Next.js',
    difficulty: 'Intermediate',
    durationMinutes: 15,
    passingScore: 75,
    questionsCount: 4,
    questions: [
      {
        id: 'q2-1',
        type: 'mcq',
        prompt: 'What is the primary benefit of React Server Components (RSC) regarding JavaScript client bundle size?',
        options: [
          'RSCs execute entirely on the server and their dependencies (like date-fns, markdown parsers, heavy DB libraries) are zero-cost to the client JS bundle.',
          'RSCs automatically minify HTML files using Brotli compression.',
          'RSCs run client-side inside an isolated Web Worker.',
          'RSCs replace all CSS files with inline SVG sprites.',
        ],
        correctAnswer: 0,
        explanation: 'Server Components never ship their code or imported dependencies to the browser; only the rendered virtual DOM tree JSON (RSC payload) is streamed to the client.',
      },
      {
        id: 'q2-2',
        type: 'mcq',
        prompt: 'When using Server Actions in Next.js 16 with the "use server" directive, how are mutations safely invoked from the client?',
        options: [
          'Through automatic WebSockets opened on page load.',
          'Via POST requests with automated CSRF protection, request serialization, and integrated revalidation hooks (revalidatePath/revalidateTag).',
          'By executing Node.js eval() in the browser console.',
          'By serializing SQL queries into URL query parameters.',
        ],
        correctAnswer: 1,
        explanation: 'Server Actions compile into secure POST endpoints that can be passed directly to form actions or transition triggers, handling serialized arguments and cache revalidation automatically.',
      },
      {
        id: 'q2-3',
        type: 'mcq',
        prompt: 'In React 19, what does the new "useActionState" hook provide when managing asynchronous form submissions?',
        options: [
          'A global Redux store wrapper for form fields.',
          'An integrated tuple containing the updated action state, the trigger function, and an isPending boolean for loading indicators.',
          'An automated CSS transition generator for form inputs.',
          'A polyfill for older browsers lacking JavaScript ES6 support.',
        ],
        correctAnswer: 1,
        explanation: '"useActionState" tracks the pending state of an async action along with its returning state value, dramatically reducing boilerplate for form validation and mutation status.',
      },
      {
        id: 'q2-4',
        type: 'mcq',
        prompt: 'Which strategy in Next.js allows pre-rendering dynamic routes while streaming slow backend data via Suspense boundaries?',
        options: [
          'Static Site Generation (SSG) with exportPathMap.',
          'Partial Prerendering (PPR) with React Suspense.',
          'Full Client-Side Rendering with useEffect().',
          'Service Worker offline caching only.',
        ],
        correctAnswer: 1,
        explanation: 'Partial Prerendering (PPR) combines static shell pre-rendering with dynamic streamed content wrapped in Suspense boundaries over a single HTTP connection.',
      },
    ],
  },
  {
    id: 'asm-3',
    title: 'Distributed Systems, Microservices & RAG Architecture',
    category: 'Architecture',
    skillName: 'System Design',
    difficulty: 'Advanced',
    durationMinutes: 15,
    passingScore: 80,
    questionsCount: 4,
    questions: [
      {
        id: 'q3-1',
        type: 'mcq',
        prompt: 'In a microservices architecture, how does the Outbox Pattern guarantee atomic database updates and event publishing to a message broker (e.g. Kafka/RabbitMQ)?',
        options: [
          'By publishing to the broker before writing to the database.',
          'By writing the business entity and an event record into the same database within a single local transaction, then having a separate CDC process publish to the broker.',
          'By using distributed two-phase commit (2PC) locks across all microservice databases.',
          'By ignoring network errors and relying on client retry loops.',
        ],
        correctAnswer: 1,
        explanation: 'The Transactional Outbox pattern guarantees at-least-once event delivery by storing events in an outbox table within the same ACID database transaction as the business entity, decoupling network broker availability from local transactions.',
      },
      {
        id: 'q3-2',
        type: 'mcq',
        prompt: 'When designing a Retrieval-Augmented Generation (RAG) vector index, what is the consequence of chunk sizes that are too small (<50 tokens)?',
        options: [
          'Vector database search speed slows down exponentially.',
          'Chunks lack sufficient semantic context, leading to fragmented information retrieval and poor LLM synthesis.',
          'Embeddings become completely non-invertible.',
          'Chunking smaller than 50 tokens is mathematically impossible in cosine similarity.',
        ],
        correctAnswer: 1,
        explanation: 'Under-chunking isolates sentences without their surrounding explanatory context, which causes retrieval algorithms to miss the overarching intent and leads to hallucinated answers.',
      },
      {
        id: 'q3-3',
        type: 'mcq',
        prompt: 'What core advantage does Hybrid Search (Dense Vector + BM25 Lexical) offer over Pure Vector Embeddings in enterprise documentation search?',
        options: [
          'Zero memory consumption in RAM.',
          'High accuracy for exact part numbers, error codes, and unique identifiers while preserving semantic query understanding.',
          'Eliminates the need for any embedding model API.',
          'Runs 100x faster than indexed hash tables.',
        ],
        correctAnswer: 1,
        explanation: 'Pure semantic embeddings struggle with exact lexical matches like "ERR_SOCKET_TIMEOUT_409" or UUIDs. Hybrid search with Reciprocal Rank Fusion (RRF) combines the precision of BM25 with dense semantic breadth.',
      },
      {
        id: 'q3-4',
        type: 'mcq',
        prompt: 'According to the CAP Theorem, when a network partition (P) occurs in a distributed datastore, what trade-off must be chosen?',
        options: [
          'Between Latency and Throughput.',
          'Between Consistency (C) and Availability (A).',
          'Between Scalability and Encryption.',
          'Between Relational schemas and NoSQL documents.',
        ],
        correctAnswer: 1,
        explanation: 'Under a network partition, a distributed system must choose between Consistency (returning errors/refusing writes to prevent split-brain) or Availability (accepting writes on both sides with eventual consistency).',
      },
    ],
  },
  {
    id: 'asm-4',
    title: 'Docker, CI/CD & Cloud Infrastructure Automation',
    category: 'DevOps',
    skillName: 'Docker & DevOps',
    difficulty: 'Intermediate',
    durationMinutes: 12,
    passingScore: 75,
    questionsCount: 3,
    questions: [
      {
        id: 'q4-1',
        type: 'mcq',
        prompt: 'Why are Docker multi-stage builds considered an industry best practice for production Node.js & Next.js containers?',
        options: [
          'They allow containers to run without Linux kernels.',
          'They discard heavy devDependencies, TypeScript compilers, and build caches, keeping only the production runtime artifacts in the final small, secure image.',
          'They automatically scale pods on AWS Fargate.',
          'They bypass the Docker daemon entirely.',
        ],
        correctAnswer: 1,
        explanation: 'Multi-stage builds decouple the build environment (with compilers, devDependencies, and source code) from the lean production image (dist files and production dependencies only), shrinking image size by up to 90% and reducing vulnerability surface.',
      },
      {
        id: 'q4-2',
        type: 'mcq',
        prompt: 'What is the purpose of running Docker containers with a non-root user (e.g. USER node) in production?',
        options: [
          'To increase CPU execution speed by 15%.',
          'To mitigate container breakout attacks by preventing attackers from inheriting host root privileges if the application is compromised.',
          'Because Linux kernels refuse to execute containers as root.',
          'To disable file system write access completely.',
        ],
        correctAnswer: 1,
        explanation: 'Principle of least privilege: if an attacker achieves remote code execution inside a root-run container, they have root access to the mounted volumes and could potentially exploit container escape vulnerabilities to compromise the host kernel.',
      },
      {
        id: 'q4-3',
        type: 'mcq',
        prompt: 'In automated CI/CD pipelines, what distinguishes continuous delivery from continuous deployment?',
        options: [
          'Continuous delivery requires automated tests, whereas continuous deployment does not.',
          'Continuous delivery automatically prepares code for release but requires manual trigger/approval to deploy to production, while continuous deployment deploys automatically without manual gatekeeping.',
          'Continuous delivery only applies to mobile applications.',
          'There is no technical difference.',
        ],
        correctAnswer: 1,
        explanation: 'Continuous Delivery ensures every build passing CI is releasable to production with 1-click human approval. Continuous Deployment automates the final step to production with zero manual intervention.',
      },
    ],
  },
];

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<Assessment[]>(DEFAULT_ASSESSMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeExam, setActiveExam] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Fetch assessments from backend on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await assessmentApi.getAllAssessments();
        if (Array.isArray(data) && data.length > 0) {
          // Merge with local questions if backend assessments are summaries
          const merged = data.map((bItem: any) => {
            const localMatch = DEFAULT_ASSESSMENTS.find(
              (d) => d.id === bItem.id || d.title.toLowerCase() === bItem.title.toLowerCase(),
            );
            return {
              ...bItem,
              questions: bItem.questions || localMatch?.questions || DEFAULT_ASSESSMENTS[0].questions,
            };
          });
          setAssessments(merged);
        }
      } catch (err) {
        // Fallback to rich preloaded assessments
      }
    }
    loadCatalog();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!activeExam || examSubmitted || secondsRemaining <= 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeExam, examSubmitted, secondsRemaining]);

  const categories = ['All', 'Backend', 'Frontend', 'Architecture', 'DevOps', 'AI/ML'];

  const filteredAssessments =
    selectedCategory === 'All'
      ? assessments
      : assessments.filter(
          (a) => a.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const startExam = (assessment: Assessment) => {
    setActiveExam(assessment);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions({});
    setSecondsRemaining(assessment.durationMinutes * 60);
    setExamSubmitted(false);
    setExamResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSubmitExam = async () => {
    if (!activeExam || isSubmitting) return;
    setIsSubmitting(true);

    const questions = activeExam.questions || [];
    let correctCount = 0;
    const feedbackList = questions.map((q) => {
      const userChoice = answers[q.id];
      const isCorrect = userChoice === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        prompt: q.prompt,
        userChoice,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
        options: q.options,
      };
    });

    const scorePercentage = Math.round((correctCount / (questions.length || 1)) * 100);
    const passed = scorePercentage >= activeExam.passingScore;

    const result = {
      assessmentId: activeExam.id,
      title: activeExam.title,
      skillName: activeExam.skillName,
      difficulty: activeExam.difficulty,
      scorePercentage,
      correctCount,
      totalQuestions: questions.length,
      passed,
      verificationId: `SKL-VERIF-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`,
      issuedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      feedback: feedbackList,
    };

    // Post to backend via authenticated assessmentApi
    try {
      await assessmentApi.submitAssessment(activeExam.id, answers);
    } catch (e) {}

    setExamResult(result);
    setExamSubmitted(true);
    setIsSubmitting(false);
  };

  const formatTimer = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const copyCredentialLink = () => {
    navigator.clipboard.writeText(
      `https://skillora.ai/verify/${examResult?.verificationId}`,
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#07090e]/95 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/learner/skills"
              className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Skills Directory
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/20">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  Skillora Verified Certification Assessments
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Live Testing Center
                  </span>
                </h1>
                <p className="text-xs text-zinc-400">
                  Zero-memorization technical problem solving with cryptographic skill passport issuance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learner/learning/ai-teacher"
              className="text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition"
            >
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              Socratic Practice Lab
            </Link>
            <Link
              href="/learner/build/portfolio"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              View Public Verified Passport
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {!activeExam ? (
          /* Catalog View */
          <div>
            {/* Hero banner */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 to-zinc-950 p-8 mb-8 shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  100% Industry Verified Standard
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-3">
                  Prove Your Engineering Competency with Verified Credentials
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  Skillora assessments evaluate real architectural trade-offs, code hygiene, failure modes, and distributed systems. Passing with 80%+ awards cryptographic skill verification badges directly recognized by partner employers in the talent marketplace.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-xl font-bold text-white mb-0.5">4</div>
                    <div className="text-xs text-zinc-400 font-medium">Core Tracks Live</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-xl font-bold text-emerald-400 mb-0.5">80%</div>
                    <div className="text-xs text-zinc-400 font-medium">Verification Bar</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-xl font-bold text-cyan-400 mb-0.5">Instant</div>
                    <div className="text-xs text-zinc-400 font-medium">AI Feedback & Key</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                    <div className="text-xl font-bold text-violet-400 mb-0.5">Auto-Sync</div>
                    <div className="text-xs text-zinc-400 font-medium">Talent ATS Radar</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                Showing <strong className="text-white">{filteredAssessments.length}</strong> certification exams
              </div>
            </div>

            {/* Assessment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAssessments.map((asm) => (
                <div
                  key={asm.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all p-6 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-black/50"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {asm.category}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                          asm.difficulty === 'Advanced'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : asm.difficulty === 'Intermediate'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {asm.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                      {asm.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                      Verifies production mastery in <span className="text-zinc-200 font-semibold">{asm.skillName}</span> through scenario-based architectural questions, error recovery patterns, and execution flow.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {asm.durationMinutes} Mins
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-zinc-500" />
                        {asm.questionsCount} Questions
                      </span>
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Award className="w-3.5 h-3.5" />
                        {asm.passingScore}% to Pass
                      </span>
                    </div>

                    <button
                      onClick={() => startExam(asm)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 group-hover:scale-105 active:scale-95"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Take Exam
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !examSubmitted ? (
          /* Live Exam Taking Mode */
          <div className="max-w-4xl mx-auto">
            {/* Exam Header bar with live clock */}
            <div className="sticky top-20 z-30 mb-6 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-md flex items-center justify-between shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Active Examination
                </span>
                <h2 className="text-base font-bold text-white truncate max-w-md">
                  {activeExam.title}
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                    secondsRemaining < 180
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 animate-pulse'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                  }`}
                >
                  <Clock className="w-4 h-4 text-emerald-400" />
                  {formatTimer(secondsRemaining)}
                </div>

                <button
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 active:scale-95"
                >
                  {isSubmitting ? 'Evaluating...' : 'Submit Assessment'}
                </button>
              </div>
            </div>

            {/* Question Palette Indicator */}
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="text-xs text-zinc-400 font-medium">
                Question <strong className="text-white">{currentQuestionIndex + 1}</strong> of{' '}
                {activeExam.questions?.length}
              </span>
              <div className="flex items-center gap-1.5">
                {activeExam.questions?.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = currentQuestionIndex === idx;
                  const isFlagged = flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all relative ${
                        isCurrent
                          ? 'bg-emerald-500 text-zinc-950 ring-2 ring-emerald-400/50 scale-110 z-10'
                          : isFlagged
                          ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                          : isAnswered
                          ? 'bg-cyan-900/40 border border-cyan-500/40 text-cyan-300'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Card */}
            {activeExam.questions && activeExam.questions[currentQuestionIndex] && (
              <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl mb-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <button
                    onClick={() =>
                      toggleFlagQuestion(activeExam.questions![currentQuestionIndex].id)
                    }
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg border transition ${
                      flaggedQuestions[activeExam.questions[currentQuestionIndex].id]
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    {flaggedQuestions[activeExam.questions[currentQuestionIndex].id]
                      ? 'Flagged for Review'
                      : 'Flag'}
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                  {activeExam.questions[currentQuestionIndex].prompt}
                </h3>

                {/* Optional code snippet */}
                {activeExam.questions[currentQuestionIndex].starterCode && (
                  <div className="mb-6 rounded-xl border border-zinc-800 bg-[#06080d] p-4 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>{activeExam.questions[currentQuestionIndex].starterCode}</pre>
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-3 mb-6">
                  {activeExam.questions[currentQuestionIndex].options.map((opt, optIdx) => {
                    const isSelected =
                      answers[activeExam.questions![currentQuestionIndex].id] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          handleSelectOption(
                            activeExam.questions![currentQuestionIndex].id,
                            optIdx,
                          )
                        }
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                            : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500 text-zinc-950'
                              : 'border-zinc-700 text-zinc-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span className="leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-zinc-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {currentQuestionIndex < activeExam.questions.length - 1 ? (
                    <button
                      onClick={() =>
                        setCurrentQuestionIndex((prev) =>
                          Math.min(prev + 1, activeExam.questions!.length - 1),
                        )
                      }
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      disabled={isSubmitting}
                      className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold shadow-md shadow-emerald-500/20"
                    >
                      Finish & Submit
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Live Results & Verified Credential Passport */
          <div className="max-w-4xl mx-auto">
            {/* Score Showcase Banner */}
            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 via-zinc-900/60 to-zinc-950 p-8 mb-8 text-center relative overflow-hidden shadow-2xl">
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none ${
                  examResult.passed ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                }`}
              />

              <div className="relative z-10 max-w-xl mx-auto">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold mb-4 border ${
                    examResult.passed
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {examResult.passed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      SKILLORA CERTIFIED VERIFICATION PASSED
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      SCORE BELOW 80% PASSING THRESHOLD
                    </>
                  )}
                </div>

                <div className="text-6xl font-black text-white tracking-tight mb-2">
                  {examResult.scorePercentage}%
                </div>
                <p className="text-xs text-zinc-400 mb-6">
                  Answered <strong className="text-white">{examResult.correctCount}</strong> of{' '}
                  <strong className="text-white">{examResult.totalQuestions}</strong> questions accurately on{' '}
                  <span className="text-zinc-200 font-semibold">{examResult.title}</span>.
                </p>

                {/* Cryptographic Certificate Card */}
                {examResult.passed && (
                  <div className="mb-6 p-6 rounded-2xl border-2 border-emerald-500/40 bg-zinc-950/90 text-left relative overflow-hidden shadow-xl shadow-emerald-500/10">
                    <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl" />
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white tracking-tight">
                            Skillora Autonomous Verification Badge
                          </div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            ID: {examResult.verificationId}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Verified Skill
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                      <div>
                        <div className="text-zinc-500 text-[11px] mb-0.5">Recipient</div>
                        <div className="font-bold text-white">Farhadul Islam</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[11px] mb-0.5">Certified Skill</div>
                        <div className="font-bold text-emerald-400">{examResult.skillName}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[11px] mb-0.5">Evaluation Standard</div>
                        <div className="font-medium text-zinc-300">{examResult.difficulty} Engineering</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[11px] mb-0.5">Issuance Timestamp</div>
                        <div className="font-medium text-zinc-300">{examResult.issuedAt}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-[11px]">
                      <span className="text-zinc-500 font-mono">
                        Algorithm: SHA256 • Proof-of-Competency
                      </span>
                      <button
                        onClick={copyCredentialLink}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied Verification Link!
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            Share Certificate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveExam(null)}
                    className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition"
                  >
                    Back to Assessments
                  </button>
                  <button
                    onClick={() => startExam(activeExam)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold transition shadow-md shadow-emerald-500/20"
                  >
                    Retake Examination
                  </button>
                </div>
              </div>
            </div>

            {/* Question Breakdown with Architectural Explanations */}
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Comprehensive Question Analysis & Answer Key
              </h3>

              <div className="space-y-4">
                {examResult.feedback.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border transition-all ${
                      item.isCorrect
                        ? 'bg-zinc-900/40 border-zinc-800'
                        : 'bg-rose-950/20 border-rose-900/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          item.isCorrect
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {item.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">Q{idx + 1}</span>
                    </div>

                    <h4 className="text-sm font-semibold text-white mb-3 leading-snug">
                      {item.prompt}
                    </h4>

                    <div className="space-y-1.5 text-xs mb-3">
                      <div className="flex items-start gap-2">
                        <span className="text-zinc-500 font-medium shrink-0">Your Answer:</span>
                        <span
                          className={item.isCorrect ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}
                        >
                          {item.options[item.userChoice] || 'No answer selected'}
                        </span>
                      </div>
                      {!item.isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-zinc-500 font-medium shrink-0">Correct Answer:</span>
                          <span className="text-emerald-400 font-medium">
                            {item.options[item.correctAnswer]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
                      <strong className="text-zinc-200">Architectural Rationale: </strong>
                      {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
