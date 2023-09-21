import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { StockWithdrawalsModalComponent } from './modal/stockWithdrawals-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'user-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.scss'],
})
export class SaidasComponent implements OnInit {
  currentPage = 1;
  response: any;
  page = 'next';
  loading: number | null = null;
  stockItemId: string;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockItemId = params['id'];
    });
    this.getContent(this.stockItemId);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent(this.stockItemId);
  }

  getContent(orderId: string, disableLoading = false) {
    this.ordersService
      .getStockWithdrawals(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
      });
  }

  deleteWithdraw(withdraw_id: string) {
    this.loading = Number(withdraw_id);
    this.ordersService
      .deleteWithdraw(withdraw_id)
      .toPromise()
      .then((data: any) => {
        this.getContent(this.stockItemId, true);
        this.snackBar.open(
          snackbarConsts.user.stock.output.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      })
      .catch((error: any) => {
        this.snackBar.open(
          snackbarConsts.user.stock.output.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
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

  openModal(): void {
    const dialogRef = this.dialog.open(StockWithdrawalsModalComponent, {
      data: { stock_item_id: this.stockItemId },
    });
  }

  displayedColumns = ['quantity', 'description', 'date', 'delete'];
}
