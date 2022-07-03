export interface IAddEdit {
    title: string
    sortId: number
    printVersionFormat: string,
    cumulativeRequlations: number[],
    considerPendingLoss: boolean,
    percentageOfParticipation:number
}

export interface IfiscalYearDetails {
    id: number
    title: string
    periodType: string
    pendingLoss: boolean
    factureType: string
    fromDate: string
    toDate: string
    isActive: boolean
}
