import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderItemModalComponent } from './modal/deleteOrderItem-modal.component.component';
import { BehaviorSubject } from 'rxjs';

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
  currentPage = 1;
  response: any;
  orderId = '';
  suppliers: Supplier[] = [];
  supplierQuantityControls: { [key: number]: FormControl } = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  quantityIsValid: boolean = true;
  supplierQuantityIsValid: boolean = true;

  private supplierQuantityValiditySubject = new BehaviorSubject<boolean>(true);
  private quantityValiditySubject = new BehaviorSubject<boolean>(true);

  supplierQuantityValidity$ =
    this.supplierQuantityValiditySubject.asObservable();
  quantityValidity$ = this.quantityValiditySubject.asObservable();

  constructor(
    private ordersService: OrdersService,
    private suppliersService: SuppliersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
    this.getContent(this.orderId);
    this.getAllSuppliers();
    this.supplierQuantityValidity$.subscribe((isValid) => {
      this.supplierQuantityIsValid = isValid;
    });

    this.quantityValidity$.subscribe((isValid) => {
      this.quantityIsValid = isValid;
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent(this.orderId);
  }

  isIntegerValue(value: number): boolean {
    return Number.isInteger(value);
  }

  validateIntegerValue(orderItem: AdminOrderItems, fieldName: string): void {
    const isValid = this.isIntegerValue(orderItem[fieldName]);

    if (fieldName === 'quantity') {
      this.quantityValiditySubject.next(isValid);
    } else if (fieldName === 'supplier_quantity') {
      this.supplierQuantityValiditySubject.next(isValid);
    }
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  getContent(orderId?: string) {
    this.ordersService
      .getOrderItems(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.response.forEach((orderItem) => {
          this.supplierQuantityControls[orderItem.id] = new FormControl();
        });
      });
  }

  getAllSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }

  saveItem(orderItem: AdminOrderItems) {
    let payload = {};
    if (orderItem.supplier) {
      if (
        typeof orderItem.supplier === 'object' &&
        !Array.isArray(orderItem.supplier)
      ) {
        const id = orderItem.supplier.id;
        payload = {
          ...payload,
          supplier: id,
          supplier_quantity: orderItem.supplier_quantity,
          quantity: orderItem.quantity,
        };
      } else {
        payload = {};
      }
    } else {
      payload = { quantity: orderItem.quantity };
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
      },
    );
  }

  onSupplierSelectionChange(orderItem: AdminOrderItems, supplierId: number) {
    orderItem.supplier = { id: supplierId, name: '' };
  }

  deleteOrderItemModal(orderItemId: string): void {
    const dialogRef = this.dialog.open(DeleteOrderItemModalComponent, {
      data: orderItemId,
    });
  }

  displayedColumns = [
    'id',
    'product',
    'description',
    'quantity',
    'added_quantity',
    'measure',
    'supplier',
    'supplier_quantity',
    'actions',
    'deleteOrderItem',
  ];
}
