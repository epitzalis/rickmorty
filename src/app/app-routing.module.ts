import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomeModule),
  },
  {
    path: 'error-404',
    loadChildren: () => import('./pages/error404/error404.module')
      .then(m => m.Error404Module),
  },
  {
    path: '**',
    redirectTo: 'error-404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
