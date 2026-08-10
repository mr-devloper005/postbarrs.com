import Link from 'next/link'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
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
        Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>
  )
}

function HorizontalRead({ post, href }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[1.6rem] border border-[var(--editable-border)] bg-white p-3 shadow-[0_10px_32px_rgba(35,48,39,0.08)] transition duration-300 hover:-translate-y-0.5 sm:grid-cols-[120px_minmax(0,1fr)]">
      <div className="relative aspect-square overflow-hidden rounded-[1.05rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1 pr-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="mt-1 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 94)}</p>
      </div>
    </Link>
  )
}

function ArticleCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.55rem] border border-[var(--editable-border)] bg-white shadow-[0_18px_50px_rgba(35,48,39,0.08)] transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-accent-fill)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
          {getEditableCategory(post)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-black leading-5 text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 80)}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPosts = posts.slice(0, 4)
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const feature = heroPosts[0]
  const supportPosts = heroPosts.slice(1, 4)

  return (
    <section className="slot4-shell-wave relative overflow-hidden border-b border-[var(--editable-border)]">
      <div className={`${dc.shell.section} relative py-10 sm:py-14 lg:py-16`}>
        <div className="grid gap-10 xl:grid-cols-[0.46fr_0.54fr] xl:items-start">
          <div className="pt-4">
            <p className={`${dc.type.eyebrow} text-[var(--slot4-accent)]`}>{pagesContent.home.hero.badge || 'Editorial desk'}</p>
            <h1 className={`${dc.type.heroTitle} mt-8 max-w-3xl font-['Georgia','Times_New_Roman',serif] text-[var(--slot4-page-text)]`}>
              {heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.primary}>
                Browse articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/search" className={dc.button.secondary}>
                Search archive
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {feature ? (
              <Link href={postHref(primaryTask, feature, primaryRoute)} className="group relative block overflow-hidden rounded-[2rem] shadow-[var(--editable-shadow-strong)]">
                <div className="relative min-h-[380px] overflow-hidden bg-[var(--slot4-media-bg)] sm:min-h-[440px]">
                  <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(35,48,39,0.82))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="inline-block rounded-full bg-[var(--slot4-accent-fill)] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      {getEditableCategory(feature)}
                    </span>
                    <h2 className="mt-4 max-w-xl font-['Georgia','Times_New_Roman',serif] text-3xl font-bold leading-[0.96] tracking-[-0.04em] text-white sm:text-4xl">
                      {feature.title}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-white/78">{getEditableExcerpt(feature, 140)}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-white/90">
                      Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}

            {supportPosts.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-3">
                {supportPosts.map((post) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex gap-3 rounded-[1.2rem] border border-[var(--editable-border)] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-0.5">
                    <img src={getEditablePostImage(post)} alt={post.title} className="h-16 w-16 shrink-0 rounded-[0.8rem] object-cover" />
                    <div className="min-w-0 py-0.5">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
                      <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-[1.2] text-[var(--slot4-page-text)]">{post.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const highlightPosts = posts.slice(3, 6)
  const gridPosts = posts.slice(0, 8)
  if (!gridPosts.length) return null

  return (
    <section className="relative border-b border-[var(--editable-border)] bg-white/72">
      <div className={`${dc.shell.section} py-8 sm:py-10 lg:py-12`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">What readers are opening</p>
            <h2 className="mt-2 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)]">Trending Now</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-accent)] sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {highlightPosts.map((post, index) => (
            <HighlightCard key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {gridPosts.map((post, index) => (
            <ArticleCard
              key={post.id || `${post.slug}-${index}`}
              post={post}
              href={postHref(primaryTask, post, primaryRoute)}
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
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Curated for you</p>
            <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)] sm:text-5xl">Featured Stories</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-accent)] sm:inline-flex">
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-5 shadow-[var(--editable-shadow)]">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[var(--editable-border)]">
              <EditorialFeatureCard post={sourcePosts[0]} href={postHref(primaryTask, sourcePosts[0], primaryRoute)} label="Cover feature" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sourcePosts.slice(1, 5).map((post, index) => (
              <ArticleCard key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-2 xl:grid-cols-4">
          {sidePosts.map((post, index) => (
            <HorizontalRead key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collectionPosts = (timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts).slice(0, 12)

  return (
    <section className="relative overflow-hidden">
      <div className={`${dc.shell.section} py-14`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Fresh from the archive</p>
            <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)] sm:text-5xl">Latest Reads</h2>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collectionPosts.slice(0, 8).map((post, index) => (
            <CompactIndexCard key={post.id || `${post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>

        <div className="mt-16 grid gap-10 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white/84 p-8 shadow-[var(--editable-shadow)] backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Stay in the loop</p>
            <h3 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-tight text-[var(--slot4-page-text)]">Never miss a story worth reading.</h3>
            <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">
              Browse curated features, explore topic collections, and find your next favorite article from the full archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryRoute} className={dc.button.primary}>
                Browse articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/search" className={dc.button.secondary}>
                Search archive
              </Link>
            </div>

            {collectionPosts.length > 8 && (
              <div className="mt-8 grid gap-3 border-t border-[var(--editable-border)] pt-6">
                {collectionPosts.slice(8, 12).map((post) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex items-center gap-3 rounded-[1rem] px-2 py-2 transition hover:bg-[var(--slot4-warm)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-bold text-[var(--slot4-page-text)]">{post.title}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-soft-muted-text)]">{getEditableCategory(post)}</p>
                    </div>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-[var(--slot4-accent)] opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#1d2620,#324034_52%,#4B5945)] p-6 text-white shadow-[var(--editable-shadow-strong)]">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-6 py-10 text-center backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-soft)]">Explore the full archive</p>
              <h3 className="mx-auto mt-3 max-w-xl font-['Georgia','Times_New_Roman',serif] text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Find your next favorite read.</h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-white/72">
                Search across features, curated collections, and the full archive to discover articles that match your interests.
              </p>
              <form action="/search" className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
                <label className="flex flex-1 items-center gap-3 rounded-full bg-white px-4 py-3 text-[var(--slot4-page-text)] shadow-sm">
                  <Search className="h-4 w-4 opacity-55" />
                  <input name="q" placeholder={pagesContent.home.hero.searchPlaceholder} className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/45" />
                </label>
                <button className="rounded-full bg-[var(--slot4-accent-fill)] px-8 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:opacity-90">
                  Search now
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
