import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { EditOrderItemModalComponent } from './editModal/edit-order-item-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit {
  loading: number | null = null;
  response: any;
  currentPage = 1;
  page = 'next';
  orderId = '';

  constructor(
    public ordersService: OrdersService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
    this.getContent(this.orderId);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent(this.orderId);
  }

  getContent(orderId: string) {
    this.ordersService
      .getOrderItems(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
      });
  }

  deleteOrderItem(orderItemId: string) {
    this.loading = Number(orderItemId);
    this.ordersService
      .deleteOrderItem(orderItemId)
      .toPromise()
      .then((data: any) => {
        this.getContent(this.orderId);
        this.snackBar.open(
          snackbarConsts.user.orders.itens.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          },
        );
      })
      .catch((error: any) => {
        this.snackBar.open(
          snackbarConsts.user.orders.itens.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          },
        );
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  openEditModal(orderItemId: string, addedQuantity: string, quantity: string) {
    const dialogRef = this.dialog.open(EditOrderItemModalComponent, {
      data: {
        order_item_id: orderItemId,
        added_quantity: addedQuantity,
        quantity: quantity,
        snackBar: this.snackBar,
      },
    });
  }

  displayedColumns = [
    'product',
    'description',
    'measure',
    'quantity',
    'added_quantity',
    'quantity_to_be_added',
    'edit_order_item',
    'delete_order_item',
  ];
}
