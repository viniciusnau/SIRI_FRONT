import { Component } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import { DialogComponent } from '../../components/modal/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent {
  subject: string;
  message: string;
  loading: boolean = false;

  constructor(
    private stockService: StocksService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  sendEmail() {
    this.loading = true;
    this.stockService.sendEmail(this.subject, this.message).subscribe(
      (response) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.admin.sendEmail.success,
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
          snackbarConsts.admin.sendEmail.error,
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
