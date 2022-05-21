import { Component, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { OrderUser } from "src/app/models/category-product";

@Component({
    selector: 'app-order-user-form',
    template: `
    <div class="bg-white p-3 w-100 rounded">
        <h2 class="fw-bold">Add User Details:</h2>
        <form class="w-100 d-flex align-items-center flex-wrap gap-2" [formGroup]="form" (ngSubmit)="submitOrder()">
            <mat-form-field appearance="fill">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name">
                <mat-error *ngIf="form.get('name')?.hasError('required')">Required</mat-error>
                <mat-error *ngIf="form.get('name')?.hasError('minlength')">At least 3 charachter</mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill">
                <mat-label>Surname</mat-label>
                <input matInput formControlName="surname">
                <mat-error *ngIf="form.get('surname')?.hasError('required')">Required</mat-error>
                <mat-error *ngIf="form.get('surname')?.hasError('minlength')">At least 3 charachter</mat-error>
            </mat-form-field>
            <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email">
                <mat-error *ngIf="form.get('email')?.hasError('required')">Required</mat-error>
                <mat-error *ngIf="form.get('email')?.hasError('email')">Write a valid email</mat-error>
            </mat-form-field>
            <mat-form-field class="w-100" appearance="fill">
                <mat-label>Address</mat-label>
                <textarea matInput formControlName="address"></textarea>
                <mat-error *ngIf="form.get('address')?.hasError('required')">Required</mat-error>
                <mat-error *ngIf="form.get('address')?.hasError('minlength')">At Least 6 characters</mat-error>
        </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Submit Order</button>
        </form>
    </div>
    `,
    styles: [``]
})
export class OrderUserFormComponent implements OnInit {
    form!: FormGroup;
    @Output() orderToSubmit: EventEmitter<OrderUser> = new EventEmitter<OrderUser>();

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            surname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            address: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    submitOrder(): void {
        this.orderToSubmit.emit({ ...this.form.value });
        this.form.reset();
    }
}