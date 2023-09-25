import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { StockComponent } from './pages/stock/stock.component';
import { ReceivedComponent } from './pages/stock/received/received.component';
import { DispatchComponent } from './pages/stock/dispatch/dispatch.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemsComponent } from './pages/orders/order-items/order-items.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthUserGuard } from '../services/guards/auth-user.guard';
import { InsideResetPasswordComponent } from './pages/inside-reset-password/inside-reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'estoque',
    component: StockComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'estoque/entradas/:id',
    component: ReceivedComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'estoque/saidas/:id',
    component: DispatchComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'pedidos',
    component: OrdersComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'pedidos/itens/:id',
    component: OrderItemsComponent,
    canActivate: [AuthUserGuard],
    pathMatch: 'full',
  },
  {
    path: 'mudar-senha-user',
    component: InsideResetPasswordComponent,
    canActivate: [AuthUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
