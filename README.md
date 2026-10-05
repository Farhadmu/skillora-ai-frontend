# Skillora AI — Frontend Web Application
> **AI Workforce Intelligence Platform**  
> *Tagline: "Learn. Build. Prove. Grow."*

This repository contains the Next.js frontend application for **Skillora AI**, delivering an enterprise-grade experience for Learners, Educators, Employers, and Platform Administrators.

---

## Key Features & Interfaces
- **Flagship Landing Page (`/`)**: Hero with workforce telemetry preview, intelligence loop, 5 domain cards, pricing, FAQ.
- **Learner Dashboard (`/dashboard`)**: 7-Dimension readiness score dial, active roadmap with milestone checkboxes, verified skills, and matched roles.
- **Socratic AI Tutor (`/tutor`)**: Dialogue guided by Bloom's Taxonomy, modes (Teach, Practice, Explain, Challenge, Revision), RAG citations, and concept flashcards.
- **Skill Graph & Gap Engine (`/skills`)**: 100+ standardized skills, category filters, prerequisite chains, and mathematical gap analysis against target careers.
- **Career Navigator & JD Intelligence (`/career`)**: Side-by-side role comparisons and real-time job description requirement extraction.
- **SkillBridge Roadmaps (`/roadmap`)**: 7, 30, 60, and 90-day adaptive roadmaps with dynamic task checkboxes.
- **Projects & AI Code Reviewer (`/projects`)**: Curated engineering projects and automated static/semantic code review tool.
- **Workforce Ready & Mock Interviews (`/interview`)**: Simulated technical and system design interviews with rubric scorecards and diagnostic reports.
- **Global Talent Marketplace (`/jobs`)**: Filterable job catalog, transparent AI match scoring (0-100%), and 1-click application submission.
- **Employer ATS Pipeline (`/employer`)**: Candidate pipeline management across stages (Applied, Reviewing, Interviewing, Offered, Hired).
- **Educator Console (`/educator`)**: Cohort telemetry and automated AI early intervention alerts.
- **Admin Command Center (`/admin`)**: Platform telemetry, foundation model token metering, cluster health, and audit logs.
- **Public Verified Portfolio (`/portfolio/:handle`)**: Shareable public link showcasing cryptographic skill verification badges.
- **Global Command Palette (`Ctrl+K` / `Cmd+K`)**: Fast universal search and module navigation.
- **Contextual AI Copilot Drawer**: Real-time advice aware of current learner stage and page context.

---

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Components**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Icons & Visuals**: Lucide Icons, Recharts
- **State & Data**: TanStack Query, typed REST API client

---

## 📚 Complete Engineering & Architecture Specifications

Detailed architecture and design specifications are maintained in the [`docs/`](./docs) directory:
- 🏛️ **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**: High-level system architecture, C4 diagrams, and the 11-step end-to-end intelligence cascade.
- 🗄️ **[DATABASE.md](./docs/DATABASE.md)**: Dual-mode persistence layer, catalog of all 39 domain entities across 13 Mongoose schemas, text search and indexing strategies, and atomic disk durability.
- 🔌 **[API.md](./docs/API.md)**: RESTful API contracts, OpenAPI / Swagger specifications, response/error envelopes, and the frontend `@/lib/api` modular architecture.
- 🧠 **[AI_ARCHITECTURE.md](./docs/AI_ARCHITECTURE.md)**: The 8-tier multi-provider AI fallback cascade, specialized domain engines (Socratic Tutor with Bloom's taxonomy & Web Speech Audio, JD Intelligence, Code Review, Mock Interviews).
- 🔍 **[RAG.md](./docs/RAG.md)**: Document ingestion, overlap-aware chunking, vector storage (Qdrant & in-memory cosine index), grounded citation badges, and anti-hallucination guardrails.
- 🛡️ **[SECURITY.md](./docs/SECURITY.md)**: Token rotation, SHA-256 token hashing, RBAC + anti-IDOR `ResourceOwnerGuard`, public admin registration block, and `EmailService` abstraction.
- 🚀 **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)**: Multi-stage Dockerfiles, Docker Compose orchestrations, and cloud deployment guides.

---

## Installation & Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *Default API URL connects to backend at `http://localhost:3001`.*

3. **Build the application**:
   ```bash
   npm run build
   ```

4. **Start the production server**:
   ```bash
   npm run start
   ```

5. **Open in browser**:
   - Web App: [http://localhost:3000](http://localhost:3000)
