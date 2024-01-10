import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Helper } from 'src/helper';

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
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.scss'],
})
export class SupplierOrdersComponent implements OnInit {
  supplierOrders: SupplierOrders[] = [];
  supplierId = '';

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    public Helper: Helper,
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

  navToSupplierOrderItems(id: number, protocol: any) {
    this.router.navigate([`pedidos-fornecedor/itens/${id}`, { protocol }]);
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
