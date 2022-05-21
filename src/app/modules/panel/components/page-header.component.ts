import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-page-header',
    template: `
    <div class="bg-white p-3 w-100 rounded d-flex justify-content-between align-items-center">
        <h2 class="m-0">
            <span *ngIf="isManage">Manage </span> 
            {{title}}
        </h2>
        <button mat-raised-button color="primary" (click)="openForm()" *ngIf="hasButton">Add {{title}}</button>
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
export class PageHeaderComponent {
    @Input() hasButton!: boolean;
    @Input() title!: string;
    @Input() isManage!: boolean;
    @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

    openForm(): void {
        this.buttonClick.emit();
    }

}