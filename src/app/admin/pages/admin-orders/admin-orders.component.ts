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

  setPage(page: number) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(
      startIndex + this.pageSize - 1,
      this.data.results.length - 1,
    );
    this.pagedItems = this.data.results.slice(startIndex, endIndex + 1);
    this.getOrders(this.pageChange);
  }

  onPageChange(page: number) {
    const previousPage = this.currentPage;
    this.currentPage = page;
    console.log('this.currentPage: ', this.currentPage);
    this.getOrders(
      page > previousPage
        ? this.data?.next?.match(/\?(.+)/)[0]
        : this.data?.previous?.match(/\?(.+)/)[0],
    );
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
