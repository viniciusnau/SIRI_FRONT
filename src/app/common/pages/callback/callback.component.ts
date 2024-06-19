import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/env.environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.handleCallback();
  }

  private login(apiToken: string): void {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + apiToken,
      }),
    };

    this.httpClient.get<any>(`${this.apiUrl}/me/`, options).pipe(
      tap((response) => {
        const is_admin = response.is_admin;
        const username = response.client.name;
        this.storeUserData(apiToken, username, is_admin);
        this.navigateToDashboard(is_admin);
      })
    ).subscribe();
  }

  private storeUserData(apiToken: string, username: string, is_admin: any): void {
    const storage = sessionStorage;

    storage.setItem('apiToken', apiToken);
    storage.setItem('is_admin', is_admin ? 'true' : 'false');
    storage.setItem('userName', username);
  }

  private navigateToDashboard(isAdmin: boolean): void {
    const route = isAdmin ? '/admin' : '/criar-pedido';
    this.router.navigate([route]);
  }

  handleCallback(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const apiToken = paramMap.get('apiToken');

      if (apiToken) {
        this.login(apiToken);
      }
    });
  }
}
