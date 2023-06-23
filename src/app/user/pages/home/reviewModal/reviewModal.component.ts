import { OrdersService } from './../../../../services/orders.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'review-modal',
  templateUrl: './reviewModal.component.html',
  styleUrls: ['./reviewModal.component.scss'],
})
export class ReviewModal implements OnInit {
  response: FormGroup;
  displayedColumns = ['name', 'description', 'quantity', 'measure'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<HomeComponent>,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  createForm() {
    this.response = this.formBuilder.group({
      name: [this.response, [Validators.required]], // will need the response.PROP - input disabled - only read for the user
      description: [this.response, [Validators.required]],
      quantity: [this.response, [Validators.required]],
      measure: [this.response, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const dialogRef = this.dialog.open(HomeComponent, {
      data: { modalContent: this.response },
    });

    // the idea: came the informations of the main page, the user did the review and now
    // throw the information back to the main page, to keep the flow of send the request

    // if (this.response.invalid) return;

    // var createSupplierOrderData = this.response.getRawValue();

    // createSupplierOrderData.received = false;
    // createSupplierOrderData.client = this.data.client;

    // this.ordersService
    //   .createSupplierOrder(createSupplierOrderData)
    //   .subscribe((response) => {
    //     this.dialogRef.close();
    //   });
    // window.location.reload();
  }
}
