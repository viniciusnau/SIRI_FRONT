import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {
    const local = JSON.parse(localStorage.getItem('is_admin'));
    const session = JSON.parse(sessionStorage.getItem('is_admin'));
    const apiTokenString = sessionStorage.getItem('apiToken');
    const hasApiToken = apiTokenString !== null && apiTokenString !== undefined;
    const isAdmin = local || session || hasApiToken;
    if (this.loginService.isLogged() && isAdmin) {
      return true;
    }
    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
