import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface SupplierOrders {
  id: number;
  received: boolean;
  delivery_date: string;
  created: string;
  updated: string;
  client: number;
  supplier: number;
  protocol: number;
  public_defense: number;
}

@Component({
  selector: 'app-admin-supplier-orders',
  templateUrl: './admin-supplier-orders.component.html',
  styleUrls: ['./admin-supplier-orders.component.scss'],
})
export class AdminSupplierOrdersComponent implements OnInit {
  supplierOrders: SupplierOrders[] = [];
  supplierId = '';

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierId = params['id'];
    });
    this.getSupplierOrders();
  }

  getSupplierOrders() {
    this.ordersService
      .getSupplierOrdersById(this.supplierId)
      .subscribe((data) => {
        this.supplierOrders = data.results;
      });
  }

  navToSupplierOrderItems(supplier_order_id: number) {
    this.router.navigate([
      `admin/fornecedor/pedidos/itens/${supplier_order_id}`,
    ]);
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    }
    else {
      return '';
    }
  }

  displayedColumns = [
    'id',
    'protocol',
    'received',
    'delivery_date',
    'created',
    'updated',
  ];
}
