import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { CommonModule } from '@angular/common'; 
import { ApiService } from './services/api.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  data: any;
  title = 'frontend';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  @ViewChild('animatedText') animatedText!: ElementRef;

  ngAfterViewInit(): void {
    gsap.from(this.animatedText.nativeElement, { opacity: 0, y: -50, duration: 1 });
  }

  fetchData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  login() {
    this.apiService.login('john@example.com', 'password123').subscribe(response => {
      console.log('Login successful', response);
    });
  }

  getPosts() {
    this.apiService.getPosts().subscribe(response => {
      console.log('Posts', response);
    });
  }
}
