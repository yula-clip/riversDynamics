import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SidebarComponent } from '../_components/sidebar/sidebar.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastModule } from 'primeng/components/toast/toast';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        FontAwesomeModule,
        AccordionModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        ToastModule
    ],
    declarations: [
        SidebarComponent,
        HomeComponent
    ]
})
export class HomeModule { }
