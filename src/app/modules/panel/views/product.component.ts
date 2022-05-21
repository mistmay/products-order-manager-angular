import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";
import { Category, Product } from "src/app/models/category-product";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";
import { Subscription } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { TableConstructor } from "../models/table-constructor";

@Component({
    selector: 'app-product',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="true"
            [title]="'Product'"
            [isManage]="true"
            (buttonClick)="openForm()">
        </app-page-header>
        <app-table 
            class="w-100"
            (productToRemove)="deleteProduct($event)"
            (productToEdit)="editProduct($event)"
            [dataSource]="dataSource"
            [hasEdit]="true"
            [tableConstructor]="tableConstructor">
        </app-table>
    </div>
    `,
    styles: [``]
})
export class ProductComponent implements OnInit, OnDestroy {
    dataSource!: MatTableDataSource<Product>;
    subscription!: Subscription;
    tableConstructor: TableConstructor[] = [
        {
            name: 'name',
            disappearMobile: false
        },
        {
            name: 'category',
            disappearMobile: false
        },
        {
            name: 'description',
            disappearMobile: true
        },
        {
            name: 'price',
            disappearMobile: true
        }
    ];

    constructor(private modalService: ModalService, private fetchService: FetchFromApiService) { }

    ngOnInit(): void {
        this.fetchService.getCategories();
        this.subscription = this.fetchService.getCategoriesObservable()
            .subscribe((res: Category[]) => {
                const products: Product[] = [];
                res.forEach((category: Category) => {
                    category.products.forEach((product: Product) => {
                        products.push(product);
                    });
                });
                this.dataSource = new MatTableDataSource(products);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    openForm(): void {
        this.modalService.openModal('product');
    }

    deleteProduct(product: Product): void {
        this.fetchService.deleteProduct(product);
    }

    editProduct(product: Product): void {
        this.modalService.setCurrentProduct(product);
        this.modalService.openModal('edit-product');
    }

}