export interface IFinancialProduct {
    id: string
    logo: string
    name: string
    description: string
    date_release: Date | string
    date_revision: Date | string
}

export interface IFinancialProductRequest {
    logo: string
    name: string
    description: string
    date_release: Date
    date_revision: Date
}