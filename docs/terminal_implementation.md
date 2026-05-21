# Core Shell Terminal — Implementation Reference

Portfolio integration lives in `src/components/terminal.tsx` and `src/components/terminal.css`. This document mirrors the original shell specification and records how it maps to the React build.

## Architecture

```
[User click / tap anywhere in terminal body]
                   │
                   ▼
     ┌───────────────────────────┐
     │ Focus proxy (#terminalInputField) │
     └─────────────┬─────────────┘
                   │ Enter / ArrowUp / ArrowDown
                   ▼
     ┌───────────────────────────┐
     │  Command processing (React state) │
     └─────────────┬─────────────┘
                   │
    ┌──────────────┴──────────────┐
    ▼                             ▼
┌───────────────┐             ┌───────────────┐
│ Built-in cmds │             │ Registry lookup│
│ clear, help   │             │ whoami, skills │
└───────┬───────┘             └───────┬───────┘
        └──────────────┬──────────────┘
                       ▼
     ┌───────────────────────────┐
     │   commandHistory (string[])│◄── Arrow keys
     └─────────────┬─────────────┘
                   ▼
     ┌───────────────────────────┐
     │ history state → DOM render │
     └───────────────────────────┘
```

## DOM structure (React)

| Spec ID | Element | Role |
|---------|---------|------|
| `terminalContainer` | `.terminal-shell` | Window chrome + focus region |
| `terminalBody` | `.terminal-shell__body` | Scrollable output + prompt |
| `outputHistory` | `.terminal-shell__history` | Command/response log |
| `terminalInputField` | `.terminal-shell__input` | Hidden-text input proxy |

## Commands

| Command | Behavior |
|---------|----------|
| `help` | Lists registered commands |
| `whoami` | Profile summary |
| `skills` | Stack listing |
| `projects` | Featured portfolio builds |
| `contact` | Email, GitHub, X links |
| `sudo` | Permission denied easter egg |
| `clear` | Wipes output history |

## Security

All echoed user input passes through `escapeHTML()` before `dangerouslySetInnerHTML`. Command responses use typed segment objects (no raw user HTML).

## Responsive adaptation

| Context | Adaptation |
|---------|------------|
| Mobile (≤768px) | `1rem` input text (prevents iOS zoom), shorter `dvh` body height, compact prompt |
| Tablet (769–1023px) | Intermediate body height |
| Landscape (short viewport) | Reduced terminal height |
| Touch | `min-height: 2.75rem` on prompt row and links (~44px targets) |
| Motion | `prefers-reduced-motion` disables caret blink |

## Deployment checklist

- [x] Click/tap in terminal body focuses `#terminalInputField`
- [x] Native caret hidden (`caret-color: transparent`); block caret on focus only
- [x] Auto-scroll to bottom after each command (`scrollTop = scrollHeight`)
- [x] XSS prevention on echoed commands (`escapeHTML`)
- [x] ArrowUp / ArrowDown command history with correct index after each run

## Run locally

```bash
npm run dev
```

Open the app, scroll to **Interactive shell**, and type `help`.
