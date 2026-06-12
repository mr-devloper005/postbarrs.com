import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline,
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    announcement: 'Fresh layouts for long reads, galleries, and curated discoveries.',
    primaryLinks: [
      { label: 'Articles', href: '/article' },
      { label: 'Visuals', href: '/image' },
      { label: 'Listings', href: '/listing' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start reading', href: '/article' },
      secondary: { label: 'Explore all', href: '/' },
    },
  },
  footer: {
    tagline: '',
    description:
      'Postbarrs.com brings together feature stories, visual browsing, useful resources, and structured discovery in one editorial home.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'Latest Articles', href: '/article' },
          { label: 'Image Stories', href: '/image' },
          { label: 'Document Shelf', href: '/pdf' },
        ],
      },
      {
        title: 'Visit',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Comments', href: '/comments' },
        ],
      },
    ],
    bottomNote: 'Built for clean navigation, visual rhythm, and comfortable reading.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
