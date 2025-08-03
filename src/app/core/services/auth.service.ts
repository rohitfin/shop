import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isRefreshing = false;
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setTokens(access: string, refresh: string) {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    const refresh = this.getRefreshToken();
    if (!refresh) return throwError(() => 'No refresh token');

    return this.http
      .post<any>('/api/refresh-token', { refreshToken: refresh })
      .pipe(
        tap((res) => {
          this.setTokens(res.accessToken, res.refreshToken);
          this.tokenSubject.next(res.accessToken);
        }),
        catchError((err) => {
          this.logout();
          return throwError(() => err);
        })
      );
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }

  setRefreshing(state: boolean) {
    this.isRefreshing = state;
  }

  isTokenRefreshing(): boolean {
    return this.isRefreshing;
  }
}
