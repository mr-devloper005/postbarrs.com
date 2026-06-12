import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FilePenLine, Layers3, Sparkles, UserRoundPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const steps = [
  { icon: UserRoundPlus, title: 'Create your account', body: 'Open a account in seconds so the navigation and create flow have a real member state.' },
  { icon: FilePenLine, title: 'Start drafting', body: 'Move straight into article creation, saved drafts, and content testing from one connected workflow.' },
  { icon: Layers3, title: 'Stay in the same system', body: 'The sign up screen mirrors the site’s editorial tone instead of feeling like a detached demo page.' },
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <section className="mx-auto grid min-h-[calc(100vh-11rem)] max-w-[var(--editable-container)] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <section className="rounded-[2.2rem] border border-[var(--editable-border)] bg-white/92 p-6 shadow-[var(--editable-shadow)] backdrop-blur sm:p-8 lg:p-9">
            <div className="rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(178,201,173,0.22),rgba(255,255,255,0.86))] p-5">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Create account</p>
              <h1 className="mt-3 font-['Georgia','Times_New_Roman',serif] text-3xl font-bold tracking-tight text-[var(--slot4-page-text)]">{pagesContent.auth.signup.formTitle}</h1>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
                Create a account for create-mode access, saved drafts, and a more complete site walkthrough.
              </p>
            </div>

            <EditableLocalSignupForm />

            <div className="mt-6 rounded-[1.4rem] border border-[var(--editable-border)] bg-[#f8faf6] p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Already registered?</p>
              <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">
                If you already created an account, head back to login and continue into the editorial workspace.
              </p>
              <Link href="/login" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
                Go to login <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(238,241,231,0.88))] p-7 shadow-[var(--editable-shadow)] backdrop-blur sm:p-10 lg:p-12">
            <div className="absolute right-5 top-5 rounded-full border border-[rgba(75,89,69,0.14)] bg-white/74 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Publishing access
              </span>
            </div>

            <div className="relative max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
              <h2 className="mt-5 max-w-2xl font-['Georgia','Times_New_Roman',serif] text-5xl font-bold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-page-text)] sm:text-6xl">
                {pagesContent.auth.signup.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">
                {pagesContent.auth.signup.description}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {steps.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-white/82 p-5">
                  <item.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h3 className="mt-4 text-lg font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[1.9rem] bg-[linear-gradient(135deg,#1d2620,#324034_52%,#4b5945)] p-6 text-white shadow-[var(--editable-shadow-strong)]">
              <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-soft)]">Why this fits better</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em]">A signup screen that feels like the same site.</h3>
                </div>
                <div className="grid gap-3 text-sm leading-7 text-white/74">
                  <p className="rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3">Better visual continuity with the homepage and content surfaces.</p>
                  <p className="rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3">Cleaner onboarding path for testers using the local auth flow.</p>
                  <p className="rounded-[1rem] border border-white/10 bg-white/6 px-4 py-3">A more polished first impression before users reach the create desk.</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </EditableSiteShell>
  )
}
