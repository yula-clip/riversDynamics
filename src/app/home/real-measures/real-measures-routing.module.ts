import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealMeasuresComponent } from './real-measures.component';
import { RealMeasuresTableComponent } from './real-measures-table/real-measures-table.component';
import { RealMeasuresEditComponent } from './real-measures-edit/real-measures-edit.component';

const realMeasuresRoutes: Routes = [
  {
    path: '',
    component: RealMeasuresComponent,
    children: [
      {
        path: '',
        component: RealMeasuresTableComponent
      },
      {
        path: 'add',
        component: RealMeasuresEditComponent
      },
      {
        path: ':id',
        component: RealMeasuresEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(realMeasuresRoutes)],
  exports: [RouterModule]
})
export class RealMeasuresRoutingModule { }
