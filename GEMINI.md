# ApplyPilot – AI Development Guidelines

This document outlines instructions and engineering principles for AI assistants and developers collaborating on the **ApplyPilot** repository.

---

## 1. Project Context & Purpose

**ApplyPilot** is an AI-powered job application copilot built as the capstone project for the **FlyRank Frontend AI Engineering** track.

The application assists job seekers in:
- Analyzing job descriptions to extract key skills and requirements.
- Matching candidate profiles to target roles with alignment scoring.
- Generating tailored resumes, cover letters, and application answers.
- Organizing and managing the overall application workflow and pipeline.

---

## 2. Planned Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)

---

## 3. Architecture & Development Guidelines

- **Accessible & Semantic HTML**: Always prefer semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<button>`, etc.) with appropriate ARIA roles and attributes for accessibility.
- **Server Components First**: Favor React Server Components (RSC) in Next.js by default for data fetching, static presentation, and minimal client bundle overhead.
- **Targeted Client Components**: Use `"use client"` selectively, only when user interactivity, local React state, browser APIs, or event listeners are required.
- **Modular & Reusable Design**: Keep components small, decoupled, single-purpose, and strongly typed with explicit TypeScript interfaces.
- **Lean Dependencies**: Avoid introducing unnecessary external packages or dependencies when native web APIs or lightweight utilities suffice.
- **Strict Scope Boundaries**: Do not modify unrelated files or alter code outside the explicit scope of the current task.
- **Document Architectural Decisions**: Clearly explain reasoning and trade-offs behind key architectural and state-management decisions.
- **Review Generated Code**: Treat all AI-generated code as material that must be carefully reviewed and verified rather than blindly accepted.

---

## 4. Git & Commit Guidelines

- Adhere to the [Conventional Commits](https://www.conventionalcommits.org/) standard:
  - `feat:` A new feature
  - `fix:` A bug fix
  - `docs:` Documentation-only changes
  - `style:` Formatting changes with no logic change
  - `refactor:` Code restructuring without fixing a bug or adding a feature
  - `perf:` Performance improvements
  - `test:` Adding or modifying tests
  - `chore:` Tooling, dependency, or configuration updates
