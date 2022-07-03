export interface IAdd {
    title: string
    fromDate: string
    toDate: string
    isActive: boolean
    sortId: number
    periodType: number
    factureType: number
    pendingLoss: boolean
    fiscalYearId: number
}
export interface IfiscalYearDetails {
    id: number,
    isActive: boolean,
    fieldGroup: string,
    noLossRatio: boolean,
    failureToCalculateReserves: boolean,
    isCovrage: boolean,
    isCalculatedCovrage: boolean,
    subFieldCode: number,
    subFieldTitle: string,
    cumulativeParticipatingOfInterests: string,
    accountingCode: number,
    description:string
}