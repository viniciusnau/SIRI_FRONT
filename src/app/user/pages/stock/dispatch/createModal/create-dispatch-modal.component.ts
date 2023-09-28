import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';

interface Supplier {
  id: number;
  name: number;
}

export interface iDispatch {
  suppliers: Supplier[];
}

@Component({
  selector: 'create-dispatch-modal',
  templateUrl: 'create-dispatch-modal.component.html',
  styleUrls: ['./create-dispatch-modal.component.scss'],
})
export class CreateDispatchModalComponent implements OnInit {
  formStockWithdrawals: FormGroup;
  maxQuantity: any;

  constructor(
    public dialogRef: MatDialogRef<CreateDispatchModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.maxQuantity = this.data.maxQuantity;
  }

  createForm() {
    this.formStockWithdrawals = this.formBuilder.group({
      withdraw_quantity: [
        '',
        [
          Validators.required,
          this.maxQuantityValidator.bind(this),
        ],
      ],
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const createStockWithdrawalData = this.formStockWithdrawals.getRawValue();

    createStockWithdrawalData.stock_item = this.data.stock_item_id;

    this.ordersService.createStockWithdrawal(createStockWithdrawalData).subscribe(
      (response) => {
        this.snackBar.open(snackbarConsts.user.stock.output.create.success, snackbarConsts.close, {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
      (error) => {
        this.snackBar.open(snackbarConsts.user.stock.output.create.error, snackbarConsts.close, {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    );
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  maxQuantityValidator(control: FormControl): { [key: string]: any } | null {
    const inputQuantity = control.value;
    const maxQuantity = this.maxQuantity;

    if (inputQuantity > maxQuantity) {
      return { maxQuantityExceeded: true };
    }

    return null;
  }
}
