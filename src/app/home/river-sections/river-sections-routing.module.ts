import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiverSectionsComponent } from './river-sections.component';
import { RiverSectionsTableComponent } from './river-sections-table/river-sections-table.component';
import { RiverSectionsEditComponent } from './river-sections-edit/river-sections-edit.component';

const riverSectionsRoutes: Routes = [
  {
    path: '',
    component: RiverSectionsComponent,
    children: [
      {
        path: '',
        component: RiverSectionsTableComponent
      },
      {
        path: 'add',
        component: RiverSectionsEditComponent
      },
      {
        path: ':id',
        component: RiverSectionsEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(riverSectionsRoutes)],
  exports: [RouterModule]
})
export class RiverSectionsRoutingModule { }
