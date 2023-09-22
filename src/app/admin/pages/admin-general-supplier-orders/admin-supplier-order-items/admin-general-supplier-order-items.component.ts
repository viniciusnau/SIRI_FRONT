import { StocksService } from '../../../../services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { CreateAdminGeneralSupplierOrdersItemsModalComponent } from './createModal/create-admin-general-supplier-orders-items-modal-component';
import { MatDialog } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-supplier-order-items',
  templateUrl: './admin-general-supplier-order-items.component.html',
  styleUrls: ['./admin-general-supplier-order-items.component.scss'],
})
export class AdminGeneralSupplierOrderItemsComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading: number | null = null;
  supplierOrderId = '';
  protocolId = '';
  protocolItems = [];
  displayedColumns = [
    'id',
    'product',
    'description',
    'quantity',
    'measure',
    'deleteOrderItem',
  ];

  constructor(
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierOrderId = params['id'];
    });

    this.protocolId = this.route.snapshot.paramMap.get('protocol');

    this.getContent();
    this.getProtocolItems();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  openCreateModal() {
    this.removeItems();
    const dialogRef = this.dialog.open(
      CreateAdminGeneralSupplierOrdersItemsModalComponent,
      {
        data: {
          protocol: this.protocolId,
          products: this.protocolItems,
          supplier_order: this.supplierOrderId,
        },
      },
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent() {
    this.ordersService
      .getSupplierOrderItems(this.supplierOrderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
      });
  }

  getProtocolItems() {
    this.stocksService
      .getAllProtocolItems(this.protocolId)
      .subscribe((data) => {
        this.protocolItems = data.results;
        this.removeItems();
      });
  }

  removeItems() {
    if (this.response?.results === 0 || this.protocolItems.length === 0) {
      return;
    }
    this.protocolItems = this.protocolItems.filter((item) => {
      return !this.response.results.some(
        (orderItem) => orderItem.product.id === item.product.id,
      );
    });
  }

  deleteItem(id: string) {
    this.loading = Number(id);
    this.ordersService
      .deleteGeneralOrderItem(id)
      .toPromise()
      .then((data: any) => {
        this.snackBar.open(
          snackbarConsts.admin.suppliersOrders.itens.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        this.getContent();
      })
      .catch((error: any) => {
        this.loading = null;
        this.snackBar.open(
          snackbarConsts.admin.suppliersOrders.itens.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }
}
