import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'create-measure-modal',
  templateUrl: 'create-measure-modal.component.html',
  styleUrls: ['./create-measure-modal.component.scss'],
})
export class CreateMeasureModalComponent implements OnInit {
  formMeasure: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateMeasureModalComponent>,
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

    const createMeasureData = this.formMeasure.getRawValue();

    this.stocksService
      .createMeasure(createMeasureData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
