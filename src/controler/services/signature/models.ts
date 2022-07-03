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
    id: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IQuickSearchRequestBody {
    firstPageSize: number
    pageSize: number
    pageIndex: number
    orderBy: string
    keyword: string
}

export interface IAddFirstSignatureRequestBody {
    userName: string
    name: string
    image: string
    department: number
}

export interface IAddecondSignatureRequestBody {
    userName: string
    name: string
    image: string
    department: number
    companyId: number[]
    parentId: number
}

export interface IAddSignatureRequestBody {
    titile: string
}

export interface IEditFirstRequestBody {
    id: number
    userName: string
    name: string
}

export interface IEditSecondRequestBody {
    id: number
    userName: string
    name: string
    signatureId: number
    department: number
    parentId: number
    companyId: number
}

export interface IUpdateImageRequestBody {
    id: number
    image: string
}

export interface IGetRequestBody {
    id: number
}

export interface IDeleteRequestBody {
    id: number
    signatureId: number
}

export interface IActiveOrDeactiveRequestBody {
    id: number,
    isActive: boolean
}

export interface ILvlOneExcelRequestBody {
    id: number
}