import { Component, OnInit, AfterViewInit, ElementRef, ViewChild,  HostBinding, effect, signal, PLATFORM_ID, Inject } from '@angular/core';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  data: any;
  title = 'frontend';

  isAuthenticated: boolean = false;


  
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
  }

  @ViewChild('animatedText') animatedText!: ElementRef;

  ngAfterViewInit(): void {
    // Enregistrez les plugins GSAP (optionnel, mais recommandé)
    gsap.registerPlugin();

    // Animation GSAP
    gsap.from(this.animatedText.nativeElement, { opacity: 0, y: -50, duration: 1 });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}