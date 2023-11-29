import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'edit-general-supplier-orders-modal',
  templateUrl: 'edit-general-supplier-orders-modal.component.html',
  styleUrls: ['./edit-general-supplier-orders-modal.component.scss'],
})
export class EditGeneralSuppliersOrdersModalComponent implements OnInit {
  formSupplierOrder: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditGeneralSuppliersOrdersModalComponent>,
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
    this.formSupplierOrder = this.formBuilder.group({
      delivery_date: ['', [Validators.required]],
      received: [
        this.data.supplier_order.received ? 'Sim' : 'Não',
        [Validators.required],
      ],
    });
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
    const editSupplierOrderId = this.getChangedProperties();
    this.ordersService
      .editSupplierOrder(this.data.supplier_order.id, editSupplierOrderId)
      .subscribe(
        (response) => {
          this.dialogRef.close();
          this.snackBar.open(
            snackbarConsts.admin.suppliersOrders.edit.success,
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
        },
        (error) => {
          this.snackBar.open(
            snackbarConsts.admin.suppliersOrders.edit.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
      );
    window.location.reload();
  }
}
