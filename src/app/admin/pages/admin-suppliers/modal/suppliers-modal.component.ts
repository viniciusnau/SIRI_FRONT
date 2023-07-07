import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'suppliers-modal',
  templateUrl: 'suppliers-modal.component.html',
  styleUrls: ['./suppliers-modal.component.scss'],
})
export class SuppliersModalComponent implements OnInit {
  formSuppliers: FormGroup;
  selectedCategories: number[] = [];
  isInvalidEmail: boolean;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<SuppliersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formSuppliers = this.formBuilder.group({
      name: this.notEmpty(this.data.suppliers.name),
      agent: this.notEmpty(this.data.suppliers.agent),
      address: this.notEmpty(this.data.suppliers.address),
      email: [this.notEmpty(this.data.suppliers.email), Validators.email],
      phone: this.notEmpty(this.data.suppliers.phone),
      ein: this.notEmpty(this.data.suppliers.ein),
      ssn: this.notEmpty(this.data.suppliers.ssn),
      nic: this.notEmpty(this.data.suppliers.nic),
      category: this.notEmpty(this.data.suppliers.category.id),
    });
  }

  notEmpty(content: any) {
    return content ? content : '';
  }

  getChangedProperties(): any {
    const formValue = this.formSuppliers.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.suppliers[key] && key !== 'category') {
        changedProperties[key] = value;
        this.hasChanges = true;
      }
    });

    return changedProperties;
  }

  checkEmailValidity() {
    const emailControl = this.formSuppliers.get('email');
    this.isInvalidEmail = emailControl.invalid && emailControl.dirty;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  onClick(): void {
    if (this.formSuppliers.invalid) {
      this.snackBar.open('Ops!', 'Possivelmente o e-mail está inválido', {
        duration: 3000,
      });
      return;
    }

    const editSuppliersData = this.getChangedProperties();

    Object.keys(editSuppliersData).forEach((key) => {
      if (editSuppliersData[key] === '') {
        delete editSuppliersData[key];
      }
    });

    if (
      Array.isArray(this.selectedCategories) &&
      this.selectedCategories.length != 0
    ) {
      editSuppliersData.category = this.selectedCategories;
    } else {
      delete editSuppliersData.category;
    }

    this.stocksService
      .editSupplier(this.data.suppliers_id, editSuppliersData)
      .subscribe((response) => {
        window.location.reload();
      });
  }
}
