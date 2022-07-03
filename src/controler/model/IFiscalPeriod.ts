export interface IAddEdit {
    title: string
    // fromDate: string
    // toDate: string
    fromDay: number
    toDay: number
    fromMonth: number
    toMonth: number
    isActive: boolean
    sortId: number
    periodType: number
    factureType: number
    pendingLoss: boolean
    fiscalYearId: number[]
}

export interface IfiscalYearDetails {
    id: number
    title: string
    periodType: string
    pendingLoss: boolean
    factureType: string
    fromDay: string
    toDay: string
    fromMonth: string
    toMonth: string
    isActive: boolean
}
