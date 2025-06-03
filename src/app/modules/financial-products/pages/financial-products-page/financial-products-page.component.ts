import { Component } from '@angular/core';
import { BasicTableComponent } from "../../../../../_core/components/tables/basic-table/basic-table.component";
import { FinancialProductsListComponent } from "../../components/financial-products-list/financial-products-list.component";

@Component({
  selector: 'app-financial-products-page',
  imports: [FinancialProductsListComponent],
  templateUrl: './financial-products-page.component.html',
  styleUrl: './financial-products-page.component.scss'
})
export class FinancialProductsPageComponent {

}
