import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Compass, Newspaper, ShieldCheck } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const highlights = [
  'Continue from saved local sessions',
  'Open the publishing desk faster',
  'Stay aligned with the live site design',
]

const trustPoints = [
  { icon: Newspaper, label: 'Editorial browsing', detail: 'Return to the reading desk, saved routes, and archive-friendly pages.' },
  { icon: Compass, label: 'Simple local access', detail: 'This demo auth stays browser-local for safe testing and template previews.' },
  { icon: ShieldCheck, label: 'No backend dependency', detail: 'You can validate the experience without wiring a production auth stack.' },
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[calc(100vh-11rem)] max-w-[var(--editable-container)] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(238,241,231,0.88))] p-7 shadow-[var(--editable-shadow)] backdrop-blur sm:p-10 lg:p-12">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(178,201,173,0.5),transparent_68%)]" />
            <div className="relative max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-5 max-w-xl font-['Georgia','Times_New_Roman',serif] text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-6xl">
                {pagesContent.auth.login.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.auth.login.description}
              </p>
            </div>

            <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-[var(--editable-border)] bg-white/80 p-5">
                  <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-4 text-sm font-black leading-6 tracking-[-0.02em] text-[var(--slot4-page-text)]">{item}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-10 rounded-[1.8rem] bg-[linear-gradient(135deg,#1d2620,#324034_52%,#4b5945)] p-6 text-white shadow-[var(--editable-shadow-strong)]">
              <div className="grid gap-4 md:grid-cols-3">
                {trustPoints.map((item) => (
                  <div key={item.label} className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 backdrop-blur">
                    <item.icon className="h-5 w-5 text-[var(--slot4-accent-soft)]" />
                    <p className="mt-4 text-sm font-black tracking-[-0.03em]">{item.label}</p>
                    <p className="mt-2 text-xs leading-6 text-white/72">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2.2rem] border border-[var(--editable-border)] bg-white/92 p-6 shadow-[var(--editable-shadow)] backdrop-blur sm:p-8 lg:p-9">
            <div className="rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(178,201,173,0.22),rgba(255,255,255,0.86))] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Access panel</p>
              <h2 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-3xl font-bold tracking-tight text-[var(--slot4-page-text)]">{pagesContent.auth.login.formTitle}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
                Use your account to unlock publishing routes and continue where you left off.
              </p>
            </div>

            <EditableLocalLoginForm />

            <div className="mt-6 rounded-[1.4rem] border border-[var(--editable-border)] bg-[#f8faf6] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Need an account?</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
                Create a account for testing, article drafting, and saved session flows.
              </p>
              <Link href="/signup" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
                {pagesContent.auth.login.createCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
