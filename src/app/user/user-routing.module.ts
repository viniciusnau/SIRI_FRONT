import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { EntradasComponent } from './pages/estoque/entradas/entradas.component';
import { SaidasComponent } from './pages/estoque/saidas/saidas.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { OrderItemsComponent } from './pages/pedidos/order-items/order-items.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthUserGuard } from '../services/guards/unauth-user.guard';
import { AuthUserGuard } from '../services/guards/auth-user.guard';
import { InsideResetPasswordComponent } from './pages/inside-reset-password/inside-reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthUserGuard] },
  { path: 'login', component: LoginComponent, canActivate: [UnauthUserGuard] },
  {
    path: 'esqueci-a-senha',
    component: ResetPasswordComponent,
  },
  {
    path: 'mudar-senha',
    component: InsideResetPasswordComponent,
  },
  {
    path: 'estoque',
    component: EstoqueComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'estoque/entradas/:id',
    component: EntradasComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'estoque/saidas/:id',
    component: SaidasComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'pedidos/itens/:id',
    component: OrderItemsComponent,
    canActivate: [AuthUserGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
