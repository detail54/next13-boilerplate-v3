import {
  useQuery as UseQueryOrigin,
  useMutation as useMutationOrigin,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import apiErrors from './errors'

export const useQuery = <T>({
  queryKey,
  queryFn,
  options,
  errorHandlers,
  onError,
}: IUseQuery<T>) => {
  const { handleQueryError } = apiErrors(errorHandlers)

  return UseQueryOrigin<T, Response, T, TQueryKey>(queryKey, queryFn, {
    enabled: !!queryKey,
    onError: onError || handleQueryError,
    useErrorBoundary: !onError,
    staleTime: 1000 * 60,
    ...options,
  })
}

export const useMutation = <T, S>({
  queryKey,
  mutationFn,
  updater,
  errorHandlers,
  onError,
  options,
}: IUseMutation<T, S>): UseMutationResult<Response, Response, T | S> => {
  const { handleMutationError } = apiErrors(errorHandlers)

  const queryClient = useQueryClient()

  return useMutationOrigin<Response, Response, T | S>(mutationFn, {
    onMutate: async (data) => {
      await queryClient.cancelQueries(queryKey)

      const previousData = queryClient.getQueriesData(queryKey)

      queryClient.setQueriesData<T>(queryKey, (oldData) => {
        return updater && oldData ? updater(oldData, data as S) : (data as T)
      })

      return previousData
    },
    onError: onError || handleMutationError,
    onSettled: () => {
      queryClient.invalidateQueries(queryKey)
    },
    ...options,
  })
}
