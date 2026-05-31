import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#efefef',
  '--slot4-page-text': '#222327',
  '--slot4-panel-bg': '#e8edf8',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#566072',
  '--slot4-soft-muted-text': '#7a8293',
  '--slot4-accent': '#12abc6',
  '--slot4-accent-fill': '#12abc6',
  '--slot4-accent-soft': '#d9f5fb',
  '--slot4-dark-bg': '#1f2024',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#d6dce8',
  '--slot4-cream': '#f5f6f8',
  '--slot4-warm': '#edf0f5',
  '--slot4-lavender': '#dbe4f6',
  '--slot4-gray': '#e7ebf2',
  '--slot4-body-gradient': 'radial-gradient(circle at 12% 10%, #f6f8fb 0%, #efefef 45%, #e8edf5 100%)',
  '--editable-container': '1280px',
  '--editable-border': 'rgba(34,35,39,0.12)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-black/[0.1]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_46px_rgba(0,0,0,0.08)]',
  shadowStrong: 'shadow-[0_26px_82px_rgba(0,0,0,0.18)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.62))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[220px] shrink-0 snap-start sm:w-[250px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.2em]',
    heroTitle: 'font-serif text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]',
    sectionTitle: 'font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[1.6rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.4rem] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-[1.8rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-semibold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.2rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[3/2]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(0,0,0,0.14)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all homepage sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so AI can redesign the whole home experience in one file.',
  'Use wide readable grids; never create skinny columns for paragraphs or cards.',
  'Use horizontal rails for dense post browsing and image-first discovery.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
