import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductsDatabaseService } from '../api/products-database.service';
import { FetchFromApiService } from '../services/fetch-from-api.service';
import { UserRegistered } from '../models/user-registered';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-form-register',
  template: `
    <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="register()">
      <h3 class="fw-bold">Register</h3>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username">
        <mat-error *ngIf="form.get('username')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('username')?.hasError('minlength')">At Least 3 characters</mat-error>
      </mat-form-field>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email">
        <mat-error *ngIf="form.get('email')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('email')?.hasError('email')">Write a valid Email</mat-error>
      </mat-form-field>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="form.get('password')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('password')?.hasError('minlength')">At Least 6 characters</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Register</button>
    </form>
  `,
  styles: [
  ]
})
export class FormRegisterComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private api: ProductsDatabaseService, private fetchService: FetchFromApiService, private modalService: ModalService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  register(): void {
    this.subscription = this.api.addUser({ ...this.form.value })
      .subscribe((res: UserRegistered) => {
        this.fetchService.showSnackBar('Registered Successfully');
        this.form.reset();
        this.modalService.closeModal();
      });
  }

}
