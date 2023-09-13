'use client'

import { usePosts } from '@/common/api/page/posts/postQuerys'
import API_URL from '@/common/constant/apiUrl'
import Link from 'next/link'
import React, { Fragment } from 'react'

const PostList = () => {
  const { data: posts, isLoading } = usePosts()

  console.log('posts:::', posts)

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Fragment key={`post-list-${post.id}`}>
            <Link href={`${API_URL.POSTS}/${post.id}`}>
              <div>{post.title}</div>
            </Link>
          </Fragment>
        ))}
    </div>
  )
}

export default PostList
