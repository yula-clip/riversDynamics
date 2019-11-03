import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ResearchComponent } from './research.component';
import { ResearchScreenComponent } from './research-screen/research-screen.component';
import { ResearchRoutingModule } from './research-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        ResearchRoutingModule
    ],
    declarations: [
        ResearchComponent,
        ResearchScreenComponent
    ]
})
export class ResearchModule { }
