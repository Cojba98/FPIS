import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovaSerijaPage } from './nova-serija.page';

const routes: Routes = [
  {
    path: '',
    component: NovaSerijaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovaSerijaPageRoutingModule {}
