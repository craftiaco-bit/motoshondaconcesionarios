import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop').then((m) => m.Shop),
  },
  {
    path: 'product/:slug',
    loadComponent: () =>
      import('./features/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: 'concesionarios-honda',
    loadComponent: () => import('./features/dealers/dealers').then((m) => m.Dealers),
  },
  {
    path: 'servicios',
    loadComponent: () => import('./features/services/services').then((m) => m.Services),
  },
  {
    path: 'contacto',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'factu',
    loadComponent: () =>
      import('./features/quotation/quotation-form').then((m) => m.QuotationForm),
  },
  {
    path: 'factu/:id',
    loadComponent: () =>
      import('./features/quotation/quotation-view').then((m) => m.QuotationView),
  },
  { path: '**', redirectTo: '' },
];
