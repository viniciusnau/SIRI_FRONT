import { OrdersService } from './../../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-admin-general-supplier-orders-items-modal-component',
  templateUrl:
    './create-admin-general-supplier-orders-items-modal.component.html',
  styleUrls: [
    './create-admin-general-supplier-orders-items-modal-component.scss',
  ],
})
export class CreateAdminGeneralSupplierOrdersItemsModalComponent
  implements OnInit
{
  formSupplierOrders: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAdminGeneralSupplierOrdersItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  createForm() {
    this.formSupplierOrders = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formSupplierOrders.invalid) return;

    var createSupplierOrderItemData = this.formSupplierOrders.getRawValue();

    createSupplierOrderItemData.supplier_order = parseInt(
      this.data.supplier_order,
    );

    this.ordersService
      .createSupplierOrderItem(createSupplierOrderItemData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
  }
}
