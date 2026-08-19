import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog-list').then(m => m.BlogList)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog/blog-post').then(m => m.BlogPost)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
