import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountantReportsModalComponent } from './modal/accountant-reports-modal.component';
import { StocksService } from 'src/app/services/stocks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

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
  selector: 'app-accountant-reports',
  templateUrl: './accountant-reports.component.html',
  styleUrls: ['./accountant-reports.component.scss'],
})
export class AccountantReports implements OnInit {
  adminAccountantReports: AccountantReport[] = [];
  loading: boolean = false;
  loadingAccountantReport: number | null = null;
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
    this.loading = true;
    this.getContent();
  }

  getContent(): void {
    this.stocksService.getAccountantReports().subscribe((data) => {
      this.adminAccountantReports = data;
      this.loadingAccountantReport = null;
      this.loading = false;
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

  deleteItem(id: number): void {
    this.loadingAccountantReport = id;
    this.stocksService.deleteAccountantReport(id).subscribe(
      () => {
        this.adminAccountantReports = this.adminAccountantReports.filter(
          (report) => report.id !== id,
        );
        this.snackBar.open(
          snackbarConsts.admin.accountantReports.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        this.getContent();
      },
      (error) => {
        this.snackBar.open(
          snackbarConsts.admin.accountantReports.exclude.error,
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
}
