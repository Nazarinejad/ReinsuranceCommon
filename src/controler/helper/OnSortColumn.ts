export function OnSortColumn(sorter: any){
    if (sorter.order !== undefined) {
        return {
            orderBy: sorter.field.charAt(0).toUpperCase() + sorter.field.slice(1),
            isDescending: sorter.order === "descend" ? true : false
        }
    }
    else {
        return {
            field: null,
            order: null
        }
    }
}