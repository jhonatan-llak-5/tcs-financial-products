import { ITableColumns, ITableConfig } from "../../../../_core/interfaces/table.interface,";
import { IFinancialProduct } from "../interfaces/financial-products.interface";

export const table: ITableConfig<IFinancialProduct> = {
    columns: [
        {
            field: 'logo',
            name: 'Logo',
            type: 'image',
        },
        {
            field: 'name',
            name: 'Nombre del producto',
            type: 'text',
        },
        {
            field: 'description',
            name: 'Descripción',
            hasInfo: true,
            infoText: 'Descripción del producto financiero.',
            type: 'text',
        },
        {
            field: 'date_release',
            name: 'Fecha de liberación',
            hasInfo: true,
            infoText: 'Fecha en la que el producto financiero fue liberado.',
            type: 'date'
        },
        {
            field: 'date_revision',
            name: 'Fecha de reestructuración',
            hasInfo: true,
            infoText: 'Fecha en la que el producto financiero fue reestructurado.',
            type: 'date'
        }
    ],
    data: []
}