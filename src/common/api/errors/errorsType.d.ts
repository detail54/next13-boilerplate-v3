type TQueryErr = (err: Response) => void
type TErrorHandlers = Record<number | string, (error: Response) => void>
