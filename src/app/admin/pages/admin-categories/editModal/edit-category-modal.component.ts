import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'edit-category-modal',
  templateUrl: 'edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
})
export class EditCategoryModalComponent implements OnInit {
  formCategory: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formCategory = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if (this.formCategory.invalid) return;

    var editCategoryData = this.formCategory.getRawValue();

    this.stocksService
      .editCategory(this.data.category_id, editCategoryData)
      .subscribe((response) => {
        this.dialogRef.close();
      });
    window.location.reload();
  }
}
