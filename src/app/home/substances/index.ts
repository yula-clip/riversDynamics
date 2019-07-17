import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { SubstancesComponent } from './substances.component';
import { SubstancesEditComponent } from './substances-edit/substances-edit.component';
import { SubstancesTableComponent } from './substances-table/substances-table.component';
import { SubstancesRoutingModule } from './substances-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        SubstancesRoutingModule
    ],
    declarations: [
      SubstancesComponent,
      SubstancesEditComponent,
      SubstancesTableComponent
    ]
})
export class SubstancesModule { }
