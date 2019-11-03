import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResearchComponent } from './research.component';
import { ResearchScreenComponent } from './research-screen/research-screen.component';

const ResearchRoutes: Routes = [
  {
    path: '',
    component: ResearchComponent,
    children: [
      {
        path: '',
        component: ResearchScreenComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ResearchRoutes)],
  exports: [RouterModule]
})
export class ResearchRoutingModule { }
