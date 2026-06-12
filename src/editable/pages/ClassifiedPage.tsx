import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('classified', {
    path: '/classified',
    title: taskPageMetadata.classified.title,
    description: taskPageMetadata.classified.description,
  })

export async function ClassifiedTaskPage({
  searchParams,
  basePath = '/classified',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="classified" searchParams={searchParams} basePath={basePath} />
}

export default ClassifiedTaskPage
