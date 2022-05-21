import { Component, OnDestroy, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { Category, OrderProduct } from "src/app/models/category-product";
import { FetchFromApiService } from "src/app/services/fetch-from-api.service";

@Component({
    selector: 'app-product-order-form',
    template: `
    <div class="bg-white p-3 w-100 rounded">
        <form class="w-100 d-flex align-items-center flex-wrap gap-2" [formGroup]="form" *ngIf="categories.length > 0; else noCategories" (ngSubmit)="addProduct()">
            <mat-form-field appearance="fill">
                <mat-label>Category</mat-label>
                <mat-select formControlName="category">
                    <mat-option *ngFor="let category of categories" [value]="category">
                        {{category.name}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <ng-container *ngIf="form.get('category')?.value">
                <ng-container *ngIf="currentCategory.products.length > 0; else noProducts">
                    <mat-form-field appearance="fill">
                        <mat-label>Product</mat-label>
                        <mat-select formControlName="product">
                            <mat-option *ngFor="let product of currentCategory.products" [value]="product">
                                {{product.name}}
                            </mat-option>
                        </mat-select>
                    </mat-form-field>
                    <mat-form-field appearance="fill">
                        <mat-label>Quantity</mat-label>
                        <input matInput formControlName="quantity" type="number" min="1">
                        <mat-error *ngIf="form.get('quantity')?.hasError('required')">Required</mat-error>
                        <mat-error *ngIf="form.get('quantity')?.hasError('min')">At least 1</mat-error>
                    </mat-form-field>
                </ng-container>
            </ng-container>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Add Product</button>
        </form>
        <ng-template #noCategories>
            <p class="fw-bold">Please Add a Category before making an order</p>
        </ng-template>
        <ng-template #noProducts>
            <p class="fw-bold">There are no Products for this category</p>
        </ng-template>
    </div>
    `,
    styles: [`
    button {
        margin-bottom: 1.34375em;
        &:hover {
            opacity: 0.8;
        }
    }
    `]
})
export class ProductOrderFormComponent implements OnInit, OnDestroy {
    form!: FormGroup;
    categories: Category[] = [];
    subscription!: Subscription;
    formSubscription!: Subscription | undefined;
    currentCategory!: Category;
    @Output() productToAdd: EventEmitter<OrderProduct> = new EventEmitter<OrderProduct>();

    constructor(private fetchService: FetchFromApiService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.fetchService.getCategories();
        this.subscription = this.fetchService.getCategoriesObservable()
            .subscribe((res: Category[]) => {
                this.categories = res;
                this.formCreation();
                this.formSubscription = this.onSelectChoice();
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.formSubscription?.unsubscribe();
    }

    formCreation(): void {
        this.form = this.fb.group({
            category: ['', Validators.required]
        });
    }

    onSelectChoice(): Subscription | undefined {
        return this.form.get('category')?.valueChanges.subscribe((res: Category) => {
            this.currentCategory = res;
            if (this.form.get('product')) {
                this.form.removeControl('product');
                this.form.removeControl('quantity');
            }
            this.form.addControl('product', new FormControl('', Validators.required));
            this.form.addControl('quantity', new FormControl('', Validators.compose([Validators.required, Validators.min(1)])))
        });
    }

    addProduct(): void {
        this.productToAdd.emit({
            product: this.form.value.product,
            quantity: this.form.value.quantity
        });
        this.form.reset();
    }

}