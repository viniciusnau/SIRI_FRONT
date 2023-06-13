import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    if (this.formStockWithdrawals.invalid) return;

    const createStockWithdrawalData = this.formStockWithdrawals.getRawValue();

    createStockWithdrawalData.stock_item = this.data.stock_item_id;

    console.log(createStockWithdrawalData);

    this.ordersService
      .createStockWithdrawal(createStockWithdrawalData)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {},
      );
  }
}
