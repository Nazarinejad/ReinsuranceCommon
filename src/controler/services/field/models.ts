interface filter {
    propertyName: string
    operator: number
    value: string
}

export interface IOldAllPagedRequestBody {
    pageIndex: number
    pageSize: number
    cmpCod: number
    fromDate: string
    toDate: string
}

export interface IFindRequestBody {
    plcyUnqCod?: number,
    prntDocNo?: string,
    cmpCod?: number,
    passNo?: string
}

export interface IAllPagedRequestBody {
    firstPageSize: number
    rowsPerPage: number
    pageIndex: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IAllPagedSubTableRequestBody {
    firstPageSize: number
    rowsPerPage: number
    pageIndex: number
    fieldId: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IAddSubFieldRequestBody {
    fieldId: number
    isActive: boolean
    subFieldTitle: string
    accountingCode: number
    description: string
    noLossRatio: boolean
    failureToCalculateReserves: boolean
    isCovrage: boolean
    isCalculatedCovrage: boolean
    cumulativeParticipatingOfInterestsId: number
    sortId: number
    department: number
    isAnnuity: boolean
}

export interface IAddFieldRequestBody {
    titile: string
}

export interface IEditRequestBody {
    id: number
    fieldId: number
    isActive: boolean
    subFieldTitle: string
    accountingCode: number
    description: string
    noLossRatio: boolean
    failureToCalculateReserves: boolean
    isCovrage: boolean
    isCalculatedCovrage: boolean
    cumulativeParticipatingOfInterestsId: number
    sortId: number
    department: number
    isAnnuity: boolean
}

export interface IGetRequestBody {
    id: number
}

export interface IActiveOrDeactiveRequestBody {
    id: number,
    isActive: boolean
}

export interface IAdvancedsearchRequestBody {
    firstPageSize: number
    pageSize: number
    pageIndex: number
    orderBy: string | null
    filters: filter[]
}

export interface IChildAdvancedsearchRequestBody {
    firstPageSize: number
    pageSize: number
    pageIndex: number
    orderBy: string | null
    fieldId: number
    filters: filter[]
}