import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { delay, Observable, of, tap, throwError } from 'rxjs';

export interface User {
  name: string;
  email: string;
}

const STORAGE_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const MOCK_PASSWORD = 'password123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly currentUser = signal<User | null>(null);
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  constructor() {
    this.loadFromStorage();
  }

  login(email: string, password: string): Observable<User> {
    if (password !== MOCK_PASSWORD) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(800));
    }

    const user: User = { name: email.split('@')[0], email };
    return of(user).pipe(
      delay(800),
      tap((u) => {
        this.currentUser.set(u);
        this.saveToStorage(u);
      }),
    );
  }

  register(name: string, email: string, password: string): Observable<User> {
    if (password.length < 6) {
      return throwError(() => new Error('Password must be at least 6 characters')).pipe(delay(800));
    }

    const user: User = { name, email };
    return of(user).pipe(
      delay(800),
      tap((u) => {
        this.currentUser.set(u);
        this.saveToStorage(u);
      }),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    return null;
  }

  private loadFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        try {
          this.currentUser.set(JSON.parse(userJson));
        } catch {
          this.logout();
        }
      }
    }
  }

  private saveToStorage(user: User): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, 'mock-jwt-token-' + user.email);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }
}
