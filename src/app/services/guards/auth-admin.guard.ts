import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {
    if (this.loginService.isLogged) {
      return true;
    }
    this.loginService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
