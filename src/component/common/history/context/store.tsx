import React, { useEffect, useState } from "react";
import HistoryContext from "./context";
import IHistoryContextStoreProps from "./models";
import { Select } from "antd";
const { Option } = Select;


interface filter {
    propertyName: string
    operator: number
    value: string
}
interface columnTitles {
    name: string
    type: string
    persianName: string
    component?: React.ReactChild
}

const HistoryContextStore = ({ children }: IHistoryContextStoreProps) => {

    const [recordId, setRecordId] = useState<number>(0);

    const [filters, setFilters] = useState<filter[]>([]);
    const [submittedFilters, setSubmittedFilters] = useState<filter[]>([])
    const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false)
    const [shouldMakeAdvancedSearchAgain, setShouldMakeAdvancedSearchAgain] = useState<boolean>(false)
    const [activeCollapsiblePanel, setActiveCollapsiblePanel] = useState<string[]>([])
    const [isFilterResubmitted, setIsFilterResubmitted] = useState<boolean>(false)
    const [columnTitles, setColumnTitles] = useState<columnTitles[]>([

        {
            name: "UserName",
            type: "string",
            persianName: "توسط "
        },
        {
            name: "Date",
            type: "date",
            persianName: "تاریخ عملیات"
        },
        {
            name: "EventType",
            type: "component",
            persianName: "عملیات",
            component: <Select placeholder="انتخاب کنید">
                <Option value={1}> ایجاد</Option>
                <Option value={2}> ویرایش</Option>
                <Option value={3}> حذف</Option>
                <Option value={4}> معادل سازی</Option>
                <Option value={5}> تایید</Option>
                <Option value={6}> عدم تایید</Option>
                <Option value={7}> کپی</Option>
                <Option value={8}> حذف چندتایی</Option>
                <Option value={9}> ارسال به تب بررسی بیمه مرکزی</Option>
                <Option value={10}> ارسال به تب ثبت شرکت بیمه</Option>
                <Option value={11}> فعال یا غیرفعال</Option>
                <Option value={12}> ویرایش خسارت معوق</Option>
            </Select>
        }
    ]);



    useEffect(() => {
        
    }, [])
    const resetFilterValues = () => {
        
        //setColumnTitles([]);
        setActiveCollapsiblePanel([]);
        setSubmittedFilters([]);
        setIsAdvancedSearch(false);
        setShouldMakeAdvancedSearchAgain(false);
        setIsFilterResubmitted(false);
    }

    const setFilterValues = (columnName: string, filterType: number, filterText: string) => {
        let filterList = [...filters];
        let sameColumnName = filterList.find(obj => {
            return obj.propertyName === columnName
        })
        // if (sameColumnName != undefined && sameColumnName != null) {
        filterList.push({
            propertyName: columnName,
            operator: filterType,
            value: filterText
        })
        // }
    }

    const setAdvancedsearchTitles = (advancedsearchTitles: columnTitles[]) => {
        setColumnTitles(advancedsearchTitles)
    }

    const onSetSubmittedFilters = (filterList: filter[]) => {
        setSubmittedFilters(filterList)
    }

    const onSetIsAdvancedSearch = (hasFilter: boolean) => {
        setIsAdvancedSearch(hasFilter)
    }

    const searchAgain = () => {
        setShouldMakeAdvancedSearchAgain(!shouldMakeAdvancedSearchAgain)
    }

    const onChangeActiveCollapsiblePanel = () => {
        console.log("activeCollapsiblePanel", activeCollapsiblePanel);

        if (activeCollapsiblePanel.find(item => item === '10')) {
            setActiveCollapsiblePanel([])
        }
        else setActiveCollapsiblePanel(['10'])
    }

    const closeCollapsiblePanel = () => {
        setActiveCollapsiblePanel([])
    }

    const onResubmitFilter = (isResubmitted: boolean) => {
        setIsFilterResubmitted(isResubmitted)
    }

    const onSetRecordId = (id: number) => {
        setRecordId(id)
    }

    const getProviderValue = () => {
        return {
            filters,
            columnTitles,
            submittedFilters,
            isAdvancedSearch,
            shouldMakeAdvancedSearchAgain,
            activeCollapsiblePanel,
            isFilterResubmitted,
            recordId,
            onChangeActiveCollapsiblePanel,
            setFilterValues,
            setAdvancedsearchTitles,
            onSetSubmittedFilters,
            onSetIsAdvancedSearch,
            searchAgain,
            onResubmitFilter,
            resetFilterValues,
            closeCollapsiblePanel,
            onSetRecordId
        }
    }

    return (
        <HistoryContext.Provider value={getProviderValue()}>
            {children}
        </HistoryContext.Provider>
    );
}


export default HistoryContextStore
