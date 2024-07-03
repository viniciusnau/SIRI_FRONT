import { StocksService } from '../../../../services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { CreateGeneralSupplierOrdersItemsModalComponent } from './createModal/create-general-supplier-orders-items-modal-component';
import { MatDialog } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'app-supplier-order-items',
  templateUrl: './general-supplier-order-items.component.html',
  styleUrls: ['./general-supplier-order-items.component.scss'],
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
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierOrderId = params['id'];
    });

    this.protocolId = this.route.snapshot.paramMap.get('protocol');

    this.getContent();
    this.getProtocolItems();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  openCreateModal() {
    this.getProtocolItems().then(() => {
      const dialogRef = this.dialog.open(CreateGeneralSupplierOrdersItemsModalComponent, {
        data: {
          protocol: this.protocolId,
          products: this.protocolItems,
          supplier_order: this.supplierOrderId,
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getProtocolItems();
      });
    });
  }

  getContent() {
    this.ordersService
      .getSupplierOrderItems(this.supplierOrderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
      });
  }

  getProtocolItems(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.stocksService.getAllProtocolItems(this.protocolId).subscribe(
        (data) => {
          this.protocolItems = data.results;
          if (this.response && this.response.results) {
            this.removeItems();
          }
          resolve();
        },
        (error) => {
          reject(error); // Rejeitamos a Promise em caso de erro
        }
      );
    });
  }

  removeItems() {
    if (!this.response || !this.response.results || !this.protocolItems || this.protocolItems.length === 0) {
      return;
    }
  
    this.protocolItems = this.protocolItems.filter((item) => {
      return !this.response.results.some(
        (orderItem) => orderItem.product.id === item.product.id
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
          }
        );
        this.getContent();
        this.getProtocolItems(); // Atualiza os itens disponíveis
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
          }
        );
      });
  }
}
