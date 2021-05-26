import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoviPlanPageRoutingModule } from './novi-plan-routing.module';

import { NoviPlanPage } from './novi-plan.page';
import {DodavanjeProizvodaComponent} from "../dodavanje-proizvoda/dodavanje-proizvoda.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoviPlanPageRoutingModule
  ],
  declarations: [NoviPlanPage, DodavanjeProizvodaComponent],
  entryComponents: [DodavanjeProizvodaComponent ]
})
export class NoviPlanPageModule {}
