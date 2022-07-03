import { useContext } from 'react'
import FieldStatusContext from "../../component/pages/fieldStatus/context/context";


export function GetCompanyNameForFieldStatus(companyId: number) {
    const context = useContext(FieldStatusContext)
    let name = companyId;
    context.companies.forEach(element => {
        if (element.Id === companyId) name = element.Title;
    });
    return name
}