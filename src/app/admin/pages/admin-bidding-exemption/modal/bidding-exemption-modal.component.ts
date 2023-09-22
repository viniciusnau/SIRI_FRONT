import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'bidding-exemption-modal',
  templateUrl: 'bidding-exemption-modal.component.html',
  styleUrls: ['./bidding-exemption-modal.component.scss'],
})
export class BiddingExemptionModalComponent implements OnInit {
  formBiddingExemption: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BiddingExemptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formBiddingExemption = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      invoice: ['', [Validators.required]],
    });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const createBiddingExemptionData = this.formBiddingExemption.getRawValue();

    const modifiedItem = { ...createBiddingExemptionData };

    modifiedItem.quantity = Number(
      createBiddingExemptionData.quantity.toString().slice(0, 6),
    );

    this.stocksService.createBiddingExemption(modifiedItem).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.biddingExemption.create.success,
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
          snackbarConsts.admin.biddingExemption.create.error,
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
