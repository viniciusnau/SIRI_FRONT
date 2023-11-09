import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    const local = JSON.parse(localStorage.getItem('is_admin'));
    const session = JSON.parse(sessionStorage.getItem('is_admin'));
    const isAdmin = local || session;
    if (this.loginService.isLogged() && !isAdmin) {
      return true;
    }

    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
