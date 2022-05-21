import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";
import { Category, Order } from "src/app/models/category-product";
import { CardConstructor } from "../models/card-constructor";

@Component({
    selector: 'app-panel-top',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="false"
            [title]="'Dashboard'"
            [isManage]="false">
        </app-page-header>
        <div class="bg-white p-3 w-100 rounded d-flex flex-column flex-lg-row justify-content-between align-items-center gap-2">
            <app-dashboard-card
                *ngFor="let card of cardConstructor"
                class="dashboard-card"
                [title]="card.title"
                [length]="card.length">
            </app-dashboard-card>
        </div>
    </div>
    `,
    styles: [`
    .dashboard-card {
        width: 100%;
    }
    @media (min-width: 992px) { 
        .dashboard-card {
            width: 30%;
        }
     }
    `]
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    cardConstructor: CardConstructor[] = [
        { title: 'category', length: 0 },
        { title: 'product', length: 0 },
        { title: 'order-history', length: 0 }
    ];

    constructor(private fetchService: FetchFromApiService) { }

    ngOnInit(): void {
        this.fetchService.getCategories();
        this.subscriptions.push(this.fetchService.getCategoriesObservable()
            .subscribe((res: Category[]) => {
                this.cardConstructor[0].length = res.length;
                let products: number = 0;
                res.forEach((category: Category) => {
                    products += category.products.length;
                });
                this.cardConstructor[1].length = products;
            }));
        this.fetchService.getOrders();
        this.subscriptions.push(this.fetchService.getOrdersObservable()
            .subscribe((res: Order[]) => {
                this.cardConstructor[2].length = res.length;
            }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe();
        });
    }

}