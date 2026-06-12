'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, Mail, User2 } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'

const USERS_KEY = 'slot4:local-auth-users'
const SESSION_KEY = 'slot4:local-auth-session'

type LocalUser = {
  name: string
  email: string
  password: string
  createdAt: string
}

const readUsers = (): LocalUser[] => {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveUsers = (users: LocalUser[]) => window.localStorage.setItem(USERS_KEY, JSON.stringify(users))

const saveSession = (user: Pick<LocalUser, 'name' | 'email'>) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email, loggedInAt: new Date().toISOString() }))
  window.dispatchEvent(new Event('slot4-auth-change'))
}

const inputClass =
  'h-13 rounded-[1.15rem] border border-[var(--editable-border)] bg-white pl-11 pr-4 text-base font-bold text-[var(--slot4-page-text)] outline-none transition placeholder:text-[var(--slot4-soft-muted-text)] focus:border-[var(--slot4-accent-fill)]'
const buttonClass =
  'inline-flex h-12 items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-60'

export function EditableLocalLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    const user = readUsers().find((item) => item.email.toLowerCase() === normalizedEmail)
    if (!user || user.password !== password) {
      setStatus('error')
      setMessage(pagesContent.auth.login.noAccount)
      return
    }
    saveSession(user)
    setStatus('success')
    setMessage(pagesContent.auth.login.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={submit}>
      <label className="grid gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
          <input className={inputClass} type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Password</span>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
          <input className={inputClass} type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
      </label>
      {message ? <p className={`rounded-[1.15rem] px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.login.submitLabel}</button>
    </form>
  )
}

export function EditableLocalSignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedName = name.trim()
    const normalizedEmail = email.trim().toLowerCase()
    if (password.length < 4) {
      setStatus('error')
      setMessage(pagesContent.auth.signup.passwordShort)
      return
    }
    const users = readUsers()
    const nextUser: LocalUser = {
      name: normalizedName || normalizedEmail.split('@')[0] || 'Member',
      email: normalizedEmail,
      password,
      createdAt: new Date().toISOString(),
    }
    saveUsers([nextUser, ...users.filter((item) => item.email.toLowerCase() !== normalizedEmail)])
    saveSession(nextUser)
    setStatus('success')
    setMessage(pagesContent.auth.signup.success)
    window.setTimeout(() => router.push('/'), 500)
  }

  return (
    <form className="mt-6 grid gap-5" onSubmit={submit}>
      <label className="grid gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Full name</span>
        <div className="relative">
          <User2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
          <input className={inputClass} placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} required />
        </div>
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
          <input className={inputClass} type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
      </label>
      <label className="grid gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Password</span>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--slot4-soft-muted-text)]" />
          <input className={inputClass} type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>
      </label>
      {message ? <p className={`rounded-[1.15rem] px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>{message}</p> : null}
      <button type="submit" className={buttonClass}>{pagesContent.auth.signup.submitLabel}</button>
    </form>
  )
}

export function useEditableLocalAuthSession() {
  const [session, setSession] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    const load = () => {
      try {
        const parsed = JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null')
        setSession(parsed && typeof parsed.email === 'string' ? parsed : null)
      } catch {
        setSession(null)
      }
    }
    load()
    window.addEventListener('slot4-auth-change', load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener('slot4-auth-change', load)
      window.removeEventListener('storage', load)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem(SESSION_KEY)
    window.dispatchEvent(new Event('slot4-auth-change'))
    setSession(null)
  }

  return { session, logout }
}
