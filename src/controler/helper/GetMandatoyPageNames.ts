export function GetCompanyName(companyId:number, companyList:any[]) {
    let name = companyId;
    companyList.forEach(element => {
        if(element.Id === Number(companyId)) name = element.Title;
    });
    return name
}

export function GetFiscalYearName(fiscalYearId:number, fiscalYearList:any[]) {
    let name = fiscalYearId;
    fiscalYearList.forEach(element => {
        if(element.Id === Number(fiscalYearId)) name = element.Title;
    });
    return name
}

export function GetFieldsName(fieldId:number, fieldList:any[]) {
    let name = fieldId;
    fieldList.forEach(element => {
        if(element.FieldId === Number(fieldId)) name = element.Title;
    });
    return name
}

export function GetSubFieldsName(subFieldId:number, subFieldList:any[]) {
    let name = subFieldId;
    subFieldList.forEach(element => {
        if(element.Id === Number(subFieldId)) name = element.SubFieldTitle;
    });
    return name
}

export function GetCommisionName(commisionId:number, commisionList:any[]) {
    let name = commisionId;
    commisionList.forEach(element => {
        if(element.value === commisionId) name = element.name;
    });
    return name
}
