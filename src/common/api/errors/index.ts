import defaultQueryErrHandlers from './defaultQueryErrHandlers'
import defaultMutationErrHandlers from './defaultMutationErrHandlers'

const apiErrors = (handlers?: TErrorHandlers) => {
  const handleQueryError = (error: Response) => {
    const httpStatus = error.status || 0
    const handler = handlers || defaultQueryErrHandlers

    if (httpStatus) {
      handler[httpStatus](error)
    } else {
      defaultQueryErrHandlers.default(error)
    }
  }

  const handleMutationError = (error: Response, variables: unknown, context: unknown) => {
    const httpStatus = error.status || 0
    const handler = handlers || defaultMutationErrHandlers

    if (httpStatus) {
      handler[httpStatus](error)
    } else {
      defaultMutationErrHandlers.default(error)
    }
  }

  return { handleQueryError, handleMutationError }
}

export default apiErrors
