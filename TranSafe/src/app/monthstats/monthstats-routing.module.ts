import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthstatsPage } from './monthstats.page';

const routes: Routes = [
  {
    path: '',
    component: MonthstatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthstatsPageRoutingModule {}
