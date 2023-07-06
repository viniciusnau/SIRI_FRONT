import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-measure-modal',
  templateUrl: 'edit-measure-modal.component.html',
  styleUrls: ['./edit-measure-modal.component.scss'],
})
export class EditMeasureModalComponent implements OnInit {
  formMeasure: FormGroup;
  hasChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditMeasureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formMeasure = this.formBuilder.group({
      name: [this.notEmpty(this.data.measure.name), [Validators.required]],
    });
  }

  notEmpty(content: any) {
    return content ? content : '';
  }

  getChangedProperties(): any {
    const formValue = this.formMeasure.getRawValue();
    const changedProperties: any = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value !== this.data.measure[key]) {
        changedProperties[key] = value;
        this.hasChanges = true;
      }
    });

    return changedProperties;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formMeasure.invalid) return;

    const editMeasureData = this.getChangedProperties();

    this.stocksService
      .editMeasure(this.data.measure.id, editMeasureData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
