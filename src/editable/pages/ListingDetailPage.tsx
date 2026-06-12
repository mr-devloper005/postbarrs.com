import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug } from '@/lib/task-data'
import { EditableTaskDetailRoute } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  try {
    const post = await fetchTaskPostBySlug('listing', resolvedParams.slug)
    return post ? await buildPostMetadata('listing', post) : await buildTaskMetadata('listing')
  } catch (error) {
    console.warn('Listing metadata lookup failed', error)
    return await buildTaskMetadata('listing')
  }
}

export default async function ListingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <EditableTaskDetailRoute task="listing" params={params} />
}
