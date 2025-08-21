# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages and API routes (e.g., `app/api/send-email`). Global layout/styles in `app/layout.tsx` and `app/globals.css`.
- `components/`: Reusable UI (`components/ui`), layout, and section components. 
- `lib/`: Utilities, constants, SEO config, and email templates.
- `hooks/`: Reusable React hooks.
- `public/`: Static assets.  `styles/`: Tailwind globals.
- `types/`: Shared TypeScript types. Path alias `@/*` points to repo root (see `tsconfig.json`).

## Build, Test, and Development Commands
- `pnpm dev`: Start the local dev server.
- `pnpm build`: Production build (`next build`).
- `pnpm start`: Run the production server after build.
- `pnpm lint`: ESLint via `next lint` (uses Next defaults). Tip: fix issues before committing.

## Coding Style & Naming Conventions
- Language: TypeScript, React 18, Next.js 14, Tailwind CSS, Radix UI.
- Indentation: 2 spaces; prefer concise, typed props and explicit return types for public APIs.
- Filenames: kebab-case for files (`button.tsx`), PascalCase for component names, hooks start with `use*`.
- Imports: use `@/*` alias for absolute paths. Co-locate small components with features; shared UI lives in `components/ui`.

## Testing Guidelines
- No formal test suite yet. If adding tests: use Jest/Vitest + React Testing Library for unit, Playwright for e2e.
- Place tests next to code or in `__tests__/`. Name files `*.test.ts`/`*.test.tsx`.
- Aim to cover hooks, utils in `lib/`, and critical UI logic.

## Commit & Pull Request Guidelines
- Commits: follow conventional style seen in history: `fix: ...`, `feature/feat: ...`, `chore: ...`, `docs: ...`, `refactor: ...`.
  - Example: `feat: add carousel component to components/ui`
- PRs: include a clear description, linked issues, screenshots for UI changes, and test steps. Ensure `pnpm build` and `pnpm lint` pass. Keep diffs focused.

## Security & Configuration Tips
- Environment: Node 18+. Use `.env.local` for secrets; never commit them.
- Replace hardcoded API keys (see `app/api/send-email/route.ts`) with `process.env.RESEND_API_KEY` and configure in `.env.local`.
- Note: `next.config.mjs` ignores TypeScript/ESLint errors during builds—run locally and fix before merging. Images are `unoptimized: true` by default.

