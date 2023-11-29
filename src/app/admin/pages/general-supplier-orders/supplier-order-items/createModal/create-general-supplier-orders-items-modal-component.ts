import { OrdersService } from '../../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'create-general-supplier-orders-items-modal-component',
  templateUrl: './create-general-supplier-orders-items-modal.component.html',
  styleUrls: ['./create-general-supplier-orders-items-modal-component.scss'],
})
export class CreateGeneralSupplierOrdersItemsModalComponent implements OnInit {
  formSupplierOrders: FormGroup;
  selectedProduct: any;

  constructor(
    public dialogRef: MatDialogRef<CreateGeneralSupplierOrdersItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  updateQuantityError() {
    const enteredQuantity = this.formSupplierOrders.get('quantity').value || 0;
    const productQuantity = this.selectedProduct?.quantity || 0;

    if (enteredQuantity > productQuantity) {
      this.formSupplierOrders
        .get('quantity')
        .setErrors({ quantityExceeded: true });
    } else {
      this.formSupplierOrders.get('quantity').setErrors(null);
    }
  }

  onProductSelected(productId: number) {
    this.selectedProduct = this.data.products.find(
      (product) => product.product.id === productId,
    );
    this.updateQuantityError();
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
    const createSupplierOrderItemData = this.formSupplierOrders.getRawValue();
    const modifiedItem = { ...createSupplierOrderItemData };
    modifiedItem.quantity = Number(
      createSupplierOrderItemData.quantity.toString().slice(0, 6),
    );

    createSupplierOrderItemData.supplier_order = parseInt(
      this.data.supplier_order,
    );
    this.ordersService
      .createSupplierOrderItem(createSupplierOrderItemData)
      .subscribe(
        (response) => {
          this.snackBar.open(
            snackbarConsts.admin.suppliersOrders.itens.create.success,
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
            snackbarConsts.admin.suppliersOrders.itens.create.error,
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
