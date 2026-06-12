import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'verdant-editorial'
  | 'quiet-luxury'
  | 'museum-index'
  | 'soft-bulletin'
  | 'gallery-studio'
  | 'market-ledger'
  | 'midnight-review'

export const visualPresets = {
  'verdant-editorial': {
    label: 'Verdant Editorial',
    mood: 'premium magazine landing page with calm hierarchy',
    fontDirection: 'high-contrast serif headlines with clean sans support',
    colors: {
      background: '#f7f6f1',
      foreground: '#233027',
      muted: '#5f705b',
      primary: '#233027',
      accent: '#66785F',
      surface: '#ffffff',
    },
    shape: 'large rounded cards, elegant borders, editorial spacing',
  },
  'quiet-luxury': {
    label: 'Quiet Luxury',
    mood: 'soft premium desk with controlled contrast',
    fontDirection: 'refined serif + compact grotesk',
    colors: {
      background: '#f4f1e9',
      foreground: '#243128',
      muted: '#73816e',
      primary: '#243128',
      accent: '#4B5945',
      surface: '#fffdf9',
    },
    shape: 'layered surfaces with soft arcs',
  },
  'museum-index': {
    label: 'Museum Index',
    mood: 'structured curation and exhibit labels',
    fontDirection: 'display serif with strong utility labels',
    colors: {
      background: '#f3f3ef',
      foreground: '#1e2920',
      muted: '#66745f',
      primary: '#1e2920',
      accent: '#91AC8F',
      surface: '#fdfdfb',
    },
    shape: 'clean blocks, inset panels, display rails',
  },
  'soft-bulletin': {
    label: 'Soft Bulletin',
    mood: 'paper-like, welcoming, reader friendly',
    fontDirection: 'traditional serif with airy sans',
    colors: {
      background: '#f8f7f2',
      foreground: '#2b352d',
      muted: '#6c7d69',
      primary: '#2b352d',
      accent: '#66785F',
      surface: '#ffffff',
    },
    shape: 'paper cards and lifted chips',
  },
  'gallery-studio': {
    label: 'Gallery Studio',
    mood: 'visual feature rail with cinematic image blocks',
    fontDirection: 'wide headline serif and compact metadata',
    colors: {
      background: '#eef1e8',
      foreground: '#1f2a22',
      muted: '#63705f',
      primary: '#1f2a22',
      accent: '#4B5945',
      surface: '#ffffff',
    },
    shape: 'image-led editorial frames',
  },
  'market-ledger': {
    label: 'Market Ledger',
    mood: 'catalog-like navigation with elevated utility',
    fontDirection: 'clean sans and occasional serif feature headlines',
    colors: {
      background: '#f5f6f0',
      foreground: '#263228',
      muted: '#6d7b67',
      primary: '#263228',
      accent: '#91AC8F',
      surface: '#ffffff',
    },
    shape: 'dashboard rhythm without losing warmth',
  },
  'midnight-review': {
    label: 'Midnight Review',
    mood: 'luxury dark companion sections',
    fontDirection: 'serif drama with compact control labels',
    colors: {
      background: '#182019',
      foreground: '#f1f5ef',
      muted: '#a9b7a2',
      primary: '#f1f5ef',
      accent: '#B2C9AD',
      surface: '#253027',
    },
    shape: 'dark feature wells and luminous cards',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'verdant-editorial',
  radius: {
    sm: '0.85rem',
    md: '1.25rem',
    lg: '2rem',
    xl: '2.85rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in duration-500',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-92',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: "text-5xl font-black tracking-[-0.08em] sm:text-6xl lg:text-7xl",
    sectionTitle: "text-3xl font-black tracking-[-0.05em] sm:text-4xl",
    body: 'text-base leading-8',
    caption: 'text-[11px] font-black uppercase tracking-[0.2em]',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/55 backdrop-blur-xl',
    paper: 'border border-[color:var(--editable-border)] bg-white shadow-[var(--editable-shadow)]',
    quiet: 'border border-[color:var(--editable-border)] bg-[var(--slot4-warm)]',
    dark: 'border border-white/10 bg-[var(--slot4-dark-bg)] shadow-[var(--editable-shadow-strong)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
