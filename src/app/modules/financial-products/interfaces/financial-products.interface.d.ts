export interface IFinancialProduct {
    id: number
    logo: string
    name: string
    description: string
    date_release: Date
    date_revision: Date
}

export interface IFinancialProductRequest {
    logo: string
    name: string
    description: string
    date_release: string
    date_revision: string
}