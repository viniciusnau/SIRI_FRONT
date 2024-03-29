import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'edit-product-modal',
  templateUrl: 'edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  formProduct: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formProduct = this.formBuilder.group({
      name: this.Helper.notEmpty(this.data.product.name),
      description: this.Helper.notEmpty(this.data.product.description),
      code: this.Helper.notEmpty(this.data.product.code),
      category: this.Helper.notEmpty(this.data.product.category.id),
      price: this.Helper.notEmpty(this.data.product.price),
      is_available: this.Helper.notEmpty(this.data.product.is_available),
    });

    this.formProduct.valueChanges.subscribe(() => {
      this.getChangedProperties();
    });
  }

  handlePriceFormat(field: any) {
    return field.replace('R$', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  getChangedProperties(): any {
    const formValue = this.formProduct.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.product[key]) {
        changedProperties[key] = value;
      }
    });

    this.hasChanges = Object.keys(changedProperties).length > 0;

    return changedProperties;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formProduct.invalid) return;

    const changedProperties = this.getChangedProperties();

    if (changedProperties.hasOwnProperty('price')) {
      changedProperties.price = this.handlePriceFormat(changedProperties.price);
    }

    this.stocksService
      .editProduct(this.data.product.id, changedProperties)
      .subscribe({
        next: (result) => {
          this.dialogRef.close();
          this.snackBar.open(
            snackbarConsts.admin.products.edit.success,
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
        error: (error) => {
          this.snackBar.open(
            snackbarConsts.admin.products.edit.error,
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
    }, 1000);
  }
}
