import React from "react";
import { IHistoryContext } from "./models";
interface columnTitles {
    name: string
    type: string
    persianName: string
}
interface filter {
    propertyName: string
    operator: number
    value: string
}

const initialValue: IHistoryContext = {
    filters: [],
    columnTitles: [],
    submittedFilters: [],
    isAdvancedSearch: false,
    shouldMakeAdvancedSearchAgain: false,
    activeCollapsiblePanel: [],
    isFilterResubmitted: false,
    recordId: 0,
    setFilterValues: (columnName: string, filterType: number, filterText: string) => { },
    setAdvancedsearchTitles: (advancedsearchTitles: columnTitles[]) => { },
    onSetSubmittedFilters: (filterList: filter[]) => { },
    onSetIsAdvancedSearch: (hasFilter: boolean) => { },
    searchAgain: () => { },
    onChangeActiveCollapsiblePanel: () => { },
    onResubmitFilter: (isResubmitted: boolean) => { },
    resetFilterValues: () => { },
    closeCollapsiblePanel: () => { },
    onSetRecordId: (recordId: number) => { },
}

const HistoryContext = React.createContext<IHistoryContext>(initialValue)

export default HistoryContext