import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug } from '@/lib/task-data'
import { EditableTaskDetailRoute } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('image', resolvedParams.slug)
  return post ? await buildPostMetadata('image', post) : await buildTaskMetadata('image')
}

export default async function ImageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <EditableTaskDetailRoute task="image" params={params} />
}
