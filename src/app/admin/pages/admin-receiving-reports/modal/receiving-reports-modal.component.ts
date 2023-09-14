import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'receiving-reports-modal',
  templateUrl: 'receiving-reports-modal.component.html',
  styleUrls: ['./receiving-reports-modal.component.scss'],
})
export class ReceivingReportsModalComponent implements OnInit {
  formDescription: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReceivingReportsModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      description: any;
      product: any;
      id: string;
    },
    public stocksService: StocksService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDescription = this.formBuilder.group({
      description: [
        this.notEmpty(this.data?.description),
        [Validators.required],
      ],
    });
  }

  notEmpty(content: any) {
    return content ? content : '';
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
    const changedProperties = this.getChangedProperties();
    this.stocksService
      .patchReceivingReport(this.data.id, changedProperties)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {},
      );
  }
}
