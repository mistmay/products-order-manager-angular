import { Component } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
    selector: 'app-home',
    template: `
    <main class="w-100">
        <section class="w-100 h-100 d-flex justify-content-center align-items-start px-2 py-5">
            <div class="container bg-white rounded p-5 shadow border border-secondary d-flex flex-column align-items-center gap-5">
                <h1 class="fs-1 fw-bold text-center">Product Order Manager</h1>
                <div class="d-flex justify-content-center align-items-center gap-3">
                    <button mat-raised-button color="warn" (click)="loginForm()">Log-In</button>
                    <button mat-raised-button color="warn" (click)="registerForm()">Register Account</button>
                </div>
            </div>
        </section>
    </main>
    `,
    styles: [`
    main {
        height: calc(100vh - 70px);
        section {
            background-image: url('../../../../assets/img/background.png');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            button {
                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
    `]
})
export class HomeComponent {

    constructor(private modalService: ModalService) { }

    loginForm(): void {
        this.modalService.openModal('log-in');
    }

    registerForm(): void {
        this.modalService.openModal('register');
    }

}