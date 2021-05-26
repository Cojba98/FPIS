import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovaSerijaPageRoutingModule } from './nova-serija-routing.module';

import { NovaSerijaPage } from './nova-serija.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovaSerijaPageRoutingModule
  ],
  declarations: [NovaSerijaPage]
})
export class NovaSerijaPageModule {}
