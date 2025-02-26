// theme.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get systemDarkTheme(): boolean {
    return this.isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  get storedTheme(): string | null {
    return this.isBrowser ? localStorage.getItem('theme') : null;
  }

  initTheme() {
    if (!this.isBrowser) return;

    const storedTheme = this.storedTheme;
    if (storedTheme) {
      storedTheme === 'dark' ? this.enableDark() : this.enableLight();
    } else if (this.systemDarkTheme) {
      this.enableDark();
    }
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', 
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }

  enableDark() {
    if (this.isBrowser) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  enableLight() {
    if (this.isBrowser) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}