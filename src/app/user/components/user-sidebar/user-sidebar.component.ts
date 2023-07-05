import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss'],
})
export class UserSidebarComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  userName: string = '';

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')
      ? sessionStorage.getItem('userName')
      : localStorage.getItem('userName');
  }

  logout = () => this.loginService.logoutUser();

  resetPassword() {
    this.router.navigate(['mudar-senha/']).then((r) => {});
  }
}
