import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f6f1',
  '--slot4-page-text': '#233027',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#fcfcf8',
  '--slot4-muted-text': '#52624f',
  '--slot4-soft-muted-text': '#6f7f6b',
  '--slot4-accent': '#4B5945',
  '--slot4-accent-fill': '#66785F',
  '--slot4-accent-soft': '#B2C9AD',
  '--slot4-dark-bg': '#233027',
  '--slot4-dark-text': '#f8faf6',
  '--slot4-media-bg': '#d8e1d0',
  '--slot4-cream': '#f4f2e8',
  '--slot4-warm': '#eef1e7',
  '--slot4-lavender': '#e8eee4',
  '--slot4-gray': '#f1f4ed',
  '--slot4-body-gradient':
    'radial-gradient(circle at top left, rgba(178,201,173,0.34), transparent 34%), radial-gradient(circle at top right, rgba(145,172,143,0.18), transparent 26%), linear-gradient(180deg, #fafaf6 0%, #f6f5ef 34%, #f2f3ec 100%)',
  '--editable-container': '1320px',
  '--editable-border': 'rgba(75,89,69,0.16)',
  '--editable-shadow': '0 24px 80px rgba(49, 63, 48, 0.08)',
  '--editable-shadow-strong': '0 34px 100px rgba(35, 48, 39, 0.14)',
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
  border: 'border-[color:var(--editable-border)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[var(--editable-shadow)]',
  shadowStrong: 'shadow-[var(--editable-shadow-strong)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(35,48,39,0.04),rgba(35,48,39,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[310px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.26em]',
    heroTitle: "text-4xl font-black leading-[0.92] tracking-[-0.07em] sm:text-5xl lg:text-[4.75rem]",
    sectionTitle: "text-3xl font-black leading-[0.95] tracking-[-0.06em] sm:text-4xl lg:text-[3.4rem]",
    body: 'text-base leading-8',
    serif: "font-['Georgia','Times_New_Roman',serif]",
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.6rem] border ${editablePalette.border} bg-white/72 backdrop-blur-sm`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-8 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-95`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} bg-white px-8 py-3.5 text-sm font-black uppercase tracking-[0.14em] ${editablePalette.surfaceText} transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-warm)]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-8 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:opacity-95`,
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.45rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(35,48,39,0.16)]',
    fade: 'transition duration-300 hover:opacity-88',
  },
} as const

export const aiLayoutRules = [
  'Keep the green editorial palette anchored to #4B5945, #66785F, #91AC8F, and #B2C9AD.',
  'Use the homepage sections file for large landing-page structure changes and keep posts fully dynamic.',
  'Mix card types: featured hero cards, horizontal stories, compact stat cards, list rows, and image-first cards.',
  'Preserve safe fallbacks for missing images, summaries, and categories on every task type.',
  'Use postHref() or buildPostUrl() for post navigation so route compatibility stays intact.',
  'Treat article pages like a premium editorial desk and supporting task pages like themed demo variations of the same system.',
] as const
