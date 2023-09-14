import { OrdersService } from './../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-admin-general-supplier-orders-modal-component',
  templateUrl: './create-admin-general-supplier-orders-modal.component.html',
  styleUrls: ['./create-admin-general-supplier-orders-modal-component.scss'],
})
export class CreateAdminGeneralSupplierOrdersModalComponent implements OnInit {
  formSupplierOrders: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateAdminGeneralSupplierOrdersModalComponent>,
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
      supplier: ['', [Validators.required]],
      protocol: ['', [Validators.required]],
      public_defense: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    var createSupplierOrderData = this.formSupplierOrders.getRawValue();

    createSupplierOrderData.received = false;
    createSupplierOrderData.client = this.data.client;

    this.ordersService
      .createSupplierOrder(createSupplierOrderData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
