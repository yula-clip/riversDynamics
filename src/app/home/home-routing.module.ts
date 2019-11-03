import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../_guards';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main',
        loadChildren: './main-page/index#MainPageModule'
      },
      {
        path: 'research',
        loadChildren: './research/index#ResearchModule'
      },
      {
        path: 'currentState',
        loadChildren: './current-state/index#CurrentStateModule'
      },
      {
        path: 'rivers',
        data: { isAdmin: true },
        loadChildren: './rivers/index#RiversModule'
      },
      {
        path: 'riverSections',
        data: { isAdmin: true },
        loadChildren: './river-sections/index#RiverSectionsModule'
      },
      {
        path: 'measuringPoints',
        data: { isAdmin: true },
        loadChildren: './measuring-points/index#MeasuringPointsModule'
      },
      {
        path: 'substances',
        data: { isAdmin: true },
        loadChildren: './substances/index#SubstancesModule'
      },
      {
        path: 'realMeasures',
        data: { isAdmin: true },
        loadChildren: './real-measures/index#RealMeasuresModule'
      },
      {
        path: 'spentCleaningSubstances',
        data: { isAdmin: true },
        loadChildren: './spent-cleaning-substances/index#SpentCleaningSubstancesModule'
      },
      {
        path: 'users',
        data: { isAdmin: true },
        loadChildren: './users/index#UsersModule'
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
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
