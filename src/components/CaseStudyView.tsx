import { Link } from "react-router-dom";
import type { CaseStudy } from "../types/caseStudy";

type CaseStudyViewProps = {
  study: CaseStudy;
};

const CaseStudyView = ({ study }: CaseStudyViewProps) => {
  return (
    <article className="font-FiraCode text-[#ABB2BF]">
      <header className="mb-10 border-b border-[#ABB2BF]/30 pb-8">
        <Link
          to="/#section2"
          className="mb-6 inline-flex text-[14px] text-[#C778DD] hover:underline"
        >
          ← back to projects
        </Link>
        <p className="text-[14px] uppercase tracking-widest text-[#C778DD]">
          case study
        </p>
        <h1 className="mt-2 text-[32px] font-semibold text-white md:text-[40px]">
          {study.title}
        </h1>
        <p className="mt-2 text-[15px] text-[#ABB2BF]">{study.period}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="border border-[#ABB2BF]/40 px-2 py-1 text-[12px] text-white"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-[#ABB2BF]/80">
          {study.stack.join(" · ")}
        </p>
        {(study.liveUrl || study.repoUrl) && (
          <div className="mt-4 flex flex-wrap gap-4 text-[14px]">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#C778DD] hover:underline"
              >
                live site ↗
              </a>
            )}
            {study.repoUrl && (
              <a
                href={study.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#C778DD] hover:underline"
              >
                repository ↗
              </a>
            )}
          </div>
        )}
      </header>

      <section
        aria-labelledby="problem-heading"
        className="mb-14 rounded-sm border border-white/10 bg-[#1e2127] px-5 py-6 md:px-8"
      >
        <h2
          id="problem-heading"
          className="text-[12px] font-medium uppercase tracking-[0.2em] text-white"
        >
          Act 1 — Problem
        </h2>
        <dl className="mt-6 space-y-6">
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              Context
            </dt>
            <dd className="mt-2 text-[16px] leading-relaxed text-white">
              {study.problem.context}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              Constraint
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed">
              {study.problem.constraint}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              Failure mode
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-white/90">
              {study.problem.failureMode}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="decisions-heading" className="mb-14">
        <h2
          id="decisions-heading"
          className="text-[12px] font-medium uppercase tracking-[0.2em] text-white"
        >
          Act 2 — Decision log
        </h2>
        <ol className="mt-6 space-y-4">
          {study.decisions.map((decision, index) => (
            <li
              key={`${study.id}-decision-${index}`}
              className="border border-[#ABB2BF]/25 bg-[#282C33] p-5 md:p-6"
            >
              <span className="text-[12px] text-[#C778DD]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-[16px] leading-relaxed text-white">
                <span className="text-[#C778DD]">Decision: </span>
                {decision.what}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-[#ABB2BF]/70">
                <span className="text-[#ABB2BF]/50">Rejected: </span>
                {decision.rejected}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                <span className="text-[#C778DD]">Reason: </span>
                {decision.reason}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="outcome-heading"
        className="pb-16 pt-4 md:pb-24"
      >
        <h2
          id="outcome-heading"
          className="text-[12px] font-medium uppercase tracking-[0.2em] text-white"
        >
          Act 3 — Outcome
        </h2>
        <div className="mt-8 space-y-10">
          <div>
            <h3 className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              What shipped
            </h3>
            <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-white/95">
              {study.outcome.shipped}
            </p>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              Measurable result
            </h3>
            {study.outcome.metric ? (
              <p className="mt-4 text-[28px] font-semibold leading-snug text-white md:text-[36px]">
                {study.outcome.metric}
              </p>
            ) : (
              <p className="mt-4 border border-dashed border-[#ABB2BF]/40 px-4 py-5 text-[15px] italic text-[#ABB2BF]/80">
                No verified metric on file — add latency, uptime, or user
                impact when you have a number worth citing.
              </p>
            )}
          </div>

          <blockquote className="max-w-3xl border-l-2 border-[#C778DD] pl-5">
            <h3 className="text-[12px] uppercase tracking-wide text-[#C778DD]">
              What I&apos;d change
            </h3>
            <p className="mt-3 text-[16px] italic leading-relaxed text-[#ABB2BF]">
              {study.outcome.retrospective}
            </p>
          </blockquote>
        </div>
      </section>
    </article>
  );
};

export default CaseStudyView;
