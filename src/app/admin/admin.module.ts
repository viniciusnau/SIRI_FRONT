import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { StockBySectorComponent } from './pages/stock-by-sector/stock-by-sector.component';
import { StockBySectorItemsComponent } from './pages/stock-by-sector/stock-by-sector-items/stock-by-sector-items.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { SupplierOrdersComponent } from './pages/supplier-orders/supplier-orders.component';
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
import { CreateMaterialsConfirmOrderModalComponent } from './pages/materials-order/createModal/create-materials-order-modal.component';
import { InvoiceModalComponent } from './pages/invoices/createModal/create-invoice-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountantReports } from './pages/accountant-reports/accountant-reports.component';
import { StockReportsComponent } from './pages/stock-reports/stock-reports.component';
import { WarehouseReportsComponent } from './pages/warehouse-reports/warehouse-reports.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { SuppliersModalComponent } from './pages/suppliers/editModal/edit-suppliers-modal.component';
import { ReceivingReportsModalComponent } from './pages/receiving-reports/editModal/edit-receiving-reports-modal.component';
import { DispatchReportsModalComponent } from './pages/dispatch-reports/editModal/edit-dispatch-reports-modal.component';
import { CreateSuppliersModalComponent } from './pages/suppliers/createModal/create-suppliers-modal.component';
import { CreateProtocolsModalComponent } from './pages/protocols/createModal/create-protocols-modal.component';
import { CreateBiddingExemptionModalComponent } from './pages/bidding-exemption/createModal/create-bidding-exemption-modal.component';
import { AccountantReportsModalComponent } from './pages/accountant-reports/createModal/create-accountant-reports-modal.component';
import { DialogComponent } from './components/modal/dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditMeasureModalComponent } from './pages/measures/editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './pages/measures/createModal/create-measure-modal.component';
import { CreateCategoryModalComponent } from './pages/categories/createModal/create-category-modal.component';
import { EditCategoryModalComponent } from './pages/categories/editModal/edit-category-modal.component';
import { CreateProductModalComponent } from './pages/products/createModal/create-product-modal.component';
import { EditProductModalComponent } from './pages/products/editModal/edit-product-modal.component';
import { GeneralSupplierOrders } from './pages/general-supplier-orders/general-supplier-orders.component';
import { EditGeneralSuppliersOrdersModalComponent } from './pages/general-supplier-orders/editModal/edit-general-supplier-orders-modal';
import { CreateGeneralSupplierOrdersModalComponent } from './pages/general-supplier-orders/createModal/create-general-supplier-orders-modal-component';
import { AdminGeneralSupplierOrderItemsComponent } from './pages/general-supplier-orders/supplier-order-items/general-supplier-order-items.component';
import { CreateGeneralSupplierOrdersItemsModalComponent } from './pages/general-supplier-orders/supplier-order-items/createModal/create-general-supplier-orders-items-modal-component';
import { EditProtocolsModalComponent } from './pages/protocols/editModal/edit-protocols-modal.component';
import { ProtocolItemsComponent } from './pages/protocols/protocols-items/protocol-items.component';
import { CreateProtocolItemsModalComponent } from './pages/protocols/protocols-items/createModal/create-protocol-items-modal.component';
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
import { MatCardModule } from '@angular/material/card';
import { CommonCustomModule } from '../common/commonCustom.module';
import { Helper } from 'src/helper';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderItemsComponent,
    StockBySectorComponent,
    StockBySectorItemsComponent,
    InvoicesComponent,
    SupplierOrdersComponent,
    SuppliersComponent,
    ReceivingReportsComponent,
    DispatchReportsComponent,
    MaterialsOrderComponent,
    ProtocolsComponent,
    ResetPasswordComponent,
    SectorsComponent,
    CategoriesComponent,
    MeasuresComponent,
    ProductsComponent,
    BiddingExemption,
    CreateMaterialsConfirmOrderModalComponent,
    InvoiceModalComponent,
    AccountantReports,
    StockReportsComponent,
    WarehouseReportsComponent,
    SendEmailComponent,
    SuppliersModalComponent,
    ReceivingReportsModalComponent,
    DispatchReportsModalComponent,
    CreateSuppliersModalComponent,
    EditProtocolsModalComponent,
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
    EditGeneralSuppliersOrdersModalComponent,
    CreateGeneralSupplierOrdersModalComponent,
    AdminGeneralSupplierOrderItemsComponent,
    CreateGeneralSupplierOrdersItemsModalComponent,
    ProtocolItemsComponent,
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
    MatCardModule,
    CommonCustomModule,
  ],
  exports: [PaginationComponent],
  providers: [Helper],
})
export class AdminModule {}
