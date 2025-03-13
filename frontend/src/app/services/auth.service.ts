import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) { 
      const token = localStorage.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  login(email: string, password: string) {
    console.log('Tentative de connexion avec :', { email, password }); 
    return this.http.post<{ token: string, user: any }>(`${this.apiUrl}/auth/login`, { email, password }).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API :', response); 
        if (isPlatformBrowser(this.platformId)) { 
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user)); 
        }
        this.isAuthenticatedSubject.next(true);
        this.errorMessageSubject.next(null); 
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        this.errorMessageSubject.next(error.error.message || 'Une erreur s\'est produite lors de la connexion.');
      }
    });
  }
  register(name: string, email: string, password: string) {
    console.log('Tentative d\'inscription avec :', { name, email, password }); 
    return this.http.post(`${this.apiUrl}/auth/register`, { name, email, password }).subscribe({
      next: () => {
        console.log('Inscription réussie'); 
        this.errorMessageSubject.next(null); // Clear any previous error message
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur d\'inscription', error);
        this.errorMessageSubject.next(error.error.message || 'Une erreur s\'est produite lors de l\'inscription.');
      }
    });
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value; // Renvoie la valeur actuelle du BehaviorSubject
  } 
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}