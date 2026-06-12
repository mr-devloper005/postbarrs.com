# Slot 4 Editable Manifest

This folder is the safe customization surface for the Postbarrs.com redesign.

## Allowed To Edit

- `src/editable/pages/**`
- `src/editable/content/**`
- `src/editable/theme/**`
- `src/editable/components/**`
- `src/editable/cards/**`
- `src/editable/sections/**`
- `src/editable/shell/**`
- `src/editable/layouts/**`

## Do Not Edit

- `src/app/**` except route files intentionally importing editable pages
- `src/lib/**`
- `src/config/**`
- `src/components/**` outside `src/editable/components/**`
- `src/design/**`
- `src/app/api/**`
- `.github/**`
- `Dockerfile`
- `docker-compose*.yml`
- `package.json`
- lockfiles

## Current Direction

- Premium luxury editorial desk
- Showcase-style homepage with layered hero and demo-style preview area
- Green palette anchored to `#4B5945`, `#66785F`, `#91AC8F`, `#B2C9AD`
- Mixed card rhythm across featured, horizontal, compact, editorial list, and image-first layouts

## Required Rules

- Keep all exported component names and props compatible.
- Keep post loops, task support, links, metadata exports, and detail behavior intact.
- Use safe fallbacks when image, summary, category, or optional fields are missing.
- Keep edits inside `src/editable/` only.

## AI-Safe Layout Files

- `src/editable/sections/HomeSections.tsx`
- `src/editable/pages/TaskArchivePage.tsx`
- `src/editable/pages/TaskDetailPage.tsx`
- `src/editable/cards/PostCards.tsx`
- `src/editable/layouts/design-contract.ts`
- `src/editable/theme/brand.config.ts`
- `src/editable/theme/visual-system.ts`
- `src/editable/theme/editable-global.css`
- `src/editable/content/pages.content.ts`
- `src/editable/content/task-pages.content.ts`

## Checks

Run before finishing:

```bash
pnpm guard:editable
pnpm exec tsc --noEmit
```
