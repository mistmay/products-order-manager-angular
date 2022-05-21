import { Component, OnDestroy, OnInit } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";
import { Category } from "src/app/models/category-product";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";
import { Subscription } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { TableConstructor } from "../models/table-constructor";

@Component({
    selector: 'app-category',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="true"
            [title]="'Category'"
            [isManage]="true"
            (buttonClick)="openForm()">
        </app-page-header>
        <app-table 
            class="w-100"
            (deleteItem)="deleteCategory($event)"
            [dataSource]="dataSource"
            [hasEdit]="false"
            [tableConstructor]="tableConstructor">
        </app-table>
    </div>
    `,
    styles: [``]
})
export class CategoryComponent implements OnInit, OnDestroy {
    dataSource!: MatTableDataSource<Category>;
    subscription!: Subscription;
    tableConstructor: TableConstructor[] = [
        {
            name: 'name',
            disappearMobile: false
        }
    ];

    constructor(private modalService: ModalService, private fetchService: FetchFromApiService) { }

    ngOnInit(): void {
        this.fetchService.getCategories();
        this.subscription = this.fetchService.getCategoriesObservable()
            .subscribe((res: Category[]) => {
                this.dataSource = new MatTableDataSource(res);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    openForm(): void {
        this.modalService.openModal('category');
    }

    deleteCategory(id: number) {
        this.fetchService.deleteCategory(id);
    }

}