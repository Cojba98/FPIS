import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SerijaPageRoutingModule } from './serija-routing.module';

import { SerijaPage } from './serija.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SerijaPageRoutingModule
  ],
  declarations: [SerijaPage]
})
export class SerijaPageModule {}
