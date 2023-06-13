import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/env.environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../admin/components/modal/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  private checkForAdmin({ user, password }): Observable<boolean> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${user}:${password}`),
      }),
    };
    return this.httpClient
      .get<any>(`${this.apiUrl}/me/`, options)
      .pipe(map((response) => response.is_admin));
  }

  loginAdmin(loginData): Observable<any> {
    const { username, password } = loginData;
    const { remember } = loginData;

    return this.httpClient.post<any>(`${this.apiUrl}/login/`, loginData).pipe(
      tap(
        (response) => {
          if (!response.token) return;

          const token = btoa(JSON.stringify(response['token']));

          this.checkForAdmin({ user: username, password }).subscribe((isAdmin) => {
            if (!isAdmin) {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '300px',
                data: {
                  title: "Senha ou usuário incorreto",
                  message: "Verifique suas credenciais"
                }
              });
            } else {
              if (remember) {
                localStorage.setItem('token', token);
                localStorage.setItem('auth', `${username}:${password}`);
                localStorage.setItem('is_admin', 'true');
              } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('auth', `${username}:${password}`);
                sessionStorage.setItem('is_admin', 'true');
              }

              this.router.navigate(['/admin']);
            }
          });
        },
        (error) => {
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '300px',
              data: {
                title: "Erro de autenticação",
                message: "Verifique seus dados de login"
              }
            });
        }
      )
    );
  }

  loginUser(loginData): Observable<any> {
    const { username, password } = loginData;
    const { remember } = loginData;

    return this.httpClient.post<any>(`${this.apiUrl}/login/`, loginData).pipe(
      tap(
        (response) => {
          if (!response.token) return;

          const token = btoa(JSON.stringify(response['token']));

          this.checkForAdmin({ user: username, password }).subscribe((isAdmin) => {
            if (isAdmin) {
              const dialogRef = this.dialog.open(DialogComponent, {
                width: '300px',
                data: {
                  title: "Senha ou usuário incorreto",
                  message: "Verifique suas credenciais"
                }
              });
            } else {
              if (remember) {
                localStorage.setItem('token', token);
                localStorage.setItem('auth', `${username}:${password}`);
                localStorage.setItem('is_admin', 'true');
              } else {
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('auth', `${username}:${password}`);
                sessionStorage.setItem('is_admin', 'true');
              }

              this.router.navigate(['/']);
            }
          });
        },
        (error) => {
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '300px',
            data: {
              title: "Erro de autenticação",
              message: "Verifique seus dados de login"
            }
          });
        }
      )
    );
  }

  logoutAdmin() {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/admin/login']);
  }

  logoutUser() {
    localStorage.clear();
    sessionStorage.clear();

    this.router.navigate(['/login']);
  }

  get isLogged(): boolean {
    const local = localStorage.getItem('token') ? true : false;
    const section = sessionStorage.getItem('token') ? true : false;

    return local || section;
  }

  get isAdminLogged(): boolean {
    const local = localStorage.getItem('token') ? true : false;
    const section = sessionStorage.getItem('token') ? true : false;

    return local || section;
  }
}
