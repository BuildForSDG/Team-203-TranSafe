import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatisticPageRoutingModule } from './statistic-routing.module';

import { StatisticPage } from './statistic.page';


import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticPage,
    children: [

      {
        path: '/todaystats',
        loadChildren: () => import('./../todaystats/todaystats.module').then( m => m.TodaystatsPageModule)
      },
      {
        path: '/weekstats',
        loadChildren: () => import('./../weekstats/weekstats.module').then( m => m.WeekstatsPageModule)
      },
      {
        path: '/monthstats',
        loadChildren: () => import('./../monthstats/monthstats.module').then( m => m.MonthstatsPageModule)
      },


    ],

  },
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatisticPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StatisticPage]
})
export class StatisticPageModule {}
