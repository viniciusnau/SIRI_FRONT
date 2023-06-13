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
      name: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formMeasure.invalid) return;

    var editMeasureData = this.formMeasure.getRawValue();

    this.stocksService
      .editMeasure(this.data.measure_id, editMeasureData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
