import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { EditableTaskArchiveRoute, TaskArchiveView } from '@/editable/pages/TaskArchivePage'
import { EditableTaskDetailRoute } from '@/editable/pages/TaskDetailPage'

export function EditableArticleArchive({ posts, pagination, category = 'all', basePath = '/article' }: { posts: SitePost[]; pagination: SiteFeedPagination; category?: string; basePath?: string }) {
  return <TaskArchiveView task="article" posts={posts} pagination={pagination} category={category} basePath={basePath} />
}

export function EditableArticleDetailShell({ slug, post }: { slug: string; post: SitePost | null }) {
  if (!post) {
    return <EditableTaskDetailRoute task="article" params={Promise.resolve({ slug })} />
  }
  return <EditableTaskDetailRoute task="article" params={Promise.resolve({ slug: post.slug || slug })} />
}

export { EditableTaskArchiveRoute }
