import { Component } from "@angular/core";

@Component({
    selector: 'app-sidebar',
    template: `
    <aside class="w-100 h-100 overflow-auto shadow-lg border-end border-light p-2 d-flex flex-column">
        <a class="p-3 w-100 d-flex align-items-center gap-2 text-secondary fw-bold" routerLink="dashboard" routerLinkActive="active-link text-white">
            <mat-icon>dashboard</mat-icon>
            Dashboard
        </a>
        <a class="p-3 w-100 d-flex align-items-center gap-2 text-secondary fw-bold" routerLink="category" routerLinkActive="active-link text-white">
            <mat-icon>category</mat-icon>
            Manage Categories
        </a>
        <a class="p-3 w-100 d-flex align-items-center gap-2 text-secondary fw-bold" routerLink="product" routerLinkActive="active-link text-white">
            <mat-icon>fastfood</mat-icon>
            Manage Products
        </a>
        <a class="p-3 w-100 d-flex align-items-center gap-2 text-secondary fw-bold" routerLink="new-order" routerLinkActive="active-link text-white">
            <mat-icon>add_shopping_cart</mat-icon>
            Add Orders
        </a>
        <a class="p-3 w-100 d-flex align-items-center gap-2 text-secondary fw-bold" routerLink="order-history" routerLinkActive="active-link text-white">
            <mat-icon>history</mat-icon>
            Orders History
        </a>
    </aside>
    `,
    styles: [`
    a {
        text-decoration: none;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
    .active-link {
        background-color: #673ab7;
    }
    `]
})
export class SidebarComponent {

}