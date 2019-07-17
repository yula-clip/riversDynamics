import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'main', loadChildren: './main-page/index#MainPageModule' },
      { path: 'rivers', loadChildren: './rivers/index#RiversModule' },
      { path: 'riverSections', loadChildren: './river-sections/index#RiverSectionsModule' },
      { path: 'measuringPoints', loadChildren: './measuring-points/index#MeasuringPointsModule'},
      { path: 'substances', loadChildren: './substances/index#SubstancesModule'},
      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
