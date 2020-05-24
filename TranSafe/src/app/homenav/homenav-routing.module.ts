import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomenavPage } from './homenav.page';

const routes: Routes = [
  {
    path: '',
    component: HomenavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomenavPageRoutingModule {}
