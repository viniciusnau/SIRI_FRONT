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
  currentRoute: string = '';

  sidebarCategories = {
    account: ['/mudar-senha-user'],
    createRequest: ['/criar-pedido'],
    requests: ['/pedidos'],
    stock: ['/estoque'],
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.updateSections();
    this.userName = sessionStorage.getItem('userName')
      ? sessionStorage.getItem('userName')
      : localStorage.getItem('userName');
  }

  updateSections(): void {
    Object.keys(this.sidebarCategories).forEach((section) => {
      if (
        this.sidebarCategories[section].some((route) =>
          this.isCurrentRoute(route),
        )
      ) {
        this.sections[section] = true;
      } else {
        this.sections[section] = false;
      }
    });
  }

  isCurrentRoute(section: string): boolean {
    return this.router.url.includes(section);
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
