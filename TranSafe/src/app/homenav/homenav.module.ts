import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomenavPageRoutingModule } from './homenav-routing.module';

import { HomenavPage } from './homenav.page';


import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: HomenavPage,
    children: [
      {
        path: '/',
        redirectTo: '/app/homenav/home',
        pathMatch: 'full'
      },
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


    ],

  },
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomenavPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomenavPage]
})
export class HomenavPageModule {}
