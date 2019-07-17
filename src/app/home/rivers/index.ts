import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RiversComponent } from './rivers.component';
import { RiversEditComponent } from './rivers-edit/rivers-edit.component';
import { RiversTableComponent } from './rivers-table/rivers-table.component';
import { RiversRoutingModule } from './rivers-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        RiversRoutingModule
    ],
    declarations: [
        RiversComponent,
        RiversEditComponent,
        RiversTableComponent
    ]
})
export class RiversModule { }
