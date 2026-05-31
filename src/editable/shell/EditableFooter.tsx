import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const footerVars = {
    '--editable-footer-bg': '#202126',
    '--editable-footer-text': '#e9edf4',
    '--editable-border': 'rgba(255,255,255,0.16)',
  } as CSSProperties
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = '2026'

  return (
    <footer style={footerVars} className="border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-7 w-7 object-contain" />
            </span>
            <span className="font-serif text-2xl font-semibold tracking-tight">Postbarrs</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/70">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Sections</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-white/55">Company</h3>
          <div className="mt-4 grid gap-2">
            {[['About', '/about'], ['Contact', '/contact'],].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-bold text-white/80 hover:text-white">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white/60">
        Copyright {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
