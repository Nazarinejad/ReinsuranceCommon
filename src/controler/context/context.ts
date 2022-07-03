import React from "react";
import { IGlobalContext } from "./models";
interface columnTitles {
    name: string
    type: string
    persianName:string
}
interface filter {
    propertyName: string
    operator: number
    value: string
    operand: 0 | 1
    isOpenGroup: boolean
    isCloseGroup: boolean
}

const initialValue: IGlobalContext = {
    filters: [],
    columnTitles:[],
    submittedFilters:[],
    isAdvancedSearch:false,
    shouldMakeAdvancedSearchAgain:false,
    activeCollapsiblePanel:[],
    isFilterResubmitted:false,
    //child
    childFilters: [],
    childColumnTitles:[],
    childSubmittedFilters:[],
    childIsAdvancedSearch:false,
    childShouldMakeAdvancedSearchAgain:false,
    childActiveCollapsiblePanel:[],
    childIsFilterResubmitted:false,
    //secondChild
    secondChildFilters: [],
    secondChildColumnTitles:[],
    secondChildSubmittedFilters:[],
    secondChildIsAdvancedSearch:false,
    secondChildShouldMakeAdvancedSearchAgain:false,
    secondChildActiveCollapsiblePanel:[],
    secondChildIsFilterResubmitted:false,
    setFilterValues: (columnName: string, filterType: number, filterText: string) => { },
    setAdvancedsearchTitles: (advancedsearchTitles:columnTitles[]) => { },
    onSetSubmittedFilters: (filterList:filter[]) => { },
    onSetIsAdvancedSearch: (hasFilter:boolean) => { },
    searchAgain: () => { },
    onChangeActiveCollapsiblePanel: () => { },
    onResubmitFilter: (isResubmitted:boolean) => { },
    resetFilterValues: () => { },
    closeCollapsiblePanel: () => { },
    //child
    childSetFilterValues: (columnName: string, filterType: number, filterText: string) => { },
    childSetAdvancedsearchTitles: (advancedsearchTitles:columnTitles[]) => { },
    childOnSetSubmittedFilters: (filterList:filter[]) => { },
    childOnSetIsAdvancedSearch: (hasFilter:boolean) => { },
    childSearchAgain: () => { },
    childOnChangeActiveCollapsiblePanel: () => { },
    childOnResubmitFilter: (isResubmitted:boolean) => { },
    childResetFilterValues: () => { },
    childCloseCollapsiblePanel: () => { },
    //secondChild
    secondChildSetFilterValues: (columnName: string, filterType: number, filterText: string) => { },
    secondChildSetAdvancedsearchTitles: (advancedsearchTitles:columnTitles[]) => { },
    secondChildOnSetSubmittedFilters: (filterList:filter[]) => { },
    secondChildOnSetIsAdvancedSearch: (hasFilter:boolean) => { },
    secondChildSearchAgain: () => { },
    secondChildOnChangeActiveCollapsiblePanel: () => { },
    secondChildOnResubmitFilter: (isResubmitted:boolean) => { },
    secondChildResetFilterValues: () => { },
    secondChildCloseCollapsiblePanel: () => { },
}

const GlobalContext = React.createContext<IGlobalContext>(initialValue)

export default GlobalContext