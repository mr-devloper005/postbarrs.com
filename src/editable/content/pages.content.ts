import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Stories, images, and curated discoveries',
      description: 'Explore editorial stories, visual highlights, and structured resources through a polished modern magazine experience.',
      openGraphTitle: 'Stories, images, and curated discoveries',
      openGraphDescription: 'A polished reading-first surface for articles, images, and curated resources.',
      keywords: ['editorial website', 'article publication', 'image stories', 'content discovery'],
    },
    hero: {
      badge: 'Independent editorial stream',
      title: ['Fresh stories. Better rhythm.', 'A homepage built for readers.'],
      description: 'Discover long reads, visual stories, and practical resources through a layout that feels intentional on every device.',
      primaryCta: { label: 'Read latest stories', href: '/article' },
      secondaryCta: { label: 'Explore visuals', href: '/image' },
      searchPlaceholder: 'Search stories, visuals, listings, and more',
      focusLabel: 'Focus',
      featureCardBadge: 'feature spotlight',
      featureCardTitle: 'A cleaner structure for better reading momentum.',
      featureCardDescription: 'Featured stories and high-signal content stay visible without interrupting the browsing flow.',
    },
    intro: {
      badge: 'Why this layout',
      title: 'A modern magazine structure for every content type.',
      paragraphs: [
        'The homepage now uses stronger sections, larger visual hierarchy, and clearer paths into each content type.',
        'Readers can move from featured stories to compact indexes, image-led collections, and deeper archives without losing context.',
        'Every area is responsive and tuned for speed, scanning, and comfortable long-form reading.',
      ],
      sideBadge: 'Highlights',
      sidePoints: [
        'Featured, compact, horizontal, editorial, and image-first card styles.',
        'Search-first discovery with category-aware pathways.',
        'Task pages and detail pages retain full data wiring and compatibility.',
        'Refined motion and hover interactions for a premium feel.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Keep exploring',
      title: 'Find your next useful read in seconds.',
      description: 'Jump into curated sections, trending stories, and deep archives with one consistent navigation system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A publication designed for readability and discovery.',
    description: `${slot4BrandConfig.siteName} combines editorial storytelling, visual browsing, and practical resource discovery in one cohesive experience.`,
    paragraphs: [
      'This redesign emphasizes typography, rhythm, and card variety to make each section feel useful and distinct.',
      'Content remains fully dynamic while the interface is now cleaner, bolder, and easier to scan across desktop and mobile.',
    ],
    values: [
      {
        title: 'Readable by default',
        description: 'Strong hierarchy and spacing make long-form content easier to follow.',
      },
      {
        title: 'Visual variety',
        description: 'Multiple card systems prevent repetition and improve discovery.',
      },
      {
        title: 'Practical structure',
        description: 'Search, categories, and section navigation are always within reach.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what you are building and where you need support.',
    description: 'Use this form for editorial inquiries, listing support, content partnerships, or general questions. We respond with the right next step.',
    formTitle: 'Send your message',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
