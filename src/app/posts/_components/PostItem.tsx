'use client'

import { usePost } from '@/common/api/page/posts/postQuerys'
import React from 'react'

interface IPostProps {
  id: number
}

const PostItem = ({ id }: IPostProps) => {
  const { data: post, isLoading } = usePost(id)

  return <div>{post && post.body}</div>
}

export default PostItem
