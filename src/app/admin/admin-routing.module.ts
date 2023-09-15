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
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
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
    path: 'admin/atas/itens/:id',
    component: AdminProtocolItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/pedidos',
    component: AdminOrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/pedidos/itens/:id',
    component: AdminOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/estoque',
    component: AdminStockComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/estoque/itens/:id',
    component: AdminStockItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/pedir',
    component: AdminRequestComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/notas',
    component: AdminInvoicesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/fornecedor/pedidos/:id',
    component: AdminSupplierOrdersComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/fornecedor/pedidos/itens/:id',
    component: AdminSupplierOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/fornecedores',
    component: AdminSuppliersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/guias-de-entrada',
    component: AdminReceivingReportsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/guias-de-saida',
    component: AdminDispatchReportsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/pedido-de-AF',
    component: AdminMaterialsOrderComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/pedidos-fornecedor',
    component: AdminGeneralSupplierOrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/pedidos-fornecedor/itens/:id',
    component: AdminGeneralSupplierOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'admin/atas',
    component: AdminProtocolsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin/esqueci-a-senha',
    component: AdminResetPasswordComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/setores',
    component: AdminSectorsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/categorias',
    component: AdminCategoriesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/medidas',
    component: AdminMeasuresComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/produtos',
    component: AdminProductsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/dispensa-de-licitacao',
    component: AdminBiddingExemptionComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'admin/relatorio-do-contador',
    component: AdminAccountantReportsComponent,
  },
  { path: 'admin/relatorio-de-estoque', component: AdminStockReportsComponent },
  {
    path: 'admin/relatorio-do-almoxarifado',
    component: AdminWarehouseReportsComponent,
  },
  {
    path: 'admin/enviar-email',
    component: AdminSendEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
