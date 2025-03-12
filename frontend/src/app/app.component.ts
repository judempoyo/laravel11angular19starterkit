import { Component, OnInit, AfterViewInit, ElementRef, ViewChild,  HostBinding, effect, signal, PLATFORM_ID, Inject } from '@angular/core';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators'; // Import filter

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  data: any;
  title = 'frontend';
  hideHeader: boolean = false; 
  isAuthenticated: boolean = false;
  isMenuOpen: boolean = false;
  
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.animateMenu();
  }


  
  constructor(  private authService: AuthService,
    private router: Router, public localStorageService: LocalStorageService,@Inject(PLATFORM_ID) private platformId: Object) {

  }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Accès au DOM uniquement côté client
      this.localStorageService.initTheme();
    }

    this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });


  this.router.events
  .pipe(filter((event) => event instanceof NavigationEnd))
  .subscribe((event: any) => {
    this.hideHeader = ['/login', '/register'].includes(event.url);
  });

  }


  ngAfterViewInit(): void {
    // Enregistrez les plugins GSAP (optionnel, mais recommandé)
    gsap.registerPlugin();

    // Animation GSAP
    gsap.set(this.mobileMenu.nativeElement, { opacity: 0, y: -20, scale: 0.9 });
    gsap.set(this.mobileMenu.nativeElement.querySelectorAll('button'), { opacity: 0, y: -10 });
  
  }



  animateMenu(): void {
    if (this.isMenuOpen) {
      gsap.to(this.mobileMenu.nativeElement, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(this.mobileMenu.nativeElement.querySelectorAll('button'), {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.1
      });
    } else {
      gsap.to(this.mobileMenu.nativeElement, {
        opacity: 0,
        y: -20,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in'
      });
      gsap.to(this.mobileMenu.nativeElement.querySelectorAll('button'), {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        stagger: 0.1
      });
    }  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}