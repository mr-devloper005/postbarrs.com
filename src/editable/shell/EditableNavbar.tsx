'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navVars = {
    '--editable-nav-bg': preset.colors.background,
    '--editable-nav-text': preset.colors.foreground,
    '--editable-nav-active': preset.colors.accent,
    '--editable-nav-active-text': '#ffffff',
    '--editable-cta-bg': preset.colors.accent,
    '--editable-cta-text': '#ffffff',
    '--editable-search-bg': preset.colors.surface,
  } as CSSProperties
  const navItems = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((task) => task.enabled && !['listing', 'classified'].includes(task.key))
        .map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header style={navVars} className="sticky top-0 z-50 bg-[var(--editable-nav-bg)]/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      {/* Announcement bar */}
      <div className="border-b border-black/5">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-center px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/article" className="group flex items-center gap-2 text-[13px] tracking-[-0.01em] text-[var(--editable-nav-text)]/65 transition-colors hover:text-[var(--editable-nav-active)]">
            <span>{globalContent.nav.announcement}</span>
            <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mx-auto flex h-16 w-full max-w-[var(--editable-container)] items-center gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/[0.06]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
          </span>
          <span className="hidden text-[1.35rem] font-semibold tracking-[-0.04em] sm:block">{SITE_CONFIG.name.replace('.com', '')}</span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.slice(0, 3).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 text-[14px] font-medium transition-colors ${active ? 'text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/65 hover:text-[var(--editable-nav-text)]'}`}
              >
                {item.label}
                {active && <span className="absolute inset-x-3 -bottom-[19px] h-[2px] rounded-full bg-[var(--editable-nav-active)]" />}
              </Link>
            )
          })}
        </div>

        {/* Search */}
        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center lg:flex">
          <label className="relative flex w-full max-w-md items-center rounded-lg border border-black/[0.08] bg-black/[0.02] px-3 py-2">
            <Search className="h-3.5 w-3.5 opacity-35" />
            <input name="q" type="search" placeholder="Search stories and topics..." className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none placeholder:text-current/35" />
          </label>
        </form>

        {/* Auth actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1">
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-1.5 rounded-lg bg-[var(--editable-cta-bg)] px-3.5 py-2 text-[13px] font-medium text-[var(--editable-cta-text)] shadow-sm transition-opacity hover:opacity-90 sm:inline-flex">
                <PlusCircle className="h-3.5 w-3.5" /> Create
              </Link>
              <button type="button" onClick={logout} className="hidden px-3 py-2 text-[13px] font-medium text-[var(--editable-nav-text)]/60 transition-colors hover:text-[var(--editable-nav-text)] sm:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden px-3 py-2 text-[13px] font-medium text-[var(--editable-nav-text)]/60 transition-colors hover:text-[var(--editable-nav-text)] sm:inline-flex">
                Login
              </Link>
              <Link href="/signup" className="hidden items-center gap-1.5 rounded-lg bg-[var(--editable-cta-bg)] px-3.5 py-2 text-[13px] font-medium text-[var(--editable-cta-text)] shadow-sm transition-opacity hover:opacity-90 sm:inline-flex">
                Sign up
              </Link>
            </>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 text-[var(--editable-nav-text)]/60 transition-colors hover:bg-black/5 xl:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Bottom border */}
      <div className="h-px bg-black/[0.06]" />

      {/* Mobile menu */}
      {open ? (
        <div className="bg-[var(--editable-nav-bg)] px-4 py-5 xl:hidden">
          <form action="/search" className="mb-5 flex items-center rounded-lg border border-black/[0.08] bg-black/[0.02] px-3 py-2.5">
            <Search className="h-3.5 w-3.5 opacity-35" />
            <input name="q" type="search" placeholder="Search..." className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] outline-none" />
          </form>
          <div className="grid gap-0.5">
            {[...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-[14px] font-medium transition-colors ${active ? 'bg-[var(--editable-nav-active)]/8 text-[var(--editable-nav-active)]' : 'text-[var(--editable-nav-text)]/70 hover:bg-black/[0.03]'}`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-lg px-3 py-2.5 text-left text-[14px] font-medium text-[var(--editable-nav-text)]/70 transition-colors hover:bg-black/[0.03]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
