# Architecture Overview

This project follows an enterprise-grade, feature-oriented layout under a unified `src/` root. The goal is to keep pages lean, encourage clear separation of concerns, and make scaling straightforward.

## Top-Level Structure

- `src/app/`: Next.js App Router entrypoints (routes, layouts). Keep pages thin; delegate logic/UI to features/shared.
- `src/features/`: Feature-first modules (domain-specific UI, hooks, services). Co-locate code by feature.
- `src/components/`: Shared, reusable presentational components used across features.
  - `layout/`: Site-wide layout parts (headers, footers, navigation).
  - `sections/`: Landing/marketing sections.
  - `ui/`: Low-level UI primitives (buttons, inputs, dialogs, etc.).
  - `providers/`: React providers (e.g., session/theme).
- `src/hooks/`: Cross-cutting React hooks (feature-agnostic).
- `src/lib/`: Utilities and app-wide libraries (auth, constants, SEO, prisma, validation, theming, helpers).
- `src/types/`: Global TypeScript types and module augmentations.
- `prisma/`: Database schema and migrations.
- `public/`: Static assets.
- `styles/`: Tailwind/global style assets that are not tied to a single component.

## Conventions

- App imports use the `@/` alias, which now points to `src/*`.
- Prefer feature-first organization: new capabilities should live under `src/features/<feature>/...` with co-located components, hooks, and services as appropriate.
- Keep `src/app/*` focused on routing and composition; avoid complex logic in page files.
- Shared, widely reused primitives belong in `src/components/ui`. More complex composites go in `src/components/` or a feature.

## Path Aliases

`tsconfig.json` maps `@/*` to `src/*`. Examples:

- `@/app/...` → `src/app/...`
- `@/features/...` → `src/features/...`
- `@/components/...` → `src/components/...`
- `@/hooks/...` → `src/hooks/...`
- `@/lib/...` → `src/lib/...`
- `@/types/...` → `src/types/...`

## Adding a New Feature

1. Create `src/features/<feature>/`.
2. Add UI in `components/`, hooks in `hooks/`, and any server/client services in `services/` within that feature.
3. Import into `src/app/...` routes to compose pages.

This structure minimizes cross-feature coupling and keeps scale manageable.

