import { useState, useEffect } from "react";
import PolicyInquiry from "../../../../controler/services/fiscalPeriod/apiRequest";

function FilterHook(props: any) {


    const [filterType, setFilterType] = useState("selectFilterType")
    const [companyList, setCompanyList] = useState<any[]>([])

    useEffect(() => {
        // PolicyInquiry.CompanyList().then((response)=>{

        // setCompanyList(response?.data?.Result)
        // console.log("response?.Result", response)
        
        // })

    }, [])

    function onChange(value: string) {
        setFilterType(value)

    }

    function goToSelectFilter() {
        setFilterType("selectFilterType");
    }

    function RemoveAllFilters() {
        props.removeFilters();
    }
    //---------------------------------------------filters-------------------------------------------------------

    // -------- insurance code filter----------
    function onFinishInsCode(values: any) {
        props.onLoadingFiltered(true);
        let insCodeObj = {
            plcyUnqCod: values.insCodeInput
        }
        // PolicyInquiry.Find(insCodeObj)
        //     .then((response) => {
        //         props.onChangeFilterData(response?.data?.Result);
        //         props.onLoadingFiltered(false);
        //     })
        //     .catch((response) => {

        //     })
    }

    // -------- passport filter----------
    function onFinishPassport(values: any) {
        props.onLoadingFiltered(true);
        let passportObj = {
            passNo: values.passportInput
        }
        // PolicyInquiry.Find(passportObj)
        //     .then((response) => {
        //         props.onChangeFilterData(response?.data?.Result);
        //         props.onLoadingFiltered(false);
        //     })
        //     .catch((response) => {

        //     })
    }

    // -------- print code filter----------
    function onFinishPrintCode(values: any) {
        props.onLoadingFiltered(true);
        let printCodeObj = {
            prntDocNo: values.printCodeInput,
            cmpCod: values.companyInput
        }
        // PolicyInquiry.Find(printCodeObj)
        //     .then((response) => {
        //         props.onChangeFilterData(response?.data?.Result);
        //         props.onLoadingFiltered(false);
        //     })
        //     .catch((response) => {

        //     })
    }

    // -------- print code filter----------
    function onFinishDate(values: any) {
        let dateObj = {
            pageIndex: 1,
            pageSize: 10,
            cmpCod: values.companyInput,
            fromDate: values.beginDate,
            toDate:values.endDate
        }
        props.onFilterDate(dateObj);
        
    }



    return {
        filterType,
        companyList,
        onChange,
        goToSelectFilter,
        RemoveAllFilters,
        onFinishInsCode,
        onFinishPassport,
        onFinishPrintCode,
        onFinishDate
    }
}

export default FilterHook
