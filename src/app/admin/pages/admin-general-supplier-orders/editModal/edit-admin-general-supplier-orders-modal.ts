import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-admin-general-supplier-orders-modal',
  templateUrl: 'edit-admin-general-supplier-orders-modal.component.html',
  styleUrls: ['./edit-admin-general-supplier-orders-modal.component.scss'],
})
export class EditAdminGeneralSuppliersOrdersModalComponent implements OnInit {
  formSupplierOrder: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditAdminGeneralSuppliersOrdersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formSupplierOrder = this.formBuilder.group({
      delivery_date: ['', [Validators.required]],
      received: [
        this.data.supplier_order.received ? 'Sim' : 'Não',
        [Validators.required],
      ],
    });
  }

  notEmpty(content: any) {
    return content ? content : '';
  }

  getChangedProperties(): any {
    const formValue = this.formSupplierOrder.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.supplier_order[key] && key !== 'received') {
        changedProperties[key] = value;
        this.hasChanges = true;
      }
    });

    return changedProperties;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formSupplierOrder.invalid) return;

    const editSupplierOrderId = this.getChangedProperties();
    this.ordersService
      .editSupplierOrder(this.data.supplier_order.id, editSupplierOrderId)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
