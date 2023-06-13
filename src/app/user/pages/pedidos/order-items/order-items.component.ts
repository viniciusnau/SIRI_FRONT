import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { EditOrderItemModalComponent } from './editModal/edit-order-item-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface OrderItems {
  id: number;
  product: number;
  quantity: number;
  added_quantity: number;
  order: number;
  measure: number;
}

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit {
  orderItems: OrderItems[] = [];
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
    this.getOrderItems(this.orderId);
  }

  getOrderItems(orderId: string) {
    this.ordersService.getOrderItems(orderId).subscribe((data) => {
      this.orderItems = data.results;
    });
  }

  deleteOrderItem(orderItemId: string) {
    this.ordersService
      .deleteOrderItem(orderItemId)
      .toPromise()
      .then((data: any) => {
        this.getOrderItems(this.orderId);
      })
      .catch((error: any) => {
        this.snackBar.open('Erro ao excluir item do pedido', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        });
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  openEditModal(product_id: string) {
    console.log(this.orderId);
    const dialogRef = this.dialog.open(EditOrderItemModalComponent, {
      data: {
        order_id: this.orderId,
        snackBar: this.snackBar,
      },
    });
  }

  displayedColumns = [
    'product',
    'measure',
    'quantity',
    'added_quantity',
    'edit_order_item',
    'delete_order_item',
  ];
}
