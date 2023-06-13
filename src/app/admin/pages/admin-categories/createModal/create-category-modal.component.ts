import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    if (this.formCategory.invalid) return;

    var createCategoryData = this.formCategory.getRawValue();

    this.stocksService
      .createCategory(createCategoryData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
