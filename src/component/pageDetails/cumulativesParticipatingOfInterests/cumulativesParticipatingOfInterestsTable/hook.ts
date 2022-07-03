import { useEffect, useState, useContext } from "react";
import CumulativesParticipatingApi from "../../../../controler/services/cumulativesParticipatingOfInterests/apiRequest";
import GlobalContext from '../../../../controler/context/context'
import { OnSortColumn } from '../../../../controler/helper/OnSortColumn'

function CumulativesParticipatingTableHook(props: any) {

    const globalContext = useContext(GlobalContext)

    let now = new Date()
    now.setHours(0, 0, 0, 0);

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


    const [cumulativeRegulationsList, setCumulativeRegulationsList] = useState<any[]>([]);

    let filterdata: any[] = [];

    const setTableData = (response: any) => {
        setTotalCount(response?.data?.TotalCount);
        setPageCount(response?.data?.TotalCount);

        filterdata = response?.data?.Result?.map((record: any) => {
            let obj = {
                key: record?.Id,
                id: record?.Id,
                title: record?.Title,
                printVersionFormat: record?.PrintVersionFormat,
                cumulativeRequlations: record?.CumulativeRequlations,
                percentageOfParticipation: record?.PercentageOfParticipation,
                considerPendingLoss: record?.ConsiderPendingLoss,
            };
            return obj;
        });
        setFinalFIlterData(filterdata);
        setIsLoadingTable(false);
    }

    useEffect(() => {
        setIsLoadingTable(true);

        CumulativesParticipatingApi.GetAllCumulativeRequlations().then((response) => {
            setCumulativeRegulationsList(response?.data?.Result);
            props.getALLCumulativeRegulationsRecords(response)

            setTimeout(() => {
                // if (!props.isFiltered) {
                let currentPage = globalContext.isFilterResubmitted ? 1 : current
                setCurrent(currentPage)
                if (!globalContext.isAdvancedSearch || isFirstLoad) {
                    CumulativesParticipatingApi.AllPaged({
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
                    CumulativesParticipatingApi.AdvancedSearch({
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
                                key: record?.Id,
                                id: record?.Id,
                                title: record?.Title,
                                printVersionFormat: record?.PrintVersionFormat,
                                cumulativeRequlations: record?.CumulativeRequlations,
                                percentageOfParticipation: record?.PercentageOfParticipation,
                                considerPendingLoss: record?.ConsiderPendingLoss,

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
        })



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

    const onRowSelection = (selectedRow: any) => {
        // console.log(selectedRow, "selectedRow");
    };

    const editCumulativesParticipatingHandler = (id: number) => {
        // console.log(id, "selected row id");
        props.editRecordHandler(id)
    };

    const deleteCumulativesParticipatingHandler = (id: number) => {
        props.deleteRecordHandler(id)
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };

    function onChangeTable(pagination: any, filters: any, sorter: any) {
        const sortObj = OnSortColumn(sorter);
        setSorter(sortObj)
        console.log('sortObj', sortObj);

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
        cumulativeRegulationsList,
        changePageHandler,
        onRowSelection,
        editCumulativesParticipatingHandler,
        deleteCumulativesParticipatingHandler,
        viewRecordHistory,
        onChangeTable
    }
}

export default CumulativesParticipatingTableHook
