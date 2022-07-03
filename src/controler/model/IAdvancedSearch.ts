interface filter {
    propertyName: string
    operator: number
    value: string
}

export interface IAdvancedsearchRequestBody {
    firstPageSize:number | undefined
    pageSize:number | undefined
    pageIndex: number
    orderBy: string | null
    status?:number
    filters:filter[]
    parentId?: number
    companyId?: number
    fiscalYearId?: number
}
