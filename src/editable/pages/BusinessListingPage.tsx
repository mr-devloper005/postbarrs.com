import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('listing', {
    path: '/listing',
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  })

export async function BusinessListingTaskPage({
  searchParams,
  basePath = '/listing',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="listing" searchParams={searchParams} basePath={basePath} />
}

export default BusinessListingTaskPage
