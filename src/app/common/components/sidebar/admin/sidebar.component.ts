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
  pathname: string = window.location.pathname;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName')
      ? sessionStorage.getItem('userName')
      : localStorage.getItem('userName');
  }

  logout() {
    this.loginService.logout();
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }

  handlePathname(item: string) {
    return this.pathname.match(item);
  }
}
