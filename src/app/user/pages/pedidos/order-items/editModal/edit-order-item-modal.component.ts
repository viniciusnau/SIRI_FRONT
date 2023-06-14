import { OrdersService } from './../../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-order-item-modal',
  templateUrl: 'edit-order-item-modal.component.html',
  styleUrls: ['./edit-order-item-modal.component.scss'],
})
export class EditOrderItemModalComponent implements OnInit {
  formOrderItem: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditOrderItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formOrderItem = this.formBuilder.group({
      added_quantity: ['', Validators.required],
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
    if (this.formOrderItem.invalid) return;
    const editOrderItemData = this.formOrderItem.getRawValue();

    this.ordersService
      .updateOrderItem(this.data.order_id, editOrderItemData)
      .subscribe({
        next: (result) => {
          this.dialogRef.close();
          this.data.snackBar.open(
            'Tudo certo!',
            'Item do pedido editado com sucesso!',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
        error: (error) => {
          this.data.snackBar.open(
            'Ops!',
            'Houve um erro ao editar o item do pedido!',
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
