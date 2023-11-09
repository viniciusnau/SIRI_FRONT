import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonCustomRoutingModule } from './commonCustom-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialCommonsModule } from '../material-commons/material-commons.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AdminModule } from '../admin/admin.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarComponent as UserSidebarComponent } from './components/sidebar/user/sidebar.component';
import { SidebarComponent as AdminSidebarComponent } from './components/sidebar/admin/sidebar.component';
import { CallbackComponent } from './pages/callback/callback.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SidebarComponent,
    UserSidebarComponent,
    AdminSidebarComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    CommonCustomRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialCommonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  exports: [SidebarComponent],
})
export class CommonCustomModule {}
