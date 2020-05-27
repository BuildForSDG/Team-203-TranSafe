import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { WelcomeGuard } from './guards/welcome.guard';
import { HomesignedinGuard } from './guards/homesignedin.guard';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homenav/homenav.module').then( m => m.HomenavPageModule),
    canActivate: [WelcomeGuard, HomesignedinGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),

  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
  },
  {
    path: 'homenav',
    loadChildren: () => import('./homenav/homenav.module').then( m => m.HomenavPageModule),

=======

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
>>>>>>> b3a99310bac71575fe2c0638407737d0c18620fa
  },  {
    path: 'achievement',
    loadChildren: () => import('./achievement/achievement.module').then( m => m.AchievementPageModule)
  },

];

@NgModule({
  imports: [
<<<<<<< HEAD
    FormsModule,
    IonicModule,
=======
>>>>>>> b3a99310bac71575fe2c0638407737d0c18620fa
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
