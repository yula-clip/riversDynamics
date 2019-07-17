import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeasuringPointsComponent } from './measuring-points.component';
import { MeasuringPointsTableComponent } from './measuring-points-table/measuring-points-table.component';
import { MeasuringPointsEditComponent } from './measuring-points-edit/measuring-points-edit.component';

const MeasuringPointsRoutes: Routes = [
  {
    path: '',
    component: MeasuringPointsComponent,
    children: [
      {
        path: '',
        component: MeasuringPointsTableComponent
      },
      {
        path: 'add',
        component: MeasuringPointsEditComponent
      },
      {
        path: ':id',
        component: MeasuringPointsEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MeasuringPointsRoutes)],
  exports: [RouterModule]
})
export class MeasuringPointsRoutingModule { }
