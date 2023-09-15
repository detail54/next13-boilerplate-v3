const getQueryKey = (url: string, param?: any): TQueryKey => {
  const key: TQueryKey = param ? [url, param] : [url]
  return key
}

export default getQueryKey
