import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminOrderItemsComponent } from './pages/admin-orders/admin-order-items/admin-order-items.component';
import { AdminStockComponent } from './pages/admin-stock/admin-stock.component';
import { AdminStockItemsComponent } from './pages/admin-stock/admin-stock-items/admin-stock-items.component';
import { AdminRequestComponent } from './pages/admin-request/admin-request.component';
import { AdminInvoicesComponent } from './pages/admin-invoices/admin-invoices.component';
import { AdminSupplierOrdersComponent } from './pages/admin-supplier-orders/admin-supplier-orders.component';
import { AdminSupplierOrderItemsComponent } from './pages/admin-supplier-orders/admin-supplier-order-items/admin-supplier-order-items.component';
import { AdminSuppliersComponent } from './pages/admin-suppliers/admin-suppliers.component';
import { AdminReceivingReportsComponent } from './pages/admin-receiving-reports/admin-receiving-reports.component';
import { AdminDispatchReportsComponent } from './pages/admin-dispatch-reports/admin-dispatch-reports.component';
import { AdminMaterialsOrderComponent } from './pages/admin-materials-order/admin-materials-order.component';
import { AdminProtocolsComponent } from './pages/admin-protocols/admin-protocols.component';
import { AdminResetPasswordComponent } from './pages/admin-reset-password/admin-reset-password.component';
import { AdminSectorsComponent } from './pages/admin-sectors/admin-sectors.component';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories.component';
import { AdminMeasuresComponent } from './pages/admin-measures/admin-measures.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminBiddingExemptionComponent } from './pages/admin-bidding-exemption/admin-bidding-exemption.component';
import { AuthAdminGuard } from '../services/guards/auth-admin.guard';
import { AdminAccountantReportsComponent } from './pages/admin-accountant-reports/admin-accountant-reports.component';
import { AdminStockReportsComponent } from './pages/admin-stock-reports/admin-stock-reports.component';
import { AdminWarehouseReportsComponent } from './pages/admin-warehouse-reports/admin-warehouse-reports.component';
import { AdminSendEmailComponent } from './pages/admin-send-email/admin-send-email.component';
import { AdminGeneralSupplierOrdersComponent } from './pages/admin-general-supplier-orders/admin-general-supplier-orders.component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/admin-general-supplier-orders/admin-supplier-order-items/admin-general-supplier-order-items.component';
import { AdminProtocolItemsComponent } from './pages/admin-protocols/admin-protocols-items/admin-protocol-items.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminOrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'atas/itens/:id',
    component: AdminProtocolItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'gerenciar-pedidos',
    component: AdminOrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'gerenciar-pedidos/itens/:id',
    component: AdminOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'estoque-por-setor',
    component: AdminStockComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'estoque-por-setor/itens/:id',
    component: AdminStockItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'pedir',
    component: AdminRequestComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'notas',
    component: AdminInvoicesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'fornecedor/pedidos/:id',
    component: AdminSupplierOrdersComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'fornecedor/pedidos/itens/:id',
    component: AdminSupplierOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'fornecedores',
    component: AdminSuppliersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'guias-de-entrada',
    component: AdminReceivingReportsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'guias-de-saida',
    component: AdminDispatchReportsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'pedido-de-AF',
    component: AdminMaterialsOrderComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'pedidos-fornecedor',
    component: AdminGeneralSupplierOrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'pedidos-fornecedor/itens/:id',
    component: AdminGeneralSupplierOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'atas',
    component: AdminProtocolsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'mudar-senha-admin',
    component: AdminResetPasswordComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'setores',
    component: AdminSectorsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'categorias',
    component: AdminCategoriesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'medidas',
    component: AdminMeasuresComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'produtos',
    component: AdminProductsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'dispensa-de-licitacao',
    component: AdminBiddingExemptionComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'relatorio-do-contador',
    component: AdminAccountantReportsComponent,
  },
  { path: 'relatorio-de-estoque', component: AdminStockReportsComponent },
  {
    path: 'relatorio-do-almoxarifado',
    component: AdminWarehouseReportsComponent,
  },
  {
    path: 'enviar-email',
    component: AdminSendEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
