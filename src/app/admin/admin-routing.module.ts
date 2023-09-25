import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { StockComponent } from './pages/stock/stock.component';
import { StockItemsComponent } from './pages/stock/stock-items/stock-items.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SupplierOrdersComponent } from './pages/supplier-orders/supplier-orders.component';
import { SupplierOrderItemsComponent } from './pages/supplier-orders/supplier-order-items/supplier-order-items.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ReceivingReportsComponent } from './pages/receiving-reports/receiving-reports.component';
import { DispatchReportsComponent } from './pages/dispatch-reports/dispatch-reports.component';
import { MaterialsOrderComponent } from './pages/materials-order/materials-order.component';
import { ProtocolsComponent } from './pages/protocols/protocols.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SectorsComponent } from './pages/sectors/sectors.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MeasuresComponent } from './pages/measures/measures.component';
import { ProductsComponent } from './pages/products/products.component';
import { BiddingExemption } from './pages/bidding-exemption/bidding-exemption.component';
import { AuthAdminGuard } from '../services/guards/auth-admin.guard';
import { AccountantReports } from './pages/accountant-reports/accountant-reports.component';
import { StockReportsComponent } from './pages/stock-reports/stock-reports.component';
import { WarehouseReportsComponent } from './pages/warehouse-reports/warehouse-reports.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { GeneralSupplierOrders } from './pages/general-supplier-orders/general-supplier-orders.component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/general-supplier-orders/supplier-order-items/general-supplier-order-items.component';
import { ProtocolItemsComponent } from './pages/protocols/protocols-items/protocol-items.component';

const routes: Routes = [
  {
    path: 'admin',
    component: OrdersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'atas/itens/:id',
    component: ProtocolItemsComponent,
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
    component: StockComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'estoque-por-setor/itens/:id',
    component: StockItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'notas',
    component: InvoicesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'fornecedor/pedidos/:id',
    component: SupplierOrdersComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'fornecedor/pedidos/itens/:id',
    component: SupplierOrderItemsComponent,
    canActivate: [AuthAdminGuard],
    pathMatch: 'full',
  },
  {
    path: 'fornecedores',
    component: SuppliersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'guias-de-entrada',
    component: ReceivingReportsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'guias-de-saida',
    component: DispatchReportsComponent,
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
    component: ProtocolsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'mudar-senha-admin',
    component: ResetPasswordComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'setores',
    component: SectorsComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'categorias',
    component: CategoriesComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'medidas',
    component: MeasuresComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'produtos',
    component: ProductsComponent,
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
  { path: 'relatorio-de-estoque', component: StockReportsComponent },
  {
    path: 'relatorio-do-almoxarifado',
    component: WarehouseReportsComponent,
  },
  {
    path: 'enviar-email',
    component: SendEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
