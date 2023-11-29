import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'edit-category-modal',
  templateUrl: 'edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent implements OnInit {
  formCategory: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryModalComponent>,
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
    this.formCategory = this.formBuilder.group({
      code: [
        this.Helper.notEmpty(this.data.category.code),
        [Validators.required],
      ],
    });
  }

  getChangedProperties(): any {
    const formValue = this.formCategory.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.category[key]) {
        changedProperties[key] = value;
        this.hasChanges = true;
      } else {
        this.hasChanges = false;
      }
    });

    return changedProperties;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formCategory.invalid) return;

    var editCategoryData = this.getChangedProperties();

    this.stocksService
      .editCategory(this.data.category.id, editCategoryData)
      .subscribe(
        (response) => {
          this.dialogRef.close();
          this.snackBar.open(
            snackbarConsts.admin.category.edit.success,
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
            snackbarConsts.admin.category.edit.error,
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
