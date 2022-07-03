export default interface IApiResult<R = null> {
    Error: string
    ErrorType: number
    IsSucceed: boolean
    Message: string
    Result: R
    TotalCount: number
}