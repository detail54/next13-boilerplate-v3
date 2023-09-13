import getQueryClient from '@/common/config/reactQuery/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import PostList from './_components/PostList'
import getQueryKey from '@/common/utils/getQueryKey'
import API_URL from '@/common/constant/apiUrl'
import { getPosts } from '@/common/api/page/posts/postFetchers'

export default async function Posts() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(getQueryKey(API_URL.POSTS, undefined), getPosts)
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <PostList />
    </Hydrate>
  )
}
