import { Component } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import { DialogComponent } from '../../components/modal/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-send-email',
  templateUrl: './admin-send-email.component.html',
  styleUrls: ['./admin-send-email.component.scss'],
})
export class AdminSendEmailComponent {
  subject: string;
  message: string;
  loading: boolean = false;

  constructor(private stockService: StocksService, private dialog: MatDialog) {}

  sendEmail() {
    this.loading = true;
    this.stockService.sendEmail(this.subject, this.message)
      .subscribe(
        response => {
          this.loading = false;
          this.openDialog('Sucesso', 'Email enviado com sucesso!');
        },
        error => {
          this.loading = false;
          this.openDialog('Erro', 'Oops! Tente novamente mais tarde');
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
