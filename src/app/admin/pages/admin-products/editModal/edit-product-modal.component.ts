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
  hasChanges: boolean = false;

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
      name: this.notEmpty(this.data.product.name),
      description: this.notEmpty(this.data.product.description),
      code: this.notEmpty(this.data.product.code),
      category: this.notEmpty(this.data.product.category.id),
      price: this.notEmpty(this.data.product.price),
      is_available: this.notEmpty(this.data.product.is_available),
    });
  }

  handlePriceFormat(field: any) {
    return field.replace('R$', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  notEmpty(content: any) {
    return content ? content : '';
  }

  getChangedProperties(): any {
    const formValue = this.formProduct.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.product[key]) {
        changedProperties[key] = value;
        this.hasChanges = true;
      } else {
        this.hasChanges = false;
      }
    });

    return changedProperties;
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

    const changedProperties = this.getChangedProperties();

    if (changedProperties.hasOwnProperty('price')) {
      changedProperties.price = this.handlePriceFormat(changedProperties.price);
    }

    this.stocksService
      .editProduct(this.data.product.id, changedProperties)
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
