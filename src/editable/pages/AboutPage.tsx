import { CheckCircle2, Library, LayoutGrid, Newspaper } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-[var(--editable-container)] overflow-hidden rounded-[2.4rem] border border-[var(--editable-border)] bg-white/78 shadow-[var(--editable-shadow)] backdrop-blur">
          <div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="mt-5 max-w-5xl font-['Georgia','Times_New_Roman',serif] text-5xl font-bold tracking-tight sm:text-6xl">About {SITE_CONFIG.name}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'Editorial hierarchy', icon: Newspaper },
                { label: 'Visual variety', icon: LayoutGrid },
                { label: 'Archive clarity', icon: Library },
                { label: 'Live route safety', icon: CheckCircle2 },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-[var(--editable-border)] bg-[var(--slot4-warm)] p-5">
                  <item.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-4 text-lg font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-8 shadow-[var(--editable-shadow)] lg:p-10">
            <h2 className="font-['Georgia','Times_New_Roman',serif] text-3xl font-bold tracking-tight">Why this redesign feels different</h2>
            <div className="mt-6 space-y-4 text-base leading-8 text-[var(--slot4-soft-muted-text)]">
              {pagesContent.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className={`rounded-[1.5rem] border border-[var(--editable-border)] p-6 shadow-[var(--editable-shadow)] ${index === 1 ? 'bg-[var(--slot4-accent-soft)]' : 'bg-white'}`}>
                <h3 className="font-['Georgia','Times_New_Roman',serif] text-2xl font-bold tracking-tight">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
