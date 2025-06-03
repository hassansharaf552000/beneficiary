import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = '/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUserSubject.next(JSON.parse(stored));
      }
    }
  }
  login(username: string, password: string): Observable<User> {
    return this.http.post<{ user: User; token: string }>(
      `${this.apiUrl}/login`,
      { username, password }
    ).pipe(
      tap((res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
        }
        this.currentUserSubject.next(res.user);
      }),
      map((res) => res.user)
    );
  }
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }
  registerBeneficiary(payload: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post('/api/users', { ...payload, role: 'Beneficiary' });
  }

  createUser(payload: {
    username: string;
    email: string;
    password: string;
    role: 'Admin' | 'Beneficiary';
  }): Observable<any> {
    return this.http.post('/api/users', { ...payload, isAdminCreated: true });
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  hasRole(role: 'Admin' | 'Beneficiary'): boolean {
    return this.currentUser?.role === role;
  }
}