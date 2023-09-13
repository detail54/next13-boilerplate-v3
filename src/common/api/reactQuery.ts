import { useQuery as UseQueryOrigin } from '@tanstack/react-query'
import apiErrors from './errors'

export const useQuery = <T>({
  queryKey,
  queryFn,
  options,
  errorHandlers,
  onError,
}: IUseReactQueryProps) => {
  const { handleQueryError } = apiErrors(errorHandlers)

  return UseQueryOrigin<T, Response, T, TQueryKey>(queryKey, queryFn, {
    enabled: !!queryKey,
    onError: onError || handleQueryError,
    useErrorBoundary: !onError,
    staleTime: 1000 * 60,
    ...options,
  })
}
