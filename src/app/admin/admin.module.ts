import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminBiddingExemptionComponent } from './pages/admin-bidding-exemption/admin-bidding-exemption.component';
import { MaterialsOrderModalComponent } from './pages/admin-materials-order/modal/materials-order-modal.component';
import { InvoiceModalComponent } from './pages/admin-invoices/modal/invoice-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAccountantReportsComponent } from './pages/admin-accountant-reports/admin-accountant-reports.component';
import { AdminStockReportsComponent } from './pages/admin-stock-reports/admin-stock-reports.component';
import { AdminWarehouseReportsComponent } from './pages/admin-warehouse-reports/admin-warehouse-reports.component';
import { AdminSendEmailComponent } from './pages/admin-send-email/admin-send-email.component';
import { SuppliersModalComponent } from './pages/admin-suppliers/modal/suppliers-modal.component';
import { ReceivingReportsModalComponent } from './pages/admin-receiving-reports/modal/receiving-reports-modal.component';
import { DispatchReportsModalComponent } from './pages/admin-dispatch-reports/modal/dispatch-reports-modal.component';
import { CreateSuppliersModalComponent } from './pages/admin-suppliers/createModal/createSuppliers-modal.component';
import { CreateProtocolsModalComponent } from './pages/admin-protocols/createModal/createProtocols-modal.component';
import { BiddingExemptionModalComponent } from './pages/admin-bidding-exemption/modal/bidding-exemption-modal.component';
import { AccountantReportsModalComponent } from './pages/admin-accountant-reports/modal/accountant-reports-modal.component';
import { DialogComponent } from './components/modal/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditMeasureModalComponent } from './pages/admin-measures/editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './pages/admin-measures/createModal/create-measure-modal.component';
import { CreateCategoryModalComponent } from './pages/admin-categories/createModal/create-category-modal.component';
import { EditCategoryModalComponent } from './pages/admin-categories/editModal/edit-category-modal.component';
import { CreateProductModalComponent } from './pages/admin-products/createModal/create-product-modal.component';
import { EditProductModalComponent } from './pages/admin-products/editModal/edit-product-modal.component';
import { AdminGeneralSupplierOrdersComponent } from './pages/admin-general-supplier-orders/admin-general-supplier-orders.component';
import { EditAdminGeneralSuppliersOrdersModalComponent } from './pages/admin-general-supplier-orders/editModal/edit-admin-general-supplier-orders-modal';
import { CreateAdminGeneralSupplierOrdersModalComponent } from './pages/admin-general-supplier-orders/createModal/create-admin-general-supplier-orders-modal-component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/admin-general-supplier-orders/admin-supplier-order-items/admin-general-supplier-order-items.component';
import { CreateAdminGeneralSupplierOrdersItemsModalComponent } from './pages/admin-general-supplier-orders/admin-supplier-order-items/createModal/create-admin-general-supplier-orders-items-modal-component';
import { ProtocolsModalComponent } from './pages/admin-protocols/modal/protocols-modal.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminOrderItemsComponent,
    AdminStockComponent,
    AdminStockItemsComponent,
    AdminRequestComponent,
    AdminInvoicesComponent,
    AdminSupplierOrdersComponent,
    AdminSupplierOrderItemsComponent,
    AdminSuppliersComponent,
    AdminReceivingReportsComponent,
    AdminDispatchReportsComponent,
    AdminMaterialsOrderComponent,
    AdminProtocolsComponent,
    AdminLoginComponent,
    AdminResetPasswordComponent,
    AdminSectorsComponent,
    AdminCategoriesComponent,
    AdminMeasuresComponent,
    AdminProductsComponent,
    AdminSidebarComponent,
    AdminBiddingExemptionComponent,
    MaterialsOrderModalComponent,
    InvoiceModalComponent,
    AdminAccountantReportsComponent,
    AdminStockReportsComponent,
    AdminWarehouseReportsComponent,
    AdminSendEmailComponent,
    SuppliersModalComponent,
    ReceivingReportsModalComponent,
    DispatchReportsModalComponent,
    CreateSuppliersModalComponent,
    ProtocolsModalComponent,
    CreateProtocolsModalComponent,
    BiddingExemptionModalComponent,
    AccountantReportsModalComponent,
    DialogComponent,
    EditMeasureModalComponent,
    CreateMeasureModalComponent,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
    CreateProductModalComponent,
    EditProductModalComponent,
    AdminGeneralSupplierOrdersComponent,
    EditAdminGeneralSuppliersOrdersModalComponent,
    CreateAdminGeneralSupplierOrdersModalComponent,
    AdminGeneralSupplierOrderItemsComponent,
    CreateAdminGeneralSupplierOrdersItemsModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialCommonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
})
export class AdminModule {}
