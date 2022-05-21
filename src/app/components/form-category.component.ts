import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchFromApiService } from '../services/fetch-from-api.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-form-category',
  template: `
    <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="createCategory()">
      <h3 class="fw-bold">Create a New Category:</h3>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Category Name</mat-label>
        <input matInput formControlName="name">
        <mat-error *ngIf="form.get('name')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('name')?.hasError('minlength')">At Least 3 characters</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Create Category</button>
    </form>
  `,
  styles: [
  ]
})
export class FormCategoryComponent implements OnInit {
  form!: FormGroup

  constructor(private fb: FormBuilder, private fetchService: FetchFromApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  createCategory(): void {
    this.fetchService.createCategory({ ...this.form.value, products: [] });
    this.form.reset();
    this.modalService.closeModal();
  }

}
