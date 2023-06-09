import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../../services/orders.service';

@Component({
  selector: 'deleteOrderItem-modal',
  templateUrl: 'deleteOrderItem-modal.component.html',
  styleUrls: ['./deleteOrderItem-modal.component.scss'],
})
export class DeleteOrderItemModalComponent implements OnInit {
  formDeleteOrderItem: FormGroup;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteOrderItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formDeleteOrderItem = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.loading = true;
    this.ordersService
      .deleteOrderItem(this.data, this.formDeleteOrderItem.getRawValue().description)
      .toPromise()
      .then((data: any) => {
        this.loading = false;
        window.location.reload();
      });
  }
}
