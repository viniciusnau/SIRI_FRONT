import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  sections = {
    account: false,
    product: false,
    inventory: false,
    order: false,
    administration: false,
    supplier: false,
    reports: false,
  };
  userName: string = '';
  currentRoute: string = '';

  sidebarCategories = {
    account: ['/mudar-senha-admin'],
    product: ['/categorias', '/medidas', '/produtos'],
    inventory: ['/estoque-por-setor', '/guias-de-entrada', '/guias-de-saida'],
    order: ['/gerenciar-pedidos', '/pedidos-fornecedor', '/pedido-de-AF'],
    administration: [
      '/setores',
      '/notas',
      '/atas',
      '/dispensa-de-licitacao',
      '/enviar-email',
    ],
    supplier: ['fornecedores'],
    reports: [
      '/relatorio-do-contador',
      '/relatorio-de-estoque',
      '/relatorio-do-almoxarifado',
    ],
  };

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.updateSections();
    this.userName =
      sessionStorage.getItem('userName') || localStorage.getItem('userName');
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
    this.router.navigate(['/mudar-senha-admin']).then((r) => {});
  }

  toggleSection(section: string) {
    this.sections[section] = !this.sections[section];
  }
}
