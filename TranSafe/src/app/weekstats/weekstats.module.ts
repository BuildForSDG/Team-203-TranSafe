import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeekstatsPageRoutingModule } from './weekstats-routing.module';

import { WeekstatsPage } from './weekstats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeekstatsPageRoutingModule
  ],
  declarations: [WeekstatsPage]
})
export class WeekstatsPageModule {}
