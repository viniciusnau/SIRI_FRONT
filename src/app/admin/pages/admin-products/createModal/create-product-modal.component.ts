import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-product-modal',
  templateUrl: 'create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss'],
})
export class CreateProductModalComponent implements OnInit {
  formProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formProduct.invalid) return;
    const createProductData = this.formProduct.getRawValue();

    this.stocksService.createProduct(createProductData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        this.data.snackBar.open(
          'Tudo certo!',
          'Produto criado com sucesso!',
          {
            duration: 3000,
          },
        );
      },
      error: (error) => {
        this.data.snackBar.open('Ops!', 'Houve um erro ao criar o produto!', {
          duration: 3000,
        });
      },
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
