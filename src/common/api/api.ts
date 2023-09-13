const formatUrl = (url: string) => {
  const formatedUrl = url.startsWith('/') ? url : `/${url}`

  return process.env.NEXT_PUBLIC_APP_API_SERVER_URL! + formatedUrl
}

const api = async <T>({ method, url, option }: IApi): Promise<T> => {
  const res = await fetch(formatUrl(url), { ...option, method })
  return res.json() as Promise<T>
}

/**
 * param >> revalidTime 단위: s
 */
const reValidApi = async <T>({ method, url, revalidTime, option }: IReValidApi): Promise<T> => {
  const res = await fetch(formatUrl(url), {
    ...option,
    method,
    next: {
      revalidate: revalidTime,
    },
    cache: 'force-cache',
  })

  return res.json() as Promise<T>
}

export { api, reValidApi }
