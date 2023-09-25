import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { BiddingExemption } from './pages/bidding-exemption/bidding-exemption.component';
import { MaterialsOrderModalComponent } from './pages/materials-order/modal/materials-order-modal.component';
import { InvoiceModalComponent } from './pages/invoices/modal/invoice-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountantReports } from './pages/accountant-reports/accountant-reports.component';
import { AdminStockReportsComponent } from './pages/admin-stock-reports/admin-stock-reports.component';
import { AdminWarehouseReportsComponent } from './pages/admin-warehouse-reports/admin-warehouse-reports.component';
import { AdminSendEmailComponent } from './pages/admin-send-email/admin-send-email.component';
import { SuppliersModalComponent } from './pages/admin-suppliers/modal/suppliers-modal.component';
import { ReceivingReportsModalComponent } from './pages/admin-receiving-reports/modal/receiving-reports-modal.component';
import { DispatchReportsModalComponent } from './pages/dispatch-reports/editModal/dispatch-reports-modal.component';
import { CreateSuppliersModalComponent } from './pages/admin-suppliers/createModal/createSuppliers-modal.component';
import { CreateProtocolsModalComponent } from './pages/admin-protocols/createModal/createProtocols-modal.component';
import { CreateBiddingExemptionModalComponent } from './pages/bidding-exemption/createModal/create-bidding-exemption-modal.component';
import { AccountantReportsModalComponent } from './pages/accountant-reports/createModal/accountant-reports-modal.component';
import { DialogComponent } from './components/modal/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditMeasureModalComponent } from './pages/measures/editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './pages/measures/createModal/create-measure-modal.component';
import { CreateCategoryModalComponent } from './pages/categories/createModal/create-category-modal.component';
import { EditCategoryModalComponent } from './pages/categories/editModal/edit-category-modal.component';
import { CreateProductModalComponent } from './pages/admin-products/createModal/create-product-modal.component';
import { EditProductModalComponent } from './pages/admin-products/editModal/edit-product-modal.component';
import { GeneralSupplierOrders } from './pages/general-supplier-orders/general-supplier-orders.component';
import { EditAdminGeneralSuppliersOrdersModalComponent } from './pages/general-supplier-orders/editModal/edit-admin-general-supplier-orders-modal';
import { CreateAdminGeneralSupplierOrdersModalComponent } from './pages/general-supplier-orders/createModal/create-admin-general-supplier-orders-modal-component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/general-supplier-orders/admin-supplier-order-items/admin-general-supplier-order-items.component';
import { CreateAdminGeneralSupplierOrdersItemsModalComponent } from './pages/general-supplier-orders/admin-supplier-order-items/createModal/create-admin-general-supplier-orders-items-modal-component';
import { ProtocolsModalComponent } from './pages/admin-protocols/modal/protocols-modal.component';
import { AdminProtocolItemsComponent } from './pages/admin-protocols/admin-protocols-items/admin-protocol-items.component';
import { CreateProtocolItemsModalComponent } from './pages/admin-protocols/admin-protocols-items/createModal/createProtocolItems-modal.component';
import { DeleteOrderItemModalComponent } from './pages/orders/order-items/deleteModal/delete-order-item-modal.component.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceFormatPipe } from './pipes/price-format.pipe';
import { InvoiceControlOrdersModalComponent } from './pages/orders/invoiceControlmodal/invoice-control-orders-modal.component';
import { DigitLimitDirective } from './directives/digit-limit.directive';
import { DecimalNotAllowedDirective } from './directives/decimal-not-allowed.directive';
import { IdentityDirective } from './directives/identity.directive';
import { CpfMaskDirective } from './directives/cpfMask.directive';
import { CnpjMaskDirective } from './directives/CnpjMask.directive';
import { ContactMaskDirective } from './directives/contactMask.directive';
import { PriceFormatDirective } from './directives/price-format.directive';
import { NegativeNotAllowedDirective } from './directives/negative-not-allowed.directive';
import { CommonRoutingModule } from '../common-routing.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderItemsComponent,
    AdminStockComponent,
    AdminStockItemsComponent,
    AdminRequestComponent,
    InvoicesComponent,
    AdminSupplierOrdersComponent,
    AdminSupplierOrderItemsComponent,
    AdminSuppliersComponent,
    AdminReceivingReportsComponent,
    DispatchReports,
    MaterialsOrderComponent,
    AdminProtocolsComponent,
    AdminResetPasswordComponent,
    AdminSectorsComponent,
    Categories,
    MeasuresComponent,
    AdminProductsComponent,
    AdminSidebarComponent,
    BiddingExemption,
    MaterialsOrderModalComponent,
    InvoiceModalComponent,
    AccountantReports,
    AdminStockReportsComponent,
    AdminWarehouseReportsComponent,
    AdminSendEmailComponent,
    SuppliersModalComponent,
    ReceivingReportsModalComponent,
    DispatchReportsModalComponent,
    CreateSuppliersModalComponent,
    ProtocolsModalComponent,
    CreateProtocolsModalComponent,
    CreateBiddingExemptionModalComponent,
    AccountantReportsModalComponent,
    DialogComponent,
    EditMeasureModalComponent,
    CreateMeasureModalComponent,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
    CreateProductModalComponent,
    EditProductModalComponent,
    GeneralSupplierOrders,
    EditAdminGeneralSuppliersOrdersModalComponent,
    CreateAdminGeneralSupplierOrdersModalComponent,
    AdminGeneralSupplierOrderItemsComponent,
    CreateAdminGeneralSupplierOrdersItemsModalComponent,
    AdminProtocolItemsComponent,
    CreateProtocolItemsModalComponent,
    DeleteOrderItemModalComponent,
    PaginationComponent,
    PriceFormatPipe,
    InvoiceControlOrdersModalComponent,
    DigitLimitDirective,
    NegativeNotAllowedDirective,
    DecimalNotAllowedDirective,
    IdentityDirective,
    CpfMaskDirective,
    CnpjMaskDirective,
    ContactMaskDirective,
    PriceFormatDirective,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialCommonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonRoutingModule,
  ],
  exports: [PaginationComponent],
})
export class AdminModule {}
