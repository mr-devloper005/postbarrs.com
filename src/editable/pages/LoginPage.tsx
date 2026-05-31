import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">Member access</p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Welcome back to your reading desk.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[var(--slot4-muted-text)]">Sign in locally to continue browsing saved content and comments. This workflow stays browser-local for safe demo use.</p>
          </div>
          <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white p-6 shadow-[0_24px_70px_rgba(16,36,31,0.12)] sm:p-8">
            <h2 className="font-serif text-3xl font-semibold tracking-tight">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-bold underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
