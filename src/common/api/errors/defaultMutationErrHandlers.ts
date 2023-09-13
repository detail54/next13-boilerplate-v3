const err404 = (error: Response) => {
  console.log('mutation 404 error::', error)
}

const err500 = (error: Response) => {
  console.log('mutation 500 error::', error)
}

const errDefault = (error: Response) => {
  console.log('mutation default error::', error)
}

const defaultMutationErrHandlers: TErrorHandlers = {
  default: errDefault,
  404: err404,
  500: err500,
}

export default defaultMutationErrHandlers
