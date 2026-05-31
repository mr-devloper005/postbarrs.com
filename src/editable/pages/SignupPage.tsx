import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#202126] text-[#f2f4f8]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur sm:p-8">
            <h1 className="font-serif text-4xl font-semibold tracking-tight">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-white/70">Already have an account? <Link href="/login" className="font-bold text-white underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#47d6ee]">Get started</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-bold leading-tight sm:text-6xl">Save your spot in the editorial flow.</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/68"></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
