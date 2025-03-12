import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log('Tentative de connexion avec :', { email: this.email, password: this.password });
    this.authService.login(this.email, this.password).add(() => {
      this.isLoading = false;
    });
  }
}