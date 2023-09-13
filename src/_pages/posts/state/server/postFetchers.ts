import { api } from '../../../../common/api/api'
import API_URL from '../../../../common/constant/apiUrl'

export const getPosts = async () => {
  const posts = await api<IPost[]>({
    method: 'GET',
    url: API_URL.POSTS,
  })

  return posts
}

export const getPost = async (id: number) => {
  const post = await api<IPost>({
    method: 'GET',
    url: `${API_URL.POSTS}/${id}`,
  })

  return post
}
