'use client'

import { useSetRecoilState } from 'recoil'
import { viewPostId } from '../state/client/postRecoil'
import { usePost } from '../state/server/postQuerys'
import React, { useEffect } from 'react'

interface IPostProps {
  id: number
}

const PostItem = ({ id }: IPostProps) => {
  const { data: post, isLoading } = usePost(id)
  const setViewId = useSetRecoilState(viewPostId)

  useEffect(() => {
    setViewId(id)
  }, [])

  return <div>{post && post.body}</div>
}

export default PostItem
