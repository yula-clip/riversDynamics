import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RealMeasuresComponent } from './real-measures.component';
import { RealMeasuresEditComponent } from './real-measures-edit/real-measures-edit.component';
import { RealMeasuresTableComponent } from './real-measures-table/real-measures-table.component';
import { RealMeasuresRoutingModule } from './real-measures-routing.module';
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
    RealMeasuresRoutingModule,
    PickItemFromListModule,
    CalendarModule
  ],
  declarations: [
    RealMeasuresComponent,
    RealMeasuresEditComponent,
    RealMeasuresTableComponent
  ]
})
export class RealMeasuresModule { }