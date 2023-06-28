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

@Component({
  selector: 'invoice-modal',
  templateUrl: 'order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
})
export class OrderModalComponent implements OnInit {
  formOrder: FormGroup;
  selectedFile: File;
  loading: boolean = false;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<OrderModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public ordersService: OrdersService,
  ) {}

  ngOnInit(): void {
    this.formOrder = this.formBuilder.group({});
    this.dialogRef.disableClose = true;
  }

  onNoClick(): void {
    window.location.reload()
  }

  onFileChange() {
    this.selectedFile = (
      this.fileInput.nativeElement as HTMLInputElement
    ).files[0];
  }

  onClick(): void {
    this.loading = true;
    const orderId = this.data.order_id;
    this.ordersService.getAllOrderItems(orderId).subscribe(orderItems => {
      for (const orderItem of orderItems) {
        const itemId = orderItem.id;
        const updateData = { added_quantity: orderItem.quantity };
        this.ordersService.updateOrderItem(itemId, updateData).subscribe(result => {
          const formData = new FormData();
          formData.append('file', this.selectedFile, `confirm_order_${orderId}.pdf`);
          this.ordersService.updateOrder(orderId, formData).subscribe(updateOrderResult => {
            window.location.reload();
          })
        });
      }
    });
  }
}
