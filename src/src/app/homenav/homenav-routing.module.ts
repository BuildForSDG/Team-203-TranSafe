import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomenavPage } from './homenav.page';

const routes: Routes = [
  {
    path: '',
    component: HomenavPage,
    children: [
      {
      path: 'home',
      loadChildren: () => import('.././home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'discover',
        loadChildren: () => import('.././discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('.././notification/notification.module').then( m => m.NotificationPageModule)
      },
      {
        path: 'statistic',
        loadChildren: () => import('.././statistic/statistic.module').then( m => m.StatisticPageModule),
      },
      {
        path: '',
        redirectTo: '/homenav/home',
        pathMatch: 'full'
      }


    ],

  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomenavPageRoutingModule {}
