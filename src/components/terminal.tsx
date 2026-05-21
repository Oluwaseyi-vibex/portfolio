import { useEffect, useMemo, useRef, useState } from "react";
import "./terminal.css";

type TerminalTone = "accent" | "dim" | "error" | "highlight" | "muted";

type TerminalSegment = {
  href?: string;
  newTab?: boolean;
  text: string;
  tone?: TerminalTone;
};

type TerminalEntry =
  | {
      id: string;
      kind: "command";
      text: string;
    }
  | {
      id: string;
      kind: "response";
      lines: TerminalSegment[][];
    };

type TerminalCommand = {
  description: string;
  exec: (args: string[]) => TerminalSegment[][];
};

const PROMPT = "guest@portfolio:~$";

const createLine = (...segments: TerminalSegment[]): TerminalSegment[] => segments;

const escapeHTML = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const commandRegistry: Record<string, TerminalCommand> = {
  help: {
    description: "Display available commands and usage notes.",
    exec: () => {
      const lines: TerminalSegment[][] = [
        createLine({ text: "Available commands:", tone: "highlight" }),
      ];

      Object.entries(commandRegistry).forEach(([name, command]) => {
        lines.push(
          createLine(
            { text: name.padEnd(10), tone: "accent" },
            { text: " " },
            { text: command.description, tone: "muted" },
          ),
        );
      });

      lines.push(
        createLine({
          text: "Use ArrowUp and ArrowDown to revisit command history.",
          tone: "dim",
        }),
      );

      return lines;
    },
  },
  whoami: {
    description: "Show a quick operator profile.",
    exec: () => [
      createLine(
        { text: "Name: ", tone: "dim" },
        { text: "Kodeleyiri Oluwaseyifunmi Ezekiel", tone: "highlight" },
      ),
      createLine(
        { text: "Role: ", tone: "dim" },
        { text: "Full-stack developer building thoughtful web products." },
      ),
    ],
  },
  skills: {
    description: "List the core tools in this stack.",
    exec: () => [
      createLine(
        { text: "[Frontend] ", tone: "accent" },
        { text: "React, Vite, Tailwind CSS, TypeScript" },
      ),
      createLine(
        { text: "[Backend]  ", tone: "accent" },
        { text: "Node.js, Express, Prisma, PostgreSQL" },
      ),
      createLine(
        { text: "[Workflow] ", tone: "accent" },
        { text: "GSAP, GitHub, product thinking, shipping fast" },
      ),
    ],
  },
  projects: {
    description: "Surface a few featured builds from the portfolio.",
    exec: () => [
      createLine(
        { text: "Power as you go", tone: "highlight" },
        { text: "  IoT-enabled electricity credit management backend." },
      ),
      createLine(
        { text: "Lead-Gen AI", tone: "highlight" },
        { text: "      Research + outreach automation for sales teams." },
      ),
      createLine(
        { text: "ELI5", tone: "highlight" },
        { text: "              AI summaries for finance and crypto stories." },
      ),
    ],
  },
  contact: {
    description: "Print active contact routes.",
    exec: () => [
      createLine(
        { text: "Email:  ", tone: "dim" },
        { text: "oluseyiwmwm@gmail.com", href: "mailto:oluseyiwmwm@gmail.com" },
      ),
      createLine(
        { text: "GitHub: ", tone: "dim" },
        {
          text: "github.com/Oluwaseyi-vibex",
          href: "https://github.com/Oluwaseyi-vibex",
          newTab: true,
        },
      ),
      createLine(
        { text: "X:      ", tone: "dim" },
        {
          text: "x.com/oluwaseyi_dev",
          href: "https://x.com/oluwaseyi_dev?t=abEPDOcFYUVjcGs2Zq8Nfw&s=09",
          newTab: true,
        },
      ),
    ],
  },
  sudo: {
    description: "Try elevated privileges. It will not go well.",
    exec: () => [
      createLine({
        text: "Permission denied: guest account is not in the sudoers file.",
        tone: "error",
      }),
    ],
  },
};

const initialHistory: TerminalEntry[] = [
  {
    id: "welcome",
    kind: "response",
    lines: [
      createLine({
        text: "Welcome to Core Shell v2.4.0-Release LTS.",
        tone: "highlight",
      }),
      createLine({ text: "Type " }, { text: "help", tone: "accent" }, { text: " to see available operations." }),
    ],
  },
];

const renderEscapedHTML = (value: string) => ({
  __html: escapeHTML(value),
});

