import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { StocksService } from 'src/app/services/stocks.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOrderItemModalComponent } from './deleteModal/delete-order-item-modal.component.component';
import { BehaviorSubject } from 'rxjs';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

interface Protocol {
  id: number;
  code: string;
}

interface iAdminOrderItems {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    measure: {
      id: number;
      name: string;
    };
    price: number;
  };
  quantity: number;
  added_quantity: number;
  order: number;
  measure: number;
  protocol?: Protocol;
  supplier_quantity: number;
  availableProtocols?: Protocol[];
}

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.scss'],
})
export class OrderItemsComponent implements OnInit {
  currentPage = 1;
  response: any;
  orderId = '';
  protocols: Protocol[] = [];
  supplierQuantityControls: { [key: number]: FormControl } = {};
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  quantityIsValid: boolean = true;
  supplierQuantityIsValid: boolean = true;
  stockId: number | undefined;

  private supplierQuantityValiditySubject = new BehaviorSubject<boolean>(true);
  private quantityValiditySubject = new BehaviorSubject<boolean>(true);

  supplierQuantityValidity$ =
    this.supplierQuantityValiditySubject.asObservable();
  quantityValidity$ = this.quantityValiditySubject.asObservable();

  constructor(
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
      this.getStockIdByOrderId(this.orderId).subscribe((stockId) => {
        this.stockId = stockId;
        this.getContent(this.orderId);
      });
    });

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

  getStockIdByOrderId(orderId: string) {
    return this.ordersService.getStockIdByOrderId(orderId);
  }
  
  getContent(orderId?: string) {
    this.ordersService
      .getOrderItems(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.response.results.forEach((orderItem: iAdminOrderItems) => {
          if (orderItem.supplier_quantity === 0 && this.stockId === 1) {
            orderItem.supplier_quantity = orderItem.quantity;
          }
          this.supplierQuantityControls[orderItem.id] = new FormControl(orderItem.supplier_quantity);
          this.updateOrderItemProtocols(orderItem);
        });
      });
  }

  onQuantityChange(orderItem: iAdminOrderItems, newQuantity: number) {
    if (this.stockId === 1) {
      orderItem.supplier_quantity = newQuantity;
    }
    
    if (this.supplierQuantityControls[orderItem.id]) {
      this.supplierQuantityControls[orderItem.id].setValue(orderItem.supplier_quantity, { emitEvent: false });
    }
  }

  updateOrderItemProtocols(orderItem: iAdminOrderItems) {
    const { name, description } = orderItem.product;
    this.stocksService.getProtocolsByNameAndDescription(name, description)
      .subscribe((protocols) => {
        orderItem.availableProtocols = protocols;
      });
  }

  isSaveButtonDisabled(orderItem: iAdminOrderItems): boolean {
    if (this.stockId === 1) {
      console.log(!orderItem.protocol)
      return orderItem.quantity === orderItem.added_quantity || !orderItem.protocol;
    }
    return false;
  }

  saveItem(orderItem: iAdminOrderItems) {
    if (!orderItem.protocol && this.stockId === 1) {
      return this.snackBar.open(
        'Por favor, selecione uma Ata antes de salvar.',
        snackbarConsts.close,
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        },
      );
    }

    let payload = {};

    if (orderItem.supplier_quantity > orderItem.quantity) {
      return this.snackBar.open(
        snackbarConsts.admin.manageOrders.itens.edit.error,
        snackbarConsts.close,
        {
          duration: 3000,
          panelClass: ['snackbar-error'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        },
      );
    }

    if (orderItem.protocol) {
      if (
        typeof orderItem.protocol === 'object' &&
        !Array.isArray(orderItem.protocol)
      ) {
        const id = orderItem.protocol.id;
        payload = {
          ...payload,
          protocol: id,
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
        this.snackBar.open(
          snackbarConsts.admin.manageOrders.itens.edit.success,
          snackbarConsts.close,
          {
            duration: 3000,
            panelClass: ['snackbar-success'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          },
        );
      },
      (error) => {
        this.snackBar.open(
          snackbarConsts.admin.manageOrders.itens.edit.error,
          snackbarConsts.close,
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          },
        );
      },
    );
    return true;
  }

  onProtocolSelectionChange(orderItem: iAdminOrderItems, protocolId: number) {
    orderItem.protocol = {
      code: '',
      id: protocolId,
    };
  }

  deleteItem(id: string): void {
    const dialogRef = this.dialog.open(DeleteOrderItemModalComponent, {
      data: id,
    });
  }

  getWarehouseQuantity(orderItem: iAdminOrderItems): number {
    if (this.stockId === 1) {
      return 0;
    }
    return orderItem.supplier_quantity === 0 ? 0 : orderItem.quantity - orderItem.supplier_quantity;
  }

  updateSupplierQuantity(orderItem: iAdminOrderItems, newValue: string) {
    const numericValue = parseFloat(newValue);
    if (!isNaN(numericValue) && numericValue <= orderItem.quantity) {
      orderItem.supplier_quantity = numericValue;
      this.supplierQuantityControls[orderItem.id].setValue(numericValue, { emitEvent: false });
    }
  }
  
  onSupplierQuantityChange(orderItem: iAdminOrderItems, newValue: string) {
    this.updateSupplierQuantity(orderItem, newValue); // Passa a string diretamente
  }

  displayedColumns = [
    'product',
    'description',
    'measure',
    'price',
    'quantity',
    'added_quantity',
    'warehouse',
    'protocol',
    'supplier_quantity',
    'actions',
    'deleteOrderItem',
  ];
}
