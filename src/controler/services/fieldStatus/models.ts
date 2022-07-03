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
    firstPageSize: number | undefined
    rowsPerPage: number | undefined
    pageIndex: number
    orderBy: string | null
    isDescending: boolean | null
    companyId: number[]
    status: number
}

export interface IAddRequestBody {
    groupFieldOfInsuranceCompany: string
    fieldOfInsuranceCompany: string
    codeFieldOfInsuranceCompany: string
    companyId: number
}

export interface IEditRequestBody {
    id: number
    groupFieldOfInsuranceCompany: string
    fieldOfInsuranceCompany: string
    codeFieldOfInsuranceCompany: string
}

export interface IGetRequestBody {
    id: number
}

export interface IChangeStatusRequestBody {
    id: number
    description: string
}

export interface IEqualizeRequestBody {
    id: number
    fieldId: number
    subFieldId: number
}

export interface IDeleteRequestBody {
    id: number
}

export interface IActiveOrDeactiveRequestBody {
    id: number,
    isActive: boolean
}

export interface IGetExcelRequestBody {
    status: number
    companyId: number[]
}

export interface IGetAllSubFieldsByFieldIdAndCompanyIdRequestBody {
    fieldId: number
    companyId: number
}