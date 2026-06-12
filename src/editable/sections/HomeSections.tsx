import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, RailPostCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function Rail({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${dc.layout.rail} ${className}`}>{children}</div>
}

function DemoThumb({ post, href, badge }: { post: SitePost; href: string; badge: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.55rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_50px_rgba(35,48,39,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-[#ff1578] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          {badge}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-center text-sm font-black leading-5 text-[var(--slot4-page-text)]">{post.title}</h3>
      </div>
    </Link>
  )
}

function HighlightCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const styles = [
    'bg-[linear-gradient(135deg,rgba(178,201,173,0.9),rgba(234,245,227,0.95))]',
    'bg-[linear-gradient(135deg,rgba(241,231,179,0.92),rgba(255,247,214,0.95))]',
    'bg-[linear-gradient(135deg,rgba(200,214,241,0.92),rgba(233,239,251,0.95))]',
  ]

  return (
    <Link href={href} className={`group rounded-[1.8rem] border border-[var(--editable-border)] p-7 shadow-[var(--editable-shadow)] transition duration-300 hover:-translate-y-1 ${styles[index % styles.length]}`}>
      <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
      <h3 className="mt-6 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold leading-[1.02] tracking-[-0.05em] text-[var(--slot4-page-text)]">
        {post.title}
      </h3>
      <p className="mt-5 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 140)}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)]">
        View feature <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function HorizontalRead({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[1.6rem] border border-[var(--editable-border)] bg-white p-3 shadow-[0_10px_32px_rgba(35,48,39,0.08)] transition duration-300 hover:-translate-y-0.5 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden rounded-[1.05rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1 pr-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Feature {String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-1 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 94)}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPosts = posts.slice(0, 3)
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const feature = heroPosts[0]
  const framePosts = heroPosts.slice(1, 3)

  return (
    <section className="slot4-shell-wave relative overflow-hidden border-b border-[var(--editable-border)]">
      <div className={`${dc.shell.section} relative py-10 sm:py-14 lg:py-16`}>
        <div className="grid gap-10 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
          <div className="pt-4">
            <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>{pagesContent.home.hero.badge}</p>
            <h1 className={`${dc.type.heroTitle} mt-8 max-w-3xl text-[var(--slot4-page-text)]`}>
              {heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.primary}>
                View demos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/search" className={dc.button.secondary}>
                Search archive
              </Link>
            </div>
            <div className="mt-10 border-t border-dashed border-[var(--editable-border)] pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0fbf38] text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-[-0.06em]">8000+</p>
                    <p className="text-sm text-[var(--slot4-muted-text)]">Readers return for thoughtful features</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff9914] text-white">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-black tracking-[-0.06em]">99%</p>
                    <p className="text-sm text-[var(--slot4-muted-text)]">Designed for smoother story discovery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-[var(--editable-border)] bg-white/72 p-4 shadow-[var(--editable-shadow-strong)] backdrop-blur">
            <div className="rounded-[2rem] border-4 border-dashed border-[#6aa96e] p-6">
              {feature ? (
                <div className="relative min-h-[520px] overflow-hidden rounded-[1.8rem] bg-[#eff3ec]">
                  <div className="absolute right-6 top-4 flex gap-2 rounded-xl bg-[var(--slot4-dark-bg)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                    <span>Update</span>
                    <span className="rounded bg-[#38b000] px-2 py-0.5">Live</span>
                  </div>
                  <div className="absolute left-5 top-8 w-[170px] rounded-[1rem] bg-[#34393e] p-3 text-white shadow-2xl">
                    <div className="grid gap-3">
                      {['Block structure', 'Featured image', 'Entry category', 'Post title', 'Entry meta', 'Excerpt'].map((item) => (
                        <div key={item} className="rounded-lg bg-white/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/88">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-y-10 left-[24%] right-8 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_22px_70px_rgba(35,48,39,0.14)]">
                    <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover object-center" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(245,247,244,0.94),rgba(255,255,255,0.18))]" />
                    <div className="absolute left-8 top-10 max-w-[270px] rounded-[1.1rem] border border-sky-200 bg-white/92 px-5 py-4 shadow-md">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                        {getEditableCategory(feature)}
                      </p>
                      <p className="mt-2 line-clamp-3 text-[2rem] font-black leading-[0.92] tracking-[-0.05em] text-[var(--slot4-page-text)]">
                        {feature.title}
                      </p>
                      <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-[var(--slot4-muted-text)]">
                        {getEditableExcerpt(feature, 90)}
                      </p>
                    </div>
                    <div className="absolute bottom-8 left-8 w-[260px] rounded-[1rem] bg-white/88 p-4 shadow-lg backdrop-blur">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Latest from articles</p>
                      <div className="mt-3 grid gap-3">
                        {framePosts.map((post) => (
                          <div key={post.id || post.slug} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3">
                            <img src={getEditablePostImage(post)} alt={post.title} className="h-14 w-14 rounded-[0.8rem] object-cover" />
                            <div className="min-w-0">
                              <p className="line-clamp-2 text-xs font-black leading-4 text-[var(--slot4-page-text)]">{post.title}</p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">
                                {getEditableCategory(post)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-8 right-8 w-[160px] rounded-[1rem] bg-[#44484e] p-4 text-white shadow-2xl">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/72">Theme control</p>
                      <div className="mt-3 overflow-hidden rounded-[0.9rem] bg-white/10">
                        <img
                          src={getEditablePostImage(framePosts[0] || feature)}
                          alt={(framePosts[0] || feature).title}
                          className="h-16 w-full object-cover"
                        />
                      </div>
                      <div className="mt-3">
                        <p className="line-clamp-2 text-[11px] font-black leading-4 text-white">
                          {(framePosts[0] || feature).title}
                        </p>
                        <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.14em] text-white/62">
                          {getEditableCategory(framePosts[0] || feature)}
                        </p>
                        <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-white/68">
                          {getEditableExcerpt(framePosts[0] || feature, 46)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 9)
  const highlightPosts = posts.slice(3, 6)
  if (!railPosts.length) return null

  return (
    <section className="relative border-b border-[var(--editable-border)] bg-white/72">
      <div className={`${dc.shell.section} py-8 sm:py-10 lg:py-12`}>
        <div className="grid gap-5 lg:grid-cols-3">
          {highlightPosts.map((post, index) => (
            <HighlightCard key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Beautiful previews</p>
            <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)]">Endless possibilities+</h2>
          </div>
          <Link href={primaryRoute} className="hidden rounded-full bg-[#ff1578] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white sm:inline-flex">
            Explore all demos
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {railPosts.slice(0, 8).map((post, index) => (
            <DemoThumb
              key={post.id || `${post.slug}-${index}`}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
              badge={index > 3 ? 'Hot' : 'New'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const featurePosts = timeSections.flatMap((section) => section.posts).slice(0, 6)
  const sourcePosts = featurePosts.length ? featurePosts : posts.slice(6, 12)
  const sidePosts = posts.slice(12, 16)
  if (!sourcePosts.length) return null

  return (
    <section className="relative overflow-hidden border-b border-[var(--editable-border)] bg-[var(--slot4-gray)]">
      <div className={`${dc.shell.section} py-14`}>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Most flexible reading flow</p>
          <h2 className="mt-3 text-center text-4xl font-black tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-5xl">A demo-style editorial homepage that still works like a real archive.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">
            Browse categories, rails, showcase cards, and strong feature layouts without losing post data, links, or route support.
          </p>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.34fr_0.66fr]">
          <div className="grid gap-3">
            {['Mobile-first design', 'Editorial templates', 'Header builder feel', 'Footer builder feel', 'Category-led browsing'].map((label, index) => (
              <div key={label} className={`flex items-center gap-4 rounded-[1.4rem] border border-[var(--editable-border)] px-5 py-5 shadow-sm ${index === 0 ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'bg-white'}`}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/20 text-sm font-black">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-lg font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[var(--editable-shadow)]">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[var(--editable-border)]">
              <EditorialFeatureCard post={sourcePosts[0]} href={postHref(primaryTask, sourcePosts[0], primaryRoute)} label="Cover feature" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {sourcePosts.slice(1, 5).map((post, index) => (
              <DemoThumb key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} badge={index % 2 === 0 ? 'New' : 'Edit'} />
            ))}
          </div>
          <div className="grid gap-3">
            {sidePosts.map((post, index) => (
              <HorizontalRead key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collectionPosts = (timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(0, 12)
  const faqItems = [
    {
      question: 'What is included in the current reading experience?',
      answer: 'Featured stories, compact cards, image-first layouts, supporting archives, search, categories, and detail pages that all use the same visual system.',
    },
    {
      question: 'Do all sections keep working with live content?',
      answer: 'Yes. Posts still come from the existing props and route logic, with fallbacks for images, summaries, and categories where needed.',
    },
    {
      question: 'Is the layout responsive?',
      answer: 'The design keeps the layered hero, card variety, and archive flow while adapting spacing and stacking carefully for tablets and phones.',
    },
  ]

  return (
    <section className="relative overflow-hidden">
      <div className={`${dc.shell.section} py-14`}>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Trusted layout system</p>
          <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-black tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-5xl">
            All in one for reading, browsing, and finding the next good article.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">
            The homepage can feel like a polished product showcase while the archive underneath stays fully usable for real readers.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collectionPosts.slice(0, 8).map((post, index) => (
            <CompactIndexCard key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white/84 p-8 shadow-[var(--editable-shadow)] backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Frequently asked questions</p>
            <h3 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)]">A cleaner way to move through the archive.</h3>
            <div className="mt-8 grid gap-3">
              {faqItems.map((item, index) => (
                <div key={item.question} className={`rounded-[1.4rem] border border-[var(--editable-border)] px-5 py-4 ${index === 0 ? 'bg-[var(--slot4-warm)]' : 'bg-white'}`}>
                  <p className="flex items-center justify-between gap-4 text-lg font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">
                    <span>{item.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#1d2620,#324034_52%,#4B5945)] p-6 text-white shadow-[var(--editable-shadow-strong)]">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-soft)]">Get into the archive</p>
              <h3 className="mx-auto mt-3 max-w-xl text-4xl font-black tracking-[-0.06em] sm:text-5xl">Open the full Postbarrs reading desk now.</h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/72">
                Browse current features, curated topic sections, and archive pages built from the same live content system.
              </p>
              <form action="/search" className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <label className="flex flex-1 items-center gap-3 rounded-full bg-white px-4 py-3 text-[var(--slot4-page-text)] shadow-sm">
                  <Search className="h-4 w-4 opacity-55" />
                  <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/45" />
                </label>
                <button className="rounded-full bg-[#31ba46] px-8 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
                  Get started
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return <div className="h-4" />
}
