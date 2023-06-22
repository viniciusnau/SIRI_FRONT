import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = environment.apiUrl;
  httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const storedAuth =
      localStorage.getItem('auth') || sessionStorage.getItem('auth');
    const [username, password] = storedAuth
      ? storedAuth.split(':')
      : [null, null];

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      }),
    };
  }

  public getUser(pageChange = ''): Observable<any> {
    return Number(pageChange) > 1
      ? this.httpClient.get<any>(
          `${this.apiUrl}/order/?page=${pageChange}`,
          this.httpOptions,
        )
      : this.httpClient.get<any>(`${this.apiUrl}/me/`, this.httpOptions);
  }

  resetPassword(email: string): Observable<any> {
    const payload = { email: email };
    return this.httpClient.post(this.apiUrl + '/password-reset/', payload);
  }
}
