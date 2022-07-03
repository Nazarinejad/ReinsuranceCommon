interface filter {
    propertyName: string
    operator: number
    value: string
}

export interface IAllPagedRequestBody {
    firstPageSize: number
    rowsPerPage: number
    pageIndex: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IAdvancedsearchRequestBody {
    firstPageSize: number
    pageSize: number
    pageIndex: number
    orderBy: string | null
    filters: filter[]
}
