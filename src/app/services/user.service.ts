import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/env.environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = environment.apiUrl;
  httpOptions: { headers: HttpHeaders };

  constructor(private httpClient: HttpClient) {
    const storedAuth = localStorage.getItem('auth') || sessionStorage.getItem('auth');
    let headers = new HttpHeaders();

    if (storedAuth) {
      const [username, password] = storedAuth.split(':');
      headers = headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`));
    } else {
      const apiToken = sessionStorage.getItem('apiToken');
      if (apiToken) {
        headers = headers.set('Authorization', 'Token ' + apiToken);
      }
    }

    this.httpOptions = {
      headers: headers,
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
