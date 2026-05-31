'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentPath = mounted ? pathname : ''

  const navVars = {
    '--editable-nav-bg': '#222327',
    '--editable-nav-text': '#f6f7fa',
    '--editable-nav-active': '#12abc6',
    '--editable-nav-active-text': '#ffffff',
    '--editable-cta-bg': '#84be4b',
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': preset.colors.surface,
    '--editable-border': 'rgba(255,255,255,0.16)',
    '--editable-container': '1280px',
  } as CSSProperties

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    [],
  )

  if (!mounted) {
    return (
      <header style={navVars} className="sticky top-0 z-50 border-b border-white/10 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
        <div className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center px-4 sm:px-6 lg:px-8" />
      </header>
    )
  }

  return (
    <header style={navVars} className="sticky top-0 z-50 border-b border-white/10 bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[84px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          </span>
          <span className="hidden sm:block">
            <span className="block font-serif text-2xl font-semibold leading-none tracking-tight">{globalContent.site?.name || SITE_CONFIG.name}</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-white/65">{globalContent.nav?.tagline || SITE_CONFIG.tagline}</span>
          </span>
        </Link>

        <div className="ml-4 hidden items-center gap-1 lg:flex">
          {[{ label: 'Home', href: '/' }, ...navItems.slice(0, 5)].map((item) => {
            const active = currentPath === item.href || currentPath.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active ? 'bg-[var(--editable-nav-active)] text-[var(--editable-nav-active-text)]' : 'text-white/90 hover:bg-white/10'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center xl:flex">
          <label className="relative flex w-full max-w-md items-center rounded-full bg-white px-4 py-2.5 text-[#222327] shadow-sm">
            <Search className="h-4 w-4 text-black/55" />
            <input name="q" type="search" placeholder="Search articles, posts, topics" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold outline-none placeholder:text-black/45" />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <>
              <span className="hidden items-center rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-bold text-white sm:inline-flex">
                {session.name}
              </span>
              <button
                type="button"
                onClick={logout}
                className="hidden items-center rounded-full border border-white/25 px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10 sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-sm font-bold text-white/90 hover:bg-white/10 sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
              <Link href="/signup" className="hidden items-center gap-2 rounded-lg bg-[var(--editable-cta-bg)] px-4 py-2.5 text-sm font-bold text-[var(--editable-cta-text)] sm:inline-flex"><UserPlus className="h-4 w-4" /> Join</Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((v) => !v)} className="rounded-lg border border-white/25 p-2.5 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/15 bg-[#1c1d21] p-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-xl bg-white px-3 py-2 text-[#222327]">
            <Search className="mt-1 h-4 w-4" />
            <input name="q" type="search" placeholder="Search posts" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" />
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10">
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <div className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/90">
                  Signed in as {session.name}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="rounded-xl border border-white/15 px-4 py-3 text-left text-sm font-bold text-white/90 hover:bg-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
