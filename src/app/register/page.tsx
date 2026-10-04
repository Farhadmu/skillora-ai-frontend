'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Bot,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  User,
  AlertCircle,
  Globe,
  Briefcase,
  School,
  Building,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { api, setAuthSession } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'LEARNER' | 'EDUCATOR' | 'EMPLOYER'>('LEARNER');

  // Common fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Learner fields
  const [country, setCountry] = useState('Bangladesh');
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree in CS");
  const [careerInterest, setCareerInterest] = useState('Full-Stack Software Engineer');

  // Educator fields
  const [institution, setInstitution] = useState('');
  const [teachingArea, setTeachingArea] = useState('');
  const [experienceYears, setExperienceYears] = useState('5');

  // Employer fields
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('50-250');
  const [industry, setIndustry] = useState('AI & Technology');
  const [jobTitle, setJobTitle] = useState('Technical Talent Lead');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationResult, setRegistrationResult] = useState<any>(null);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s += 25;
    if (password.length >= 12) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9!@#$%^&*]/.test(password)) s += 25;
    return s;
  };

  const strength = getPasswordStrength();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload: any = {
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      headline:
        role === 'LEARNER'
          ? `Aspiring ${careerInterest}`
          : role === 'EDUCATOR'
          ? `${teachingArea} Educator at ${institution || 'Higher Ed'}`
          : `${jobTitle} at ${companyName || 'Enterprise'}`,
    };

    if (role === 'LEARNER') {
      payload.country = country;
      payload.educationLevel = educationLevel;
      payload.careerInterest = careerInterest;
    } else if (role === 'EDUCATOR') {
      payload.institution = institution;
      payload.teachingArea = teachingArea;
      payload.experienceYears = Number(experienceYears) || 0;
    } else if (role === 'EMPLOYER') {
      payload.companyName = companyName;
      payload.companySize = companySize;
      payload.industry = industry;
      payload.jobTitle = jobTitle;
    }

    try {
      const res = await api.register(payload);
      setRegistrationResult(res);
      if (res.tokens?.accessToken) {
        setAuthSession(res.tokens.accessToken, res.user);
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[450px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10 text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#06080d] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">SKILLORA AI</span>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">Create Your Verified Account</h2>
        <p className="text-xs text-zinc-400 mt-1">
          From learning to verified employability in one unified ecosystem
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-[#1e293b] shadow-2xl space-y-6">
          {registrationResult ? (
            /* Registration Success & Verification Step */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Account Created Successfully!</h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  We have dispatched a verification email to{' '}
                  <span className="text-white font-semibold">{email}</span>. Click the verification link to activate all verified platform features.
                </p>
              </div>

              {registrationResult.verificationUrl && (
                <div className="p-4 rounded-xl bg-[#111726] border border-emerald-500/30 text-left space-y-2">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    Simulated Email Inbox Link (Development & Hackathon Demo)
                  </div>
                  <p className="text-xs text-zinc-300">
                    In production, this link is delivered to your inbox. For testing, click below to verify immediately:
                  </p>
                  <Link
                    href={registrationResult.verificationUrl.replace('http://localhost:3000', '')}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold underline pt-1"
                  >
                    <span>Click here to verify email ({registrationResult.user?.role})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (role === 'EDUCATOR') router.push('/educator/dashboard');
                    else if (role === 'EMPLOYER') router.push('/employer/dashboard');
                    else router.push('/learner/dashboard');
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Role Selector Tabs (Only 3 Public Roles, Admin Strictly Prohibited) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Select Your Platform Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { r: 'LEARNER' as const, label: 'Learner', icon: Bot, desc: 'Upskill & Prove' },
                    { r: 'EDUCATOR' as const, label: 'Educator', icon: GraduationCap, desc: 'Cohort Insights' },
                    { r: 'EMPLOYER' as const, label: 'Employer', icon: Building2, desc: 'Hire Talent' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSel = role === item.r;
                    return (
                      <button
                        key={item.r}
                        type="button"
                        onClick={() => setRole(item.r)}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition ${
                          isSel
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold shadow-lg shadow-emerald-500/10'
                            : 'bg-[#0f1422] border-[#1c263c] text-zinc-400 hover:text-white hover:bg-[#131b2e]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs">{item.label}</span>
                        <span className="text-[10px] text-zinc-500 font-normal">{item.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Farhadul Islam"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      {role === 'EMPLOYER' ? 'Work Email' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder={role === 'EMPLOYER' ? 'alex@company.com' : 'name@domain.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Role Specific Onboarding Section */}
                {role === 'LEARNER' && (
                  <div className="p-3.5 rounded-xl bg-[#0f1422] border border-[#1c263c] space-y-3">
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Learner Onboarding Profile
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Country</label>
                        <div className="relative">
                          <Globe className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-[#161f33] border border-[#23314d] rounded-lg pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Education Level</label>
                        <select
                          value={educationLevel}
                          onChange={(e) => setEducationLevel(e.target.value)}
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                        >
                          <option>High School</option>
                          <option>Undergraduate Student</option>
                          <option>Bachelor&apos;s Degree in CS</option>
                          <option>Master&apos;s Degree</option>
                          <option>Bootcamp Graduate</option>
                          <option>Self-Taught Developer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Target Career</label>
                        <div className="relative">
                          <Briefcase className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={careerInterest}
                            onChange={(e) => setCareerInterest(e.target.value)}
                            placeholder="e.g. Full-Stack Engineer"
                            className="w-full bg-[#161f33] border border-[#23314d] rounded-lg pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {role === 'EDUCATOR' && (
                  <div className="p-3.5 rounded-xl bg-[#0f1422] border border-[#1c263c] space-y-3">
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      Educator Onboarding Profile
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Institution</label>
                        <div className="relative">
                          <School className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            required
                            placeholder="University / Institute"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="w-full bg-[#161f33] border border-[#23314d] rounded-lg pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Teaching Area</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Distributed Computing"
                          value={teachingArea}
                          onChange={(e) => setTeachingArea(e.target.value)}
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        >
                        </input>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Experience (Years)</label>
                        <input
                          type="number"
                          min="0"
                          max="50"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {role === 'EMPLOYER' && (
                  <div className="p-3.5 rounded-xl bg-[#0f1422] border border-[#1c263c] space-y-3">
                    <div className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                      Employer & Hiring Partner Profile
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Company Name</label>
                        <div className="relative">
                          <Building className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. TechScale AI"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full bg-[#161f33] border border-[#23314d] rounded-lg pl-8 pr-2 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Company Size</label>
                        <select
                          value={companySize}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option>1-20 employees (Seed)</option>
                          <option>20-100 employees (Growth)</option>
                          <option>100-500 employees (Scale-up)</option>
                          <option>500-5000 employees (Enterprise)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Industry</label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="e.g. AI & SaaS"
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 mb-1">Your Job Title</label>
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="e.g. Head of Engineering Talent"
                          className="w-full bg-[#161f33] border border-[#23314d] rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-zinc-300">Password</label>
                      <span className="text-[10px] text-zinc-500">Min. 8 chars</span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Strength Indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-[#161f33] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          strength < 50
                            ? 'bg-red-400'
                            : strength < 75
                            ? 'bg-yellow-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-zinc-400 text-right">
                      Password strength:{' '}
                      <span className="font-semibold text-zinc-300">
                        {strength < 50 ? 'Weak' : strength < 75 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration & Verify Email</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-[#1a2236] text-xs text-zinc-400 flex items-center justify-between">
                <span>Already have an account?</span>
                <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
                  Sign In Here
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
