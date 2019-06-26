import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiversComponent } from './rivers.component';
import { RiversTableComponent } from './rivers-table/rivers-table.component';
import { RiversEditComponent } from './rivers-edit/rivers-edit.component';

const riversRoutes: Routes = [
  {
    path: '',
    component: RiversComponent,
    children: [
      {
        path: '',
        component: RiversTableComponent
      },
      {
        path: 'add',
        component: RiversEditComponent
      },
      {
        path: ':id',
        component: RiversEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(riversRoutes)],
  exports: [RouterModule]
})
export class RiversRoutingModule { }
