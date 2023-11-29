import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'create-product-modal',
  templateUrl: 'create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss'],
})
export class CreateProductModalComponent implements OnInit {
  formProduct: any;

  constructor(
    public dialogRef: MatDialogRef<CreateProductModalComponent>,
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
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      measure: ['', [Validators.required]],
      is_available: ['', [Validators.required]],
    });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  handlePriceFormat(field: string) {
    return field?.replace('R$ ', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const createProductData = this.formProduct.getRawValue();
    createProductData.price = this.handlePriceFormat(createProductData.price);
    this.stocksService.createProduct(createProductData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        this.snackBar.open(
          snackbarConsts.admin.products.create.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      },
      error: (error) => {
        this.snackBar.open(
          snackbarConsts.admin.products.create.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
    });
  }
}
