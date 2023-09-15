import API_URL from '@/common/constant/apiUrl'
import { useQuery } from '@/common/api/reactQuery'
import { getPosts, getPost } from './postFetchers'
import getQueryKey from '@/common/utils/getQueryKey'

export const usePosts = (onError?: TQueryErr) => {
  return useQuery<IPost[]>({
    queryKey: getQueryKey(API_URL.POSTS),
    queryFn: getPosts,
    onError,
  })
}

export const usePost = (id: number, onError?: TQueryErr) => {
  return useQuery<IPost>({
    queryKey: getQueryKey(`${API_URL.POSTS}/${id}`),
    queryFn: () => getPost(id),
    onError,
  })
}
