import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sections = {
    account: false,
  };
  userName: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')
      ? sessionStorage.getItem('userName')
      : localStorage.getItem('userName');
  }

  logout() {
    this.loginService.logout();
  }

  resetPassword() {
    this.router.navigate(['mudar-senha-user/']).then((r) => {});
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }
}
