import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

interface Supplier {
  id: number;
  name: number;
}

export interface CreateSuppliersModalData {
  suppliers: Supplier[];
}

@Component({
  selector: 'createSuppliers-modal',
  templateUrl: 'createSuppliers-modal.component.html',
  styleUrls: ['./createSuppliers-modal.component.scss'],
})
export class CreateSuppliersModalComponent implements OnInit {
  formCreateSuppliers: FormGroup;
  selectedCategories: number[] = [];
  isInvalidEmail: boolean;

  constructor(
    public dialogRef: MatDialogRef<CreateSuppliersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCreateSuppliers = this.formBuilder.group({
      name: ['', [Validators.required]],
      agent: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required]],
      ein: ['', [Validators.required]],
      ssn: ['', [Validators.required]],
      nic: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  checkEmailValidity() {
    const emailControl = this.formCreateSuppliers.get('email');
    this.isInvalidEmail = emailControl.invalid && emailControl.dirty;
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    var data = this.formCreateSuppliers.getRawValue();

    data.category = this.selectedCategories;
    this.stocksService.createSupplier(data).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snackBar.open(
          snackbarConsts.admin.suppliers.create.success,
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
          snackbarConsts.admin.suppliers.create.error,
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
