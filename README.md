<div align="center">

# 🛠️ SurveyCraft

**An Enterprise-Grade Experience Management & Survey Intelligence Platform**

Built with Next.js 16 (App Router), React 19, Prisma 7, PostgreSQL + pgvector, and Turbopack.

---

[![Node.js Version](https://img.shields.io/badge/Node.js-24%20LTS-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black.svg?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg?style=flat-square&logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748.svg?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16%20+%20pgvector-336791.svg?style=flat-square&logo=postgresql)](https://neon.tech/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444.svg?style=flat-square&logo=turborepo)](https://turbo.build/)

</div>

---

## 🌟 Overview

**SurveyCraft** is a high-performance, full-stack experience management system designed for crafting, delivering, and analyzing rich user surveys across link, website, and in-app channels.

Originally engineered from an enterprise-grade monorepo codebase, SurveyCraft provides seamless no-code survey authoring, advanced conditional branching, multi-tenant workspace isolation, and real-time response aggregation.

---

## ✨ Key Features

### 🎨 Visual Survey Studio
- **Dynamic Question Types**: NPS, Multi-choice, Single-select, Open Text, Rating scale, Matrix, Date, CTA, and Consent elements.
- **Logic Branching & Routing**: Jump logic based on user responses, hidden field values, or language preferences.
- **Brand Customization**: Custom color palettes, typography, border styling, and dark mode preview.
- **Multi-language Support**: Real-time multi-lingual translations with canonical language fallback.

### 🚀 Multi-Channel Distribution
- **Direct Shareable Links**: Instant, responsive public survey URLs (`/s/[surveyId]`).
- **Pre-compiled Embed Widgets**: Lightweight UMD & ESM bundles (`packages/surveys`) for embedding in any web application with one script tag.
- **Email Surveys**: Inline preview surveys compatible with major email clients.

### 📊 Response Intelligence & Real-time Analytics
- **Live Summary Dashboards**: Real-time response completion rates, drop-off analysis, and summary metrics.
- **Data Exporting**: One-click CSV and JSON exports for offline data science and reporting.
- **Vector Search Ready**: Integrated with PostgreSQL `pgvector` for semantic response analysis and clustering.

### 🏢 Enterprise Monorepo Architecture
- **Multi-Tenancy**: Built-in Organization and Workspace isolation with role-based permissions (`Owner`, `Manager`, `Member`).
- **Cryptographic Security**: AES-256 field-level encryption for sensitive responses and credentials.
- **Resilient Fallbacks**: In-memory caching fallbacks for seamless local operation without mandatory external Redis instances.

---

## 🏗️ System Architecture & Tech Stack

```mermaid
flowchart TD
    subgraph Frontend["Frontend (apps/web)"]
        Next["Next.js 16 (App Router)"]
        R19["React 19 Server Components"]
        TW["Tailwind CSS v4"]
        BA["Better Auth Session Management"]
    end

    subgraph Packages["Shared Packages (packages/*)"]
        SUI["@formbricks/survey-ui (Scoped CSS)"]
        SUR["@formbricks/surveys (UMD/ESM Bundle)"]
        AI["@formbricks/ai (Provider Abstractions)"]
        DB["@formbricks/database (Prisma Client)"]
    end

    subgraph Data["Database & Infrastructure"]
        PG["Neon Serverless PostgreSQL (pgvector v0.8.6)"]
        REDIS["Redis / In-Memory Fallback"]
    end

    Next --> DB
    Next --> SUI
    Next --> SUR
    Next --> AI
    DB --> PG
```

### Stack Breakdown
- **Framework**: [Next.js 16](https://nextjs.org/) App Router with Turbopack for ultra-fast HMR (<1s).
- **Core Library**: [React 19](https://react.dev/) using Server Actions & Server Components.
- **Database & ORM**: [Prisma 7](https://www.prisma.io/) with [Neon PostgreSQL](https://neon.tech/) and `pgvector` extension.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with component-level isolation (`#fbjs`).
- **Auth**: [Better Auth](https://better-auth.com/) with secure HTTP-only cookies and bcrypt password hashing.
- **Monorepo Manager**: [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/) workspace package linking.

---

## 📦 Monorepo Directory Structure

```
surveycraft/
├── apps/
│   ├── web/                    # Main Next.js application & API endpoints
│   │   ├── app/                # Next.js 16 App Router pages
│   │   ├── modules/            # Feature modules (survey, auth, analytics)
│   │   └── lib/                # Shared server utilities & environment validation
│   └── storybook/              # Isolated UI component workbench
├── packages/
│   ├── database/               # Prisma schema (68 tables), migrations, & seeds
│   ├── survey-ui/              # Pure React survey question elements & scoped CSS
│   ├── surveys/                # Embeddable survey client SDK (UMD + ESM)
│   ├── ai/                     # AI provider connectors (Google, AWS, Azure, OpenAI)
│   ├── types/                  # Shared TypeScript type definitions
│   └── logger/                 # Structured logging abstractions
├── scripts/                    # Database seeding and migration runner scripts
└── turbo.json                  # Turborepo task pipeline configuration
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v24.0.0` or higher (LTS recommended)
- **pnpm**: `11.0.0` or higher
- **PostgreSQL**: Neon, Supabase, or local PostgreSQL with `pgvector` enabled

### 1. Installation
Clone the repository and install workspace dependencies:
```bash
pnpm install
```

### 2. Environment Setup
Configure your environment secrets:
```bash
cp .env.example .env
cp .env apps/web/.env
```
Ensure your `DATABASE_URL` is configured in `.env`:
```env
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
WEBAPP_URL=http://localhost:3000
BETTER_AUTH_SECRET="your-32-character-secret"
ENCRYPTION_KEY="your-32-character-encryption-key"
```

### 3. Initialize Database Schema & Seed Data
Push the Prisma schema to create the tables and seed realistic demo surveys:
```bash
# Push schema to database
pnpm --filter @formbricks/database db:push

# Seed organizations, workspaces, and demo responses
pnpm --filter @formbricks/database db:seed
```

### 4. Build Shared Workspace Packages
Compile the embeddable survey packages and database bindings:
```bash
pnpm build --filter=@formbricks/web^...
```

### 5. Launch Development Server
Start the Next.js development server:
```bash
pnpm --filter @formbricks/web dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Default Admin Credentials:
- **Email**: `admin@surveycraft.dev`
- **Password**: `Password#123`

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
