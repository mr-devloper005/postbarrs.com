import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('image', {
    path: '/image',
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  })

export async function ImagesTaskPage({
  searchParams,
  basePath = '/image',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="image" searchParams={searchParams} basePath={basePath} />
}

export default ImagesTaskPage
