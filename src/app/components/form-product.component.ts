import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FetchFromApiService } from '../services/fetch-from-api.service';
import { Category } from '../models/category-product';
import { FormGroup, FormBuilder, Validators, FormControlStatus, FormControl } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { ProductsDatabaseService } from '../api/products-database.service';
import { LastId } from '../models/lastId';

@Component({
  selector: 'app-form-product',
  template: `
    <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" *ngIf="categories.length > 0; else noCategories" [formGroup]="form" (ngSubmit)="createProduct()">
      <h3 class="fw-bold">Create a New Product:</h3>
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Category</mat-label>
        <mat-select formControlName="category">
          <mat-option *ngFor="let category of categories" [value]="category">
            {{category.name}}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <ng-container *ngIf="form.get('category')?.value">
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Product Name</mat-label>
          <input matInput formControlName="name">
          <mat-error *ngIf="form.get('name')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('name')?.hasError('minlength')">At Least 3 characters</mat-error>
        </mat-form-field>
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Product Description</mat-label>
          <textarea matInput formControlName="description"></textarea>
          <mat-error *ngIf="form.get('description')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('description')?.hasError('minlength')">At Least 6 characters</mat-error>
        </mat-form-field>
        <mat-form-field class="w-100" appearance="fill">
          <mat-label>Product Price</mat-label>
          <input matInput formControlName="price" type="number" min="0">
          <mat-error *ngIf="form.get('price')?.hasError('required')">Required</mat-error>
          <mat-error *ngIf="form.get('price')?.hasError('min')">Write a positive number</mat-error>
        </mat-form-field>
      </ng-container>
      <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Create Product</button>
    </form>
    <ng-template #noCategories>
      <p class="text-center fw-bold">No Categories. Please Add one Category before adding a product.</p>
    </ng-template>
  `,
  styles: [
  ]
})
export class FormProductComponent implements OnInit, OnDestroy {
  productId!: number;
  subscriptions: Subscription[] = [];
  categories: Category[] = [];
  form!: FormGroup;
  formSubscription!: Subscription | undefined;

  constructor(private fetchService: FetchFromApiService, private fb: FormBuilder, private modalService: ModalService, private api: ProductsDatabaseService) { }

  ngOnInit(): void {
    this.fetchService.getCategories();
    this.subscriptions.push(this.api.getLastProductId()
      .subscribe((res: LastId[]) => {
        this.productId = res[0].lastId;
      }));
    this.subscriptions.push(this.fetchService.getCategoriesObservable()
      .subscribe((res: Category[]) => {
        this.categories = res;
        this.formCreation();
        this.formSubscription = this.onSelectChoice();
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.formSubscription?.unsubscribe();
  }

  formCreation(): void {
    this.form = this.fb.group({
      category: ['', Validators.required]
    });
  }

  onSelectChoice(): Subscription | undefined {
    return this.form.get('category')?.statusChanges.subscribe((res: FormControlStatus) => {
      if (res === 'VALID') {
        this.form.addControl('name', new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])));
        this.form.addControl('description', new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])));
        this.form.addControl('price', new FormControl('', Validators.compose([Validators.required, Validators.min(0)])));
      }
    });
  }

  createProduct(): void {
    const category: Category = this.form.value.category;
    category.products.push({
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      category: this.form.value.category.name,
      categoryId: this.form.value.category.id,
      id: this.productId
    });
    this.subscriptions.push(this.api.updateLastProductId({ lastId: this.productId + 1 }).subscribe());
    this.fetchService.updateCategory(category);
    this.form.reset();
    this.modalService.closeModal();
  }

}
