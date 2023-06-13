import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login.service';
@Injectable({
  providedIn: 'root',
})
export class UnauthAdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate() {
    if (this.loginService.isAdminLogged) {
      this.router.navigate(['/admin']);
      return false;
    }
    return true;
  }
}
