import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'delete-order-item-modal',
  templateUrl: 'delete-order-item-modal.component.html',
  styleUrls: ['./delete-order-item-modal.component.scss'],
})
export class DeleteOrderItemModalComponent implements OnInit {
  formDeleteOrderItem: FormGroup;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteOrderItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDeleteOrderItem = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.loading = true;
    this.ordersService
      .deleteOrderItem(
        this.data,
        this.formDeleteOrderItem.getRawValue().description,
      )
      .toPromise()
      .then((data: any) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.admin.manageOrders.itens.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error: any) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.admin.manageOrders.itens.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }
}
