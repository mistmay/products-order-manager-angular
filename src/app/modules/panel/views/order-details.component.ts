import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { Order } from "src/app/models/category-product";
import { ProductsDatabaseService } from "src/app/api/products-database.service";

@Component({
    selector: 'app-order-details',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="false"
            [title]="'Order Details'"
            [isManage]="false">
        </app-page-header>
        <ng-container *ngIf="order$ | async as currentOrder; else orderNotFound">
            <div class="bg-white p-3 w-100 rounded">
                <p class="fw-bold m-0">
                    Username: {{currentOrder.user.name}} {{currentOrder.user.surname}}<br>
                    Email: {{currentOrder.user.email}}<br>
                    Address: {{currentOrder.user.address}}<br>
                    Date: {{currentOrder.date | date}}<br>
                    Ordered Products:<br>
                </p>
                <p class="fw-bold m-0" *ngFor="let product of currentOrder.orderProducts">
                    -{{product.product.name}}, Single Price: {{product.product.price | currency}}, Quantity: {{product.quantity}}, Total: {{(product.product.price * product.quantity) | currency}}<br>
                </p>
            </div>
        </ng-container>
    </div>
    <ng-template #orderNotFound>
        <div class="bg-white p-3 w-100 rounded">
            <p class="fw-bold m-0">Order not Found!</p>
        </div>
    </ng-template>
    `,
    styles: [``]
})
export class OrderDetailsComponent implements OnInit {
    order$!: Observable<Order>;

    constructor(private activatedRoute: ActivatedRoute, private api: ProductsDatabaseService) { }

    ngOnInit(): void {
        this.order$ = this.activatedRoute.paramMap.pipe(
            switchMap((params: ParamMap) => this.api.getOrderById(+params.get('id')!))
        );
    }

}