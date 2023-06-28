import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { EntradasComponent } from './pages/estoque/entradas/entradas.component';
import { SaidasComponent } from './pages/estoque/saidas/saidas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { OrderItemsComponent } from './pages/pedidos/order-items/order-items.component';
import { LoginComponent } from './pages/login/login.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockWithdrawalsModalComponent } from './pages/estoque/saidas/modal/stockWithdrawals-modal.component';
import { EditOrderItemModalComponent } from './pages/pedidos/order-items/editModal/edit-order-item-modal.component';
import { InsideResetPasswordComponent } from './pages/inside-reset-password/inside-reset-password.component';
import { UserPaginationComponent } from './components/pagination/user-pagination.component';
import { ReviewModal } from './pages/home/reviewModal/reviewModal.component';
import { OrderModalComponent } from './pages/pedidos/modal/order-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    ReviewModal,
    ResetPasswordComponent,
    EstoqueComponent,
    EntradasComponent,
    SaidasComponent,
    PedidosComponent,
    OrderItemsComponent,
    LoginComponent,
    UserSidebarComponent,
    StockWithdrawalsModalComponent,
    EditOrderItemModalComponent,
    InsideResetPasswordComponent,
    UserPaginationComponent,
    OrderModalComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialCommonsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class UserModule {}
