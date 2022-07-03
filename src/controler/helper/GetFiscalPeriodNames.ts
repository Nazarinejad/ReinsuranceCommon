import PeriodType from '../constant/PeriodType'
import FactureType from '../constant/FactureType'

export function GetPeriodTypeName(id:number) {
    let name:any = id;
    PeriodType.forEach(element => {
        if(element.value === id) name = element.name;
    });
    return name
}

export function GetFactureTypeName(id:number) {
    let name:any = id;
    FactureType.forEach(element => {
        if(element.value === id) name = element.name;
    });
    return name
}