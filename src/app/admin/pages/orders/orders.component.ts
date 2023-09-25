import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceControlOrdersModalComponent } from './invoiceControlmodal/invoice-control-orders-modal.component';

interface AdminOrder {
  id: number;
  is_sent: boolean;
  partially_added_to_stock: boolean;
  completely_added_to_stock: boolean;
  created: string;
  updated: string;
  client: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading = false;

  constructor(
    public ordersService: OrdersService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent() {
    this.ordersService
      .getOrders(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = false;
      });
  }

  openModal(file, confirm_file): void {
    const data = { file: file, confirm_file: confirm_file };
    const dialogRef = this.dialog.open(InvoiceControlOrdersModalComponent, {
      data: data,
    });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  navigateToOrderItems(orderId: number) {
    this.router.navigate([`/gerenciar-pedidos/itens/${orderId}`]);
  }

  updateOrderSentStatus(order: AdminOrder) {
    const payload = { is_sent: order.is_sent };

    this.ordersService.updateOrder(order.id, payload).subscribe(() => {});
  }

  displayedColumns = [
    'id',
    'user',
    'sent',
    'partAdded',
    'compAdded',
    'created',
    'updated',
    'actions',
    'confirm_order',
  ];
}
