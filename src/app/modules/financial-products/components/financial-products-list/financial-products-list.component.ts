import { Component } from '@angular/core';
import { BasicTableComponent } from "../../../../../_core/components/tables/basic-table/basic-table.component";
import { ITableColumns } from '../../../../../_core/interfaces/table.interface,';
import { table } from '../../config/table';
import { Router } from '@angular/router';
import { BaseModalComponent } from "../../../../../_core/components/modals/base-modal/base-modal.component";
import { IFinancialProduct } from '../../interfaces/financial-products.interface';

@Component({
  selector: 'app-financial-products-list',
  imports: [
    BasicTableComponent,
    BaseModalComponent
],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.scss'
})
export class FinancialProductsListComponent {

  columns: ITableColumns[] = table.columns;
  selectedRow: IFinancialProduct | null = null;
  data: IFinancialProduct[] = table.data;
  showModal: boolean = false;

  constructor(
    private _router: Router
  ) {}

  deleteRow(row: IFinancialProduct) {
    this.showModal = true;
    this.selectedRow = row;
    console.log('Delete row:', row);
  }

  editRow(row: IFinancialProduct) {
    this._router.navigate(['/financial-products/', row.id]);
  }

  addRow() {
    this._router.navigate(['/financial-products/add']);
  }

  cancelAction() {
    this.showModal = false;
  }

  confirmAction() {
    this.showModal = false;
    console.log('Confirmed action', this.selectedRow);
  }

}
