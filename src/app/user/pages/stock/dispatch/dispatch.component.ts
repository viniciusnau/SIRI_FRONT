import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { CreateDispatchModalComponent } from './createModal/create-dispatch-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { StocksService } from '../../../../services/stocks.service';

@Component({
  selector: 'user-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss'],
})
export class DispatchComponent implements OnInit {
  currentPage = 1;
  response: any;
  page = 'next';
  loading: number | null = null;
  stockItemId: string;
  maxQuantity: any;

  constructor(
    private ordersService: OrdersService,
    private stockService: StocksService,
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
      });
    this.stockService.getStockItem(this.stockItemId).subscribe((result) => {
      this.maxQuantity = result.quantity;
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

  openModal(): void {
    const dialogRef = this.dialog.open(CreateDispatchModalComponent, {
      data: { stock_item_id: this.stockItemId, maxQuantity: this.maxQuantity },
    });
  }

  displayedColumns = ['quantity', 'description', 'date', 'delete'];
}
