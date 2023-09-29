import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sections = {
    account: false,
    reports: false,
    order: false,
    inventory: false,
    administration: false,
    product: false,
    supplier: false,
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
    this.router.navigate(['/mudar-senha-admin']).then((r) => {});
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }
}
