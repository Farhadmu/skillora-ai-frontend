'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  Award,
  Bot,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function InterviewPage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  const [mode, setMode] = useState<'technical' | 'system_design' | 'behavioral' | 'coding' | 'hr'>('technical');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState<any[]>([]);
  const [finalReport, setFinalReport] = useState<any>(null);

  useEffect(() => {
    startInterview();
  }, [mode]);

  const startInterview = async () => {
    setQuestionNumber(1);
    setInterviewHistory([]);
    setFinalReport(null);
    setCandidateAnswer('');
    setEvaluating(true);

    try {
      const res = await api.conductMockInterview({
        mode,
        questionNumber: 1,
      });
      setCurrentQuestion(res);
    } catch (err) {
      console.error('Failed to initiate interview:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateAnswer.trim() || evaluating) return;
    setEvaluating(true);

    try {
      const res = await api.conductMockInterview({
        mode,
        questionNumber: questionNumber + 1,
        candidateAnswer,
      });

      // Save previous round to history
      setInterviewHistory((prev) => [
        ...prev,
        {
          questionNumber,
          question: currentQuestion.question,
          answer: candidateAnswer,
          feedback: res.feedbackOnPrevious,
        },
      ]);

      setCandidateAnswer('');

      if (res.isComplete) {
        setFinalReport(res.finalEvaluation);
        setCurrentQuestion(null);
      } else {
        setQuestionNumber((prev) => prev + 1);
        setCurrentQuestion(res);
      }
    } catch (err) {
      console.error('Answer submission failed:', err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Workforce Readiness Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Mock Interview Simulator</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time progressive interview simulation with rubrics, instant feedback, and certified employability reports.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Mode:</span>
            <div className="flex rounded-xl bg-[#111726] border border-[#1e293b] p-0.5">
              {(['technical', 'system_design', 'behavioral', 'coding', 'hr'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                    mode === m
                      ? 'bg-emerald-500 text-black shadow'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {m.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ACTIVE INTERVIEW OR FINAL REPORT */}
        {/* ======================================================== */}
        {!finalReport ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Question & Answer Console */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Question {questionNumber} of 4 • {mode.toUpperCase()}
                  </span>
                  <button
                    onClick={startInterview}
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restart Simulation</span>
                  </button>
                </div>

                {currentQuestion && (
                  <div className="p-5 rounded-2xl bg-[#0e1424] border border-[#1c273e] space-y-3 mb-6">
                    <div className="text-sm sm:text-base font-bold text-white leading-relaxed">
                      &ldquo;{currentQuestion.question}&rdquo;
                    </div>
                    {currentQuestion.rubric && (
                      <div className="pt-2 border-t border-[#161f33] text-[11px] text-zinc-400 flex flex-wrap gap-2">
                        <span className="text-emerald-400 font-semibold">Evaluation Rubric:</span>
                        {currentQuestion.rubric.map((r: string, i: number) => (
                          <span key={i} className="text-zinc-300">• {r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Your Technical Response:
                    </label>
                    <textarea
                      rows={7}
                      required
                      value={candidateAnswer}
                      onChange={(e) => setCandidateAnswer(e.target.value)}
                      placeholder="Structure your answer with architectural rationale, trade-offs, and edge-case handling..."
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={evaluating || !candidateAnswer.trim()}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                  >
                    {evaluating ? (
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Answer & Progress</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Previous Round Feedback & Socratic Rubrics */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Real-time Interview Telemetry
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5 mb-4">Interviewer Diagnostic Feed</h4>

                {interviewHistory.length > 0 ? (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 text-xs">
                    {interviewHistory.map((h, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-2">
                        <div className="text-[10px] font-mono text-zinc-500">Q{h.questionNumber} Feedback</div>
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-400 font-bold">Tech: {h.feedback?.technicalScore}%</span>
                          <span className="text-cyan-400 font-bold">Comm: {h.feedback?.communicationScore}%</span>
                        </div>
                        <div className="text-emerald-300">
                          <strong>Strengths:</strong> {h.feedback?.strengths?.join(', ')}
                        </div>
                        {h.feedback?.sampleBetterAnswer && (
                          <div className="p-2.5 rounded-lg bg-[#080d16] text-[11px] text-zinc-300 italic">
                            &ldquo;{h.feedback.sampleBetterAnswer}&rdquo;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-[#0e1424] border border-[#161f33] text-center text-xs text-zinc-500">
                    Submit your first answer to generate live diagnostic rubrics.
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[#090d16] border border-[#141b2a] text-[11px] text-zinc-400 leading-relaxed">
                Interviewer evaluates technical accuracy, structural clarity (STAR methodology), and trade-off justification.
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* FINAL VERIFIED DIAGNOSTIC REPORT CARD */
          /* ======================================================== */
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0c182b] to-[#080f1c] border border-emerald-500/40 shadow-2xl space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1a2236] pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Certified Diagnostic Outcome
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">Official Mock Interview Report Card</h3>
                <p className="text-xs text-zinc-400 mt-1">Mode: {mode.toUpperCase()} • Generated by Skillora AI</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={startInterview}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#162035] text-white hover:bg-[#1e2c49] transition"
                >
                  Retake Interview
                </button>
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Overall Score</div>
                  <div className="text-4xl font-extrabold text-emerald-400 font-mono">
                    {finalReport.overallScore}/100
                  </div>
                </div>
              </div>
            </div>

            {/* Verdict Banner */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-sm flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Verdict: {finalReport.verdict}</span>
            </div>

            {/* 4 Core Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#161f33]">
                <div className="text-[10px] text-zinc-500">Technical Depth</div>
                <div className="text-2xl font-extrabold text-white mt-1">{finalReport.technicalScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#161f33]">
                <div className="text-[10px] text-zinc-500">Communication</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1">{finalReport.communicationScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#161f33]">
                <div className="text-[10px] text-zinc-500">Problem Solving</div>
                <div className="text-2xl font-extrabold text-cyan-400 mt-1">{finalReport.problemSolvingScore}%</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b0f19] border border-[#161f33]">
                <div className="text-[10px] text-zinc-500">Role Readiness</div>
                <div className="text-2xl font-extrabold text-white mt-1">{finalReport.roleReadinessScore}%</div>
              </div>
            </div>

            {/* Detailed Recommendations */}
            {finalReport.detailedRecommendations && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Targeted Engineering Recommendations
                </div>
                <div className="space-y-2">
                  {finalReport.detailedRecommendations.map((rec: string, i: number) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#0b0f19] border border-[#161f33] text-xs text-zinc-300 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
