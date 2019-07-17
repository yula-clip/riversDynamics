import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickItemListComponent } from './pick-list.component';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    PickListModule,
    TableModule,
    AccordionModule,
    FontAwesomeModule
  ],
  declarations: [PickItemListComponent],
  exports: [PickItemListComponent]
})
export class PickItemFromListModule { }
