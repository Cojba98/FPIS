import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'serija',
    loadChildren: () => import('./serija/serija.module').then( m => m.SerijaPageModule)
  },
  {
    path: 'nova-serija',
    loadChildren: () => import('./nova-serija/nova-serija.module').then( m => m.NovaSerijaPageModule)
  },
  {
    path: 'novi-plan',
    loadChildren: () => import('./novi-plan/novi-plan.module').then( m => m.NoviPlanPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then( m => m.PlanPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
