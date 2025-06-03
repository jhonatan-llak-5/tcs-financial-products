export interface ITableColumns {
    field: string;
    name: string;
    hasInfo?: boolean;
    infoText?: string;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'image';
}

export interface ITableConfig<IEntity> {
    columns: ITableColumns[];
    data: IEntity[];
}