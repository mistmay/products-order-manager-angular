import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TableConstructor } from "../models/table-constructor";
import { Product } from "src/app/models/category-product";

@Component({
    selector: 'app-table',
    template: `
    <div class="w-100 d-flex flex-column gap-2">
        <div class="bg-white p-3 w-100 rounded">
            <mat-form-field class="w-100" appearance="fill">
                <mat-label>Filter</mat-label>
                <input matInput (keyup)="applyFilter($event)" #input>
            </mat-form-field>
        </div>
        <div class="bg-white w-100 rounded">
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 w-100">
                <ng-container [matColumnDef]="item.name" *ngFor="let item of tableConstructor">
                    <th mat-header-cell *matHeaderCellDef [ngClass]="item.disappearMobile ? 'text-center d-none d-lg-table-cell' : 'text-center'"> {{item.name | titlecase}} </th>
                    <td mat-cell *matCellDef="let element" [ngClass]="item.disappearMobile ? 'text-center d-none d-lg-table-cell' : 'text-center'"> {{element[item.name]}} </td>
                </ng-container>
                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef class="text-center"> Action </th>
                    <td mat-cell *matCellDef="let element" class="text-center">
                        <ng-container *ngIf="hasEdit; else noEdit">
                            <button mat-icon-button color="warn" (click)="editProduct(element)">
                                <mat-icon>edit</mat-icon>
                            </button>
                            <button mat-icon-button color="warn" (click)="deleteProduct(element)">
                                <mat-icon>delete</mat-icon>
                            </button>
                        </ng-container>
                        <ng-template #noEdit>
                            <button mat-icon-button color="warn" (click)="deleteCategory(element.id)">
                                <mat-icon>delete</mat-icon>
                            </button>
                        </ng-template>
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                <tr class="mat-row" *matNoDataRow>
                    <td class="mat-cell" [colSpan]="displayedColumns.length" class="text-center">No results</td>
                </tr>
            </table>
        </div>
    </div>
    `,
    styles: [`
    button {
        &:hover {
            opacity: 0.8;
        }
    }
    th, td {
        vertical-align: middle;
    }
    `]
})
export class TableComponent implements OnInit {
    @Input() tableConstructor!: TableConstructor[];
    @Input() dataSource!: any;
    @Input() hasEdit!: boolean;
    @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();
    @Output() productToRemove: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() productToEdit: EventEmitter<Product> = new EventEmitter<Product>();
    displayedColumns!: string[];

    constructor() { }

    ngOnInit(): void {
        const columnsConstructor: string[] = [];
        this.tableConstructor.forEach((element: TableConstructor) => {
            columnsConstructor.push(element.name);
        });
        columnsConstructor.push('action');
        this.displayedColumns = columnsConstructor;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    deleteCategory(id: number): void {
        this.deleteItem.emit(id);
    }

    deleteProduct(product: Product): void {
        this.productToRemove.emit(product);
    }

    editProduct(product: Product): void {
        this.productToEdit.emit(product);
    }

}