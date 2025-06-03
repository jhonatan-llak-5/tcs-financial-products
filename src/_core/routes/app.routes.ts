import { Routes } from '@angular/router';
import { financialproductsRoutes } from '../../app/modules/financial-products/routes/financial-products.routes';

export const routes: Routes = [
    {
        path: 'financial-products',
        loadChildren: () => financialproductsRoutes
    },
    { path: '**', redirectTo: 'financial-products', pathMatch: 'full' }
];
