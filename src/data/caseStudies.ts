import type { CaseStudy } from "../types/caseStudy";

export const caseStudies: CaseStudy[] = [
  {
    id: "lens",
    title: "Lens (AI CFO for SMEs)",
    period: "Co-founder & Lead Engineer",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "BullMQ", "Next.js"],
    tags: ["ai", "fintech", "full-stack"],
    liveUrl: "https://heylens.orzn.app/",
    problem: {
      context:
        "Small and medium-sized businesses struggle to understand cash flow, monitor financial health, and make data-driven decisions — finance data lives scattered across bank accounts and spreadsheets.",
      constraint:
        "Had to aggregate sensitive banking data securely while keeping AI report generation affordable and delivering insights on both web and WhatsApp.",
      failureMode:
        "Without automated aggregation and forecasting, owners make decisions on stale balances and miss cash-flow crunches until accounts run dry.",
    },
    decisions: [
      {
        what: "Integrated open banking infrastructure to securely connect business bank accounts and automate financial data aggregation.",
        rejected:
          "Manual CSV uploads only — simpler but stale data and high friction for non-technical owners.",
        reason:
          "Live connections keep cash-flow views current without weekly export chores.",
      },
      {
        what: "Built AI-generated financial reports, cash flow forecasting, spending analysis, and performance insights delivered through web and WhatsApp.",
        rejected:
          "Web-only dashboard — misses owners who live in chat apps day to day.",
        reason: "Meeting users where they are doubles the chance reports get read.",
      },
      {
        what: "Designed scalable backend with subscription billing, report scheduling, and multi-tenant architecture using TypeScript, Node.js, PostgreSQL, Redis, and BullMQ.",
        rejected:
          "Single-tenant prototype DB — faster initially but billing and scheduled jobs become rewrites later.",
        reason: "Multi-tenancy plus queued report jobs scales from first paying SME to many.",
      },
      {
        what: "Led product architecture, API integrations, infrastructure design, and end-to-end deployment from concept to production.",
        rejected:
          "Splitting ownership across contractors — slower decisions on schema and API contracts.",
        reason: "Single-threaded technical ownership kept banking, AI, and billing pieces coherent.",
      },
    ],
    outcome: {
      shipped:
        "Live AI financial intelligence platform at heylens.orzn.app: connected accounts, automated aggregation, AI reports and forecasts on web and WhatsApp, with billing and scheduled reports.",
      metric: null,
      retrospective:
        "Would add anomaly alerts (unusual spend, low-balance warnings) earlier — forecasting is useful, push alerts drive daily retention.",
    },
  },
  {
    id: "myle",
    title: "Myle — AI-Powered Lead Generation & CRM",
    period: "Co-founder & Lead Engineer",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis", "BullMQ", "Python", "FastAPI"],
    tags: ["ai", "automation", "backend"],
    liveUrl: "https://myleshq.vercel.app/",
    problem: {
      context:
        "Outbound sales research: for each target company, discover, research, qualify, and manage prospects — work that humans do in 20–40 minutes per lead.",
      constraint:
        "High-volume web extraction plus LLM calls cost money and latency; the pipeline had to run async with caching and stay usable without unlimited parallel enrichment.",
      failureMode:
        "Manual prospecting produced stale lists and generic outreach — reviewers could not tell if a lead was actually qualified or which buying signal triggered it.",
    },
    decisions: [
      {
        what: "Designed and developed a dedicated Python/FastAPI scraping microservice for high-volume web data extraction and lead discovery.",
        rejected:
          "Scraping inside the main Node API — blocks event loop and couples deploys to crawler changes.",
        reason: "Isolated service scales extraction independently and keeps the core API responsive.",
      },
      {
        what: "Architected an asynchronous lead discovery pipeline using BullMQ and Redis for background processing, caching, and scalable data enrichment.",
        rejected:
          "Synchronous request/response enrichment — timeouts on slow sites and no retry story.",
        reason: "Queues give retries, caching cuts repeat LLM/scrape cost, and enrichment scales horizontally.",
      },
      {
        what: "Built AI-powered workflows for company research, lead enrichment, decision-maker identification, buying-signal detection, and deterministic lead scoring.",
        rejected:
          "One-shot mega-prompt — faster to wire, impossible to debug which stage introduced a bad name or score.",
        reason: "Staged pipeline with scoring makes qualification auditable instead of vibes-based.",
      },
      {
        what: "Developed CRM functionality for companies, contacts, activities, notes, tasks, and timelines with multi-tenant architecture, RBAC, API integrations, and analytics.",
        rejected:
          "External CRM sync only — leaves users without a home for enriched context.",
        reason: "Built-in CRM keeps research, scoring, and follow-ups in one loop.",
      },
    ],
    outcome: {
      shipped:
        "Live platform at myleshq.vercel.app: lead discovery, AI research and scoring, CRM with companies/contacts/activities, multi-tenant RBAC, and automated workflows.",
      metric: null,
      retrospective:
        "Would add a cheap sitemap/careers-page fetch before the first LLM call — cuts hallucinated titles when homepages are sparse.",
    },
  },
  {
    id: "pear",
    title: "Pear | Creator-Brand Marketplace",
    period: "Mobile project",
    stack: ["React Native", "Expo", "TypeScript", "JWT"],
    tags: ["mobile", "marketplace", "full-stack"],
    problem: {
      context:
        "Content creators and brands struggle to find each other — profile discovery, campaign opportunities, and mutual-match interactions live across DMs and spreadsheets.",
      constraint:
        "Cross-platform mobile with role-based onboarding (creator vs brand), swipe discovery, matching, and messaging — all with a consistent themed UI.",
      failureMode:
        "Without structured profiles and mutual matching, outreach is spammy and both sides waste time on misaligned campaigns.",
    },
    decisions: [
      {
        what: "Implemented authentication and onboarding flows including email sign-up/sign-in, role-based onboarding, and creator/brand profile creation.",
        rejected:
          "Single generic profile — simpler forms but brands and creators need different fields.",
        reason: "Role-based flows capture the right data up front for discovery and matching.",
      },
      {
        what: "Developed a typed API client with JWT authentication, secure token storage using Expo SecureStore, and structured API error handling.",
        rejected:
          "AsyncStorage tokens with ad-hoc fetch calls — leaks credentials and scatters error handling.",
        reason: "SecureStore plus typed client keeps auth safe and API errors predictable.",
      },
      {
        what: "Built swipe-based discovery feeds, campaign browsing screens, and navigation for matches and messaging.",
        rejected:
          "List-only directory — functional but slow to triage many profiles.",
        reason: "Swipe interaction matches the mutual-match mental model and speeds discovery.",
      },
      {
        what: "Implemented reusable UI components, centralized design tokens, and dark/light themes.",
        rejected:
          "Per-screen styles — faster initially, inconsistent experience as screens grow.",
        reason: "Tokens and shared components keep the marketplace feeling like one product.",
      },
    ],
    outcome: {
      shipped:
        "Cross-platform mobile marketplace: auth, onboarding, discovery feeds, swipes, matching, messaging, and themed reusable UI.",
      metric: null,
      retrospective:
        "Would add server-driven campaign recommendations earlier — swipe feeds need ranking to stay useful past the first hundred profiles.",
    },
  },
  {
    id: "grabit",
    title: "Grabit (Social Multiplayer Platform)",
    period: "Solo build & launch",
    stack: ["Next.js", "TypeScript", "Vercel", "Real-time"],
    tags: ["full-stack", "real-time", "social"],
    liveUrl: "https://grabit.lol",
    problem: {
      context:
        "Browser-based 2D social multiplayer: users interact and connect in shared real-time environments — presence, movement, and interactions must stay in sync.",
      constraint:
        "Solo end-to-end build (auth, state sync, persistence, deploy) with no ops team — every extra service is maintenance.",
      failureMode:
        "Naive state broadcast desyncs clients under latency — players see different rooms and interactions get lost.",
    },
    decisions: [
      {
        what: "Built the application end-to-end including authentication, multiplayer state synchronization, user interactions, and persistent data.",
        rejected:
          "Bolting a chat widget onto a static page — misses shared presence entirely.",
        reason: "Real-time state is the product, not an add-on.",
      },
      {
        what: "Designed a modular environment system supporting multiple interactive themes and extensible social features.",
        rejected:
          "Single hardcoded map — ships faster once, painful to extend with new themes.",
        reason: "Modular environments let new social spaces ship without touching sync logic.",
      },
      {
        what: "Deployed and maintained production on Vercel, owning architecture, development, and launch.",
        rejected:
          "Self-hosted VMs — more control but on-call burden for a solo dev.",
        reason: "Managed deploys match spike-y social traffic without ops overhead.",
      },
    ],
    outcome: {
      shipped:
        "Live at grabit.lol: 2D social multiplayer with auth, sync, themed environments, and persistent data on Vercel.",
      metric: null,
      retrospective:
        "Would add client-side prediction plus server reconciliation earlier — smooths movement on high-latency mobile networks.",
    },
  },
  {
    id: "power-as-you-go",
    title: "Power as you go",
    period: "Personal project",
    stack: ["Node.js", "Prisma", "PostgreSQL"],
    tags: ["backend", "iot", "payments"],
    repoUrl: "https://github.com/Oluwaseyi-vibex/mechanics-backend",
    problem: {
      context:
        "Prepaid electricity for smart meters: vendors sell credit, meters consume it, and balances must stay consistent across devices that connect intermittently. Helps SMEs and individuals monitor meter credit, automate top-ups, and keep receipts organized in one dashboard.",
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
];

const caseStudyById = new Map(caseStudies.map((study) => [study.id, study]));

export function getCaseStudyById(id: string): CaseStudy | undefined {
  return caseStudyById.get(id);
}

export function getAllCaseStudyIds(): string[] {
  return caseStudies.map((study) => study.id);
}