const Terminal = () => {
  const [history, setHistory] = useState<TerminalEntry[]>(initialHistory);
  const [draft, setDraft] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const bodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const historyIndexRef = useRef(0);

  const caretOffset = useMemo(() => `${draft.length}ch`, [draft]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) {
      return;
    }

    body.scrollTop = body.scrollHeight;
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const appendResponse = (lines: TerminalSegment[][]) => {
    setHistory((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        kind: "response",
        lines,
      },
    ]);
  };

  const executeCommand = () => {
    const rawInput = draft;
    const sanitizedInput = rawInput.trim();

    setHistory((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        kind: "command",
        text: sanitizedInput,
      },
    ]);

    if (sanitizedInput.length === 0) {
      setDraft("");
      return;
    }

    setCommandHistory((current) => {
      const next = [...current, sanitizedInput];
      historyIndexRef.current = next.length;
      return next;
    });

    const args = sanitizedInput.split(/\s+/);
    const directive = args[0].toLowerCase();

    if (directive === "clear") {
      setHistory([]);
      setDraft("");
      return;
    }

    const command = commandRegistry[directive];

    if (command) {
      try {
        appendResponse(command.exec(args.slice(1)));
      } catch (error) {
        appendResponse([
          createLine({
            text: `Runtime execution fault: ${
              error instanceof Error ? error.message : "Unknown error"
            }`,
            tone: "error",
          }),
        ]);
      }
    } else {
      appendResponse([
        createLine(
          { text: "Shell exception: ", tone: "error" },
          { text: directive, tone: "highlight" },
          { text: " matches no known runtime profile. Try " },
          { text: "help", tone: "accent" },
          { text: "." },
        ),
      ]);
    }

    setDraft("");
  };

  const moveHistory = (direction: -1 | 1) => {
    if (commandHistory.length === 0) {
      return;
    }

    const nextIndex = Math.min(
      commandHistory.length,
      Math.max(0, historyIndexRef.current + direction),
    );

    historyIndexRef.current = nextIndex;

    const nextValue =
      nextIndex === commandHistory.length ? "" : commandHistory[nextIndex];

    setDraft(nextValue);

    requestAnimationFrame(() => {
      const input = inputRef.current;
      if (input) {
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveHistory(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveHistory(1);
    }
  };

  return (
    <section className="px-4 pt-14 pb-6 md:pt-20">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-5">
        <div className="flex flex-col gap-3 md:max-w-[48rem]">
          <p className="font-FiraCode text-sm uppercase tracking-[0.3em] text-[#7a828f]">
            interactive shell
          </p>
          <h2 className="font-FiraCode text-3xl text-white md:text-4xl">
            Explore the portfolio like a terminal session
          </h2>
          <p className="max-w-[65ch] font-FiraCode text-sm leading-7 text-[#abb2bf] md:text-base">
            Click anywhere in the shell, type a command, and use the arrow keys
            to move through history. Start with{" "}
            <span className="text-[#8af57d]">help</span>,{" "}
            <span className="text-[#8af57d]">whoami</span>,{" "}
            <span className="text-[#8af57d]">projects</span>, or{" "}
            <span className="text-[#8af57d]">contact</span>.
          </p>
        </div>

        <div
          id="terminalContainer"
          className="terminal-shell"
          aria-label="Interactive portfolio terminal"
          role="region"
          onClick={focusInput}
          onKeyDownCapture={(event) => {
            if (event.key === "Tab") {
              focusInput();
            }
          }}
        >
          <div className="terminal-shell__bar">
            <div className="terminal-shell__controls" aria-hidden="true">
              <span className="terminal-shell__dot terminal-shell__dot--close" />
              <span className="terminal-shell__dot terminal-shell__dot--minimize" />
              <span className="terminal-shell__dot terminal-shell__dot--maximize" />
            </div>
            <div className="terminal-shell__title">guest@portfolio: ~</div>
          </div>

          <div
            id="terminalBody"
            ref={bodyRef}
            className="terminal-shell__body"
            onClick={focusInput}
          >
            <div id="outputHistory" className="terminal-shell__history" aria-live="polite">
              {history.map((entry) => {
                if (entry.kind === "command") {
                  return (
                    <div key={entry.id} className="terminal-shell__line-block">
                      <p className="terminal-shell__line">
                        <span className="terminal-shell__prompt">{PROMPT}</span>
                        <span
                          className="terminal-shell__echo"
                          dangerouslySetInnerHTML={renderEscapedHTML(entry.text)}
                        />
                      </p>
                    </div>
                  );
                }

                return (
                  <div
                    key={entry.id}
                    className="terminal-shell__line-block terminal-shell__line-block--response"
                  >
                    {entry.lines.map((line, index) => (
                      <p key={`${entry.id}-${index}`} className="terminal-shell__line">
                        {line.map((segment, segmentIndex) => {
                          const className = segment.tone
                            ? `terminal-shell__segment terminal-shell__segment--${segment.tone}`
                            : "terminal-shell__segment";

                          if (segment.href) {
                            return (
                              <a
                                key={`${entry.id}-${index}-${segmentIndex}`}
                                className={`${className} terminal-shell__link`}
                                href={segment.href}
                                rel={segment.newTab ? "noreferrer" : undefined}
                                target={segment.newTab ? "_blank" : undefined}
                              >
                                {segment.text}
                              </a>
                            );
                          }

                          return (
                            <span
                              key={`${entry.id}-${index}-${segmentIndex}`}
                              className={className}
                            >
                              {segment.text}
                            </span>
                          );
                        })}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            <div className="terminal-shell__prompt-row">
              <span className="terminal-shell__prompt">{PROMPT}</span>
              <div
                className="terminal-shell__input-wrap"
                style={{ ["--terminal-caret-offset" as string]: caretOffset }}
              >
                <input
                  id="terminalInputField"
                  ref={inputRef}
                  aria-label="Terminal command input"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="terminal-shell__input"
                  inputMode="text"
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  type="text"
                  value={draft}
                />
                <span className="terminal-shell__input-display">{draft}</span>
                <span aria-hidden="true" className="terminal-shell__caret" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
