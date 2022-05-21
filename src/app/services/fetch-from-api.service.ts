import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ProductsDatabaseService } from '../api/products-database.service';
import { Category, Product, Order } from '../models/category-product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FetchFromApiService {
  categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  subscriptions: Subscription[] = [];

  constructor(private api: ProductsDatabaseService, private _snackBar: MatSnackBar) { }

  getCategoriesObservable(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  getOrdersObservable(): Observable<Order[]> {
    return this.orders.asObservable();
  }

  getCategories(): void {
    this.subscriptions.push(this.api.getCategories()
      .subscribe((res: Category[]) => {
        this.categories.next(res);
      }));
  }

  getOrders(): void {
    this.subscriptions.push(this.api.getOrders()
      .subscribe((res: Order[]) => {
        this.orders.next(res);
      }));
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  createCategory(category: Category): void {
    this.subscriptions.push(this.api.createCategory(category)
      .subscribe((res: Category) => {
        this.getCategories();
        this.showSnackBar('Category Created Successfully');
      }));
  }

  addOrder(order: Order): void {
    this.subscriptions.push(this.api.addOrder(order)
      .subscribe((res: Order) => {
        this.getOrders();
        this.showSnackBar('Order Created Successfully');
      }));
  }

  updateCategory(category: Category): void {
    this.subscriptions.push(this.api.updateCategory(category)
      .subscribe((res: Category) => {
        this.getCategories();
        this.showSnackBar('Category and Product Updated Successfully');
      }));
  }

  deleteCategory(id: number): void {
    this.subscriptions.push(this.api.deleteById(id)
      .subscribe((res: Category) => {
        this.getCategories();
        this.showSnackBar('Category deleted Successfully');
      }));
  }

  deleteProduct(product: Product): void {
    this.subscriptions.push(this.api.getCategoryById(product.categoryId)
      .subscribe((res: Category) => {
        const currentCategory: Category = res;
        const updatedProductList: Product[] = currentCategory.products.filter((currentProduct: Product) => currentProduct.id !== product.id);
        currentCategory.products = updatedProductList;
        this.updateCategory(currentCategory);
      }));
  }

  editProduct(product: Product): void {
    this.subscriptions.push(this.api.getCategoryById(product.categoryId)
      .subscribe((res: Category) => {
        const currentCategory: Category = res;
        const updatedProductList: Product[] = currentCategory.products.map((currentProduct: Product) => {
          if (currentProduct.id === product.id) {
            return product;
          } else {
            return currentProduct;
          }
        });
        currentCategory.products = updatedProductList;
        this.updateCategory(currentCategory);
      }));
  }

}
