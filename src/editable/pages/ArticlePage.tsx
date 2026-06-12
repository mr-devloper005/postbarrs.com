import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'
import { EditableTaskArchiveRoute } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('article', {
    path: '/article',
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  })

export async function ArticleTaskArchive({
  searchParams,
  basePath = '/article',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <EditableTaskArchiveRoute task="article" searchParams={searchParams} basePath={basePath} />
}

export function ArticleTaskPage({
  searchParams,
  basePath = '/article',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  return <ArticleTaskArchive searchParams={searchParams} basePath={basePath} />
}

export default function ArticleTaskPageRoute({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
}) {
  return <ArticleTaskPage searchParams={searchParams} />
}
