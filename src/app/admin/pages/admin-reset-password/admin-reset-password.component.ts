import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { DialogComponent } from '../../components/modal/dialog.component';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.scss']
})
export class AdminResetPasswordComponent {
  email: string;
  loading: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  resetPassword() {
    this.loading = true;
    this.userService.resetPassword(this.email)
      .subscribe(
        response => {
          this.loading = false;
          this.openDialog('Sucesso', 'Email enviado!');
        },
        error => {
          this.loading = false;
          this.openDialog('Erro', 'Oops! Email invalido');
        }
      );
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: title, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
