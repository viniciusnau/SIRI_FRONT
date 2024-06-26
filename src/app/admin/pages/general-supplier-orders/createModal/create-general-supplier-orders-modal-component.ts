import { OrdersService } from '../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'create-general-supplier-orders-modal-component',
  templateUrl: './create-general-supplier-orders-modal.component.html',
  styleUrls: ['./create-general-supplier-orders-modal-component.scss'],
})
export class CreateGeneralSupplierOrdersModalComponent implements OnInit {
  formSupplierOrders: FormGroup;
  suppliers: any;
  protocols: any;
  public_defenses: any;

  constructor(
    public dialogRef: MatDialogRef<CreateGeneralSupplierOrdersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.sortSuppliers();
    this.sortProtocols();
    this.sortPublicDefenses();
  }

  createForm() {
    this.formSupplierOrders = this.formBuilder.group({
      supplier: ['', [Validators.required]],
      protocol: ['', [Validators.required]],
      public_defense: ['', [Validators.required]],
    });
  }

  sortSuppliers() {
    this.suppliers = this.Helper.sortAlphabetically(this.data.suppliers);
  }

  sortProtocols() {
    this.protocols = this.Helper.sortAlphabetically(this.data.protocols);
  }

  sortPublicDefenses() {
    this.public_defenses = this.Helper.sortAlphabetically(this.data.public_defenses);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    var createSupplierOrderData = this.formSupplierOrders.getRawValue();

    createSupplierOrderData.received = false;
    createSupplierOrderData.client = this.data.client;

    this.ordersService.createSupplierOrder(createSupplierOrderData).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snackBar.open(
          snackbarConsts.admin.suppliersOrders.create.success,
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
          snackbarConsts.admin.suppliersOrders.create.error,
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
}