import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Luxury editorial reading, discovery, and curated article browsing',
      description: 'Explore Postbarrs.com through a premium editorial desk built for article lovers, visual browsing, and polished discovery.',
      openGraphTitle: 'Postbarrs.com editorial desk',
      openGraphDescription: 'A premium reading-first homepage for articles, visuals, listings, and curated discoveries.',
      keywords: ['editorial articles', 'magazine homepage', 'article lovers', 'reading desk'],
    },
    hero: {
      badge: 'Welcome to Postbarrs',
      title: ['Long-form stories,', 'sharp commentary, curated reads.'],
      description:
        'A publication built around thoughtful writing, visual storytelling, and discoveries worth your time.',
      primaryCta: { label: 'Browse articles', href: '/article' },
      secondaryCta: { label: 'Search archive', href: '/search' },
      searchPlaceholder: 'Search stories, topics, and authors',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured',
      featureCardTitle: 'Stories that stay with you long after the last paragraph.',
      featureCardDescription: 'Every piece is chosen for depth, clarity, and lasting value.',
    },
    intro: {
      badge: 'Our approach',
      title: 'Stories told with care, presented with clarity.',
      paragraphs: [
        'Every article on Postbarrs is selected for its depth, relevance, and lasting value to curious readers.',
        'We combine editorial precision with clean presentation so you can focus on what matters — the writing itself.',
        'From long-form features to curated visual stories, everything connects through a consistent reading experience.',
      ],
      sideBadge: 'What to expect',
      sidePoints: [
        'In-depth features and commentary across diverse topics.',
        'Visual stories and image-led editorial work.',
        'Curated collections organized by theme and interest.',
        'A calm, distraction-free reading environment.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'View visuals', href: '/image' },
    },
    cta: {
      badge: 'Keep reading',
      title: 'Explore the full archive and find your next favorite piece.',
      description:
        'From featured articles to visual stories and curated resources — there is always something worth opening next.',
      primaryCta: { label: 'Browse articles', href: '/article' },
      secondaryCta: { label: 'Search archive', href: '/search' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the desk',
    title: 'A calmer, sharper place to browse and read.',
    description:
      `${slot4BrandConfig.siteName} is built around editorial pacing, visual clarity, and easier discovery for people who enjoy spending time with a good article.`,
    paragraphs: [
      'The redesign combines landing-page confidence with publication discipline so browsing feels intentional instead of generic.',
      'Different card shapes, reading sections, topic blocks, and archive panels help each content type stand on its own without breaking consistency.',
    ],
    values: [
      {
        title: 'Editorial hierarchy',
        description: 'Clear mastheads, stronger spacing, and better narrative flow across homepage, archives, and details.',
      },
      {
        title: 'Useful variety',
        description: 'Featured cards, compact rails, horizontal stories, and image-first blocks keep the interface feeling alive.',
      },
      {
        title: 'Route-safe structure',
        description: 'The design changed completely, but post wiring, task support, and content fallbacks remain intact.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Share a question, a collaboration idea, or a publishing request.',
    description:
      'Use the contact desk for editorial inquiries, support questions, listings, partnerships, or general requests. The form stays simple and routes every message clearly.',
    formTitle: 'Send a note',
  },
  search: {
    metadata: {
      title: 'Search the archive',
      description: 'Search stories, categories, visual posts, and useful resources across the site.',
    },
    hero: {
      badge: 'Search desk',
      title: 'Find the next piece worth opening.',
      description:
        'Search across the live archive by keyword, category, and content type, then jump directly into posts that match your current interest.',
      placeholder: 'Search by topic, title, keyword, or category',
    },
    resultsTitle: 'Fresh archive results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Sign in before opening the publishing desk.',
      description:
        'Your account unlocks the local publishing workspace for drafting article content, summaries, images, and supporting links.',
    },
    hero: {
      badge: 'Publishing desk',
      title: 'Draft polished content for every active section.',
      description:
        'Choose the content type, prepare a clean summary, add media and links, and save a local draft that fits the site’s current sections.',
    },
    formTitle: 'Draft details',
    submitLabel: 'Save draft',
    successTitle: 'Draft saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member login',
      title: 'Return to your reading and publishing desk.',
      description:
        'Log in to continue browsing, manage local drafts, and unlock the create workspace from the same account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create one first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create account',
      title: 'Open your account and start drafting with confidence.',
      description:
        'Create a local account to access the publishing desk, save drafts, and move smoothly between reading and creating.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
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
      visitButton: 'Visit official site',
    },
  },
} as const
