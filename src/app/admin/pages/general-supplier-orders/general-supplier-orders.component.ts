import { StocksService } from '../../../services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { EditAdminGeneralSuppliersOrdersModalComponent } from './editModal/edit-admin-general-supplier-orders-modal';
import { MatDialog } from '@angular/material/dialog';
import { CreateAdminGeneralSupplierOrdersModalComponent } from './createModal/create-admin-general-supplier-orders-modal-component';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { UserService } from 'src/app/services/user.service';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

interface iSupplierOrders {
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
  templateUrl: './general-supplier-orders.component.html',
  styleUrls: ['./general-supplier-orders.component.scss'],
})
export class GeneralSupplierOrders implements OnInit {
  loading: boolean = false;
  loadingOrderId: number | null = null;
  supplierOrders: iSupplierOrders[] = [];
  suppliers = [];
  protocols = [];
  public_defenses = [];
  clientId = '';
  supplierId = '';

  constructor(
    private ordersService: OrdersService,
    private suppliersService: SuppliersService,
    private stocksService: StocksService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.supplierId = params['id'];
    });
    this.getContent();
    this.getSuppliers();
    this.getProtocols();
    this.getPublicDefenses();
    this.getClient();
  }

  getClient() {
    this.userService.getUser().subscribe((data) => {
      this.clientId = data.client.id;
    });
  }

  getContent() {
    this.ordersService.getSupplierOrders().subscribe((data) => {
      this.supplierOrders = data.results;
      this.loadingOrderId = null;
      this.loading = false;
    });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.suppliers = data;
    });
  }

  getProtocols() {
    this.stocksService.getAllProtocols().subscribe((data) => {
      this.protocols = data;
    });
  }

  getPublicDefenses() {
    this.stocksService.getAllPublicDefenses().subscribe((data) => {
      this.public_defenses = data;
    });
  }

  navToSupplierOrderItems(order_id: number, protocol: string) {
    this.router.navigate([
      `pedidos-fornecedor/itens/${order_id}`,
      { protocol },
    ]);
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  openEditModal(supplier_order) {
    const dialogRef = this.dialog.open(
      EditAdminGeneralSuppliersOrdersModalComponent,
      { data: { supplier_order } },
    );
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(
      CreateAdminGeneralSupplierOrdersModalComponent,
      {
        data: {
          suppliers: this.suppliers,
          protocols: this.protocols,
          public_defenses: this.public_defenses,
          client: this.clientId,
        },
      },
    );
  }

  deleteItem(id: string) {
    this.loadingOrderId = Number(id);
    this.ordersService
      .deleteGeneralSupplierOrder(id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
        this.snackBar.open(
          snackbarConsts.admin.suppliersOrders.exclude.success,
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
        this.loadingOrderId = null;
        this.snackBar.open(
          snackbarConsts.admin.suppliersOrders.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }

  displayedColumns = [
    'id',
    'supplier',
    'public_defense',
    'protocol',
    'delivery_date',
    'received',
    'created',
    'updated',
    'orderItens',
    'editOrder',
    'deleteOrder',
  ];
}
