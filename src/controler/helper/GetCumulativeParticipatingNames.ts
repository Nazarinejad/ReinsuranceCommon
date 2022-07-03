export function GetSingleCumulativeParticipatingName(cumulativeFullList: any[] ,id: string ) {
    let name = id;
    cumulativeFullList.forEach(element => {
        if(element.Id === Number(id)) name = element.Title;
    });
    return name
}