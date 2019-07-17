import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RiverSectionsComponent } from './river-sections.component';
import { RiverSectionsEditComponent } from './river-sections-edit/river-sections-edit.component';
import { RiverSectionsTableComponent } from './river-sections-table/river-sections-table.component';
import { RiverSectionsRoutingModule } from './river-sections-routing.module';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        ToastModule,
        RiverSectionsRoutingModule
    ],
    declarations: [
      RiverSectionsComponent,
      RiverSectionsEditComponent,
      RiverSectionsTableComponent
    ]
})
export class RiverSectionsModule { }
