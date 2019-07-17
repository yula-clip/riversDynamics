import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubstancesComponent } from './substances.component';
import { SubstancesTableComponent } from './substances-table/substances-table.component';
import { SubstancesEditComponent } from './substances-edit/substances-edit.component';

const riverSectionsRoutes: Routes = [
  {
    path: '',
    component: SubstancesComponent,
    children: [
      {
        path: '',
        component: SubstancesTableComponent
      },
      {
        path: 'add',
        component: SubstancesEditComponent
      },
      {
        path: ':id',
        component: SubstancesEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(riverSectionsRoutes)],
  exports: [RouterModule]
})
export class SubstancesRoutingModule { }
