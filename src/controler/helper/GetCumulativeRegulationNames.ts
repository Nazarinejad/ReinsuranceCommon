export function GetCumulativeRegulationNames(cumulativeFullList: any[], idarray: number[]) {

    if (cumulativeFullList != [] && cumulativeFullList != null)
    {
        let name = "";
        idarray.forEach(id => {
            cumulativeFullList.forEach(element => {
                if (element.Id === id) {
                    name = name.concat(`- ${element.Title}`)
                }
            });
        });
        name = name.substring(1);
        return name
    }
}