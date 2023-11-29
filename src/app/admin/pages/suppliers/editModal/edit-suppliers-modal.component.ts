import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

@Component({
  selector: 'edit-suppliers-modal',
  templateUrl: 'edit-suppliers-modal.component.html',
  styleUrls: ['./edit-suppliers-modal.component.scss'],
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
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formSuppliers = this.formBuilder.group({
      name: this.Helper.notEmpty(this.data.suppliers.name),
      agent: this.Helper.notEmpty(this.data.suppliers.agent),
      address: this.Helper.notEmpty(this.data.suppliers.address),
      email: [
        this.Helper.notEmpty(this.data.suppliers.email),
        Validators.email,
      ],
      phone: this.Helper.notEmpty(this.data.suppliers.phone),
      ein: this.Helper.notEmpty(this.data.suppliers.ein),
      category: this.Helper.notEmpty(this.data.suppliers.category.id),
    });

    this.formSuppliers.valueChanges.subscribe(() => {
      this.getChangedProperties();
    });
  }

  getChangedProperties(): any {
    const formValue = this.formSuppliers.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.suppliers[key] && key !== 'category') {
        changedProperties[key] = value;
      }
    });

    this.hasChanges = Object.keys(changedProperties).length > 0;

    return changedProperties;
  }

  checkEmailValidity() {
    const emailControl = this.formSuppliers.get('email');
    this.isInvalidEmail = emailControl.invalid && emailControl.dirty;
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      .editSupplier(this.data.suppliers.id, editSuppliersData)
      .subscribe(
        (response) => {
          this.snackBar.open(
            snackbarConsts.admin.suppliers.edit.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
          window.location.reload();
        },
        (error) => {
          this.snackBar.open(
            snackbarConsts.admin.suppliers.edit.error,
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
