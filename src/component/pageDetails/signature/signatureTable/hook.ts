
import { useEffect, useState, useContext } from "react";
import SignatureApi from "../../../../controler/services/signature/apiRequest";
import { Base64ToArrayBuffer } from 'sanhab-components-library'
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function SignatureTableHook(props: any) {

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
    const [requestFilterAgain, setRequestFilterAgain] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);

    const [isLvlOneExcelLoading, setIsLvlOneExcelLoading] = useState(false);

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
            const fileBlob = new Blob([Base64ToArrayBuffer(record?.file?.FileContents)], { type: record?.file?.FileContentType });
            const url = window.URL.createObjectURL(fileBlob);
            let obj = {
                key: record?.Id,
                id: record?.Id,
                department: record?.Department,
                name: record?.Name,
                countOfSecondSignatory: record?.CountOfSecondSignatory,
                regDate: record?.RegDate,
                file: url
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
            const fileBlob = new Blob([Base64ToArrayBuffer(record?.file?.FileContents)], { type: record?.file?.FileContentType });
            const url = window.URL.createObjectURL(fileBlob);
            let obj = {
                key: record?.Id,
                id: record?.Id,
                companyId: record?.CompanyId,
                name: record?.Name,
                file: url,
                signatureId: record?.SignatureId
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
                SignatureApi.AllPaged({
                    pageIndex: current,
                    firstPageSize: pageModel.pageSize,
                    rowsPerPage: pageModel.pageSize,
                    orderBy:sorter.orderBy,
                    isDescending:sorter.isDescending
                }).then(response => {
                    setTableData(response)
                    globalContext.onResubmitFilter(false);
                })
                .finally(()=>{
                    setIsLoadingTable(false)
                    setIsFirstLoad(false)
                })
            }
            else {

                SignatureApi.AdvancedSearch({
                    pageSize: pageModel.pageSize,
                    pageIndex: currentPage,
                    firstPageSize: pageModel.pageSize,
                    orderBy: sorter.orderBy === null || sorter.orderBy === undefined ? "Id" :  sorter.isDescending === true ? `${sorter.orderBy} DESC` : `${sorter.orderBy}`,
                    parentId:0,
                    filters: globalContext.submittedFilters
                }).then(response => {

                    setTotalCount(response?.data?.TotalCount);
                    setPageCount(response?.data?.TotalCount);
                    // setTableData(response)
                    filterdata = response?.data?.Result?.map((record: any) => {
                        const fileBlob = new Blob([Base64ToArrayBuffer(record?.file?.FileContents)], { type: record?.file?.FileContentType });
                            const url = window.URL.createObjectURL(fileBlob);
                            let obj = {
                                key: record?.Id,
                                id: record?.Id,
                                department: record?.Department,
                                name: record?.Name,
                                countOfSecondSignatory: record?.CountOfSecondSignatory,
                                regDate: record?.RegDate,
                                file: url
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
        //props.reloadFisrtTable()

    };

    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.id);
        setSelectedRow(selectedRow)
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };

    const viewInnerTableTotalHistory = () => {
        props.viewInnerTableTotalHistory()
    };

    const editSignatureHandler = (id: number) => {
        props.editRecordHandler({ id })
    };

    const updateSignatureImageHandler = (id: number, isChild: boolean) => {
        props.updateSignatureImageHandler(id, isChild)
    };

    const addSecondSignatureHandler = (id: number, departmentId: number) => {
        props.addSecondSignatureHandler(id, departmentId)
    };

    const editSecondSignatureHandler = (id: number, parentId: number, departmentId: number) => {
        props.editSecondSignatureHandler(id, parentId, departmentId)
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

    const showFullSizeImage = (id: number) => {
        props.showFullSizeImage(id)
    };




    const openCopyModal = (parentId: number) => {
        // SignatureApi.GetDetailForCopy({ id: parentId, companyId: selectedRow.companyId }).then((response) => {
        //     props.openCopyModal(parentId, selectedRow.companyId, response?.data?.Result)
        // })
    }

    const getLvlOneExcelReport = (id: number) => {
        console.log("id ", id)
        setIsLvlOneExcelLoading(true);
        SignatureApi.GetLvlOneExcelReport({ id })
            .finally(() =>
                setIsLvlOneExcelLoading(false)
            )
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
        currentFirstLvl,
        pageModel,
        pageModelFirstLvl,
        totalCount,
        totalCountFirstLvl,
        pageCount,
        isLoadingTable,
        //columns,
        filterdata,
        filterdataFisrt,
        finalFIlterData,
        selectedRow,
        finalFIlterDataFisrt,
        isLvlOneExcelLoading,
        childSorter,
        changePageHandler,
        changePageHandlerFirst,
        onRowSelection,
        editSignatureHandler,
        deleteRecordHandler,
        viewDetails,
        viewRecordHistory,
        openCopyModal,
        setFirstTableData,
        updateSignatureImageHandler,
        addSecondSignatureHandler,
        editSecondSignatureHandler,
        showFullSizeImage,
        getLvlOneExcelReport,
        onSetCurrentFirst,
        onChangeTable,
        onChangeChildTable,
        viewInnerTableTotalHistory
    }
}

export default SignatureTableHook
