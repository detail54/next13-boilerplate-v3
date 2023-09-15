'use client'

import React from 'react'
import { useRecoilValue } from 'recoil'
import { viewPostId } from '../state/client/postRecoil'

const PostViewId = () => {
  const viewId = useRecoilValue(viewPostId)

  return <div>{viewId}</div>
}

export default PostViewId
