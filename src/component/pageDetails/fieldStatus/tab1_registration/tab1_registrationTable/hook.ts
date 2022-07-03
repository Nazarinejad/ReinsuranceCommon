
import { useEffect, useState, useContext } from "react";
import FieldStatusContext from "../../../../pages/fieldStatus/context/context";

function Tab1_TableHook(props: any) {

    const context = useContext(FieldStatusContext)

    const [selectedRowId, setSelectedRowId] = useState(0);

    const [current, setCurrent] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [isLoadingTable, setIsLoadingTable] = useState(false);
    const [finalFIlterData, setFinalFIlterData] = useState<any[]>([]);
    const [pageModel, setPageModel] = useState({
        pageSize: 10,
        firstPageSize: 10
    });
    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false)
    const [confirmationType, setConfirmationType] = useState("")


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
                companyId: record?.CompanyId
            };
            return obj;
        });
        setFinalFIlterData(filterdata);
    }


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
        setConfirmationType("sendToCheck")
    };


    const onSetVisibleConfirmModal = (state:boolean) => {
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
        onSetVisibleConfirmModal,
    }
}

export default Tab1_TableHook
