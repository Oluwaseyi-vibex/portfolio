import type { CaseStudy } from "../types/caseStudy";

export const caseStudies: CaseStudy[] = [
  {
    id: "power-as-you-go",
    title: "Power as you go",
    period: "Personal project",
    stack: ["Node.js", "Prisma", "PostgreSQL"],
    tags: ["backend", "iot", "payments"],
    repoUrl: "https://github.com/Oluwaseyi-vibex/mechanics-backend",
    problem: {
      context:
        "Prepaid electricity for smart meters: vendors sell credit, meters consume it, and balances must stay consistent across devices that connect intermittently.",
      constraint:
        "Solo build with no dedicated ops team — every extra service (message bus, second database, custom auth) is ongoing maintenance.",
      failureMode:
        "Credit purchases could succeed in the API while meter balance updates lagged or failed on retry, leaving customers charged without usable units until someone manually reconciled ledger rows.",
    },
    decisions: [
      {
        what: "Modeled credits and meter events as append-only ledger entries instead of updating a single balance column in place.",
        rejected:
          "Direct balance updates on a user row — simpler reads but race-prone when purchase webhooks and meter sync jobs overlap.",
        reason:
          "Ledger rows make disputes debuggable: you can replay how a balance was derived without guessing which write won.",
      },
      {
        what: "Used PostgreSQL with Prisma as the single source of truth.",
        rejected:
          "MongoDB for flexible device payloads — rejected because relationships (vendor → sale → meter → event) are relational and migrations matter for money.",
        reason: "One database to back up, one query language, and ACID for purchase paths.",
      },
      {
        what: "Kept device integration on a thin HTTP API with explicit idempotency keys on purchase endpoints.",
        rejected:
          "MQTT-only ingestion from meters — would need a broker, retained-message policy, and on-call familiarity the project did not have.",
        reason:
          "HTTP plus idempotency keys let unreliable mobile networks retry safely without double-charging.",
      },
      {
        what: "Deferred real-time dashboards; shipped reconciliation scripts and admin queries first.",
        rejected:
          "Socket-based live balance UI — nice for demos, not required to stop revenue-impacting drift.",
        reason: "Time went to correctness paths; visibility could sit on top of the ledger later.",
      },
    ],
    outcome: {
      shipped:
        "Purchase API, ledger-backed balance derivation, and admin reconciliation flows on GitHub. Live meter fleet scale and production SLA are not documented in-repo.",
      metric: null,
      retrospective:
        "Would add automated property tests on ledger invariants earlier — caught edge cases manually that a model checker would have found in CI.",
    },
  },
  {
    id: "lead-gen-ai",
    title: "Lead-Gen AI",
    period: "Personal project",
    stack: ["Node.js", "Prisma", "PostgreSQL", "LUA-AI"],
    tags: ["ai", "automation", "backend"],
    liveUrl: "https://eli-5-six.vercel.app/",
    problem: {
      context:
        "Outbound sales research: for each target company, find pain points, a decision-maker, and a draft message — work that humans do in 20–40 minutes per lead.",
      constraint:
        "LLM calls cost money and latency; the pipeline had to stay usable on a free-tier demo budget without unlimited parallel enrichment.",
      failureMode:
        "Early prototypes returned fluent but generic emails — same opener structure every time — so reviewers could not tell if the agent had actually read the company site or hallucinated a VP title.",
    },
    decisions: [
      {
        what: "Split the pipeline into discrete stages (company scrape → pain hypotheses → contact hunt → draft) with persisted intermediate JSON.",
        rejected:
          "One-shot mega-prompt — faster to wire, impossible to debug which stage introduced a bad name or off-topic pain point.",
        reason: "Stage outputs let you re-run only the failed step and compare before/after in the database.",
      },
      {
        what: "Stored runs and outputs in PostgreSQL via Prisma.",
        rejected:
          "Ephemeral in-memory cache — fine for a hackathon, useless when you need to audit why a lead was skipped.",
        reason: "Demo users refresh the page; durable rows keep the story of each run.",
      },
      {
        what: "Constrained outreach drafts with a structured template (role, observed signal, ask) instead of free-form prose only.",
        rejected:
          "Fully open-ended completion — produced longer, more varied text that still sounded like marketing spam.",
        reason: "Structure forces the model to cite something specific from earlier stages or leave a blank.",
      },
      {
        what: "Used LUA-AI for orchestration rather than hand-rolling every provider SDK call in route handlers.",
        rejected:
          "Direct OpenAI SDK in each Express route — fewer dependencies but scatters retry and token logic.",
        reason: "Central orchestration keeps rate-limit handling in one place as providers change.",
      },
    ],
    outcome: {
      shipped:
        "End-to-end demo: research a company URL, persist stages, export a draft message. Human-in-the-loop send and CRM sync were out of scope.",
      metric: null,
      retrospective:
        "Would add a cheap retrieval step (sitemap or careers page fetch) before the first LLM call — cuts hallucinated titles when the homepage is sparse.",
    },
  },
  {
    id: "uat-vote",
    title: "UAT Vote",
    period: "Personal project",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    tags: ["full-stack", "auth", "real-time"],
    liveUrl: "https://uatvote.vercel.app/",
    problem: {
      context:
        "Campus-style digital voting: students authenticate, cast one ballot per election, and admins need tallies without handling paper slips.",
      constraint:
        "Election windows are short — downtime during peak voting loses trust fast, but the team size did not justify Kubernetes.",
      failureMode:
        "Without a hard one-vote-per-identity rule at the database layer, race conditions or double-clicks could insert two ballots before the UI showed 'already voted'.",
    },
    decisions: [
      {
        what: "Enforced one ballot per (election_id, voter_id) with a unique database constraint.",
        rejected:
          "Check-then-insert in application code only — classic TOCTOU gap under concurrent submits.",
        reason: "Postgres rejects the second insert; API maps the violation to a clear client error.",
      },
      {
        what: "Separated admin tally routes from voter-facing Next.js pages.",
        rejected:
          "Single role flag on the user table checked in shared layouts — easy to mis-wire a page that leaks totals early.",
        reason: "Route split makes accidental exposure harder during hurried feature adds.",
      },
      {
        what: "Hosted the voter UI on Vercel with a managed Postgres instance.",
        rejected:
          "Self-hosted VM — cheaper at scale but someone has to patch OS packages before exam week.",
        reason: "Managed deploys match the expected traffic spike pattern without on-call rotation.",
      },
    ],
    outcome: {
      shipped:
        "Live voting site with authentication, ballot casting, and admin views. Formal penetration test or load test results are not published.",
      metric: null,
      retrospective:
        "Would add an immutable audit log table (who opened results, when) — current schema proves vote counts, not who viewed them before close.",
    },
  },
  {
    id: "doit",
    title: "DOIT",
    period: "Personal project",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["frontend", "product"],
    liveUrl: "https://do-it-management.vercel.app/",
    problem: {
      context:
        "Personal task management for daily work tracking — lists, status, and quick capture on desktop and phone.",
      constraint:
        "Needed to ship a usable UI in days, not design a custom sync protocol from scratch.",
      failureMode:
        "First iteration stored tasks only in component state — refresh wiped lists, which made the app feel broken compared to Notes or Todoist.",
    },
    decisions: [
      {
        what: "Persisted tasks in localStorage with a versioned schema and migration on read.",
        rejected:
          "Immediate Firebase/Supabase backend — real multi-device sync but auth and rules before a single user existed.",
        reason: "Solo user at launch; local persistence unblocked UX while keeping deploy static-friendly.",
      },
      {
        what: "Used Next.js App Router patterns with TypeScript for form and list components.",
        rejected:
          "Plain React SPA only — fine, but Next gave file-based routing and deploy defaults for free.",
        reason: "Familiar deploy path on Vercel aligned with other portfolio apps.",
      },
      {
        what: "Kept task fields minimal (title, status, optional due date) instead of subtasks, tags, and attachments.",
        rejected:
          "Full Notion-like model — more impressive demo, slower to make reliable.",
        reason: "Scope matched actual usage: capture and finish, not portfolio management.",
      },
    ],
    outcome: {
      shipped:
        "Live task board with persistent local storage and responsive layout. Cloud sync and accounts were intentionally not shipped.",
      metric: null,
      retrospective:
        "Would extract storage behind an interface on day one — swapping localStorage for an API later touched more components than expected.",
    },
  },
  {
    id: "sillyai",
    title: "SillyAI",
    period: "Personal project",
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Lua AI", "Cencori"],
    tags: ["frontend", "backend", "ai", "education"],

    liveUrl: "https://silly-ai-frontend.vercel.app/",

    problem: {
      context:
        "Most online learners struggle with scattered resources, unclear learning paths, and content that doesn't match their current knowledge level. SillyAI was built to solve this by generating structured, personalized learning journeys using AI.",

      constraint:
        "The system had to generate structured learning paths in a strict JSON format while keeping explanations simple, adaptive, and consistent across different topics and user levels.",

      failureMode:
        "Early versions produced unstructured AI responses, inconsistent lesson formatting, and overly complex explanations that were not suitable for beginners or ELI5-style learning.",
    },

    decisions: [
      {
        what: "Enforced a strict 6-lesson learning structure for every topic.",
        rejected:
          "Free-form AI lesson generation without structure.",
        reason:
          "Consistency across all learning paths makes navigation and progression predictable for users.",
      },

      {
        what: "Designed a structured JSON schema for AI outputs (lessons, content, resources).",
        rejected:
          "Plain text AI responses or markdown-based lessons.",
        reason:
          "JSON allows deterministic rendering of lesson cards and improves frontend reliability.",
      },

      {
        what: "Implemented adaptive explanation levels (Beginner, Intermediate, Advanced).",
        rejected:
          "One-size-fits-all explanations.",
        reason:
          "Users learn faster when content matches their current understanding level.",
      },

      {
        what: "Separated learning path generation from lesson rendering.",
        rejected:
          "Generating full UI-ready content in a single AI call.",
        reason:
          "Improves performance, reusability, and allows users to revisit lessons independently.",
      },

      {
        what: "Used Vite + React for fast UI iteration and smooth state handling.",
        rejected:
          "Next.js SSR-heavy setup.",
        reason:
          "SillyAI is interaction-heavy and does not require SSR for SEO-driven pages.",
      },
    ],

    outcome: {
      shipped:
        "A working AI learning platform that generates structured, step-by-step learning paths with explanations, analogies, real-world examples, and curated resources.",
      metric: null,
      retrospective:
        "Future improvement would include caching generated learning paths per topic + user level to reduce repeated AI generation costs and improve response speed.",
    },
  },
  {
    id: "hogg-anderson",
    title: "Hogg Anderson",
    period: "Client-style build",
    stack: ["Next.js", "Tailwind CSS"],
    tags: ["frontend", "marketing"],
    liveUrl: "https://www.hogganderson.com.ng/",
    problem: {
      context:
        "Professional services firm site: establish credibility, surface practice areas, and route visitors to contact — mostly static content, mobile-heavy traffic.",
      constraint:
        "Content updates would come from non-developers; the layout had to stay stable when copy changed.",
      failureMode:
        "Previous presence was fragmented — outdated pages and inconsistent typography made the firm look smaller than it is and buried the contact path below unrelated sections.",
    },
    decisions: [
      {
        what: "Built as a Next.js marketing site with reusable section components (hero, services, contact).",
        rejected:
          "WordPress theme — faster for editors but heavier hosting and plugin maintenance for a small page count.",
        reason: "Page count is low; component reuse keeps visual consistency without a CMS bill.",
      },
      {
        what: "Prioritized mobile type scale and tap targets before desktop polish.",
        rejected:
          "Desktop-first comp from a PDF — common in agency handoffs but misorders real analytics for Nigerian mobile share.",
        reason: "Most contact intents will happen on a phone between meetings.",
      },
      {
        what: "Deployed on Vercel with the production domain on managed DNS.",
        rejected:
          "Shared cPanel hosting — cheaper headline price, slower TLS and deploy story.",
        reason: "Preview URLs let stakeholders sign off before DNS cutover.",
      },
    ],
    outcome: {
      shipped:
        "Production marketing site on the live domain. Analytics baseline (bounce rate, contact clicks) was not shared for this write-up.",
      metric: null,
      retrospective:
        "Would bake in a lightweight content config (JSON or MDX) earlier — some copy changes still required a dev pass instead of a safe editor handoff.",
    },
  },
  {
    id: "alagon-energy",
    title: "Alagon Energy",
    period: "Personal project",
    stack: ["Next.js", "Tailwind CSS"],
    tags: ["frontend", "marketing"],
    liveUrl: "https://alagon-energy.vercel.app/",
    problem: {
      context:
        "Landing page for an energy brand: explain offering, build trust, drive inquiry — no logged-in product surface.",
      constraint:
        "Needed to ship quickly on a portfolio timeline; no backend requirements beyond static content and forms.",
      failureMode:
        "Generic template landings in the same niche bury the value prop — visitors bounce when hero copy does not say what Alagon does in the first viewport.",
    },
    decisions: [
      {
        what: "Single-page scroll narrative (problem → offering → proof → contact) instead of multi-route maze.",
        rejected:
          "Multi-page site map — more SEO URLs, but splits attention before the brand story lands.",
        reason: "One scroll matches how stakeholders review a V1: top to bottom in two minutes.",
      },
      {
        what: "Used Tailwind utility layout with a tight custom palette tied to energy branding.",
        rejected:
          "Heavy component library theme — faster bootstrapping but harder to avoid 'another SaaS landing' look.",
        reason: "Custom spacing and color tokens made the page feel owned, not templated.",
      },
      {
        what: "Hosted on Vercel preview + production for instant stakeholder review.",
        rejected:
          "Static zip to shared hosting — works, but slower feedback loop on copy tweaks.",
        reason: "Each push gets a URL; decisions on copy did not wait for FTP.",
      },
    ],
    outcome: {
      shipped:
        "Deployed landing on Vercel with live link. Lead form backend and spam filtering were minimal — inquiry path may be mailto or basic form post depending on iteration.",
      metric: null,
      retrospective:
        "Would add real performance budgets (LCP image sizing) before handoff — hero imagery shipped larger than necessary on first pass.",
    },
  },
];

const caseStudyById = new Map(caseStudies.map((study) => [study.id, study]));

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudyById.get(id);
}

export function getAllCaseStudyIds(): string[] {
  return caseStudies.map((study) => study.id);
}
