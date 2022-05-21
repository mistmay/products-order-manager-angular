import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  navbarClick: boolean = false;
  showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getSideBarObservable(): Observable<boolean> {
    return this.showSidebar.asObservable();
  }

  onNavbarClick(): void {
    this.navbarClick = !this.navbarClick;
    this.showSidebar.next(this.navbarClick);
  }

  resetNavbarClick(): void {
    this.navbarClick = false;
    this.showSidebar.next(this.navbarClick);
  }

}
