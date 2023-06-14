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
      name: [''],
      agent: [''],
      address: [''],
      email: ['', Validators.email],
      phone: [''],
      ein: [''],
      ssn: [''],
      nic: [''],
      category: [''],
    });
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
      this.snackBar.open('Ops!', 'Possivelmente seu e-mail está inválido', {
        duration: 3000,
      });
    }

    const editSuppliersData = this.formSuppliers.getRawValue();

    editSuppliersData.category = this.selectedCategories;

    this.stocksService
      .editSupplier(this.data.suppliers_id, editSuppliersData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    //window.location.reload();
  }
}
