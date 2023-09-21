import { OrdersService } from '../../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'edit-order-item-modal',
  templateUrl: 'edit-order-item-modal.component.html',
  styleUrls: ['./edit-order-item-modal.component.scss'],
})
export class EditOrderItemModalComponent implements OnInit {
  formOrderItem: FormGroup;
  addedQuantity: number;

  constructor(
    public dialogRef: MatDialogRef<EditOrderItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.addedQuantity = this.data.added_quantity;
    this.createForm();
  }

  createForm() {
    this.formOrderItem = this.formBuilder.group({
      added_quantity: ['', Validators.required],
      quantity: [''],
    });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const editOrderItemData = this.formOrderItem.getRawValue();
    const modifiedItem = { ...editOrderItemData };
    modifiedItem.quantity = Number(
      editOrderItemData.quantity.toString().slice(0, 3),
    );
    modifiedItem.added_quantity = Number(
      editOrderItemData.added_quantity.toString().slice(0, 3),
    );

    if (editOrderItemData.quantity === '') {
      delete editOrderItemData.quantity;
    }
    if (!editOrderItemData.added_quantity) {
      editOrderItemData.added_quantity = 0;
    }
    this.ordersService
      .updateOrderItem(this.data.order_item_id, modifiedItem)
      .subscribe({
        next: (result) => {
          this.dialogRef.close();
          this.data.snackBar.open(
            snackbarConsts.user.orders.itens.edit.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
        error: (error) => {
          this.data.snackBar.open(
            snackbarConsts.user.orders.itens.edit.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
      });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
