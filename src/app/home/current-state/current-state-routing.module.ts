import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentStateComponent } from './current-state.component';
import { CurrentStateScreenComponent } from './current-state-screen/current-state-screen.component';

const CurrentStateRoutes: Routes = [
  {
    path: '',
    component: CurrentStateComponent,
    children: [
      {
        path: '',
        component: CurrentStateScreenComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CurrentStateRoutes)],
  exports: [RouterModule]
})
export class CurrentStateRoutingModule { }
