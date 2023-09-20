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

interface IUseQuery<T> {
  queryKey: TQueryKey
  queryFn: () => Promise<T>
  onError?: TQueryErr
  errorHandlers?: TErrorHandlers
  options?: Omit<UseQueryOptions<T, Response, T, TQueryKey>, 'queryKey' | 'onError'>
}

interface IUseMutation<T, S> {
  queryKey: TQueryKey
  mutationFn: (data: T | S) => Promise<Response<T>>
  updater?: (oldData: T, newData: S) => T
  errorHandlers?: TErrorHandlers
  onError?: TQueryErr
  options?: Omit<
    UseMutationOptions<Response, Response, T | S>,
    'mutationFn' | 'onMutate' | 'onSettled' | 'onError'
  >
}
