import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CurrentStateComponent } from './current-state.component';
import { CurrentStateScreenComponent } from './current-state-screen/current-state-screen.component';
import { CurrentStateRoutingModule } from './current-state-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    ToastModule,
    CurrentStateRoutingModule
  ],
  declarations: [
    CurrentStateComponent,
    CurrentStateScreenComponent
  ]
})
export class CurrentStateModule { }
