import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { MainPageScreenComponent } from './main-page-screen/main-page-screen.component';

const mainPageRoutes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: '',
                component: MainPageScreenComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(mainPageRoutes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule { }
