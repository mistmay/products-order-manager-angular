import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  template: `
  <app-modal *ngIf="showModal"></app-modal>
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent implements OnInit, OnDestroy {
  showModal!: boolean;
  subscription!: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.subscription = this.modalService.getModalObservable()
      .subscribe((res: boolean) => {
        this.showModal = res;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
