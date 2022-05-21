import { Component } from "@angular/core";
import { OrderProduct, OrderUser } from "src/app/models/category-product";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";

@Component({
    selector: 'app-new-order',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="false"
            [title]="'New Order'"
            [isManage]="false">
        </app-page-header>
        <app-product-order-form (productToAdd)="addProduct($event)"></app-product-order-form>
        <app-new-order-table [productsArray]="products" [total]="total" (productToDelete)="deleteFromOrder($event)"></app-new-order-table>
        <app-order-user-form *ngIf="products.length > 0" (orderToSubmit)="submitOrder($event)"></app-order-user-form>
    </div>
    `,
    styles: [``]
})
export class NewOrderComponent {
    products: OrderProduct[] = [];
    total: number = 0;

    constructor(private fetchService: FetchFromApiService) { }

    addProduct(product: OrderProduct): void {
        if (!this.products.find((currentProduct: OrderProduct) => currentProduct.product.id === product.product.id)) {
            this.products.push(product);
        } else {
            this.products = this.products.map((currentProduct: OrderProduct) => {
                if (currentProduct.product.id === product.product.id) {
                    currentProduct.quantity += product.quantity;
                    return currentProduct;
                } else {
                    return currentProduct;
                }
            })
        }
        this.total = this.products.reduce((accumulator: number, currentItem: OrderProduct) => accumulator + (currentItem.product.price * currentItem.quantity), 0);
    }

    deleteFromOrder(product: OrderProduct): void {
        this.products = this.products.filter((currentProduct: OrderProduct) => currentProduct.product.id !== product.product.id);
        this.total = this.products.reduce((accumulator: number, currentItem: OrderProduct) => accumulator + (currentItem.product.price * currentItem.quantity), 0);
    }

    submitOrder(user: OrderUser): void {
        this.fetchService.addOrder({ user: user, orderProducts: this.products, date: new Date() });
        this.products = [];
        this.total = 0;
    }

}