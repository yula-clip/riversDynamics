import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';
import { MainPageComponent } from './main-page.component';
import { MainPageScreenComponent } from './main-page-screen/main-page-screen.component';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ColorPickerModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        MainPageRoutingModule
    ],
    declarations: [
        MainPageComponent,
        MainPageScreenComponent
    ]
})
export class MainPageModule { }
