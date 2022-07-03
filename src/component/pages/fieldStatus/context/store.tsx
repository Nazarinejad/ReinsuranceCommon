import React, { useEffect, useState, useContext } from "react";
import FieldStatusContext from "./context";
import IFieldStatusContextStoreProps from "./models";
import { IPageModel, ITableResultModel } from "./models";
import GlobalContext from "../../../../controler/context/context"
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

import FieldStatusApiRequest from "../../../../controler/services/fieldStatus/apiRequest"



const FieldStatusContextStore = ({ children }: IFieldStatusContextStoreProps) => {

    const globalContext = useContext(GlobalContext)

    const [fetchRequest, setFetchRequest] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("1");

    const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
    const [companies, setCompanies] = useState<number[]>([]);
    const [tableResult, setTableResult] = useState<ITableResultModel>({ Result: [], TotalCount: 0 });
    const [companiesLoading, setCompaniesLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);

    const [reloadTable, SetReloadTable] = useState(true);
    const [showLoader, setShowLoader] = useState(false);

    const [isExcelLoading, setIsExcelLoading] = useState(false);


    const [current, setCurrent] = useState(1);
    const [pageModel, setPageModel] = useState<IPageModel>({
        pageSize: 10,
        firstPageSize: 10
    });

    const [sorter, setSorter] = useState<any>({
        orderBy: null,
        isDescending: null
    });

    useEffect(() => {
        setCompaniesLoading(true);
        FieldStatusApiRequest.GetAllCompanies()
            .then((response) => {
                setCompanies(response?.data?.Result)
            })
            .finally(() => {
                onSetFetchRequest(true)
                setCompaniesLoading(false);
            })
    }, [])


    useEffect(() => {
        if (fetchRequest) {
            if (showLoader === true) setTableLoading(true)
            let newComapanyList: number[] = []

            companies.forEach((company: any) => {
                newComapanyList.push(company.Id)
            })

            setSelectedCompanies(newComapanyList);


            let currentPage = globalContext.isFilterResubmitted ? 1 : current
            setCurrent(currentPage)
            if (!globalContext.isAdvancedSearch) {


                FieldStatusApiRequest.AllPaged({

                    pageIndex: current,
                    firstPageSize: pageModel.pageSize,
                    rowsPerPage: pageModel.pageSize,
                    orderBy: sorter.orderBy,
                    isDescending: sorter.isDescending,
                    companyId: newComapanyList,
                    status: Number(activeTab),

                })
                    .then(response => {
                        setTableResult(response?.data)
                    })
                    .finally(() => {
                        // setFetchRequest(false)
                        setTableLoading(false)
                        setShowLoader(false)
                    })
            }
            else {
                FieldStatusApiRequest.AdvancedSearch({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorter.orderBy === null || sorter.orderBy === undefined ? "Id" : sorter.isDescending === true ? `${sorter.orderBy} DESC` : `${sorter.orderBy}`,
                    status: Number(activeTab),
                    filters: globalContext.submittedFilters
                }).then(response => {

                    setTableResult(response?.data)

                })
                    .finally(() => {
                        globalContext.onResubmitFilter(false);
                        setTableLoading(false);
                        setShowLoader(false)
                    })

            }
        }

    }, [fetchRequest, activeTab, pageModel.pageSize, pageModel.firstPageSize, current, reloadTable, showLoader, globalContext.shouldMakeAdvancedSearchAgain, sorter]); //companyList


    const onSetFetchRequest = (shouldFetch: boolean) => {
        setFetchRequest(shouldFetch)

    }

    const onSetCompanyList = (companyList: any[]) => {
        //setCompanyList(companyList)
    }

    const setTableLoadingTrue = () => {
        setTableLoading(true)
    }

    const resetTableSetting = () => {
        setCurrent(1);
        setPageModel({
            pageSize: 10,
            firstPageSize: 10
        })
    }


    const onSetActiveTab = (key: string) => {
        resetTableSetting();
        setActiveTab(key)
        setSorter({
            field: null,
            order: null
        })
    }

    const onSetReloadTable = () => {
        SetReloadTable(!reloadTable);
    }

    const onSetShowLoader = () => {
        setShowLoader(true);
    }

    const changePageHandler = (current: number, pageSize: number | undefined) => {
        let currentPage = globalContext.isFilterResubmitted ? 1 : current
        setCurrent(currentPage);
        if (pageSize === 0) pageSize = 1;
        setPageModel({
            pageSize: pageSize,
            firstPageSize: pageSize
        })
    }

    const getExcelReport = () => {

        setIsExcelLoading(true);
        FieldStatusApiRequest.GetExcelReport({
            status: Number(activeTab),
            companyId: selectedCompanies
        })
            .finally(() =>
                setIsExcelLoading(false)
            )
    }

    const onChangeTable = (pagination: any, filters: any, sorter: any) => {
        const sortObj = OnSortColumn(sorter);
        setSorter(sortObj)

    }

    const getProviderValue = () => {
        return {
            selectedCompanies,
            tableResult,
            companiesLoading,
            companies,
            tableLoading,
            current,
            pageModel,
            isExcelLoading,
            onSetFetchRequest,
            onSetCompanyList,
            onSetActiveTab,
            changePageHandler,
            onSetReloadTable,
            onSetShowLoader,
            setTableLoadingTrue,
            getExcelReport,
            onChangeTable
        }
    }

    return (
        <FieldStatusContext.Provider value={getProviderValue()}>
            {children}
        </FieldStatusContext.Provider>
    );
}


export default FieldStatusContextStore
