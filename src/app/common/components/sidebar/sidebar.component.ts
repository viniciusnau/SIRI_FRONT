import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'common-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isAdmin: boolean;

  ngOnInit(): void {
    const localAdmin = localStorage.getItem('is_admin');
    const sessionAdmin = sessionStorage.getItem('is_admin');
    this.isAdmin = JSON.parse(localAdmin || sessionAdmin);
  }
}
