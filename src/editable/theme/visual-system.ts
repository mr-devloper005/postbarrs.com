import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'editorial-paper'
  | 'luxury-atelier'
  | 'brutalist-index'
  | 'organic-journal'
  | 'tech-directory'
  | 'retro-bulletin'
  | 'visual-gallery'

export const visualPresets = {
  'editorial-paper': {
    label: 'Editorial Paper',
    mood: 'classic masthead, modern spacing',
    fontDirection: 'serif display with clean sans body',
    colors: {
      background: '#efefef',
      foreground: '#222327',
      muted: '#5c6472',
      primary: '#1f2024',
      accent: '#12abc6',
      surface: '#ffffff',
    },
    shape: 'crisp cards with soft radii and magazine rails',
  },
  'luxury-atelier': {
    label: 'Luxury Atelier',
    mood: 'dark elegance, quiet contrast',
    fontDirection: 'high-contrast display and minimal sans',
    colors: {
      background: '#15171c',
      foreground: '#f3f5f8',
      muted: '#a9b2c1',
      primary: '#ffffff',
      accent: '#32d4ef',
      surface: '#242832',
    },
    shape: 'large hero slabs with clean frames',
  },
  'brutalist-index': {
    label: 'Brutalist Index',
    mood: 'hard hierarchy and index rhythm',
    fontDirection: 'condensed display with utility labels',
    colors: {
      background: '#eceff4',
      foreground: '#14161b',
      muted: '#586070',
      primary: '#14161b',
      accent: '#0d95ad',
      surface: '#ffffff',
    },
    shape: 'thick strokes and stacked blocks',
  },
  'organic-journal': {
    label: 'Organic Journal',
    mood: 'reader-friendly calm',
    fontDirection: 'warm serif and human sans',
    colors: {
      background: '#f1f2f5',
      foreground: '#21252d',
      muted: '#677182',
      primary: '#1e2128',
      accent: '#1b9fb8',
      surface: '#fbfcff',
    },
    shape: 'rounded editorial cards and soft panels',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'high-utility grid system',
    fontDirection: 'modern sans with mono badges',
    colors: {
      background: '#edf2f7',
      foreground: '#111827',
      muted: '#526172',
      primary: '#111827',
      accent: '#0ca6c0',
      surface: '#ffffff',
    },
    shape: 'clean grid, meta chips, efficient scanning',
  },
  'retro-bulletin': {
    label: 'Retro Bulletin',
    mood: 'playful newspaper collage',
    fontDirection: 'dramatic serif with mono tags',
    colors: {
      background: '#ece7df',
      foreground: '#2a2a2f',
      muted: '#67606b',
      primary: '#2a2a2f',
      accent: '#0aa5bf',
      surface: '#fbfbfd',
    },
    shape: 'cards, tabs, pinned snippets',
  },
  'visual-gallery': {
    label: 'Visual Gallery',
    mood: 'cinematic discovery',
    fontDirection: 'oversized serif and compact sans',
    colors: {
      background: '#101520',
      foreground: '#f6f8ff',
      muted: '#9ba7bd',
      primary: '#ffffff',
      accent: '#47e4ff',
      surface: '#1f2633',
    },
    shape: 'image-led blocks with glossy overlays',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'editorial-paper',
  radius: {
    sm: '0.75rem',
    md: '1.15rem',
    lg: '1.6rem',
    xl: '2.25rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-500',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.24em]',
    heroTitle: 'font-serif text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'font-serif text-3xl font-semibold tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-medium uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-black/10 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]',
    quiet: 'border border-black/10 bg-black/[0.03]',
    dark: 'border border-white/10 bg-black/30 shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
