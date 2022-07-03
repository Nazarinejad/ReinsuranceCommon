import { useEffect, useState, useContext } from "react";
import FiscalcYear from "../../../../controler/services/fiscalYear/apiRequest";
import { Notification } from 'sanhab-components-library'
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function FiscalYearTableHook(props: any) {

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
    const [sorter, setSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });

    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
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
                fromDate: record?.FromDate,
                toDate: record?.ToDate,
                isActive: record?.IsActive
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
                FiscalcYear.AllPaged({
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    rowsPerPage: pageModel.pageSize,
                    orderBy:sorter.orderBy,
                    isDescending:sorter.isDescending
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
                FiscalcYear.AdvancedSearch({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorter.orderBy === null || sorter.orderBy === undefined ? "Id" :  sorter.isDescending === true ? `${sorter.orderBy} DESC` : `${sorter.orderBy}`,
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
                            fromDate: record?.FromDate,
                            toDate: record?.ToDate,
                            isActive: record?.IsActive
                        };
                        return obj;
                    });
                    setFinalFIlterData(filterdata);

                })
                    .finally(() => {
                        globalContext.onResubmitFilter(false);
                        setIsLoadingTable(false);
                    })

            }
        }, 1000);

    }, [current, props.shoudSearchAgain, requestFilterAgain, globalContext.shouldMakeAdvancedSearchAgain, props.shouldReloadTable, sorter])

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

    const editFiscalYearHandler = (id: number) => {
        // console.log(id, "selected row id");
        props.editRecordHandler(id)
    };

    const deleteFiscalYearHandler = (id: number) => {
        props.deleteRecordHandler(id)
    };

    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.id);
    };

    const changeIsActiveStatus = (activeStatus: boolean) => {
        FiscalcYear.ActiveOrDeactiveFiscalPeriod(
            {
                id: selectedRowId,
                isActive: !activeStatus
            }
        ).then((response) => {
            if (response?.data?.IsSucceed) {
                Notification.success({ message: 'وضعیت با موفقیت تغییر داده شد.' });
                props.reloadTable()
            }
        })
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };

    function onChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        setSorter(sortObj)
        
    }

    return {
        current,
        pageModel,
        totalCount,
        pageCount,
        isLoadingTable,
        //columns,
        filterdata,
        finalFIlterData,
        changePageHandler,
        onRowSelection,
        editFiscalYearHandler,
        deleteFiscalYearHandler,
        changeIsActiveStatus,
        viewRecordHistory,
        onChangeTable
    }
}

export default FiscalYearTableHook
