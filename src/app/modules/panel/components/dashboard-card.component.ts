import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-dashboard-card',
    template: `
    <div class="w-100 rounded p-3 border border-light shadow d-flex flex-column align-items-center gap-3 text-center">
        <h3 class="m-0 fw-bold fs-5">Total {{title | titlecase}}:</h3>
        <span class="m-0 fw-bold fs-5">{{length}}</span>
        <a mat-raised-button color="primary" class="w-100" [routerLink]="link">Go to {{title |titlecase}}</a>
    </div>
    `,
    styles: [`
    button {
        &:hover {
            opacity: 0.8;
        }
    }
    `]
})
export class DashboardCardComponent implements OnInit {
    @Input() length!: number;
    @Input() title!: string;
    link!: string;

    constructor() { }

    ngOnInit(): void {
        this.link = `../${this.title}`;
    }

}