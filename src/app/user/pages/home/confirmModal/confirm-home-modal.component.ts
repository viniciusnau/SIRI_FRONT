import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';
import { Product } from '../../../../interfaces/stock/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

@Component({
  selector: 'confirm-home-modal',
  templateUrl: 'confirm-home-modal.component.html',
  styleUrls: ['./confirm-home-modal.component.scss'],
})
export class ConfirmHomeModalComponent implements OnInit {
  form: FormGroup;
  chosenProducts: Product[] = [];
  client: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmHomeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ordersService: OrdersService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {
    this.chosenProducts = this.Helper.sortAlphabetically(data.chosenProducts);
    this.client = data.client;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({});
  }

  createOrder(products) {
    const order = {
      is_sent: false,
      partially_added_to_stock: false,
      completely_added_to_stock: false,
      client: this.client,
    };

    this.ordersService.createOrder(order).subscribe(
      (orderResponse) => {
        const orderItems = products.map((product) => {
          return {
            product: product.id,
            quantity: product.quantity,
            added_quantity: 0,
            order: orderResponse.id,
          };
        });

        this.ordersService.createOrderItems(orderItems).subscribe(
          (orderItemsResponse) => {
            this.snackBar.open(
              snackbarConsts.user.createOrder.success,
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
              snackbarConsts.user.createOrder.error,
              snackbarConsts.close,
              {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              },
            );
          },
        );
      },
      (error) => {
        this.snackBar.open(
          snackbarConsts.user.createOrder.error,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    this.dialogRef.close();
    this.createOrder(this.chosenProducts);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
