

export function GetDepartmentName(departmentId:number, departmentList:any[]) {
    let name = departmentId;
    departmentList.forEach(element => {
        if(element.Id === departmentId) name = element.Title;
    });
    return name
}