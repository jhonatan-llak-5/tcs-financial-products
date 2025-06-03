import { Injectable } from '@angular/core';
import { ApiService } from '../../../../_core/services/api.service';
import { IFinancialProduct, IFinancialProductRequest } from '../interfaces/financial-products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService extends ApiService<IFinancialProductRequest, IFinancialProduct> {

  constructor() { 
    super();
    this.baseUrl = 'products';
  }

  checkId(id: number | string): Observable<boolean> {
    return this._httpSvc.get<boolean>(`${this.handleUrl()}/verification/${id}`)
  }

}
