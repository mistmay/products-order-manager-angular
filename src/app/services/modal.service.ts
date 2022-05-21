import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Form } from '../models/form';
import { Product } from '../models/category-product';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  showModal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formType: BehaviorSubject<Form> = new BehaviorSubject<Form>('category');
  currentProduct: BehaviorSubject<Product | undefined> = new BehaviorSubject<Product | undefined>(undefined);

  constructor() { }

  getModalObservable(): Observable<boolean> {
    return this.showModal.asObservable();
  }

  getFormObservable(): Observable<Form> {
    return this.formType.asObservable();
  }

  getCurrentProduct(): Observable<Product | undefined> {
    return this.currentProduct.asObservable();
  }

  setCurrentProduct(product: Product | undefined): void {
    this.currentProduct.next(product);
  }

  openModal(formType: Form): void {
    this.formType.next(formType);
    this.showModal.next(true);
  }

  closeModal(): void {
    this.showModal.next(false);
  }

}
