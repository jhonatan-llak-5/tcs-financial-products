import { Routes } from '@angular/router';
import { FinancialProductsPageComponent } from '../pages/financial-products-page/financial-products-page.component';
import { FinancialProductsFormPageComponent } from '../pages/financial-products-form-page/financial-products-form-page.component';

export const financialproductsRoutes: Routes = [
    {
        path: '',
        component: FinancialProductsPageComponent,
    },
    {
        path: 'add',
        component: FinancialProductsFormPageComponent,
    },
    {
        path: ':id',
        component: FinancialProductsFormPageComponent,
    }
];
