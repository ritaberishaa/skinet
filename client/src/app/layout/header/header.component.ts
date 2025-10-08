import { Component, inject } from '@angular/core';
import { MatIcon} from "@angular/material/icon";
import { MatBadge} from "@angular/material/badge";
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BusyService } from '../../core/services/busy.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatBadge,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatProgressBar
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  busyService = inject(BusyService);
  mobileMenuOpen = false;
  currentPage = 'HOME';

  constructor() {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    ).subscribe(event => {
      this.updateCurrentPage(event.url);
    });
    
    // Set initial page
    this.updateCurrentPage(this.router.url);
  }

  private updateCurrentPage(url: string): void {
    if (url === '/' || url === '') {
      this.currentPage = 'HOME';
    } else if (url.startsWith('/shop')) {
      this.currentPage = 'SHOP';
    } else if (url.startsWith('/contact')) {
      this.currentPage = 'CONTACT';
    } else {
      this.currentPage = 'HOME';
    }
  }

  getPageTitle(): string {
    return this.currentPage;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
