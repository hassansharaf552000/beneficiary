import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
@ViewChild('navbarContent') navbarContentRef!: ElementRef<HTMLDivElement>;
  private routerSub!: Subscription;

  constructor(public auth: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const nativeEl = this.navbarContentRef.nativeElement;
        if (nativeEl.classList.contains('show')) {
          nativeEl.classList.remove('show');
        }
      });
  }  logoutAndCollapse(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
    const nativeEl = this.navbarContentRef.nativeElement;
    if (nativeEl.classList.contains('show')) {
      nativeEl.classList.remove('show');
    }
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onNavigate(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
