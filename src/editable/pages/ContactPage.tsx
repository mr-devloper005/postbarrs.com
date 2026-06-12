'use client'

import { BookOpen, Mail, MessageSquareQuote, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: BookOpen, title: 'Editorial ideas', body: 'Pitch stories, essays, explainers, and other article-led contributions.' },
    { icon: Mail, title: 'Partnerships', body: 'Discuss campaigns, sponsorships, or broader collaboration opportunities.' },
    { icon: MessageSquareQuote, title: 'Support requests', body: 'Ask for help with listings, profile pages, PDFs, or archive browsing.' },
    { icon: Sparkles, title: 'General notes', body: 'Reach out for anything else you would like to share with the site.' },
  ]

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.4rem] border border-[var(--editable-border)] bg-white/80 p-6 shadow-[var(--editable-shadow)] backdrop-blur sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-['Georgia','Times_New_Roman',serif] text-5xl font-bold tracking-tight text-[var(--slot4-page-text)]">{pagesContent.contact.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="font-['Georgia','Times_New_Roman',serif] text-3xl font-bold tracking-tight">Contact lanes</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">Choose the lane that best fits your request for a faster and more useful reply.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-white p-5 shadow-[var(--editable-shadow)]">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--editable-border)] bg-white p-7 shadow-[var(--editable-shadow)]">
            <h2 className="font-['Georgia','Times_New_Roman',serif] text-3xl font-bold">{pagesContent.contact.formTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">Share enough detail so the message can be routed correctly on the first pass.</p>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
