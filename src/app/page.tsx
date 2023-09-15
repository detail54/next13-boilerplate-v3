import APP_URL from '@/common/constant/appUrl'
import Button from '@/common/components/atom/button'
import Link from 'next/link'
import PostViewId from '@/_pages/posts/components/PostViewId'

export default async function Home() {
  return (
    <main>
      <div>마지막 조회한 포스트 아이디</div>
      <PostViewId />
      <br />
      <Link href={APP_URL.POSTS}>
        <Button text={'포스트 리스트 페이지 이동'} />
      </Link>
    </main>
  )
}
