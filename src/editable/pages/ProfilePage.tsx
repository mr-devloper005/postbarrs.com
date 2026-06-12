import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('profile', {
    path: '/profile',
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  })

export async function ProfileTaskPage({
  searchParams,
  basePath = '/profile',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="profile" searchParams={searchParams} basePath={basePath} />
}

export default ProfileTaskPage
