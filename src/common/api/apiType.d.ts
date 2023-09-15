interface IApi {
  method: HTTP_METHOD
  url: string
  option?: Omit<RequestInit, 'method'>
}

interface IReValidApi {
  method: HTTP_METHOD
  url: string
  revalidTime: number
  option?: Omit<RequestInit, 'method' | 'next'>
}

type TQueryKey = [string] | [string, object | undefined]

interface IUseReactQueryProps {
  queryKey: TQueryKey
  queryFn: () => Promise<T>
  onError?: TQueryErr
  errorHandlers?: TErrorHandlers
  options?: Omit<
    UseQueryOptions<T, AxiosError, T, TQueryKey>,
    'queryKey' | 'onError'
  >
}
