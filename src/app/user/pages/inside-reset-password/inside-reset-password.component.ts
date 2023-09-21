import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { DialogComponent } from '../../../admin/components/modal/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'app-inside-reset-password',
  templateUrl: './inside-reset-password.component.html',
  styleUrls: ['./inside-reset-password.component.scss'],
})
export class InsideResetPasswordComponent {
  email: string;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  resetPassword() {
    this.loading = true;
    this.userService.resetPassword(this.email).subscribe(
      (response) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.user.changePassword.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
      (error) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.user.changePassword.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
    );
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title: title, message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
