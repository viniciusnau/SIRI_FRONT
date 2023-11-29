import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

interface Supplier {
  id: number;
  name: number;
}

export interface CreateSuppliersModalData {
  suppliers: Supplier[];
}

@Component({
  selector: 'create-suppliers-modal',
  templateUrl: 'create-suppliers-modal.component.html',
  styleUrls: ['./create-suppliers-modal.component.scss'],
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
    public Helper: Helper,
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
      category: ['', [Validators.required]],
    });
  }

  checkEmailValidity() {
    const emailControl = this.formCreateSuppliers.get('email');
    this.isInvalidEmail = emailControl.invalid && emailControl.dirty;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const data = this.formCreateSuppliers.getRawValue();

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
