import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de l'API Laravel
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Injectez PLATFORM_ID
  ) {
    this.checkAuthStatus();
  }

  // Vérifier le statut d'authentification
  private checkAuthStatus(): void {
    if (isPlatformBrowser(this.platformId)) { 
      const token = localStorage.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  // Connexion
  login(email: string, password: string) {
    console.log('Tentative de connexion avec :', { email, password }); 
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API :', response); 
        if (isPlatformBrowser(this.platformId)) { 
          localStorage.setItem('token', response.token);
        }
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
      }
    });
  }

  // Inscription
  register(name: string, email: string, password: string) {
    console.log('Tentative d\'inscription avec :', { name, email, password }); 
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).subscribe({
      next: () => {
        console.log('Inscription réussie'); 
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur d\'inscription', error);
      }
    });
  }

  // Déconnexion
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}