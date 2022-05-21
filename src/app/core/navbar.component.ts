import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <header>
      <mat-toolbar color="primary" class="h-100">
        <button mat-icon-button (click)="sidebarClick()" class="d-lg-none">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Product Orders Manager</span>
        <span class="nav-spacer"></span>
        <div class="position-relative h-100 d-flex justify-content-center align-items-center" (mouseenter)="showLogOut = true" (mouseleave)="showLogOut = false" *ngIf="isLoggedIn()">
          <button mat-icon-button>
            <mat-icon>person</mat-icon>
          </button>
          <div class="log-out position-absolute py-2 px-5 rounded border border-secondary d-flex justify-content-center align-items-center" *ngIf="showLogOut">
            <button mat-raised-button color="warn" (click)="logout()">Log-Out</button>
          </div>
        </div>
      </mat-toolbar>
    </header>
  `,
  styles: [`
  header {
    height: 70px;
    z-index: 1;
    .nav-spacer {
      flex: 1 1 auto;
    }
    button {
      &:hover {
        opacity: 0.8;
      }
    }
    .log-out {
      top: 100%;
      right: -38%;
      z-index: 2;
      background-color: #673ab7;
    }
  }
  `]
})
export class NavbarComponent implements OnInit {
  showLogOut: boolean = false;

  constructor(private sidebarService: SidebarService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  sidebarClick(): void {
    this.sidebarService.onNavbarClick();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
