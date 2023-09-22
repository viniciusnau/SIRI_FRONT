import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './user/pages/reset-password/reset-password.component';
import { InsideResetPasswordComponent } from './user/pages/inside-reset-password/inside-reset-password.component';
import { AuthCommonGuard } from './services/guards/auth-common.guard';

const routes: Routes = [
  {
    path: 'esqueci-a-senha',
    component: ResetPasswordComponent,
  },
  {
    path: 'mudar-senha',
    component: InsideResetPasswordComponent,
    canActivate: [AuthCommonGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
