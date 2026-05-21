# Case study deep-dives — implementation guide

## Purpose

This document tells the AI how to generate, structure, and render case study pages for each portfolio project. A case study is not a project description — it is a narrative of engineering judgment: what broke, what was decided, and what shipped.

---

## Content structure

Each case study follows a fixed three-act structure. The AI must populate all three acts. Skipping any act produces an incomplete case study.

### Act 1 — Problem

Answer these questions in order:

1. **Context**: What system or product was this? Who used it? At what scale?
2. **Constraint**: What was the hard constraint — time, budget, technical debt, team size?
3. **Failure mode**: What was breaking, slow, or missing? Be specific. "The API was slow" is not acceptable. "The API p99 latency was 4.2s under load, causing 12% of mobile sessions to abandon checkout" is acceptable.

Do not use marketing language. Do not say "I built a solution." State the problem only.

---

### Act 2 — Decision log

This is the most important act. It is a chronological log of the key decisions made during the project, with rationale for each.

Each entry in the log must include:

- **What was decided** — one sentence, concrete
- **What was considered but rejected** — at least one alternative, with a brief reason it was ruled out
- **Why this choice** — the real reason, not the polished one. If the real reason was "we only had two weeks," say that.

**Example entry format:**

```
Decision: Chose PostgreSQL over MongoDB for the session store.
Rejected: MongoDB — team had no operational experience, and schema flexibility wasn't needed for structured session data.
Reason: Postgres was already in the stack; adding a second database would have required additional ops overhead we couldn't justify with a two-engineer team.
```

Aim for 3–6 decisions per project. Do not list trivial decisions (e.g. "chose VS Code"). Only decisions where a reasonable engineer could have gone a different way.

---

### Act 3 — Outcome

Answer in order:

1. **What shipped** — what went live, what didn't, and why
2. **Measurable result** — a number if possible. Latency, uptime, user count, time saved, cost reduced. If no metric exists, say so honestly.
3. **What you'd change** — one thing you'd do differently with hindsight. This is not optional. An engineer who can't name a tradeoff they regret is either lying or not reflecting.

---

## Data model

Store each case study as a structured object. The AI reads from and writes to this schema.

```ts
interface CaseStudy {
  id: string;                     // slug, e.g. "payments-rewrite"
  title: string;                  // project name
  period: string;                 // e.g. "Q3 2022 – Q1 2023"
  stack: string[];                // technologies actually used
  problem: {
    context: string;
    constraint: string;
    failureMode: string;          // specific, quantified if possible
  };
  decisions: Array<{
    what: string;
    rejected: string;
    reason: string;
  }>;
  outcome: {
    shipped: string;
    metric: string | null;        // null is valid — don't fabricate numbers
    retrospective: string;        // what you'd change
  };
  tags: string[];                 // e.g. ["backend", "performance", "infra"]
}
```

---

## AI generation instructions

When generating a case study from raw input (bullet points, a resume line, a GitHub readme), the AI must:

1. **Ask before fabricating** — if a metric is not in the source material, do not invent one. Write `metric: null` and surface this to the user for them to fill in.
2. **Infer the decision log from context** — if the source material says "switched from REST to GraphQL," create a decision entry with a plausible rejected alternative and prompt the user to confirm or correct it.
3. **Flag vague failure modes** — if the problem statement is generic ("improve performance"), ask the user for specifics before generating. A vague problem produces a forgettable case study.
4. **Use plain language** — no jargon for jargon's sake. Write as if explaining to a senior engineer you just met, not a recruiter.
5. **Preserve the user's voice** — if the user writes casually, keep it casual. If formal, keep it formal. Do not normalise everything into the same tone.

---

## Rendering guidelines

The UI component that renders a case study should treat the three acts as visually distinct sections with clear progression. Suggested layout principles:

- **Problem** — high contrast, tight. This should feel like a cold open.
- **Decision log** — card or timeline layout. Each decision is scannable. Show rejected alternatives in muted style so they recede visually.
- **Outcome** — more spacious. The metric (if present) is the hero element — large type, prominent position. The retrospective sits below in a slightly different visual treatment (e.g. italic, or a left-border accent) to signal it is reflection, not result.

Avoid tabs. All three acts should be visible on a single scroll — the goal is that a visitor spending 90 seconds on a case study can form a complete picture of how you think.

---

## What to avoid

| Avoid | Why |
|---|---|
| "I built X using Y" | Describes output, not thinking |
| Listing every technology used | Stack is context, not the story |
| Only showing the happy path | Hiding failure signals low self-awareness |
| Fabricated metrics | Immediately erodes trust if checked |
| Passive voice throughout | Obscures ownership and makes decisions feel accidental |
| Identical tone across all projects | Signals templating, not genuine reflection |

---

## Example trigger prompts

These are prompts a user might give the AI to generate or edit a case study:

- `"Write a case study for my payments API rewrite. It started as a Rails monolith, we moved critical paths to Go, cut p99 from 800ms to 90ms."`
- `"I have a bullet point list of a project I did at Stripe. Turn it into a case study."`
- `"The outcome section for my search project feels too vague. Improve it."`
- `"Add a decision entry: we chose Elasticsearch over Postgres full-text search."`

---

## Quality checklist

Before publishing a case study, the AI should verify:

- [ ] Failure mode is specific, not generic
- [ ] At least 3 decisions logged with rejected alternatives
- [ ] Outcome includes a metric or explicitly marks it as unavailable
- [ ] Retrospective is honest and not a humble-brag
- [ ] No fabricated numbers
- [ ] Total reading time is under 4 minutes

## Code locations

- Types: `src/types/caseStudy.ts`
- Data: `src/data/caseStudies.ts`
- Renderer: `src/components/CaseStudyView.tsx`
- Route: `/case-study/:id` → `src/pages/CaseStudyPage.tsx`
