import { Component, OnInit } from '@angular/core';
import { BasicTableComponent } from "../../../../../_core/components/tables/basic-table/basic-table.component";
import { ITableColumns } from '../../../../../_core/interfaces/table.interface,';
import { table } from '../../config/table';
import { Router } from '@angular/router';
import { BaseModalComponent } from "../../../../../_core/components/modals/base-modal/base-modal.component";
import { IFinancialProduct } from '../../interfaces/financial-products.interface';
import { FinancialProductsService } from '../../services/financial-products.service';
import { finalize, timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../../../_core/services/alert.service';

@Component({
  selector: 'app-financial-products-list',
  imports: [
    BasicTableComponent,
    BaseModalComponent,
    CommonModule
],
  templateUrl: './financial-products-list.component.html',
  styleUrl: './financial-products-list.component.scss'
})
export class FinancialProductsListComponent implements OnInit {

  columns: ITableColumns[] = table.columns;
  selectedRow: IFinancialProduct | null = null;
  data: IFinancialProduct[] = [];
  showModal: boolean = false;
  loadingData: boolean = false;

  constructor(
    private _router: Router,
    private _financialProductsSvc: FinancialProductsService,
    private _alertSvc: AlertService
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.loadData();
  }

  loadData() {
    this._financialProductsSvc.getAllAsync().subscribe({
      next: (response) => {
        this.data = response.data;
        this.loadingData = false;
      }
    });
  }

  deleteRow(row: IFinancialProduct) {
    this.showModal = true;
    this.selectedRow = row;
  }

  editRow(row: IFinancialProduct) {
    this._router.navigate(['/financial-products/', row.id]);
  }

  addRow() {
    this._router.navigate(['/financial-products/add']);
  }

  cancelAction() {
    this.selectedRow = null;
    this.showModal = false;
  }

  confirmAction() {
    this._financialProductsSvc.deleteAsync(this.selectedRow!.id)
    .pipe(
      finalize(() => {
        this.cancelAction();
      })
    ).subscribe({
        next: (response) => {
          this.loadData();
          this._alertSvc.setAlertMessage('Producto financiero eliminado correctamente');
          this._alertSvc.setShowSuccessAlert(true);
        }
      });
  }

}
