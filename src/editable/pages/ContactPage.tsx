'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

function getTone(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return { shell: 'bg-[#eef3fb] text-slate-950', panel: 'border border-slate-200 bg-white', soft: 'border border-slate-200 bg-slate-50', muted: 'text-slate-600' }
  }
  if (kind === 'editorial') {
    return { shell: 'bg-[#efefef] text-[#222327]', panel: 'border border-black/10 bg-white', soft: 'border border-black/10 bg-[#f4f7fc]', muted: 'text-[#5c6472]' }
  }
  if (kind === 'visual') {
    return { shell: 'bg-[#101520] text-white', panel: 'border border-white/10 bg-white/5', soft: 'border border-white/10 bg-white/5', muted: 'text-slate-300' }
  }
  return { shell: 'bg-[#f2f3f5] text-[#252830]', panel: 'border border-black/10 bg-white', soft: 'border border-black/10 bg-[#f0f4f8]', muted: 'text-[#5c6472]' }
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const tone = getTone(productKind)

  const lanes =
    productKind === 'directory'
      ? [
          { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify details, and launch your directory presence.' },
          { icon: Phone, title: 'Partnership support', body: 'Coordinate placements, category plans, and publishing support.' },
          { icon: MapPin, title: 'Coverage requests', body: 'Request new regions, category lanes, or local focus areas.' },
        ]
      : productKind === 'editorial'
        ? [
            { icon: FileText, title: 'Editorial submissions', body: 'Pitch long-form pieces, explainers, and opinion writing.' },
            { icon: Mail, title: 'Newsletter collaborations', body: 'Discuss issue sponsorships and distribution opportunities.' },
            { icon: Sparkles, title: 'Contributor support', body: 'Need help with structure, formatting, or publishing flow?' },
          ]
        : productKind === 'visual'
          ? [
              { icon: ImageIcon, title: 'Creator collaborations', body: 'Launch image-led series and visual campaigns.' },
              { icon: Sparkles, title: 'Licensing requests', body: 'Ask about usage permissions and media support.' },
              { icon: Mail, title: 'Media kits', body: 'Request creator decks and feature opportunities.' },
            ]
          : [
              { icon: Bookmark, title: 'Collection submissions', body: 'Suggest useful resources and curated collections.' },
              { icon: Mail, title: 'Resource partnerships', body: 'Plan co-curated reference pages and linked sections.' },
              { icon: Sparkles, title: 'Curator support', body: 'Get help organizing shelves and profile-connected pages.' },
            ]

  return (
    <EditableSiteShell className={tone.shell}>
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[1.8rem] border border-[var(--editable-border)] bg-white/70 p-6 shadow-sm backdrop-blur sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">{pagesContent.contact.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-bold tracking-tight">{pagesContent.contact.title}</h1>
          <p className={`mt-5 max-w-3xl text-base leading-8 ${tone.muted}`}>{pagesContent.contact.description}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Response time', value: 'Usually within 24 hours' },
              { label: 'Coverage', value: 'Editorial, listings, support' },
              { label: 'Best for', value: 'Partnerships and publishing help' },
            ].map((meta) => (
              <div key={meta.label} className={`rounded-[1rem] p-4 ${tone.soft}`}>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-60">{meta.label}</p>
                <p className="mt-2 text-sm font-semibold">{meta.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight">Contact lanes</h2>
            <p className={`mt-3 max-w-2xl text-sm leading-7 ${tone.muted}`}>Choose the lane that best fits your request to get faster and more relevant support.</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.4rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[1.8rem] p-7 ${tone.panel}`}>
            <h2 className="font-serif text-3xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Share useful details so we can route your message correctly on the first reply.</p>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
