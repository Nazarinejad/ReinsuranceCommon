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
    orderBy: string[] | null
    isDescending: boolean | null
}

export interface IAddRequestBody {
    title: string
    fromDay: number
    toDay: number
    fromMonth: number
    toMonth: number
    isActive: boolean
    sortId: number
    periodType: number
    factureType: number
    pendingLoss: boolean
    fiscalYearId: number[]
}

export interface IEditRequestBody {
    id: number
    title: string
    fromDate: string
    toDate: string
    isActive: boolean
    sortId: number
}

export interface IGetByParentAndChildRequestBody {
    id: number
}

export interface IGetRequestBody {
    id: number
}

export interface IActiveOrDeactiveRequestBody {
    id: number
    isActive: boolean
}