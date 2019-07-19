import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { UsersEditComponent } from './users-edit/users-edit.component';

const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersTableComponent
      },
      {
        path: 'add',
        component: UsersEditComponent
      },
      {
        path: ':id',
        component: UsersEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(usersRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
