
import { useEffect, useState, useContext } from "react";
import FieldApi from "../../../../controler/services/field/apiRequest";
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function FieldTableHook(props: any) {
    const globalContext = useContext(GlobalContext)

    let now = new Date()
    now.setHours(0, 0, 0, 0);
    let today = now.toISOString();
    let last30days = new Date(now.setDate(now.getDate() - 30)).toISOString()

    const [selectedRowId, setSelectedRowId] = useState(0);

    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [currentFirstLvl, setCurrentFirstLvl] = useState(1);
    const [totalCountFirstLvl, setTotalCountFirstLvl] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageCountFirstLvl, setPageCountFirstLvl] = useState(0);
    const [companyId, setCompanyId] = useState(0);
    const [fromDate, setFromDate] = useState(last30days);
    const [toDate, setToDate] = useState(today);
    const [requestFilterAgain, setRequestFilterAgain] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [selectedRow, setSelectedRow] = useState({
        companyId: 0,
        fiscalYearId: 0,
        id: 0,
        key: 0,
        lastUpdateDate: ""
    });
    const [finalFIlterData, setFinalFIlterData] = useState<any[]>([]);
    const [finalFIlterDataFisrt, setFinalFIlterDataFisrt] = useState<any[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
    });
    const [pageModelFirstLvl, setPageModelFirstLvl] = useState({
        pageSize: 10,
        firstPageSize: 10
    });

    const [sorter, setSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });
    
    const [childSorter, setChildSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });

    let filterdata: any[] = [];
    let filterdataFisrt: any[] = [];

    const setTableData = (response: any) => {
        setTotalCount(response?.data?.TotalCount);
        setPageCount(response?.data?.TotalCount);

        filterdata = response?.data?.Result?.map((record: any) => {
            let obj = {
                key: record?.FieldId,
                fieldId: record?.FieldId,
                title: record?.Title
            };
            return obj;
        });
        setFinalFIlterData(filterdata);
        setIsLoadingTable(false);
    }

    const setFirstTableData = (response: any) => {
        setTotalCountFirstLvl(response?.data?.TotalCount);
        setPageCountFirstLvl(response?.data?.TotalCount);

        filterdataFisrt = response?.data?.Result?.map((record: any) => {
            
            let obj = {
                key: record?.Id,
                id: record?.Id,
                subFieldCode: record?.SubFieldCode,
                subFieldTitle: record?.SubFieldTitle,
                accountingCode: record?.AccountingCode,
                isActive: record?.IsActive,
                cumulativeParticipatingOfInterestsId: record?.CumulativeParticipatingOfInterestsId,
                failureToCalculateReserves: record?.FailureToCalculateReserves,
                noLossRatio: record?.NoLossRatio,
                description: record?.Description,
                department: record?.Department,
            };
            return obj;
        });
        setFinalFIlterDataFisrt(filterdataFisrt);
    }

    useEffect(() => {
        setIsLoadingTable(true);
        setTimeout(() => {
            // if (!props.isFiltered) {
            let currentPage = globalContext.isFilterResubmitted ? 1 : current
            setCurrent(currentPage)
            if (!globalContext.isAdvancedSearch || isFirstLoad) {
                FieldApi.AllPaged({
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
                FieldApi.AdvancedSearch({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorter.orderBy === null || sorter.orderBy === undefined ? "FieldId" :  sorter.isDescending === true ? `${sorter.orderBy} DESC` : `${sorter.orderBy}`,
                    filters: globalContext.submittedFilters
                }).then(response => {

                    setTotalCount(response?.data?.TotalCount);
                    setPageCount(response?.data?.TotalCount);
                    // setTableData(response)
                    filterdata = response?.data?.Result?.map((record: any) => {
                        let obj = {
                            key: record?.FieldId,
                            id: record?.FieldId,
                            title: record?.Title
                        };
                        return obj;
                    });
                    setFinalFIlterData(filterdata);
                })
                .finally(()=>{
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

    const changePageHandlerFirst = (current: number, pageSize: any) => {
        setCurrentFirstLvl(current);
        if (pageSize === 0) pageSize = 1;
        setPageModelFirstLvl({
            pageSize: pageSize,
            firstPageSize: pageSize
        })

    };
    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.fieldId);
        setSelectedRow(selectedRow)
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };
    
    const viewInnerTableTotalHistory = () => {
        props.viewInnerTableTotalHistory()
    };

    const editFieldHandler = (id: number) => {
        props.editRecordHandler({ id })
    };

    const viewDetails = (subfieldId: number, companyId: number, mainParentId: number) => {
        props.viewRecordDetailsHandler({
            subfieldId,
            companyId,
            mainParentId
        })
    };

    const deleteRecordHandler = (recordId: number, parentId: number) => {
        props.deleteRecordHandler(recordId, parentId)
    };

    const deleteRangeHandler = (id: number) => {
        props.deleteRangeHandler(id)
    };




    const openCopyModal = (parentId: number) => {
        // FieldApi.GetDetailForCopy({ id: parentId, companyId: selectedRow.companyId }).then((response) => {
        //     props.openCopyModal(parentId, selectedRow.companyId, response?.data?.Result)
        // })
    }


    const onSetCurrentFirst = (currentFirst : number) => {
        setCurrentFirstLvl(currentFirst)
    }

    function onChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        setSorter(sortObj)
        
    }
    
    function onChangeChildTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        setChildSorter(sortObj)
        
    }
    
    return {
        current,
        pageModel,
        totalCount,
        pageCount,
        currentFirstLvl,
        pageModelFirstLvl,
        totalCountFirstLvl,
        isLoadingTable,
        //columns,
        filterdata,
        finalFIlterData,
        selectedRow,
        finalFIlterDataFisrt,
        childSorter,
        changePageHandler,
        onRowSelection,
        editFieldHandler,
        deleteRecordHandler,
        viewDetails,
        viewRecordHistory,
        openCopyModal,
        onSetCurrentFirst,
        setFirstTableData,
        changePageHandlerFirst,
        onChangeTable,
        onChangeChildTable,
        viewInnerTableTotalHistory
    }
}

export default FieldTableHook
