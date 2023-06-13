import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface SupplierOrderItems {
  id: number;
  quantity: number;
  supplier_order: number;
  product: number;
  measure: number;
}

@Component({
  selector: 'app-admin-supplier-order-items',
  templateUrl: './admin-supplier-order-items.component.html',
  styleUrls: ['./admin-supplier-order-items.component.scss'],
})
export class AdminSupplierOrderItemsComponent implements OnInit {
  supplierOrderItems: SupplierOrderItems[] = [];
  supplierOrderId = '';
  displayedColumns = [
    'id',
    'product',
    'measure',
    'quantity',
    'receivedQuantity',
  ];

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierOrderId = params['id'];
    });
    this.getSupplierOrderItems();
  }

  getSupplierOrderItems() {
    this.ordersService
      .getSupplierOrderItems(this.supplierOrderId)
      .subscribe((data) => {
        this.supplierOrderItems = data.results;
      });
  }
}
