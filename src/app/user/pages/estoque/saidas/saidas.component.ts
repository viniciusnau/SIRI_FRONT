import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { StockWithdrawalsModalComponent } from './modal/stockWithdrawals-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Withdrawals {
  quantity: number;
  description: string;
  date: string;
}

@Component({
  selector: 'user-saidas',
  templateUrl: './saidas.component.html',
  styleUrls: ['./saidas.component.scss'],
})
export class SaidasComponent implements OnInit {
  withdrawals: Withdrawals[] = [];

  stockItemId: string;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockItemId = params['id'];
    });
    this.getStockWithdrawals(this.stockItemId);
  }

  getStockWithdrawals(orderId: string) {
    this.ordersService.getStockWithdrawals(orderId).subscribe((data) => {
      this.withdrawals = data.results;
    });
  }

  deleteWithdraw(withdraw_id: string) {
    this.ordersService
      .deleteWithdraw(withdraw_id)
      .toPromise()
      .then((data: any) => {
        this.getStockWithdrawals(this.stockItemId);
      })
      .catch((error: any) => {
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    }
    else {
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
