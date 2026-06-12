import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Feature archive',
    headline: 'Large reading cards, elegant filters, and a more confident article archive.',
    description: 'Article pages should feel like a polished editorial shelf with a strong opening story and varied supporting layouts.',
    filterLabel: 'Filter article topics',
    secondaryNote: 'Featured entries lead the experience, while compact stories keep the archive moving.',
    chips: ['Feature story', 'Editorial list', 'Reading pace'],
  },
  classified: {
    eyebrow: 'Notice archive',
    headline: 'Offers and updates arranged with quicker scanning and bolder actions.',
    description: 'Classified content still needs clarity first, but now lives inside the same premium visual family.',
    filterLabel: 'Filter offers',
    secondaryNote: 'Practical detail stays front and center with cleaner styling.',
    chips: ['Fast scan', 'Price cues', 'Direct action'],
  },
  sbm: {
    eyebrow: 'Saved collection',
    headline: 'Curated links displayed like a refined reference board.',
    description: 'Bookmark pages should feel organized, easy to skim, and pleasantly editorial instead of plain text dumps.',
    filterLabel: 'Filter collections',
    secondaryNote: 'Resource shelves work best with calm spacing and sharp labels.',
    chips: ['Collections', 'References', 'Useful links'],
  },
  profile: {
    eyebrow: 'Profile library',
    headline: 'Profiles with identity, context, and a cleaner presentation rhythm.',
    description: 'People and brand pages should feel credible and readable before the visitor ever clicks through.',
    filterLabel: 'Filter profiles',
    secondaryNote: 'Strong identity surfaces make supporting details easier to trust.',
    chips: ['Identity first', 'Context', 'Suggested reading'],
  },
  pdf: {
    eyebrow: 'Document shelf',
    headline: 'Reports, guides, and PDFs framed as a polished document archive.',
    description: 'Documents need stronger archive cues, clear open actions, and graceful fallback presentation.',
    filterLabel: 'Filter documents',
    secondaryNote: 'Keep file-first utility while matching the broader visual system.',
    chips: ['Downloads', 'Library', 'Reference'],
  },
  listing: {
    eyebrow: 'Business index',
    headline: 'Directory posts with a more premium discovery and comparison flow.',
    description: 'Listings should still surface contact cues and location details, but within a richer presentation layer.',
    filterLabel: 'Filter businesses',
    secondaryNote: 'Comparison improves when cards feel structured and calm.',
    chips: ['Compare', 'Location', 'Direct contact'],
  },
  image: {
    eyebrow: 'Visual collection',
    headline: 'Image stories with stronger gallery energy and cleaner supporting copy.',
    description: 'Image pages should let visuals lead while keeping titles, summaries, and related posts easy to revisit.',
    filterLabel: 'Filter visuals',
    secondaryNote: 'Image-led sections should feel curated, not cluttered.',
    chips: ['Gallery flow', 'Visual first', 'Feature grids'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
