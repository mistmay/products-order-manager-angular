import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from "rxjs";
import { Order } from "src/app/models/category-product";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-order-history',
    template: `
    <div class="w-100 h-100 overflow-auto d-flex flex-column gap-2">
        <app-page-header
            class="w-100"
            [hasButton]="false"
            [title]="'Order History'"
            [isManage]="false">
        </app-page-header>
        <div class="bg-white w-100 rounded p-3" *ngIf="dataSource.data.length > 0; else noOrders">
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 w-100">
                <ng-container matColumnDef="userName">
                    <th mat-header-cell *matHeaderCellDef> User Name </th>
                    <td mat-cell *matCellDef="let element"> {{element.user.name}} {{element.user.surname}} </td>
                </ng-container>
                <ng-container matColumnDef="email">
                    <th mat-header-cell *matHeaderCellDef class="d-none d-lg-table-cell"> Email </th>
                    <td mat-cell *matCellDef="let element" class="d-none d-lg-table-cell"> {{element.user.email}} </td>
                </ng-container>
                <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef> Date </th>
                    <td mat-cell *matCellDef="let element"> {{element.date | date}} </td>
                </ng-container>
                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef> Action </th>
                    <td mat-cell *matCellDef="let element">
                        <button mat-icon-button color="warn" (click)="goToDetails(element.id)">
                            <mat-icon>visibility</mat-icon>
                        </button>
                    </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
        </div>
    </div>
    <ng-template #noOrders>
    <div class="bg-white w-100 rounded p-3">
        <p class="fw-bold m-0">No orders to Show</p>
    </div>
    </ng-template>
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
export class OrderHistoryComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['userName', 'email', 'date', 'action'];
    dataSource!: MatTableDataSource<Order>;
    subscription!: Subscription;

    constructor(private fetchService: FetchFromApiService, private router: Router) { }

    ngOnInit(): void {
        this.fetchService.getOrders();
        this.subscription = this.fetchService.getOrdersObservable()
            .subscribe((res: Order[]) => {
                this.dataSource = new MatTableDataSource(res);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    goToDetails(id: number): void {
        this.router.navigate(['panel/order-history/details', id]);
    }
}