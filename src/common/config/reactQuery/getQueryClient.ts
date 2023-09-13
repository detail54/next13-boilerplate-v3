import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export default cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // 무분별한 refetch를 막기위해 설정.
          retry: 0,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        },
      },
    }),
)
