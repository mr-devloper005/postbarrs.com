'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const footerVars = {
    '--editable-footer-bg': 'linear-gradient(180deg, rgba(255,255,255,0.72), rgba(238,241,231,0.95))',
    '--editable-footer-text': 'var(--slot4-page-text)',
  } as CSSProperties
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer style={footerVars} className="relative overflow-hidden border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      {/* Subtle top gradient accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B2C9AD]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(178,201,173,0.18),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-16 lg:px-8">
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-black/[0.06]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
            </span>
            <span className="text-xl font-semibold tracking-[-0.03em]">{SITE_CONFIG.name.replace('.com', '')}</span>
          </Link>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed opacity-55">{globalContent.footer.description}</p>
        </div>

        {/* Browse column - from globalContent.footer.columns */}
        <div>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] opacity-40">Browse</h3>
          <div className="mt-4 grid gap-2.5">
            {globalContent.footer.columns[0].links.map((link) => (
              <Link key={link.href} href={link.href} className="text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Site column */}
        <div>
          <h3 className="text-[13px] font-semibold tracking-[-0.01em] opacity-40">Site</h3>
          <div className="mt-4 grid gap-2.5">
            {globalContent.footer.columns[1].links.map((link) => (
              <Link key={link.href} href={link.href} className="text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/create" className="text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                  Create
                </Link>
                <button type="button" onClick={logout} className="text-left text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                  Login
                </Link>
                <Link href="/signup" className="text-[14px] font-medium opacity-65 transition-opacity hover:opacity-100">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-black/[0.06] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col items-center justify-between gap-2 sm:flex-row">
          <span className="text-[13px] opacity-40">&copy; {year} {SITE_CONFIG.name}</span>
          <span className="text-[12px] opacity-30">{globalContent.footer.bottomNote}</span>
        </div>
      </div>
    </footer>
  )
}
