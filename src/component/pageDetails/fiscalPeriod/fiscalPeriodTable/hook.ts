import { useEffect, useState, useContext } from "react";
import FiscalcPeriod from "../../../../controler/services/fiscalPeriod/apiRequest";
import { Notification } from 'sanhab-components-library'
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function FiscalPeriodTableHook(props: any) {
    const globalContext = useContext(GlobalContext)

    let now = new Date()
    now.setHours(0, 0, 0, 0);
    let today = now.toISOString();
    let last30days = new Date(now.setDate(now.getDate() - 30)).toISOString()

    const [selectedRowId, setSelectedRowId] = useState(0);

    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [companyId, setCompanyId] = useState(0);
    const [fromDate, setFromDate] = useState(last30days);
    const [toDate, setToDate] = useState(today);
    const [requestFilterAgain, setRequestFilterAgain] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [finalFIlterData, setFinalFIlterData] = useState<any[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
    });
    const [sorter, setSorter] = useState<any>({
        orderBy: null,
        isDescending: null
    });
    const [sorterAdvancedSearch, setSorterAdvancedSearch] = useState<any>({
        orderBy: null,
        isDescending: null
    });

    let filterdata: any[] = [];

    const setTableData = (response: any) => {
        setTotalCount(response?.data?.TotalCount);
        setPageCount(response?.data?.TotalCount);

        filterdata = response?.data?.Result?.map((record: any) => {
            let obj = {
                key: record?.Id,
                id: record?.Id,
                title: record?.Title,
                isActive: record?.IsActive,
                periodType: record?.PeriodType,
                pendingLoss: record?.PendingLoss,
                factureType: record?.FactureType,
                fromDay: record?.FromDay,
                toDay: record?.ToDay,
                fromMonth: record?.FromMonth,
                toMonth: record?.ToMonth,
                fiscalYearId: record?.FiscalYearId
            };
            return obj;
        });
        setFinalFIlterData(filterdata);
        setIsLoadingTable(false);
    }

    useEffect(() => {
        setIsLoadingTable(true);
        setTimeout(() => {
            // if (!props.isFiltered) {
            let currentPage = globalContext.isFilterResubmitted ? 1 : current
            setCurrent(currentPage)
            if (!globalContext.isAdvancedSearch || isFirstLoad) {
                FiscalcPeriod.AllPaged({
                    pageIndex: current,
                    firstPageSize: pageModel.pageSize,
                    rowsPerPage: pageModel.pageSize,
                    orderBy: sorter.orderBy,
                    isDescending: sorter.isDescending
                }).then(response => {
                    setTableData(response)
                    globalContext.onResubmitFilter(false);
                })
                    .finally(() => {
                        setIsLoadingTable(false)
                        setIsFirstLoad(false)
                    })
            }
            else {
                FiscalcPeriod.AdvancedSearch({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorterAdvancedSearch.orderBy === null || sorterAdvancedSearch.orderBy === undefined ? "Id" : sorterAdvancedSearch.isDescending === true ? `${sorterAdvancedSearch.orderBy} DESC` : `${sorterAdvancedSearch.orderBy}`,
                    filters: globalContext.submittedFilters
                }).then(response => {

                    setTotalCount(response?.data?.TotalCount);
                    setPageCount(response?.data?.TotalCount);
                    // setTableData(response)
                    filterdata = response?.data?.Result?.map((record: any) => {
                        let obj = {
                            key: record?.Id,
                            id: record?.Id,
                            title: record?.Title,
                            isActive: record?.IsActive,
                            periodType: record?.PeriodType,
                            pendingLoss: record?.PendingLoss,
                            factureType: record?.FactureType,
                            fromDay: record?.FromDay,
                            toDay: record?.ToDay,
                            fromMonth: record?.FromMonth,
                            toMonth: record?.ToMonth,
                            fiscalYearId: record?.FiscalYearId
                        };
                        return obj;
                    });
                    setFinalFIlterData(filterdata);
                    globalContext.onResubmitFilter(false);
                    setIsLoadingTable(false);
                })


            }
        }, 1000);

    }, [current, props.shoudSearchAgain, requestFilterAgain, globalContext.shouldMakeAdvancedSearchAgain, props.shouldReloadTable, sorter, sorterAdvancedSearch])



    const changePageHandler = (current: number, pageSize: any) => {
        let currentPage = globalContext.isFilterResubmitted ? 1 : current
        setCurrent(currentPage);
        if (pageSize === 0) pageSize = 1;
        setPageModel({
            pageSize: pageSize,
            firstPageSize: pageSize
        })
        props.reloadTable()

    };

    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.id);
    };

    const editFiscalPeriodHandler = (id: number) => {
        props.editRecordHandler(id)
    };

    const viewDetails = (id: number) => {
        props.viewRecordDetailsHandler(id)
    };

    const deleteFiscalPeriodHandler = (id: number) => {
        props.deleteRecordHandler(id)
    };

    const changeIsActiveStatus = (activeStatus: boolean) => {
        FiscalcPeriod.ActiveOrDeactiveFiscalPeriod(
            {
                id: selectedRowId,
                isActive: !activeStatus
            }
        ).then((response) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: ' وضعیت با موفقیت  تغییر داده شد.' });
                props.reloadTable()
            }
        })
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };

    function onChangeTable(pagination: any, filters: any, sorter: any) {

        if (sorter.order !== undefined) {
            if (sorter.field === "fromDay") {
                setSorter({
                    orderBy: ["FromMonth","FromDay" ],
                    isDescending: sorter.order === "descend" ? true : false
                })
            }
            else if (sorter.field === "toDay") {
                setSorter({
                    orderBy: ["ToMonth" , "ToDay" ],
                    isDescending: sorter.order === "descend" ? true : false
                })
            }
            else {
                setSorter({
                    orderBy: [sorter.field.charAt(0).toUpperCase() + sorter.field.slice(1)],
                    isDescending: sorter.order === "descend" ? true : false
                })
            }
            setSorterAdvancedSearch({
                orderBy: sorter.field.charAt(0).toUpperCase() + sorter.field.slice(1),
                isDescending: sorter.order === "descend" ? true : false
            })
        }
        else {
            setSorter({
                field: null,
                order: null
            })
            setSorterAdvancedSearch({
                field: null,
                order: null
            })
        }









    }

    return {
        current,
        pageModel,
        totalCount,
        pageCount,
        isLoadingTable,
        filterdata,
        finalFIlterData,
        changePageHandler,
        onRowSelection,
        editFiscalPeriodHandler,
        deleteFiscalPeriodHandler,
        viewDetails,
        changeIsActiveStatus,
        viewRecordHistory,
        onChangeTable
    }
}

export default FiscalPeriodTableHook
