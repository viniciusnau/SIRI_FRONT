import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  userSectionExpanded: boolean = false;
  reportsSectionExpanded: boolean = false;
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
    this.router.navigate(['/admin/esqueci-a-senha']).then((r) => {});
  }

  toggleUserSection() {
    this.userSectionExpanded = !this.userSectionExpanded;
  }

  toggleReportsSection() {
    this.reportsSectionExpanded = !this.reportsSectionExpanded;
  }
}
