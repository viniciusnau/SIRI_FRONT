import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'confirm-order-modal',
  templateUrl: 'confirm-order-modal.component.html',
  styleUrls: ['./confirm-order-modal.component.scss'],
})
export class ConfirmOrderModalComponent implements OnInit {
  formOrder: FormGroup;
  selectedFile: File;
  selectedConfirmFile: File;
  loading: boolean = false;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('confirmFileInput', { static: false })
  confirmFileInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.formOrder = this.formBuilder.group({});
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    window.location.reload();
  }

  onFileChange() {
    this.selectedFile = (
      this.fileInput.nativeElement as HTMLInputElement
    ).files[0];
    this.selectedConfirmFile = (
      this.confirmFileInput.nativeElement as HTMLInputElement
    ).files[0];
  }

  onClick(): void {
    this.loading = true;
    const orderId = this.data.order_id;

    this.ordersService.getAllOrderItems(orderId).subscribe((orderItems) => {
      for (const orderItem of orderItems) {
        const itemId = orderItem.id;
        const updateData = { added_quantity: orderItem.quantity };

        this.ordersService.updateOrderItem(itemId, updateData).subscribe(
          (result) => {
            const formData = new FormData();
            formData.append(
              'file',
              this.selectedFile,
              `confirm_order_${orderId}.pdf`,
            );
            formData.append(
              'confirm_file',
              this.selectedConfirmFile,
              `confirm_file_order_${orderId}.pdf`,
            );
            this.ordersService
              .updateOrder(orderId, formData)
              .subscribe((updateOrderResult) => {
                window.location.reload();
              });
            this.snackBar.open(
              snackbarConsts.user.orders.confirmDelivery.success,
              snackbarConsts.close,
              {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              },
            );
          },
          (error) => {
            this.snackBar.open(
              snackbarConsts.user.orders.confirmDelivery.error,
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
    });
  }
}
