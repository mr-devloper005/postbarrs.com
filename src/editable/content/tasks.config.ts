import type { TaskKey } from '@/lib/site-config'

export const slot4TaskSupport = {
  article: true,
  classified: false,
  sbm: false,
  profile: false,
  pdf: false,
  listing: false,
  image: false,
} satisfies Record<TaskKey, boolean>

export const slot4TaskNotes = {
  article: 'Editorial archive and long-form article detail views',
  classified: 'Offer and notice pages with quick-scan detail panels',
  sbm: 'Curated bookmark shelves and resource detail pages',
  profile: 'Profile and identity-led detail pages',
  pdf: 'Document archive cards and PDF detail views',
  listing: 'Directory-style cards and listing detail pages',
  image: 'Gallery archive layouts and visual detail pages',
} satisfies Record<TaskKey, string>
