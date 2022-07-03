
import { useEffect, useState, useContext } from "react";
import MandatoryApi from "../../../../controler/services/mandatory/apiRequest";
import { Notification } from 'sanhab-components-library'
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'
import FiscalPeriod from "../../../pages/fiscalPeriod";

function MandatoryTableHook(props: any) {

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
    const [pageCountFirstLvl, setPageCountFirstLvl] = useState(0);
    const [currentSecondLvl, setCurrentSecondLvl] = useState(1);
    const [totalCountSecondLvl, setTotalCountSecondLvl] = useState(0);
    const [pageCountSecondLvl, setPageCountSecondLvl] = useState(0);
    const [pageCount, setPageCount] = useState(0);
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
    const [finalFIlterDataSecond, setFinalFIlterDataSecond] = useState<any[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
    });
    const [pageModelFirstLvl, setPageModelFirstLvl] = useState({
        pageSize: 10,
        firstPageSize: 10
    });
    const [pageModelSecondLvl, setPageModelSecondLvl] = useState({
        pageSize: 10,
        firstPageSize: 10
    });

    const [sorter, setSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });
    
    const [lvlOneSorter, setLvlOneSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });
    
    const [lvlTwoSorter, setLvlTwoSorter] = useState<any>({
        orderBy:null,
        isDescending:null
    });

    const [isLvlOneExcelLoading, setIsLvlOneExcelLoading] = useState(false);
    const [isLvlTwoExcelLoading, setIsLvlTwoExcelLoading] = useState(false);

    let filterdata: any[] = [];
    let filterdataFisrt: any[] = [];
    let filterdataSecond: any[] = [];

    const setTableData = (response: any) => {
        setTotalCount(response?.data?.TotalCount);
        setPageCount(response?.data?.TotalCount);

        filterdata = response?.data?.Result?.map((record: any) => {
            let obj = {
                key: record?.CompanyId,
                id: record?.Id,
                companyId: record?.CompanyId,
                fiscalYearId: record?.FiscalyearId,
                lastUpdateDate: record?.LastUpdateDate
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
                key: record?.FiscalYearId,
                id: record?.Id,
                companyIdLvlOne: record?.CompanyId,
                fiscalYear: record?.FiscalYear,
                fiscalYearId: record?.FiscalYearId
            };
            return obj;
        });
        setFinalFIlterDataFisrt(filterdataFisrt);
    }

    const setSecondTableData = (response: any) => {
        setTotalCountSecondLvl(response?.data?.TotalCount);
        setPageCountSecondLvl(response?.data?.TotalCount);

        filterdataSecond = response?.data?.Result?.map((record: any) => {
            
            let obj = {
                key: record?.MandatoryRelianceInformationSubFieldId,
                id: record?.MandatoryRelianceInformationSubFieldId,
                parentId: record?.Id,
                companyId: record?.CompanyId,
                fiscalyearId: record?.FiscalYearId,
                fieldId: record?.FieldId,
                subFieldId: record?.SubFieldId,
                tAX: record?.TAXPercentage,
                subFieldCode: record?.SubFieldCode
            };
            return obj;
        });
        setFinalFIlterDataSecond(filterdataSecond);
    }

    useEffect(() => {
        setIsLoadingTable(true);
        setTimeout(() => {
            // if (!props.isFiltered) {
            let currentPage = globalContext.isFilterResubmitted ? 1 : current
            setCurrent(currentPage)
            if (!globalContext.isAdvancedSearch || isFirstLoad) {
                MandatoryApi.AllPaged({ 
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
                MandatoryApi.AdvancedSearchFirst({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorter.orderBy === null || sorter.orderBy === undefined ? "Id" :  sorter.isDescending === true ? `${sorter.orderBy} DESC` : `${sorter.orderBy}`,
                    filters: globalContext.submittedFilters
                }).then(response => {

                    setTotalCount(response?.data?.TotalCount);
                    setPageCount(response?.data?.TotalCount);
                    
                    filterdata = response?.data?.Result?.map((record: any) => {
                        let obj = {
                            key: record?.CompanyId,
                            id: record?.Id,
                            companyId: record?.CompanyId,
                            fiscalYearId: record?.FiscalyearId,
                            lastUpdateDate: record?.LastUpdateDate
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

    const changePageHandlerFirst = (current: number, pageSize: any) => {
        setCurrentFirstLvl(current);
        if (pageSize === 0) pageSize = 1;
        setPageModelFirstLvl({
            pageSize: pageSize,
            firstPageSize: pageSize
        })
        //props.reloadFisrtTable()

    };

    const changePageHandlerSecond = (current: number, pageSize: any) => {
        setCurrentSecondLvl(current);
        if (pageSize === 0) pageSize = 1;
        setPageModelSecondLvl({
            pageSize: pageSize,
            firstPageSize: pageSize
        })
        //props.reloadFisrtTable()

    };

    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.id);
        setSelectedRow(selectedRow)
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };
    
    const viewInnerTableRecordHistory = () => {
        props.viewInnerTableTotalHistory()
    };

    const viewRecordLvlTwoHistory = (id: number, parentId: number) => {
        props.viewRecordLvlTwoHistory(id, parentId)
    };

    const editMandatoryHandler = (subfieldId: number, companyId: number, mainParentId: number) => {
        props.editRecordHandler({
            subfieldId,
            companyId,
            mainParentId
        })
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

    const changeIsActiveStatus = (activeStatus: boolean) => {
        MandatoryApi.ActiveOrDeactiveMandatory(
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


    const openCopyModal = (parentId: number) => {
        MandatoryApi.GetDetailForCopy({ id: parentId, companyId: selectedRow.companyId }).then((response) => {
            props.openCopyModal(parentId, selectedRow.companyId, response?.data?.Result)
        })
    }

    const getLvlOneExcelReport = (companyId: number) => {
        console.log("companyId ", companyId)
        setIsLvlOneExcelLoading(true);
        MandatoryApi.GetLvlOneExcelReport({ companyId })
            .finally(() =>
                setIsLvlOneExcelLoading(false)
            )
    }

    const getLvlTwoExcelReport = (companyId: number, fiscalYearId: number) => {
        setIsLvlTwoExcelLoading(true);
        MandatoryApi.GetLvlTwoExcelReport({ companyId, fiscalYearId })
            .finally(() =>
                setIsLvlTwoExcelLoading(false)
            )
    }


    const onSetCurrentFirst = (currentFirst : number) => {
        setCurrentFirstLvl(currentFirst)
    }
    
    const onSetCurrentSecond = (currentSecond : number) => {
        setCurrentSecondLvl(currentSecond)
    }

    function onChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        if(sortObj.orderBy === "FiscalYearId") sortObj.orderBy = "FiscalYear";
        setSorter(sortObj)
        
    }
    
    function onLvlOneChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        if(sortObj.orderBy === "FiscalYearId") sortObj.orderBy = "FiscalYear";
        setLvlOneSorter(sortObj)
        
    }
    
    function onLvlTwoChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        setLvlTwoSorter(sortObj)
        
    }

    return {
        current,
        pageModel,
        totalCount,
        pageCount,
        currentFirstLvl,
        pageModelFirstLvl,
        totalCountFirstLvl,
        finalFIlterDataFisrt,
        currentSecondLvl,
        pageModelSecondLvl,
        totalCountSecondLvl,
        finalFIlterDataSecond,
        isLoadingTable,
        //columns,
        filterdata,
        finalFIlterData,
        selectedRow,
        isLvlOneExcelLoading,
        isLvlTwoExcelLoading,
        lvlOneSorter,
        lvlTwoSorter,
        changePageHandler,
        changePageHandlerFirst,
        changePageHandlerSecond,
        onRowSelection,
        editMandatoryHandler,
        deleteRecordHandler,
        viewDetails,
        changeIsActiveStatus,
        viewRecordHistory,
        viewInnerTableRecordHistory,
        viewRecordLvlTwoHistory,
        openCopyModal,
        setFirstTableData,
        setSecondTableData,
        getLvlOneExcelReport,
        getLvlTwoExcelReport,
        onSetCurrentFirst,
        onSetCurrentSecond,
        onChangeTable,
        onLvlOneChangeTable,
        onLvlTwoChangeTable
    }
}

export default MandatoryTableHook
