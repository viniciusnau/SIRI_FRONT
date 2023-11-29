import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'create-bidding-exemption-modal',
  templateUrl: 'create-bidding-exemption-modal.component.html',
  styleUrls: ['./create-bidding-exemption-modal.component.scss'],
})
export class CreateBiddingExemptionModalComponent implements OnInit {
  formBiddingExemption: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateBiddingExemptionModalComponent>,
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
    this.formBiddingExemption = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      invoice: ['', [Validators.required]],
      price: [''],
    });
  }

  handlePriceFormat(field: string) {
    return field?.replace('R$ ', '').replace(/[.]/g, '').replace(/[,]/g, '.');
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

    modifiedItem.price = this.handlePriceFormat(modifiedItem.price);

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
