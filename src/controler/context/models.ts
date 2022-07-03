import React from 'react'

interface IGlobalContextStoreProps {
    children: React.ReactChild
}


interface filter {
    propertyName: string
    operator: number
    value: string
    operand: 0 | 1
    isOpenGroup: boolean
    isCloseGroup: boolean
}
interface columnTitles {
    name: string
    type: string
    component?: React.ReactChild
    persianName:string
}

export interface IGlobalContext {
    filters: filter[]
    columnTitles: columnTitles[],
    submittedFilters: filter[],
    isAdvancedSearch:boolean,
    shouldMakeAdvancedSearchAgain:boolean,
    activeCollapsiblePanel:string[],
    isFilterResubmitted:boolean,
    //child
    childFilters: filter[]
    childColumnTitles: columnTitles[],
    childSubmittedFilters: filter[],
    childIsAdvancedSearch:boolean,
    childShouldMakeAdvancedSearchAgain:boolean,
    childActiveCollapsiblePanel:string[],
    childIsFilterResubmitted:boolean,
    //secondChild
    secondChildFilters: filter[]
    secondChildColumnTitles: columnTitles[],
    secondChildSubmittedFilters: filter[],
    secondChildIsAdvancedSearch:boolean,
    secondChildShouldMakeAdvancedSearchAgain:boolean,
    secondChildActiveCollapsiblePanel:string[],
    secondChildIsFilterResubmitted:boolean,
    setFilterValues: (columnName: string, filterType: number, filterText: string) => void
    setAdvancedsearchTitles: (advancedsearchTitles: columnTitles[]) => void
    onSetSubmittedFilters: (filterList: filter[]) => void
    onSetIsAdvancedSearch: (hasFilter: boolean) => void
    searchAgain: () => void
    onChangeActiveCollapsiblePanel: () => void
    onResubmitFilter: (isResubmitted:boolean) => void
    resetFilterValues: () => void
    closeCollapsiblePanel: () => void
    //child
    childSetFilterValues: (columnName: string, filterType: number, filterText: string) => void
    childSetAdvancedsearchTitles: (advancedsearchTitles: columnTitles[]) => void
    childOnSetSubmittedFilters: (filterList: filter[]) => void
    childOnSetIsAdvancedSearch: (hasFilter: boolean) => void
    childSearchAgain: () => void
    childOnChangeActiveCollapsiblePanel: () => void
    childOnResubmitFilter: (isResubmitted:boolean) => void
    childResetFilterValues: () => void
    childCloseCollapsiblePanel: () => void
    //secondChild
    secondChildSetFilterValues: (columnName: string, filterType: number, filterText: string) => void
    secondChildSetAdvancedsearchTitles: (advancedsearchTitles: columnTitles[]) => void
    secondChildOnSetSubmittedFilters: (filterList: filter[]) => void
    secondChildOnSetIsAdvancedSearch: (hasFilter: boolean) => void
    secondChildSearchAgain: () => void
    secondChildOnChangeActiveCollapsiblePanel: () => void
    secondChildOnResubmitFilter: (isResubmitted:boolean) => void
    secondChildResetFilterValues: () => void
    secondChildCloseCollapsiblePanel: () => void
}

export default IGlobalContextStoreProps