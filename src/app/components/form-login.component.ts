import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsDatabaseService } from '../api/products-database.service';
import { FetchFromApiService } from '../services/fetch-from-api.service';
import { ModalService } from '../services/modal.service';
import { UserRegistered } from '../models/user-registered';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  template: `
    <form class="d-flex flex-column align-items-center gap-3 w-100 p-5 border border-secondary rounded" [formGroup]="form" (ngSubmit)="login()">
      <h3 class="fw-bold">Log-in</h3>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username">
        <mat-error *ngIf="form.get('username')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('username')?.hasError('minlength')">At Least 3 characters</mat-error>
      </mat-form-field>
      <mat-form-field class="w-100" appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput formControlName="password" type="password">
        <mat-error *ngIf="form.get('password')?.hasError('required')">Required</mat-error>
        <mat-error *ngIf="form.get('password')?.hasError('minlength')">At Least 6 characters</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" class="w-100" type="submit" [disabled]="form.invalid">Log-In</button>
    </form>
  `,
  styles: [
  ]
})
export class FormLoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private api: ProductsDatabaseService, private fetchService: FetchFromApiService, private modalService: ModalService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login(): void {
    this.subscription = this.api.getUsers()
      .subscribe((res: UserRegistered[]) => {
        const userToFind: UserRegistered | undefined = res.find((user: UserRegistered) => {
          return user.username === this.form.value.username && user.password === this.form.value.password;
        });
        if (userToFind) {
          this.fetchService.showSnackBar('Login Successfull');
          localStorage.setItem('token', 'fake-token');
          this.form.reset();
          this.modalService.closeModal();
          this.router.navigate(['panel']);
        } else {
          this.fetchService.showSnackBar('Error: User not Found! Try again or register');
          this.form.reset();
        }
      });
  }

}
