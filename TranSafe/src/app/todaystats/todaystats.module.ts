import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodaystatsPageRoutingModule } from './todaystats-routing.module';

import { TodaystatsPage } from './todaystats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodaystatsPageRoutingModule
  ],
  declarations: [TodaystatsPage]
})
export class TodaystatsPageModule {}
