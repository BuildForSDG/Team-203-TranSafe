import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeekstatsPage } from './weekstats.page';

const routes: Routes = [
  {
    path: '',
    component: WeekstatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekstatsPageRoutingModule {}
