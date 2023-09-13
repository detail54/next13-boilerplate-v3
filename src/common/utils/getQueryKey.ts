const getQueryKey = (url: string, param?: any): TQueryKey => {
  const key: TQueryKey = [url, param]
  return key
}

export default getQueryKey
