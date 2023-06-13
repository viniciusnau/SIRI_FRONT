import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  constructor(private loginService: LoginService) {}

  logout = () => this.loginService.logoutAdmin();
}
