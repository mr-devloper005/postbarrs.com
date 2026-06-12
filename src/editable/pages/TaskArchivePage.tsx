import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, Sparkles, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => {
  const summary = post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
  return summary || 'Open this post to view the full details.'
}
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Large reading cards, split stories, and clean supporting article layouts.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards highlight identity, location, and quick business actions.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer cards prioritize direct scanning, price cues, and practical summaries.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing keeps visuals prominent and captions compact.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Bookmark cards behave like a curated reference shelf.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards surface file intent, summaries, and quick open actions.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards keep identity strong before deeper detail pages.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': preset.colors.background,
    '--archive-text': preset.colors.foreground,
    '--archive-surface': preset.colors.surface,
    '--archive-accent': preset.colors.accent,
  } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const isArticle = task === 'article'

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className={`relative overflow-hidden border-b border-[var(--editable-border)] ${isArticle ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0))]' : 'slot4-shell-wave'}`}>
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8 lg:py-16">
            {isArticle ? (
              <ArticleArchiveHero voice={voice} posts={posts} basePath={basePath} categoryLabel={categoryLabel} />
            ) : (
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--archive-accent)] shadow-sm">
                  <Icon className="h-4 w-4" /> {voice.eyebrow}
                </div>
                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-6xl lg:text-[4.5rem]">{voice.headline}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 opacity-74">{voice.description}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {voice.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-[var(--editable-border)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/search" className="rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.12em]">
                    Search posts
                  </Link>
                </div>
              </div>
            )}

            <div className="relative z-10 rounded-[2rem] border border-[var(--editable-border)] bg-white/82 p-5 shadow-[var(--editable-shadow)] backdrop-blur">
              <form action={basePath} className="rounded-[1.6rem] border border-[var(--editable-border)] bg-[var(--slot4-warm)] p-5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] opacity-55">
                  <Filter className="h-4 w-4" /> {voice.filterLabel}
                </div>
                <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-[1rem] border border-[var(--editable-border)] bg-white px-4 text-sm font-bold outline-none">
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <button className="mt-3 h-12 w-full rounded-[1rem] bg-[var(--archive-text)] text-sm font-black uppercase tracking-[0.12em] text-[var(--archive-bg)]">
                  Apply filter
                </button>
                <p className="mt-3 text-xs font-bold opacity-55">Showing: {categoryLabel}</p>
              </form>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-[var(--editable-border)] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-55">Collection</p>
                  <p className="mt-1 text-sm font-bold">{label}</p>
                </div>
                <div className="rounded-[1rem] border border-[var(--editable-border)] bg-white p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-55">Current topic</p>
                  <p className="mt-1 truncate text-sm font-bold">{categoryLabel}</p>
                </div>
                <div className="rounded-[1rem] border border-[var(--editable-border)] bg-white p-4 sm:col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-55">Layout note</p>
                  <p className="mt-1 text-sm leading-7 opacity-70">{deck.promise}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-10 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={isArticle ? 'grid items-start gap-6 xl:grid-cols-[minmax(0,1.25fr)_380px]' : deck.archiveClass}>
              {posts.map((post, index) => (
                <ArchivePostCard key={`${post.id || post.slug}-${index}`} post={post} task={task} basePath={basePath} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--editable-border)] bg-white/60 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm opacity-65">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? (
              <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em]">
                Previous
              </Link>
            ) : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--archive-bg)]">
              Page {page} of {pagination.totalPages || 1}
            </span>
            {pagination.hasNextPage ? (
              <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em]">
                Next
              </Link>
            ) : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArticleArchiveHero({
  voice,
  posts,
  basePath,
  categoryLabel,
}: {
  voice: { eyebrow: string; headline: string; description: string; chips: string[] }
  posts: SitePost[]
  basePath: string
  categoryLabel: string
}) {
  const feature = posts[0]
  const supporting = posts.slice(1, 4)

  return (
    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white/86 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[var(--archive-accent)] shadow-sm">
        <Sparkles className="h-4 w-4" /> {voice.eyebrow}
      </div>
      <h1 className="mt-6 max-w-5xl font-['Georgia','Times_New_Roman',serif] text-5xl font-bold leading-[0.9] tracking-[-0.07em] sm:text-6xl lg:text-[4.9rem]">
        {voice.headline}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 opacity-74">{voice.description}</p>
      <div className="mt-7 flex flex-wrap gap-3">
        {voice.chips.map((chip) => (
          <span key={chip} className="rounded-full border border-[var(--editable-border)] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/search" className="rounded-full bg-[var(--archive-text)] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--archive-bg)]">
          Search posts
        </Link>
        <Link href={basePath} className="rounded-full border border-[var(--editable-border)] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.12em]">
          {categoryLabel}
        </Link>
      </div>
      {feature ? (
        <div className="mt-10 overflow-hidden rounded-[2.2rem] border border-[var(--editable-border)] bg-white/84 p-4 shadow-[var(--editable-shadow)] backdrop-blur">
          <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
            <Link href={`${basePath}/${feature.slug}`} className="group relative min-h-[360px] overflow-hidden rounded-[1.7rem] bg-black/10">
              <img src={getImage(feature)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,26,22,0.06),rgba(20,26,22,0.82))]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-text)]">
                  Cover story
                </span>
                <h2 className="mt-4 max-w-2xl font-['Georgia','Times_New_Roman',serif] text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                  {feature.title}
                </h2>
                <p className="mt-3 max-w-xl line-clamp-3 text-sm leading-7 text-white/78">{getSummary(feature)}</p>
              </div>
            </Link>
            <div className="grid gap-3">
              {supporting.map((post, index) => (
                <Link
                  key={`${post.id || post.slug}-${index}`}
                  href={`${basePath}/${post.slug}`}
                  className="group grid gap-4 rounded-[1.45rem] border border-[var(--editable-border)] bg-white p-4 shadow-sm transition hover:-translate-y-1 sm:grid-cols-[100px_minmax(0,1fr)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] bg-black/5">
                    <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-accent)]">{getCategory(post, 'Article')}</p>
                    <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 opacity-65">{getSummary(post)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'article') return <ArticleArchiveCardUnique post={post} href={href} index={index} />
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCardUnique({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')

  if (index === 0) {
    return (
      <div className="hidden" />
    )
  }

  if (index === 1) {
    return (
      <Link
        href={href}
        className="group self-start overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,rgba(178,201,173,0.28),rgba(255,255,255,0.96))] shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)] xl:row-span-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-6">
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-accent)]">
            Editor's pick
          </span>
          <h2 className="mt-4 font-['Georgia','Times_New_Roman',serif] text-3xl font-bold leading-tight tracking-[-0.04em]">{post.title}</h2>
          <p className="mt-4 line-clamp-5 text-sm leading-7 opacity-70">{getSummary(post)}</p>
        </div>
      </Link>
    )
  }

  if (index % 5 === 0) {
    return (
      <Link
        href={href}
        className="group grid self-start gap-0 overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)] md:grid-cols-[220px_minmax(0,1fr)]"
      >
        <div className="relative min-h-[220px] overflow-hidden bg-black/5">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{category}</p>
          <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
          <p className="mt-3 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group self-start overflow-hidden rounded-[1.9rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-text)]">
          Story {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{category}</p>
        <h2 className="mt-2 line-clamp-3 font-['Georgia','Times_New_Roman',serif] text-2xl font-bold leading-tight tracking-[-0.04em]">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  if (index === 0) {
    return (
      <Link href={href} className="group self-start overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)] md:col-span-2 xl:col-span-3">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-black/5">
            <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute left-4 top-4 rounded-full bg-[var(--archive-text)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--archive-bg)]">
              Featured Story
            </span>
          </div>
          <div className="p-7 sm:p-9">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{category}</p>
            <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold leading-tight tracking-tight">{post.title}</h2>
            <p className="mt-4 line-clamp-4 text-sm leading-7 opacity-70">{getSummary(post)}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em]">
              Read full article <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    )
  }
  if (index % 4 === 0 || index === 2) {
    return (
      <Link href={href} className="group self-start overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)] md:col-span-2">
        <div className="grid gap-0 sm:grid-cols-[240px_minmax(0,1fr)]">
          <div className="relative min-h-[180px] overflow-hidden bg-black/5">
            <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">{category}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="group self-start overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--archive-text)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--archive-bg)]">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[var(--editable-border)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 opacity-65">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold opacity-70 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold opacity-75">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-white shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[var(--editable-border)] bg-white p-6 shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:bg-[var(--archive-text)] hover:text-[var(--archive-bg)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--archive-text)] p-5 text-[var(--archive-bg)]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--editable-border)] bg-white p-6 text-center shadow-[var(--editable-shadow)] transition hover:-translate-y-1 hover:shadow-[var(--editable-shadow-strong)]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--archive-bg)] ring-1 ring-[var(--editable-border)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
    </Link>
  )
}
