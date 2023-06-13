import { StocksService } from './../../../services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { EditAdminGeneralSuppliersOrdersModalComponent } from './editModal/edit-admin-general-supplier-orders-modal';
import { MatDialog } from '@angular/material/dialog';
import { CreateAdminGeneralSupplierOrdersModalComponent } from './createModal/create-admin-general-supplier-orders-modal-component';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { UserService } from 'src/app/services/user.service';

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
  templateUrl: './admin-general-supplier-orders.component.html',
  styleUrls: ['./admin-general-supplier-orders.component.scss'],
})
export class AdminGeneralSupplierOrdersComponent implements OnInit {
  supplierOrders: SupplierOrders[] = [];
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
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.supplierId = params['id'];
    });
    this.getSupplierOrders();
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

  getSupplierOrders() {
    this.ordersService.getSupplierOrders().subscribe((data) => {
      this.supplierOrders = data.results;
    });
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data.results;
    });
  }

  getProtocols() {
    this.stocksService.getProtocols().subscribe((data) => {
      this.protocols = data.results;
    });
  }

  getPublicDefenses() {
    this.stocksService.getPublicDefenses().subscribe((data) => {
      this.public_defenses = data.results;
    });
  }

  navToSupplierOrderItems(order_id: number, protocol: string) {
    this.router.navigate([
      `admin/pedidos-fornecedor/itens/${order_id}`,
      { protocol },
    ]);
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  openEditModal(supplier_order_id) {
    const dialogRef = this.dialog.open(
      EditAdminGeneralSuppliersOrdersModalComponent,
      { data: { supplier_order_id } },
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

  deleteSupplierOrder(order_id) {
    this.ordersService
      .deleteGeneralSupplierOrder(order_id)
      .toPromise()
      .then((data: any) => this.getSupplierOrders());
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
