import getQueryClient from '@/common/config/reactQuery/getQueryClient'
import getQueryKey from '@/common/utils/getQueryKey'
import API_URL from '@/common/constant/apiUrl'
import { Hydrate, dehydrate } from '@tanstack/react-query'
import PostItem from '../_components/PostItem'
import { getPost } from '@/common/api/page/posts/postFetchers'

export default async function Post({ params: { id } }: { params: { id: number } }) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(
    getQueryKey(`${API_URL.POSTS}/${id}`, undefined),
    () => getPost(id),
  )
  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <PostItem id={id} />
    </Hydrate>
  )
}
