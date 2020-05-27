import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodaystatsPage } from './todaystats.page';

const routes: Routes = [
  {
    path: '',
    component: TodaystatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodaystatsPageRoutingModule {}
