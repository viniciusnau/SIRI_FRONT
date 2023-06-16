import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

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
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  pagedItems: AdminOrder[] = [];
  pageSize = 10;
  currentPage = 1;
  pageChange = '';
  data;

  constructor(public ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(pageChange?: string) {
    this.ordersService.getAllOrders(pageChange).subscribe((data) => {
      this.data = data;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (page > 1) {
      this.pageChange = this.data?.next;
    } else if (page < 1) {
      this.pageChange = this.data?.previous;
    } else {
      this.pageChange = '';
    }

    if (this.pageChange) {
      const queryString = this.pageChange.match(/\?(.+)/);
      this.getOrders(queryString ? queryString[0] : '');
    }
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  navigateToOrderItems(orderId: number) {
    this.router.navigate([`/admin/pedidos/itens/${orderId}`]);
  }

  updateOrderSentStatus(order: AdminOrder) {
    const payload = { is_sent: order.is_sent };

    this.ordersService.updateOrder(order.id, payload).subscribe(() => {
      // Success message or any additional logic after updating the order
    });
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
  ];
}
