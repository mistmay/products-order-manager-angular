import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category-product';
import { LastId } from '../models/lastId';
import { Order } from '../models/category-product';
import { UserRegistered } from '../models/user-registered';

@Injectable({
  providedIn: 'root'
})
export class ProductsDatabaseService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/categories', category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:3000/categories/${category.id}`, category);
  }

  deleteById(id: number): Observable<Category> {
    return this.http.delete<Category>(`http://localhost:3000/categories/${id}`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/categories/${id}`);
  }

  getLastProductId(): Observable<LastId[]> {
    return this.http.get<LastId[]>('http://localhost:3000/lastProductId');
  }

  updateLastProductId(id: LastId): Observable<LastId> {
    return this.http.put<LastId>(`http://localhost:3000/lastProductId/1`, id);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/orders');
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/orders', order);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/orders/${id}`);
  }

  getUsers(): Observable<UserRegistered[]> {
    return this.http.get<UserRegistered[]>('http://localhost:3000/users');
  }

  addUser(user: UserRegistered): Observable<UserRegistered> {
    return this.http.post<UserRegistered>('http://localhost:3000/users', user);
  }

}
