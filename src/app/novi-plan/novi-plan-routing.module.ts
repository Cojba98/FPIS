import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoviPlanPage } from './novi-plan.page';

const routes: Routes = [
  {
    path: '',
    component: NoviPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoviPlanPageRoutingModule {}
