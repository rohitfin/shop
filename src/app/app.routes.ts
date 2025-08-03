import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: ()=>
      import('./index-page/login/login.component').then(
        (m)=> m.LoginComponent
      )
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'custom',
        loadComponent: () =>
          import('./components/custom/custom.component').then(
            (m) => m.CustomComponent
          )
      },
      {
        path: 'form',
        loadComponent: () =>
          import('./components/form/form.component').then(
            (m) => m.FormComponent
          )
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/products/products.component').then(
                (m) => m.ProductsComponent
              ),
          },
          {
            path: ':productId',
            loadComponent: () =>
              import(
                './components/products/product-detail/product-detail.component'
              ).then((m) => m.ProductDetailComponent),
          },
        ],
      },
    ]
  }
 
];
