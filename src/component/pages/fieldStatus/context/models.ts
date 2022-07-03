
interface IFieldStatusContextStoreProps {
    children: React.ReactChild
}

export interface IPageModel {
    pageSize:number|undefined
    firstPageSize:number|undefined
}

export interface ITableResulRowtModel {
    CodeFieldOfInsuranceCompany: string
    Deleted: boolean
    FieldId: number
    FieldOfInsuranceCompany: string
    GroupFieldOfInsuranceCompany: string
    Id: number
    SubFieldId: number
}

export interface ITableResultModel {
    Result : ITableResulRowtModel[]
    TotalCount:number
}


export interface IFieldStatusContext {
    selectedCompanies : number[]
    tableResult : ITableResultModel
    companiesLoading: boolean
    tableLoading: boolean
    companies: any[]
    current:number
    pageModel:IPageModel
    isExcelLoading:boolean
    onSetFetchRequest: (shouldFetch:boolean) => void
    onSetCompanyList: (companyList:any[]) => void
    onSetActiveTab: (key:string) => void
    changePageHandler : (current: number, pageSize: number | undefined) => void
    onSetReloadTable : () => void
    onSetShowLoader : () => void
    setTableLoadingTrue : () => void
    getExcelReport : () => void
    onChangeTable : (pagination: any, filters: any, sorter: any) => void
}

export default IFieldStatusContextStoreProps