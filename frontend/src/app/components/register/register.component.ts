import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
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
    this.authService.register(this.name, this.email, this.password).add(() => {
      this.isLoading = false;
    });
  }
}