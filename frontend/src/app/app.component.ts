import { Component, OnInit, AfterViewInit, ElementRef, ViewChild,  HostBinding, effect, signal, PLATFORM_ID, Inject } from '@angular/core';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet } from '@angular/router';

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


  
  constructor(private apiService: ApiService, public localStorageService: LocalStorageService) {

  }
  
  ngOnInit(): void {
    this.localStorageService.initTheme();
    this.fetchData();
  }

  @ViewChild('animatedText') animatedText!: ElementRef;

  ngAfterViewInit(): void {
    // Enregistrez les plugins GSAP (optionnel, mais recommandé)
    gsap.registerPlugin();

    // Animation GSAP
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
}