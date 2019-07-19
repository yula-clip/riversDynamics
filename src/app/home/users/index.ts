import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { UsersComponent } from './users.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        UsersRoutingModule
    ],
    declarations: [
        UsersComponent,
        UsersEditComponent,
        UsersTableComponent
    ]
})
export class UsersModule { }
