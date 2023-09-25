import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  userSectionExpanded: boolean = false;
  reportsSectionExpanded: boolean = false;
  userName: string = '';
  is_admin: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin();
    this.userName = sessionStorage.getItem('userName')
      ? sessionStorage.getItem('userName')
      : localStorage.getItem('userName');
  }

  isAdmin() {
    const localToken = localStorage.getItem('is_admin');
    const sessionToken = sessionStorage.getItem('is_admin');
    this.is_admin = !!localToken || !!sessionToken;
    console.log('isAdmin: ', !!localToken || !!sessionToken);
  }

  logout() {
    this.loginService.logout();
  }

  resetPassword() {
    this.router.navigate(['/mudar-senha-admin']).then((r) => {});
  }

  toggleUserSection() {
    this.userSectionExpanded = !this.userSectionExpanded;
  }

  toggleReportsSection() {
    this.reportsSectionExpanded = !this.reportsSectionExpanded;
  }
}
