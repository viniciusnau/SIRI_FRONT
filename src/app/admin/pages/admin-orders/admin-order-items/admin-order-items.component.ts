import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

interface AdminOrderItems {
  id: number;
  product: {
    id: number;
    name: string;
    measure: {
      id: number;
      name: string;
    };
  };
  quantity: number;
  added_quantity: number;
  order: number;
  measure: number;
  supplier?: {
    id: number;
    name: string;
  };
  supplier_quantity: number;
}

interface Supplier {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-order-items',
  templateUrl: './admin-order-items.component.html',
  styleUrls: ['./admin-order-items.component.scss'],
})
export class AdminOrderItemsComponent implements OnInit {
  orderItems: AdminOrderItems[] = [];
  orderId = '';
  suppliers: Supplier[] = [];
  supplierQuantityControls: { [key: number]: FormControl } = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private ordersService: OrdersService,
    private suppliersService: SuppliersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
    this.getOrderItems(this.orderId);
    this.getSuppliers();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  getOrderItems(orderId: string) {
    this.ordersService.getOrderItems(orderId).subscribe((data) => {
      this.orderItems = data.results;
      this.orderItems.forEach((orderItem) => {
        this.supplierQuantityControls[orderItem.id] = new FormControl();
      });
    });
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data.results;
    });
  }

  saveItem(orderItem: AdminOrderItems) {
    let payload = {};

    if (typeof orderItem.supplier === 'object' && !Array.isArray(orderItem.supplier)) {
      const id = orderItem.supplier.id;
      payload = {
        ...payload,
        supplier: id,
        supplier_quantity: orderItem.supplier_quantity,
      };
    } else {
      payload = {
        ...payload,
        supplier: orderItem.supplier,
        supplier_quantity: orderItem.supplier_quantity,
      };
    }

    this.ordersService.updateOrderItem(orderItem.id, payload).subscribe(
      (response) => {
        this.snackBar.open('Salvo com sucesso!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      },
      (error) => {
        this.snackBar.open('Erro ao salvar', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );
  }

  onSupplierSelectionChange(orderItem: AdminOrderItems, supplierId: number) {
    orderItem.supplier = { id: supplierId, name: '' };
  }

  displayedColumns = [
    'id',
    'product',
    'quantity',
    'added_quantity',
    'measure',
    'supplier',
    'supplier_quantity',
    'actions',
  ];
}
