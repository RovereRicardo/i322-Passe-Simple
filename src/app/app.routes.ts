import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'recettes',
    loadComponent: () =>
      import('./features/recettes/recettes.component').then(
        (m) => m.RecettesComponent
      ),
  },
  {
    path: 'recettes/:id',
    loadComponent: () =>
      import('./features/recettes/recette-detail/recette-detail.component').then(
        (m) => m.RecetteDetailComponent
      ),
  },
  {
    path: 'faq',
    loadComponent: () =>
      import('./features/faq/faq.component').then((m) => m.FaqComponent),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./features/contacts/contacts.component').then(
        (m) => m.ContactsComponent
      ),
  },
];
