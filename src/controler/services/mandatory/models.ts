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

export interface IAllMandatoryRelianceRequestBody {
    firstPageSize: number
    rowsPerPage: number
    pageIndex: number
    companyId: number
    fiscalYearId: number
    orderBy: string | null
    isDescending: boolean | null
}


export interface IAddRequestBody {
    companyId: number[],
    fiscalyearId: number,
    fieldGroupId: number[],
    subFieldId: number[],
    commissionType: number,
    commissionRate: number,
    percentageOfRelianceShare: number,
    premiumIncreaseCoefficientInReserves: number,
    premiumIncreaseCoefficientInLossRatio: number,
    vat: number,
    tax: number,
    toll: number,
    percentageOfTuitionFees: number,
    percentageOfHealthFees: number,
    percentageOfFundShare: number,
    percentageOfPenaltyForLate: number,
    effectiveDateFrom: "",
    effectiveDateTo: ""
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
    companyId: number,
    mandatoryRelianceInformationSubFieldId: number
}

export interface IGetHistoryRequestBody {
    id: number
}

export interface IGetHistoryByIdAndChildRequestBody {
    id: number
    childId: number
}

export interface IDeleteRecordRequestBody {
    id: number
    mandatoryRelianceInformationSubFieldId: number
}

export interface IDeleteRangeRequestBody {
    id: number
}

export interface IActiveOrDeactiveRequestBody {
    id: number,
    isActive: boolean
}

export interface IAllFiscalYearsRequestBody {
    firstPageSize: number
    rowsPerPage: number
    pageIndex: number
    companyId: number
    orderBy: string | null
    isDescending: boolean | null
}

export interface IGetDetailForCopyRequestBody {
    companyId: number
    id: number
}

export interface ICopyRequestBody {
    companyId: number
    id: number
    fiscalYearId: number
    percentageOfRelianceShare: number
    effectiveDateFrom:string
    effectiveDateTo:string
    

}

export interface ILvlOneExcelRequestBody {
    companyId: number
}

export interface ILvlTwoExcelRequestBody {
    companyId: number
    fiscalYearId: number
}

