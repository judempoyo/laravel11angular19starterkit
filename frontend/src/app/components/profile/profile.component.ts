import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('profileCard') profileCard!: ElementRef;

  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  ngAfterViewInit(): void {
    // Animation GSAP pour le profil
    gsap.from(this.profileCard.nativeElement, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    });
  }
}