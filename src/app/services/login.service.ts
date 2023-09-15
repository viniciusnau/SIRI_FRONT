// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
// import { environment } from '../environments/env.environment';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../admin/components/modal/dialog.component';

// @Injectable({
//   providedIn: 'root',
// })
// export class LoginService {
//   apiUrl = environment.apiUrl;
//   isAdmin: string;

//   constructor(
//     private httpClient: HttpClient,
//     private router: Router,
//     private dialog: MatDialog,
//   ) {}

//   private checkForAdmin({ user, password }): Observable<boolean> {
//     const options = {
//       headers: new HttpHeaders({
//         Authorization: 'Basic ' + btoa(`${user}:${password}`),
//       }),
//     };
//     return this.httpClient
//       .get<any>(`${this.apiUrl}/me/`, options)
//       .pipe(map((response) => (this.isAdmin = response.is_admin)));
//   }

//   login(loginData: any): Observable<any> {
//     const { username, password } = loginData;
//     const { remember } = loginData;

//     return this.httpClient.post<any>(`${this.apiUrl}/login/`, loginData).pipe(
//       tap((response) => {
//         // if (!response.token) return;
//         const token = btoa(JSON.stringify(response['token']));

//         return this.checkForAdmin({ user: username, password }).subscribe(
//           (isAdmin) => {
//             if (isAdmin) {
//               if (remember) {
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('auth', `${username}:${password}`);
//                 localStorage.setItem('is_admin', 'true');
//                 localStorage.setItem('userName', username);
//               } else {
//                 sessionStorage.setItem('token', token);
//                 sessionStorage.setItem('auth', `${username}:${password}`);
//                 sessionStorage.setItem('is_admin', 'true');
//                 sessionStorage.setItem('userName', username);
//               }
//               this.router.navigate(['/admin']);
//             } else {
//               if (remember) {
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('auth', `${username}:${password}`);
//                 localStorage.setItem('is_admin', 'false');
//                 localStorage.setItem('userName', username);
//               } else {
//                 sessionStorage.setItem('token', token);
//                 sessionStorage.setItem('auth', `${username}:${password}`);
//                 sessionStorage.setItem('is_admin', 'false');
//                 sessionStorage.setItem('userName', username);
//               }
//               this.router.navigate(['/']);
//             }
//           },
//         );
//       }),
//     );
//   }

//   logout() {
//     localStorage.clear();
//     sessionStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   get getUrl(): string {
//     return this.router.url;
//   }

//   isLogged(): boolean {
//     const localToken = localStorage.getItem('token');
//     const sessionToken = sessionStorage.getItem('token');
//     const token = localToken || sessionToken;
//     return !!token;
//   }
// }

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
        this.checkForAdmin(username, password).subscribe((isAdmin) => {
          this.storeUserData(token, username, password, isAdmin, remember);
          this.navigateToDashboard(isAdmin);
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
    isAdmin: boolean,
    remember: boolean,
  ): void {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem('token', token);
    storage.setItem('auth', `${username}:${password}`);
    storage.setItem('is_admin', isAdmin ? 'true' : 'false');
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

  get getUrl(): string {
    return this.router.url;
  }

  isLogged(): boolean {
    const localToken = localStorage.getItem('token');
    const sessionToken = sessionStorage.getItem('token');
    const token = localToken || sessionToken;
    return !!token;
  }
}
