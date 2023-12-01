import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'edit-dispatch-reports-modal',
  templateUrl: 'edit-dispatch-reports-modal.component.html',
  styleUrls: ['./edit-dispatch-reports-modal.component.scss'],
})
export class DispatchReportsModalComponent implements OnInit {
  formDescription: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DispatchReportsModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: string;
      id: string;
    },
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDescription = this.formBuilder.group({
      description: [
        this.Helper.notEmpty(this.data.description),
        [Validators.required],
      ],
    });
  }

  getChangedProperties(): any {
    const formValue = this.formDescription.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data[key]) {
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
    if (this.formDescription.invalid) return;
    const description = this.formDescription.getRawValue();
    this.stocksService.patchDispatchReport(this.data.id, description).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.dispatchReports.edit.success,
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
          snackbarConsts.admin.dispatchReports.edit.error,
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
