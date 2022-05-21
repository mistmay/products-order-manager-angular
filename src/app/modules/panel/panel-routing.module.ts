import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from "./views/category.component";
import { DashboardComponent } from "./views/dashboard.component";
import { NewOrderComponent } from "./views/new-order.component";
import { OrderDetailsComponent } from "./views/order-details.component";
import { OrderHistoryComponent } from "./views/order-history.component";
import { PanelTopComponent } from "./views/panel-top.component";
import { ProductComponent } from "./views/product.component";

const routes: Routes = [
  {
    path: '',
    component: PanelTopComponent,
    children: [
      { path: 'order-history/details/:id', component: OrderDetailsComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductComponent },
      { path: 'new-order', component: NewOrderComponent },
      { path: '', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PanelRoutingModule { }
