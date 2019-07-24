import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpentCleaningSubstancesComponent } from './spent-cleaning-substances.component';
import { SpentCleaningSubstancesTableComponent } from './spent-cleaning-substances-table/spent-cleaning-substances-table.component';
import { SpentCleaningSubstancesEditComponent } from './spent-cleaning-substances-edit/spent-cleaning-substances-edit.component';

const spentCleaningSubstancesRoutes: Routes = [
  {
    path: '',
    component: SpentCleaningSubstancesComponent,
    children: [
      {
        path: '',
        component: SpentCleaningSubstancesTableComponent
      },
      {
        path: 'add',
        component: SpentCleaningSubstancesEditComponent
      },
      {
        path: ':id',
        component: SpentCleaningSubstancesEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(spentCleaningSubstancesRoutes)],
  exports: [RouterModule]
})
export class SpentCleaningSubstancesRoutingModule { }
