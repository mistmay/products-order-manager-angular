import { Component, Input, Output, EventEmitter } from "@angular/core";
import { OrderProduct } from "src/app/models/category-product";

@Component({
    selector: 'app-new-order-table',
    template: `
    <div class="bg-white p-3 w-100 rounded d-flex flex-column">
        <ng-container *ngIf="productsArray.length > 0; else noProducts">
            <div class="p-2 w-100 rounded border border-secondary d-flex align-items-center gap-3" *ngFor="let product of productsArray">
                <h3 class="fw-bold m-0">{{product.product.name}} - Quantity: {{product.quantity}} - Price: {{(product.quantity * product.product.price) | currency}}</h3>
                <button mat-icon-button color="warn" (click)="productToDelete.emit(product)">
                    <mat-icon>delete</mat-icon>
                </button>
            </div>
        </ng-container>
        <div class="p-2 w-100 rounded border border-secondary">
            <h3 class="fw-bold m-0">Total: {{total | currency}}</h3>
        </div>
    </div>
    <ng-template #noProducts>
        <p class="fw-bold">No Products in your order yet</p>
    </ng-template>
    `,
    styles: [`
    button {
        &:hover {
            opacity: 0.8;
        }
    }
    `]
})
export class NewOrderTableComponent {
    @Input() productsArray!: OrderProduct[];
    @Input() total!: number;
    @Output() productToDelete: EventEmitter<OrderProduct> = new EventEmitter<OrderProduct>();
}