import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { HomeComponent } from './pages/home/home.component';
import { StockComponent } from './pages/stock/stock.component';
import { ReceivedComponent } from './pages/stock/received/received.component';
import { DispatchComponent } from './pages/stock/dispatch/dispatch.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDispatchModalComponent } from './pages/stock/dispatch/createModal/create-dispatch-modal.component';
import { EditOrderItemModalComponent } from './pages/orders/order-items/editModal/edit-order-item-modal.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UserPaginationComponent } from './components/pagination/user-pagination.component';
import { ConfirmOrderModalComponent } from './pages/orders/confirmModal/confirm-order-modal.component';
import { ConfirmHomeModalComponent } from './pages/home/confirmModal/confirm-home-modal.component';
import { AdminModule } from '../admin/admin.module';
import { DigitLimitDirective } from '../user/directives/digit-limit.directive';
import { DecimalNotAllowedDirective } from '../user/directives/decimal-not-allowed.directive';
import { NegativeNotAllowedDirective } from '../user/directives/negative-not-allowed.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonCustomModule } from '../common/commonCustom.module';

@NgModule({
  declarations: [
    HomeComponent,
    StockComponent,
    ReceivedComponent,
    DispatchComponent,
    OrdersComponent,
    OrderItemsComponent,
    SidebarComponent,
    CreateDispatchModalComponent,
    EditOrderItemModalComponent,
    ResetPasswordComponent,
    UserPaginationComponent,
    ConfirmOrderModalComponent,
    DigitLimitDirective,
    NegativeNotAllowedDirective,
    DecimalNotAllowedDirective,
    ConfirmHomeModalComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialCommonsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
})
export class UserModule {}
