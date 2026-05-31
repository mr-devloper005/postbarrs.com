import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)] px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)]">
          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 max-w-5xl font-serif text-5xl font-bold tracking-tight sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-accent-soft)] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Focus</p>
                <p className="mt-2 text-sm font-semibold">Editorial reading experience</p>
              </div>
              <div className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-cream)] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Approach</p>
                <p className="mt-2 text-sm font-semibold">Clear hierarchy and useful navigation</p>
              </div>
              <div className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-cream)] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Outcome</p>
                <p className="mt-2 text-sm font-semibold">Faster discovery across every page type</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white p-8 shadow-sm lg:p-10">
            <h2 className="font-serif text-3xl font-bold tracking-tight">Our editorial foundation</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--slot4-soft-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className={`rounded-[1.3rem] border border-[var(--editable-border)] p-6 shadow-sm ${index === 1 ? 'bg-[var(--slot4-accent-soft)]' : 'bg-white'}`}>
                <h3 className="font-serif text-2xl font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="mx-auto mt-8 max-w-[var(--editable-container)] rounded-[1.8rem] border border-[var(--editable-border)] bg-white p-8 shadow-sm lg:p-10">
          <h2 className="font-serif text-3xl font-bold tracking-tight">What readers can expect</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Featured stories with strong visual hierarchy',
              'Compact indexes for quick scanning',
              'Detail pages built for comfortable reading',
              'Consistent navigation across all sections',
            ].map((item) => (
              <div key={item} className="rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-cream)] p-4 text-sm font-semibold leading-6">
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
