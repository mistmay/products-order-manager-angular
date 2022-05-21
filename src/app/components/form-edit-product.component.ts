import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../models/category-product';
import { ModalService } from '../services/modal.service';
import { FetchFromApiService } from '../services/fetch-from-api.service';

@Component({
  selector: 'app-form-edit-product',
  template: `
    <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" *ngIf="currentProduct" [formGroup]="form" (ngSubmit)="editProduct()">
      <h3 class="fw-bold">Edit Product:</h3>
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
      <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Edit Product</button>
    </form>
  `,
  styles: [
  ]
})
export class FormEditProductComponent implements OnInit, OnDestroy {
  currentProduct!: Product | undefined;
  subscription!: Subscription;
  form!: FormGroup;

  constructor(private modalService: ModalService, private fb: FormBuilder, private fetchService: FetchFromApiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      price: ['', Validators.compose([Validators.required, Validators.min(0)])]
    });
    this.subscription = this.modalService.getCurrentProduct()
      .subscribe((res: Product | undefined) => {
        this.currentProduct = res;
        this.form.controls['name'].setValue(this.currentProduct?.name);
        this.form.controls['description'].setValue(this.currentProduct?.description);
        this.form.controls['price'].setValue(this.currentProduct?.price);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editProduct(): void {
    const product: Product = { ...this.currentProduct, ...this.form.value };
    this.fetchService.editProduct(product);
    this.form.reset();
    this.modalService.setCurrentProduct(undefined);
    this.modalService.closeModal();
  }

}
