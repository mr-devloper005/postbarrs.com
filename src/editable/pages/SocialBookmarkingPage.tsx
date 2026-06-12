import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('sbm', {
    path: '/sbm',
    title: taskPageMetadata.sbm.title,
    description: taskPageMetadata.sbm.description,
  })

export async function SocialBookmarkingTaskPage({
  searchParams,
  basePath = '/sbm',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="sbm" searchParams={searchParams} basePath={basePath} />
}

export default SocialBookmarkingTaskPage
