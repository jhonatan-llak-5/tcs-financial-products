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
    data: [
        { id: 'tsc-001', logo: 'https://placehold.co/600x400', name: 'Crédito Ágil', description: 'Préstamo de aprobación inmediata para necesidades urgentes.', date_release: '2021-03-15', date_revision: '2022-06-10' },
        { id: 'tsc-002', logo: 'https://placehold.co/600x400', name: 'Fondo Flex', description: 'Fondo de inversión con alta liquidez y bajo riesgo.', date_release: '2020-07-22', date_revision: '2023-01-30' },
        { id: 'tsc-003', logo: 'https://placehold.co/600x400', name: 'Plan Ahorro Plus', description: 'Plan de ahorro con beneficios fiscales.', date_release: '2019-11-01', date_revision: '2021-04-05' },
        { id: 'tsc-004', logo: 'https://placehold.co/600x400', name: 'Crédito Verde', description: 'Financiamiento para proyectos sostenibles.', date_release: '2021-06-10', date_revision: '2023-08-15' },
        { id: 'tsc-005', logo: 'https://placehold.co/600x400', name: 'Depósito Futuro', description: 'Depósito a plazo fijo con renovación automática.', date_release: '2018-02-28', date_revision: '2020-03-12' },
        { id: 'tsc-006', logo: 'https://placehold.co/600x400', name: 'Inversión Joven', description: 'Producto pensado para inversionistas jóvenes.', date_release: '2022-01-05', date_revision: '2024-02-25' },
        { id: 'tsc-007', logo: 'https://placehold.co/600x400', name: 'Crédito Mujer', description: 'Financiamiento dirigido a mujeres emprendedoras.', date_release: '2020-05-17', date_revision: '2021-12-03' },
        { id: 'tsc-008', logo: 'https://placehold.co/600x400', name: 'Plan Universitario', description: 'Ahorro programado para estudios universitarios.', date_release: '2019-09-19', date_revision: '2022-10-27' },
        { id: 'tsc-009', logo: 'https://placehold.co/600x400', name: 'Renta Segura', description: 'Producto de inversión con rentabilidad asegurada.', date_release: '2018-04-04', date_revision: '2020-06-14' },
        { id: 'tsc-010', logo: 'https://placehold.co/600x400', name: 'Crédito Empresa', description: 'Crédito de capital de trabajo para empresas.', date_release: '2021-10-01', date_revision: '2023-05-22' },
        { id: 'tsc-011', logo: 'https://placehold.co/600x400', name: 'Fondo Dinámico', description: 'Fondo con estrategia de inversión activa.', date_release: '2019-12-12', date_revision: '2021-07-08' },
        { id: 'tsc-012', logo: 'https://placehold.co/600x400', name: 'Crédito Construcción', description: 'Financiamiento para construcción de vivienda.', date_release: '2020-03-18', date_revision: '2022-04-01' },
        { id: 'tsc-013', logo: 'https://placehold.co/600x400', name: 'Ahorro Digital', description: 'Cuenta de ahorro 100% digital.', date_release: '2022-05-11', date_revision: '2024-01-05' },
        { id: 'tsc-014', logo: 'https://placehold.co/600x400', name: 'Microcrédito Express', description: 'Pequeños créditos con desembolso inmediato.', date_release: '2020-08-25', date_revision: '2021-11-19' },
        { id: 'tsc-015', logo: 'https://placehold.co/600x400', name: 'Plan Retiro', description: 'Producto de ahorro para el retiro con beneficios fiscales.', date_release: '2017-07-10', date_revision: '2019-09-30' },
        { id: 'tsc-016', logo: 'https://placehold.co/600x400', name: 'Cuenta Global', description: 'Cuenta en múltiples divisas para viajeros frecuentes.', date_release: '2018-01-20', date_revision: '2020-02-28' },
        { id: 'tsc-017', logo: 'https://placehold.co/600x400', name: 'Inversión Oro', description: 'Inversión respaldada en metales preciosos.', date_release: '2019-05-14', date_revision: '2022-03-10' },
        { id: 'tsc-018', logo: 'https://placehold.co/600x400', name: 'Crédito Automotriz', description: 'Financiamiento para compra de vehículos.', date_release: '2021-02-01', date_revision: '2023-09-18' },
        { id: 'tsc-019', logo: 'https://placehold.co/600x400', name: 'Plan Emergencia', description: 'Fondo de ahorro para situaciones imprevistas.', date_release: '2020-11-11', date_revision: '2022-12-20' },
        { id: 'tsc-020', logo: 'https://placehold.co/600x400', name: 'Cuenta Infantil', description: 'Cuenta de ahorro para niños con educación financiera.', date_release: '2019-03-27', date_revision: '2021-06-09' }
    ]

}