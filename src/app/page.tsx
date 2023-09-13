import APP_URL from '@/common/constant/appUrl'
import Button from '@/components/atom/button'
import Link from 'next/link'

export default async function Home() {
  return (
    <main>
      <Link href={APP_URL.POSTS}>
        <Button text={'포스트'} />
      </Link>
    </main>
  )
}
