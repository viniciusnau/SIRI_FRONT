import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/env.environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(loginData: any): Observable<any> {
    const { username, password, remember } = loginData;

    return this.httpClient.post<any>(`${this.apiUrl}/login/`, loginData).pipe(
      tap((response) => {
        const token = btoa(JSON.stringify(response['token']));
        this.checkForAdmin(username, password).subscribe((body: any) => {
          this.storeUserData(token, username, password, body, remember);
          this.navigateToDashboard(body.is_admin);
        });
      }),
    );
  }

  private checkForAdmin(
    username: string,
    password: string,
  ): Observable<boolean> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
    return this.httpClient.get<any>(`${this.apiUrl}/me/`, options).pipe(
      tap((response) => {
        if (response.is_admin !== undefined) {
          return response.is_admin;
        }
        return false;
      }),
    );
  }

  private storeUserData(
    token: string,
    username: string,
    password: string,
    body: any,
    remember: boolean,
  ): void {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem('token', token);
    storage.setItem('auth', `${username}:${password}`);
    storage.setItem('is_admin', body.is_admin ? 'true' : 'false');
    storage.setItem('userName', username);
  }

  private navigateToDashboard(isAdmin: boolean): void {
    const route = isAdmin ? '/admin' : '/';
    this.router.navigate([route]);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const localApiToken = localStorage.getItem('apiToken');
    const sessionApiToken = sessionStorage.getItem('apiToken');
    const token = localToken || sessionToken || localApiToken || sessionApiToken;
    return !!token;
  }
}
