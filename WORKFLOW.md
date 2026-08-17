# FE-03 AI-Assisted Workflow Drill: Comparative Analysis

## Overview

This analysis evaluates two AI-assisted implementation workflows for the **ApplyPilot** job preferences settings form: a vague one-shot prompt on branch `fe-03-vague` versus a specification-driven workflow on branch `fe-03-precise`.

---

## Comparative Evaluation

### 1. Scope and Architectural Complexity
- **`fe-03-vague`**: Prompted simply with *"Build a job preferences settings form for ApplyPilot"*, the AI made a critical mistake by hallucinating and implementing substantial unrequested scope. It produced features including global navigation, an import/export modal, AI copilot settings, summary functionality, and extra supporting abstractions. This was a severe mistake relative to a small job-preferences form because it introduced unnecessary maintenance overhead, expanded the attack surface, and violated component isolation.
- **`fe-03-precise`**: Constrained by explicit requirements and Server/Client Component boundaries, the AI built a lean, single-purpose implementation centered on `JobPreferencesForm.tsx` and strongly typed schemas in `preferences.ts`.

### 2. Git Diff Analysis
A direct git comparison (`git diff --stat fe-03-vague fe-03-precise`) shows **35 changed files, 518 insertions, and 9,906 deletions**. These numbers are heavily influenced by Round 1's generated architecture and `package-lock.json` changes and are not a direct measure of code quality.

### 3. Correctness & Edge Cases
- **`fe-03-vague`**: Successfully compiled with `npm run build`, but bloated the application with speculative, untested capabilities outside the core product need.
- **`fe-03-precise`**: Passed both `npm run build` and `npm run lint`. It reliably handled key edge cases, including field validation, duplicate skill prevention, keyboard interaction for tag management, custom selection controls, client-side success feedback on save, and narrow-screen responsive layouts.

### 4. Accessibility
- **`fe-03-vague`**: Relied on generic layouts without structured keyboard management or complete ARIA labeling.
- **`fe-03-precise`**: Explicitly incorporated semantic HTML5 controls, accessible form labeling, keyboard-accessible tag removal buttons, and distinct focus indicators.

### 5. Verification
Both branches compiled without build errors. While Round 1 initially displayed a browser hydration warning during manual inspection in a normal browser, testing in a private window confirmed the warning disappeared and was caused by a browser extension modifying the HTML, not an AI defect. Round 2 passed comprehensive verification across private browsing, responsive viewport testing, and validation assertions with zero hydration warnings or runtime errors.

### 6. Review Effort
Round 1 generated an overwhelming diff across dozens of files, making code review tedious and error-prone. Round 2 yielded a concise, predictable diff that could be audited against the specification in minutes.

---

## Key Takeaway & Conclusion

The structured workflow—**specify → plan → implement → verify → review**—produced a significantly more focused and reviewable result than vague one-shot prompting. Upfront specifications establish essential guardrails against hallucinated scope, maintain architectural boundaries, and produce verifiable, production-ready code.
