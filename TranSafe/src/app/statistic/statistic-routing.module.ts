import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticPage } from './statistic.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticPage,
    children: [

      {
        path: 'todaystats',
        loadChildren: () => import('./../todaystats/todaystats.module').then( m => m.TodaystatsPageModule)
      },
      {
        path: 'weekstats',
        loadChildren: () => import('./../weekstats/weekstats.module').then( m => m.WeekstatsPageModule)
      },
      {
        path: 'monthstats',
        loadChildren: () => import('./../monthstats/monthstats.module').then( m => m.MonthstatsPageModule)
      },
      {
        path: '',
        redirectTo: 'todaystats',
        pathMatch: 'full'
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatisticPageRoutingModule {}
