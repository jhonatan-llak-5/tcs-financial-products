import { Component } from '@angular/core';
import { BasicTableComponent } from "../../../../../_core/components/tables/basic-table/basic-table.component";
import { ITableColumns } from '../../../../../_core/interfaces/table.interface,';
import { table } from '../../config/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-products-list',
  imports: [
    BasicTableComponent
  ],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.scss'
})
export class FinancialProductsListComponent {

  columns = table.columns;
  data = table.data;

  constructor(
    private _router: Router
  ) {}

  deleteRow(row: any) {
    console.log('Delete row:', row);
  }

  editRow(row: any) {
    this._router.navigate(['/financial-products/', row.id]);
  }

  addRow() {
    this._router.navigate(['/financial-products/add']);
  }

}
