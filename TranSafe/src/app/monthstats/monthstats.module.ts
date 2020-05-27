import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonthstatsPageRoutingModule } from './monthstats-routing.module';

import { MonthstatsPage } from './monthstats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonthstatsPageRoutingModule
  ],
  declarations: [MonthstatsPage]
})
export class MonthstatsPageModule {}
