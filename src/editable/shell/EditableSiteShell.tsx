'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`${dc.shell.page} min-h-screen ${className}`} />
  }

  return (
    <div className={`${dc.shell.page} flex min-h-screen flex-col ${className}`}>
      <EditableNavbar />
      <div className="min-h-0 flex-1">{children}</div>
      <EditableFooter />
    </div>
  )
}
