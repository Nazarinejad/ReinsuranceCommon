import React, { useState } from "react";
import GlobalContext from "./context";
import IGlobalContextStoreProps from "./models";


interface filter {
    propertyName: string
    operator: number
    value: string
    operand: 0 | 1
    isOpenGroup: boolean
    isCloseGroup: boolean
}
interface columnTitles {
    name:string
    type:string
    persianName:string
}

const GlobalContextStore = ({ children }: IGlobalContextStoreProps) => {

    const [filters, setFilters] = useState<filter[]>([]);
    const [columnTitles, setColumnTitles] = useState<columnTitles[]>([]);
    const [submittedFilters, setSubmittedFilters] = useState<filter[]>([])
    const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false)
    const [shouldMakeAdvancedSearchAgain, setShouldMakeAdvancedSearchAgain] = useState<boolean>(false)
    const [activeCollapsiblePanel, setActiveCollapsiblePanel] = useState<string[]>([])
    const [isFilterResubmitted, setIsFilterResubmitted] = useState<boolean>(false)
    //child
    const [childFilters, setChildFilters] = useState<filter[]>([]);
    const [childColumnTitles, setChildColumnTitles] = useState<columnTitles[]>([]);
    const [childSubmittedFilters, setChildSubmittedFilters] = useState<filter[]>([])
    const [childIsAdvancedSearch, setChildIsAdvancedSearch] = useState<boolean>(false)
    const [childShouldMakeAdvancedSearchAgain, setChildShouldMakeAdvancedSearchAgain] = useState<boolean>(false)
    const [childActiveCollapsiblePanel, setChildActiveCollapsiblePanel] = useState<string[]>([])
    const [childIsFilterResubmitted, setChildIsFilterResubmitted] = useState<boolean>(false)
    //secondChild
    const [secondChildFilters, setSecondChildFilters] = useState<filter[]>([]);
    const [secondChildColumnTitles, setSecondChildColumnTitles] = useState<columnTitles[]>([]);
    const [secondChildSubmittedFilters, setSecondChildSubmittedFilters] = useState<filter[]>([])
    const [secondChildIsAdvancedSearch, setSecondChildIsAdvancedSearch] = useState<boolean>(false)
    const [secondChildShouldMakeAdvancedSearchAgain, setSecondChildShouldMakeAdvancedSearchAgain] = useState<boolean>(false)
    const [secondChildActiveCollapsiblePanel, setSecondChildActiveCollapsiblePanel] = useState<string[]>([])
    const [secondChildIsFilterResubmitted, setSecondChildIsFilterResubmitted] = useState<boolean>(false)

    const resetFilterValues = () => {
        //setColumnTitles([]);
        setActiveCollapsiblePanel([]);
        setSubmittedFilters([]);
        setIsAdvancedSearch(false);
        setShouldMakeAdvancedSearchAgain(false);
        setIsFilterResubmitted(false);
    }

    const setFilterValues = (columnName: string, filterType: number, filterText: string) => {
        // let filterList = [...filters];
        // let sameColumnName = filterList.find(obj => {
        //     return obj.propertyName === columnName
        // })
        // // if (sameColumnName != undefined && sameColumnName != null) {
        //     filterList.push({
        //         propertyName: columnName,
        //         operator: filterType,
        //         value: filterText
        //     })
        // // }
    }
    
    const setAdvancedsearchTitles = (advancedsearchTitles:columnTitles[]) => {
        setColumnTitles(advancedsearchTitles)
    }
    
    const onSetSubmittedFilters = (filterList:filter[]) => {
        setSubmittedFilters(filterList)
    }
    
    const onSetIsAdvancedSearch = (hasFilter:boolean) => {
        setIsAdvancedSearch(hasFilter)
    }
    
    const searchAgain = () => {
        setShouldMakeAdvancedSearchAgain(!shouldMakeAdvancedSearchAgain)
    }
    
    const onChangeActiveCollapsiblePanel = () => {
        if(activeCollapsiblePanel.find(item => item === '1')) 
        {
            setActiveCollapsiblePanel([])
        }
        else setActiveCollapsiblePanel(['1'])
    }

    const closeCollapsiblePanel = () => {
        setActiveCollapsiblePanel([])
    }

    const onResubmitFilter = (isResubmitted:boolean) => {
        setIsFilterResubmitted(isResubmitted)
    }



    //----------------------------child-----------------------------
    const childResetFilterValues = () => {
        //setColumnTitles([]);
        setChildActiveCollapsiblePanel([]);
        setChildSubmittedFilters([]);
        setChildIsAdvancedSearch(false);
        setChildShouldMakeAdvancedSearchAgain(false);
        setChildIsFilterResubmitted(false);
    }

    const childSetFilterValues = (columnName: string, filterType: number, filterText: string) => {
        // let filterList = [...childFilters];
        // let sameColumnName = filterList.find(obj => {
        //     return obj.propertyName === columnName
        // })
        // // if (sameColumnName != undefined && sameColumnName != null) {
        //     filterList.push({
        //         propertyName: columnName,
        //         operator: filterType,
        //         value: filterText
        //     })
        // // }
    }
    
    const childSetAdvancedsearchTitles = (advancedsearchTitles:columnTitles[]) => {
        setChildColumnTitles(advancedsearchTitles)
    }
    
    const childOnSetSubmittedFilters = (filterList:filter[]) => {
        setChildSubmittedFilters(filterList)
    }
    
    const childOnSetIsAdvancedSearch = (hasFilter:boolean) => {
        setChildIsAdvancedSearch(hasFilter)
    }
    
    const childSearchAgain = () => {
        setChildShouldMakeAdvancedSearchAgain(!childShouldMakeAdvancedSearchAgain)
    }
    
    const childOnChangeActiveCollapsiblePanel = () => {
        if(childActiveCollapsiblePanel.find(item => item === '2')) 
        {
            setChildActiveCollapsiblePanel([])
        }
        else setChildActiveCollapsiblePanel(['2'])
    }

    const childCloseCollapsiblePanel = () => {
        setChildActiveCollapsiblePanel([])
    }

    const childOnResubmitFilter = (isResubmitted:boolean) => {
        setChildIsFilterResubmitted(isResubmitted)
    }


    //----------------------------second child-----------------------------
    const secondChildResetFilterValues = () => {
        //setColumnTitles([]);
        setSecondChildActiveCollapsiblePanel([]);
        setSecondChildSubmittedFilters([]);
        setSecondChildIsAdvancedSearch(false);
        setSecondChildShouldMakeAdvancedSearchAgain(false);
        setSecondChildIsFilterResubmitted(false);
    }

    const secondChildSetFilterValues = (columnName: string, filterType: number, filterText: string) => {
        // let filterList = [...secondChildFilters];
        // let sameColumnName = filterList.find(obj => {
        //     return obj.propertyName === columnName
        // })
        // // if (sameColumnName != undefined && sameColumnName != null) {
        //     filterList.push({
        //         propertyName: columnName,
        //         operator: filterType,
        //         value: filterText
        //     })
        // // }
    }
    
    const secondChildSetAdvancedsearchTitles = (advancedsearchTitles:columnTitles[]) => {
        setSecondChildColumnTitles(advancedsearchTitles)
    }
    
    const secondChildOnSetSubmittedFilters = (filterList:filter[]) => {
        setSecondChildSubmittedFilters(filterList)
    }
    
    const secondChildOnSetIsAdvancedSearch = (hasFilter:boolean) => {
        setSecondChildIsAdvancedSearch(hasFilter)
    }
    
    const secondChildSearchAgain = () => {
        setSecondChildShouldMakeAdvancedSearchAgain(!secondChildShouldMakeAdvancedSearchAgain)
    }
    
    const secondChildOnChangeActiveCollapsiblePanel = () => {
        if(secondChildActiveCollapsiblePanel.find(item => item === '3')) 
        {
            setSecondChildActiveCollapsiblePanel([])
        }
        else setSecondChildActiveCollapsiblePanel(['3'])
    }

    const secondChildCloseCollapsiblePanel = () => {
        setSecondChildActiveCollapsiblePanel([])
    }

    const secondChildOnResubmitFilter = (isResubmitted:boolean) => {
        setSecondChildIsFilterResubmitted(isResubmitted)
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
            //child
            childFilters,
            childColumnTitles,
            childSubmittedFilters,
            childIsAdvancedSearch,
            childShouldMakeAdvancedSearchAgain,
            childActiveCollapsiblePanel,
            childIsFilterResubmitted,
            //secondChild
            secondChildFilters,
            secondChildColumnTitles,
            secondChildSubmittedFilters,
            secondChildIsAdvancedSearch,
            secondChildShouldMakeAdvancedSearchAgain,
            secondChildActiveCollapsiblePanel,
            secondChildIsFilterResubmitted,
            onChangeActiveCollapsiblePanel,
            setFilterValues,
            setAdvancedsearchTitles,
            onSetSubmittedFilters,
            onSetIsAdvancedSearch,
            searchAgain,
            onResubmitFilter,
            resetFilterValues,
            closeCollapsiblePanel,
            //child
            childOnChangeActiveCollapsiblePanel,
            childSetFilterValues,
            childSetAdvancedsearchTitles,
            childOnSetSubmittedFilters,
            childOnSetIsAdvancedSearch,
            childSearchAgain,
            childOnResubmitFilter,
            childResetFilterValues,
            childCloseCollapsiblePanel,
            //secondChild
            secondChildOnChangeActiveCollapsiblePanel,
            secondChildSetFilterValues,
            secondChildSetAdvancedsearchTitles,
            secondChildOnSetSubmittedFilters,
            secondChildOnSetIsAdvancedSearch,
            secondChildSearchAgain,
            secondChildOnResubmitFilter,
            secondChildResetFilterValues,
            secondChildCloseCollapsiblePanel,
        }
    }

    return (
        <GlobalContext.Provider value={getProviderValue()}>
            {children}
        </GlobalContext.Provider>
    );
}


export default GlobalContextStore
