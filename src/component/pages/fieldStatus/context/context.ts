import React from "react";
import { IFieldStatusContext } from "./models";

const initialValue: IFieldStatusContext = {
    selectedCompanies: [],
    tableResult: {
        Result:[],
        TotalCount:0
    },
    companiesLoading: false,
    tableLoading: false,
    companies:[],
    current:1,
    pageModel: {
        pageSize:10,
        firstPageSize:10
    },
    isExcelLoading: false,
    onSetFetchRequest: (shouldFetch:boolean) => {},
    onSetCompanyList: (companyList:any[]) => {},
    onSetActiveTab: (key:string) => {},
    changePageHandler : (current: number, pageSize: number | undefined) => {},
    onSetReloadTable : () => {},
    onSetShowLoader : () => {},
    setTableLoadingTrue : () => {},
    getExcelReport : () => {},
    onChangeTable : (pagination: any, filters: any, sorter: any) => {}
}

const FieldStatusContext = React.createContext<IFieldStatusContext>(initialValue)

export default FieldStatusContext