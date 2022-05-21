import { Component, OnDestroy, OnInit, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { SidebarService } from "src/app/services/sidebar.service";

@Component({
    selector: 'app-panel-top',
    template: `
    <main class="d-flex align-items-center">
        <app-sidebar class="h-100" *ngIf="windowSize >= 992 || (windowSize < 992 && showSidebar)"></app-sidebar>
        <section class="h-100 bg-secondary p-3" *ngIf="windowSize >= 992 || (windowSize < 992 && !showSidebar)">
            <router-outlet></router-outlet>
        </section>
    </main>
    `,
    styles: [`
    main {
        height: calc(100vh - 70px);
        app-sidebar {
            width: 100%;
        }
        section {
            width: 100%;
        }
    }
    @media (min-width: 992px) { 
        main {
        app-sidebar {
            width: 300px;
        }
        section {
            width: calc(100% - 300px);
        }
    }
     }
    `]
})
export class PanelTopComponent implements OnInit, OnDestroy {
    windowSize!: number;
    showSidebar!: boolean;
    subscription!: Subscription;

    constructor(private sidebarService: SidebarService) { }

    ngOnInit(): void {
        this.windowSize = window.innerWidth;
        this.subscription = this.sidebarService.getSideBarObservable()
            .subscribe((res: boolean) => {
                this.showSidebar = res;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.windowSize = (event.target as Window).innerWidth;
        if (this.windowSize >= 992) {
            this.sidebarService.resetNavbarClick();
        }
    }

}