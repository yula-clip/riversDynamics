import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SpentCleaningSubstancesComponent } from './spent-cleaning-substances.component';
import { SpentCleaningSubstancesEditComponent } from './spent-cleaning-substances-edit/spent-cleaning-substances-edit.component';
import { SpentCleaningSubstancesTableComponent } from './spent-cleaning-substances-table/spent-cleaning-substances-table.component';
import { SpentCleaningSubstancesRoutingModule } from './spent-cleaning-substances-routing.module';
import { PickItemFromListModule } from '../../_components/pick-list';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    ToastModule,
    SpentCleaningSubstancesRoutingModule,
    PickItemFromListModule,
    CalendarModule
  ],
  declarations: [
    SpentCleaningSubstancesComponent,
    SpentCleaningSubstancesEditComponent,
    SpentCleaningSubstancesTableComponent
  ]
})
export class SpentCleaningSubstancesModule { }
