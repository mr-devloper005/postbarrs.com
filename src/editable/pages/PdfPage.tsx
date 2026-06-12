import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('pdf', {
    path: '/pdf',
    title: taskPageMetadata.pdf.title,
    description: taskPageMetadata.pdf.description,
  })

export async function PdfTaskPage({
  searchParams,
  basePath = '/pdf',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="pdf" searchParams={searchParams} basePath={basePath} />
}

export default PdfTaskPage
