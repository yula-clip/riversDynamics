import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MeasuringPointsComponent } from './measuring-points.component';
import { MeasuringPointsEditComponent } from './measuring-points-edit/measuring-points-edit.component';
import { MeasuringPointsTableComponent } from './measuring-points-table/measuring-points-table.component';
import { MeasuringPointsRoutingModule } from './measuring-points-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        MeasuringPointsRoutingModule
    ],
    declarations: [
      MeasuringPointsComponent,
      MeasuringPointsEditComponent,
      MeasuringPointsTableComponent
    ]
})
export class MeasuringPointsModule { }
