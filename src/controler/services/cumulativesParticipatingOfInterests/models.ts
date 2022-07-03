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
    firstPageSize:number
    rowsPerPage:number
    pageIndex: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IAddRequestBody {
    title: string
    sortId: number
    printVersionFormat: string,
    cumulativeRequlations: number[],
    considerPendingLoss: boolean,
    percentageOfParticipation:number
}

export interface IEditRequestBody {
    id: number
    title: string
    fromDate: string
    toDate: string
    isActive: boolean
    sortId: number
}

export interface IGetRequestBody {
    id: number
}

export interface IDeleteRequestBody {
    id: number
}