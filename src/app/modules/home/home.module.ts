import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home.component';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        HomeRoutingModule,
        MaterialModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule { }