
import { useEffect, useState, useContext } from "react";
import FieldStatusApi from "../../../../../controler/services/fieldStatus/apiRequest";
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";

function Tab4_TableHook(props: any) {

    const context = useContext(FieldStatusContext)

    const [selectedRowId, setSelectedRowId] = useState(0);

    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [companyId, setCompanyId] = useState(0);
    const [requestFilterAgain, setRequestFilterAgain] = useState(false);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [finalFIlterData, setFinalFIlterData] = useState<any[]>([]);

    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false)
    const [confirmationType, setConfirmationType] = useState("")

    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
    });

    let filterdata: any[] = [];


    useEffect(() => {
        setTableData()
    }, [context.tableResult])


    const setTableData = () => {
        setTotalCount(context.tableResult?.TotalCount);
        setPageCount(context.tableResult?.TotalCount);
        // console.log(response, "response")

        filterdata = context.tableResult?.Result?.map((record: any) => {
            let obj = {
                key: record?.Id,
                id: record?.Id,
                groupFieldOfInsuranceCompany: record?.GroupFieldOfInsuranceCompany,
                fieldOfInsuranceCompany: record?.FieldOfInsuranceCompany,
                codeFieldOfInsuranceCompany: record?.CodeFieldOfInsuranceCompany,
                companyId: record?.CompanyId,
                subFieldCode: record?.SubFieldCode,
            };
            return obj;
        });
        setFinalFIlterData(filterdata);
    }


    // useEffect(() => {
    //     if (props?.isDateFilter) {
    //         setCurrent(props?.dateFilterObj.pageIndex);
    //         setCompanyId(props?.dateFilterObj.cmpCod);
    //         setRequestFilterAgain(!requestFilterAgain);
    //     }
    // }, [props?.shoudFilterDateAgain])






    const onRowSelection = (selectedRow: any) => {
        setSelectedRowId(selectedRow.id);
    };

    const viewRecordHistory = (id: number) => {
        props.viewRecordHistory(id)
    };

    const editFieldStatusHandler = (id: number) => {
        props.editRecordHandler(id)
    };

    const viewDetails = (id: number) => {
        props.viewRecordDetailsHandler(id)
    };

    const deleteFieldStatusHandler = (id: number) => {
        props.deleteRecordHandler(id)
    };

    const changeStatus = (id: number) => {
        setVisibleConfirmModal(true)
        setConfirmationType("sendToRecheck")
    };

    const onSetVisibleConfirmModal = (state: boolean) => {
        setVisibleConfirmModal(state)
    }

    return {
        current,
        pageModel,
        totalCount,
        pageCount,
        isLoadingTable,
        filterdata,
        finalFIlterData,
        selectedRowId,
        visibleConfirmModal,
        confirmationType,
        onRowSelection,
        editFieldStatusHandler,
        deleteFieldStatusHandler,
        viewDetails,
        viewRecordHistory,
        changeStatus,
        onSetVisibleConfirmModal
    }
}

export default Tab4_TableHook
