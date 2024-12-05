import { Routes } from '@angular/router';
import { RequestFormComponent } from './features/currency/components/request-form/request-form.component';
import { RequestListComponent } from './features/currency/components/request-list/request-list.component';

export const routes: Routes = [
  { path: 'form', component: RequestFormComponent },
  { path: 'list', component: RequestListComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
];
