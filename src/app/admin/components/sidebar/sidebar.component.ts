import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
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
    this.router.navigate(['/mudar-senha-admin']).then((r) => {});
  }

  toggleUserSection() {
    this.userSectionExpanded = !this.userSectionExpanded;
  }

  toggleReportsSection() {
    this.reportsSectionExpanded = !this.reportsSectionExpanded;
  }
}
