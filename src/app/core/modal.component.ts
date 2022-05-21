import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Form } from '../models/form';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  template: `
  <aside class="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center" #modal (click)="clickOutsideModal($event)">
    <div class="px-2">
      <div class="container bg-white rounded p-5" [ngSwitch]="form">
        <app-form-category *ngSwitchCase="'category'"></app-form-category>
        <app-form-product *ngSwitchCase="'product'"></app-form-product>
        <app-form-edit-product *ngSwitchCase="'edit-product'"></app-form-edit-product>
        <app-form-login *ngSwitchCase="'log-in'"></app-form-login>
        <app-form-register *ngSwitchCase="'register'"></app-form-register>
      </div>
    </div>
  </aside>
  `,
  styles: [`
  aside {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef;
  form!: Form;
  subscription!: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getFormObservable()
      .subscribe((res: Form) => {
        this.form = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clickOutsideModal(event: Event): void {
    if (event.target !== this.modal.nativeElement) {
      return;
    } else {
      this.modalService.closeModal();
    }
  }

}
