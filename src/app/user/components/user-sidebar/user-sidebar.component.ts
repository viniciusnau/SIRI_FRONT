import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss'],
})
export class UserSidebarComponent {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  logout = () => this.loginService.logoutUser();

  resetPassword() {
    this.router.navigate(['mudar-senha/']).then(r => {});
  }
}
