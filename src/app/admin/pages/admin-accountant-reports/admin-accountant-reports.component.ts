import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountantReportsModalComponent } from './modal/accountant-reports-modal.component';
import { StocksService } from 'src/app/services/stocks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AccountantReport {
  id: number;
  month: string;
  previousBalance: string;
  entryValue: string;
  outputValue: string;
  currentBalance: string;
  file: string;
}

@Component({
  selector: 'app-admin-accountant-reports',
  templateUrl: './admin-accountant-reports.component.html',
  styleUrls: ['./admin-accountant-reports.component.scss'],
})
export class AdminAccountantReportsComponent implements OnInit {
  adminAccountantReports: AccountantReport[] = [];
  loading: number | null = null;
  displayedColumns = [
    'id',
    'month',
    'previousBalance',
    'currentBalance',
    'entryValue',
    'outputValue',
    'file',
    'deleteAccountantReports',
  ];

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getAccountantReports();
  }

  getAccountantReports(): void {
    this.stocksService.getAccountantReports().subscribe((data) => {
      this.adminAccountantReports = data;
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(AccountantReportsModalComponent, {});
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  downloadAccountantReports(file: string): void {
    window.open(file, '_blank');
  }

  deleteAccountantReports(id: number): void {
    this.loading = id;
    this.stocksService.deleteAccountantReport(id).subscribe(() => {
      this.adminAccountantReports = this.adminAccountantReports.filter(
        (report) => report.id !== id,
      );
      this.snackBar.open('Relatório excluído!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    });
  }
}
