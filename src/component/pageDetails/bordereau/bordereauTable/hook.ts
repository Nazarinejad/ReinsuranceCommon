import { useEffect, useState, useContext } from "react";
import FiscalcYear from "../../../../controler/services/bordereau/apiRequest";
import { Notification } from 'sanhab-components-library'
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function BordereauTableHook(props: any) {

    const globalContext = useContext(GlobalContext)

    const [selectedRowId, setSelectedRowId] = useState(0);

    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
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

    let filterdata: any[] = [];

    const setTableData = (response: any) => {
        setTotalCount(response?.data?.TotalCount);
        setPageCount(response?.data?.TotalCount);

        filterdata = response?.data?.Result?.map((record: any) => {
            let obj = {
                key: record?.Id,
                id: record?.Id,
                title: record?.Title,
                accountingCode: record?.AccountingCode,
                isCredit: record?.IsCredit,
                hasCommission: record?.HasCommission
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
                    pageIndex: current,
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
                })
                    .then(response => {

                        setTotalCount(response?.data?.TotalCount);
                        setPageCount(response?.data?.TotalCount);
                        // setTableData(response)
                        filterdata = response?.data?.Result?.map((record: any) => {
                            let obj = {
                                key: record?.Id,
                                id: record?.Id,
                                title: record?.Title,
                                accountingCode: record?.AccountingCode,
                                isCredit: record?.IsCredit,
                                hasCommission: record?.HasCommission
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

    const editBordereauHandler = (id: number) => {
        props.editRecordHandler(id)
    };

    const deleteBordereauHandler = (id: number) => {
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

    const viewDetails = (id: number) => {
        props.viewRecordDetailsHandler(id)
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
        editBordereauHandler,
        deleteBordereauHandler,
        changeIsActiveStatus,
        viewDetails,
        viewRecordHistory,
        onChangeTable
    }
}

export default BordereauTableHook
