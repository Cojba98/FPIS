import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SerijaPage } from './serija.page';

const routes: Routes = [
  {
    path: '',
    component: SerijaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerijaPageRoutingModule {}
