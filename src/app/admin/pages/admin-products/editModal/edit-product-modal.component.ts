import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-product-modal',
  templateUrl: 'edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent implements OnInit {
  formProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formProduct = this.formBuilder.group({
      name: [''],
      description: [''],
      code: [''],
      category: [''],
      price: [''],
      is_available: [''],
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
    if (this.formProduct.invalid) return;

    const editProductData = Object.entries(this.formProduct.getRawValue())
      .filter(([_, value]) => value !== '' && value !== null)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    this.stocksService
      .editProduct(this.data.product_id, editProductData)
      .subscribe({
        next: (result) => {
          this.dialogRef.close();
          this.data.snackBar.open(
            'Tudo certo!',
            'O produto foi editado com sucesso!',
            {
              duration: 3000,
            },
          );
        },
        error: (error) => {
          this.data.snackBar.open(
            'Ops!',
            'Houve um erro ao editar o produto!',
            {
              duration: 3000,
            },
          );
        },
      });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
