import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DashboardCardComponent } from './components/dashboard-card.component';
import { NewOrderTableComponent } from './components/new-order-table.component';
import { OrderUserFormComponent } from './components/order-user-form.component';
import { PageHeaderComponent } from './components/page-header.component';
import { ProductOrderFormComponent } from './components/product-order-form.component';
import { SidebarComponent } from './components/sidebar.component';
import { TableComponent } from './components/table.component';
import { PanelRoutingModule } from './panel-routing.module';
import { CategoryComponent } from './views/category.component';
import { DashboardComponent } from './views/dashboard.component';
import { NewOrderComponent } from './views/new-order.component';
import { OrderDetailsComponent } from './views/order-details.component';
import { OrderHistoryComponent } from './views/order-history.component';
import { PanelTopComponent } from './views/panel-top.component';
import { ProductComponent } from './views/product.component';

@NgModule({
  declarations: [
    PanelTopComponent,
    SidebarComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    TableComponent,
    PageHeaderComponent,
    DashboardCardComponent,
    NewOrderComponent,
    ProductOrderFormComponent,
    NewOrderTableComponent,
    OrderUserFormComponent,
    OrderHistoryComponent,
    OrderDetailsComponent
  ],
  imports: [
    PanelRoutingModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PanelTopComponent
  ]
})
export class PanelModule { }
