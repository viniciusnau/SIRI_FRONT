import { StocksService } from '../../../../services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { CreateAdminGeneralSupplierOrdersItemsModalComponent } from './createModal/create-admin-general-supplier-orders-items-modal-component';
import { MatDialog } from '@angular/material/dialog';

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

  deleteOrderItem(order_item_id) {
    this.loading = Number(order_item_id);
    this.ordersService
      .deleteGeneralOrderItem(order_item_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.loading = null;
      });
  }
}
