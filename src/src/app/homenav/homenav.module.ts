import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomenavPageRoutingModule } from './homenav-routing.module';

import { HomenavPage } from './homenav.page';







@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomenavPageRoutingModule,
  ],
  declarations: [HomenavPage]
})
export class HomenavPageModule {}
