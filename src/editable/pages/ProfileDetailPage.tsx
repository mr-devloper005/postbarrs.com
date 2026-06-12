import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug } from '@/lib/task-data'
import { EditableTaskDetailRoute } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params
  try {
    const post = await fetchTaskPostBySlug('profile', resolvedParams.username)
    return post ? await buildPostMetadata('profile', post) : await buildTaskMetadata('profile')
  } catch (error) {
    console.warn('Profile metadata lookup failed', error)
    return await buildTaskMetadata('profile')
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  return <EditableTaskDetailRoute task="profile" params={params} />
}
