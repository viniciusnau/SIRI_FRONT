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
    measure: {
      id: number;
      name: string;
    };
  };
  quantity: number;
  added_quantity: number;
  order: number;
  measure: number;
  protocol?: Protocol;
  supplier_quantity: number;
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
    });
    this.getContent(this.orderId);
    this.getAllProtocols();
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

  getAllProtocols() {
    this.stocksService.getAllProtocols().subscribe((data) => {
      this.protocols = data;
    });
  }

  saveItem(orderItem: iAdminOrderItems) {
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

  displayedColumns = [
    'id',
    'product',
    'description',
    'quantity',
    'added_quantity',
    'measure',
    'protocol',
    'supplier_quantity',
    'actions',
    'deleteOrderItem',
  ];
}
