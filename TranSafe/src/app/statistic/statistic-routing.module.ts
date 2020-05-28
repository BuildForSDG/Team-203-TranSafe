import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatisticPage } from './statistic.page';

const routes: Routes = [
  {
    path: '',
    component: StatisticPage,
    children: [

      {
        path: 'statistic/todaystats',
        loadChildren: () => import('./../todaystats/todaystats.module').then( m => m.TodaystatsPageModule)
      },
      {
        path: 'statistic/weekstats',
        loadChildren: () => import('./../weekstats/weekstats.module').then( m => m.WeekstatsPageModule)
      },
      {
        path: 'statistic/monthstats',
        loadChildren: () => import('./../monthstats/monthstats.module').then( m => m.MonthstatsPageModule)
      },
      {
        path: '',
        redirectTo: '/homenav/statistic/todaystats',
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
