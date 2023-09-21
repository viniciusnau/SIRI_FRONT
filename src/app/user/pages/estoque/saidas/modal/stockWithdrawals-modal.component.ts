import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Supplier {
  id: number;
  name: number;
}

export interface StockWithdrawalsModalData {
  suppliers: Supplier[];
}

@Component({
  selector: 'stockWithdrawals-modal',
  templateUrl: 'stockWithdrawals-modal.component.html',
  styleUrls: ['./stockWithdrawals-modal.component.scss'],
})
export class StockWithdrawalsModalComponent implements OnInit {
  formStockWithdrawals: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StockWithdrawalsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formStockWithdrawals = this.formBuilder.group({
      withdraw_quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const createStockWithdrawalData = this.formStockWithdrawals.getRawValue();

    createStockWithdrawalData.stock_item = this.data.stock_item_id;

    this.ordersService
      .createStockWithdrawal(createStockWithdrawalData)
      .subscribe(
        (response) => {
          this.snackBar.open(
            snackbarConsts.user.stock.output.create.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
        (error) => {
          this.snackBar.open(
            snackbarConsts.user.stock.output.create.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
      );
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
