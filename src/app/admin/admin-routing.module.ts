import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { AdminStockComponent } from './pages/admin-stock/admin-stock.component';
import { AdminStockItemsComponent } from './pages/admin-stock/admin-stock-items/admin-stock-items.component';
import { AdminRequestComponent } from './pages/admin-request/admin-request.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { AdminSupplierOrdersComponent } from './pages/admin-supplier-orders/admin-supplier-orders.component';
import { AdminSupplierOrderItemsComponent } from './pages/admin-supplier-orders/admin-supplier-order-items/admin-supplier-order-items.component';
import { AdminSuppliersComponent } from './pages/admin-suppliers/admin-suppliers.component';
import { AdminReceivingReportsComponent } from './pages/admin-receiving-reports/admin-receiving-reports.component';
import { DispatchReports } from './pages/dispatch-reports/dispatch-reports.component';
import { MaterialsOrderComponent } from './pages/materials-order/materials-order.component';
import { AdminProtocolsComponent } from './pages/admin-protocols/admin-protocols.component';
import { AdminResetPasswordComponent } from './pages/admin-reset-password/admin-reset-password.component';
import { AdminSectorsComponent } from './pages/admin-sectors/admin-sectors.component';
import { Categories } from './pages/categories/categories.component';
import { MeasuresComponent } from './pages/measures/measures.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { BiddingExemption } from './pages/bidding-exemption/bidding-exemption.component';
import { AuthAdminGuard } from '../services/guards/auth-admin.guard';
import { AccountantReports } from './pages/accountant-reports/accountant-reports.component';
import { AdminStockReportsComponent } from './pages/admin-stock-reports/admin-stock-reports.component';
import { AdminWarehouseReportsComponent } from './pages/admin-warehouse-reports/admin-warehouse-reports.component';
import { AdminSendEmailComponent } from './pages/admin-send-email/admin-send-email.component';
import { GeneralSupplierOrders } from './pages/general-supplier-orders/general-supplier-orders.component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/general-supplier-orders/admin-supplier-order-items/admin-general-supplier-order-items.component';
import { AdminProtocolItemsComponent } from './pages/admin-protocols/admin-protocols-items/admin-protocol-items.component';

const routes: Routes = [
  {
    path: 'admin',
    component: OrdersComponent,
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
    component: OrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'gerenciar-pedidos/itens/:id',
    component: OrderItemsComponent,
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
    component: InvoicesComponent,
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
    component: DispatchReports,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'pedido-de-AF',
    component: MaterialsOrderComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'pedidos-fornecedor',
    component: GeneralSupplierOrders,
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
    component: Categories,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'medidas',
    component: MeasuresComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'produtos',
    component: AdminProductsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'dispensa-de-licitacao',
    component: BiddingExemption,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'relatorio-do-contador',
    component: AccountantReports,
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
