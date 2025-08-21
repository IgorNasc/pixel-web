# Project Layout

This project has been refactored to a `src/`-rooted, enterprise-friendly structure. See `docs/ARCHITECTURE.md` for details, conventions, and examples.

Key paths:
- `src/app/` — App Router routes, layouts
- `src/features/` — Feature-first modules
- `src/components/` — Shared UI and composites
- `src/hooks/` — Cross-cutting hooks
- `src/lib/` — Utilities, constants, SEO, prisma, etc.
- `src/types/` — Global types and module augmentations
- `prisma/`, `public/`, `styles/` — unchanged

Path alias `@/*` now points to `src/*` in `tsconfig.json`.
