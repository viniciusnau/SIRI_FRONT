import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'create-category-modal',
  templateUrl: 'create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
})
export class CreateCategoryModalComponent implements OnInit {
  formCategory: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCategory = this.formBuilder.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    var createCategoryData = this.formCategory.getRawValue();

    this.stocksService.createCategory(createCategoryData).subscribe(
      (response) => {
        this.dialogRef.close();
        this.snackBar.open(
          snackbarConsts.admin.category.create.success,
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
          snackbarConsts.admin.category.create.error,
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
