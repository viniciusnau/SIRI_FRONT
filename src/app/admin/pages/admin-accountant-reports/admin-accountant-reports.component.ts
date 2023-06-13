import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountantReportsModalComponent, AccountantReportsModalData } from './modal/accountant-reports-modal.component';
import { StocksService } from 'src/app/services/stocks.service';

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

  displayedColumns = [
    'id',
    'month',
    'previousBalance',
    'entryValue',
    'outputValue',
    'currentBalance',
    'file',
    'deleteAccountantReports',
  ];

  constructor(private stocksService: StocksService, public dialog: MatDialog) {}

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

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  downloadAccountantReports(file: string): void {
    window.open(file, '_blank');
  }

  deleteAccountantReports(id: number): void {
    this.stocksService.deleteAccountantReport(id).subscribe(() => {
      this.adminAccountantReports = this.adminAccountantReports.filter((report) => report.id !== id);
    });
  }
}
