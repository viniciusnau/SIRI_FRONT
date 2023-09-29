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
  isAdmin: boolean;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const localAdmin = localStorage.getItem('is_admin');
    const sessionAdmin = sessionStorage.getItem('is_admin');
    this.isAdmin = JSON.parse(localAdmin || sessionAdmin);
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
