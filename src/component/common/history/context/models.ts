import React from 'react'

interface IHistoryContextStoreProps {
    children: React.ReactChild
}


interface filter {
    propertyName: string
    operator: number
    value: string
}
interface columnTitles {
    name: string
    type: string
    component?: React.ReactChild
    persianName: string
}

export interface IHistoryContext {
    filters: filter[]
    columnTitles: columnTitles[],
    submittedFilters: filter[],
    isAdvancedSearch: boolean,
    shouldMakeAdvancedSearchAgain: boolean,
    activeCollapsiblePanel: string[],
    isFilterResubmitted: boolean,
    recordId: number,
    setFilterValues: (columnName: string, filterType: number, filterText: string) => void
    setAdvancedsearchTitles: (advancedsearchTitles: columnTitles[]) => void
    onSetSubmittedFilters: (filterList: filter[]) => void
    onSetIsAdvancedSearch: (hasFilter: boolean) => void
    searchAgain: () => void
    onChangeActiveCollapsiblePanel: () => void
    onResubmitFilter: (isResubmitted: boolean) => void
    resetFilterValues: () => void
    closeCollapsiblePanel: () => void
    onSetRecordId: (recordId: number) => void
}

export default IHistoryContextStoreProps