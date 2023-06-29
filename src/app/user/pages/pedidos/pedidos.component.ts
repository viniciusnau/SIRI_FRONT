import { OrdersService } from 'src/app/services/orders.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { OrderModalComponent } from './modal/order-modal.component';

@Component({
  selector: 'user-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, AfterViewInit {
  currentPage = 1;
  response: any = [];
  page = 'next_orders';
  loading: boolean = false;
  loadingOrderId: number | null = null;

  constructor(
    public userService: UserService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(this.response?.orders);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getContent() {
    this.userService.getUser(this.currentPage.toString()).subscribe((data) => {
      this.response = data[this.currentPage == 1 ? 'orders' : 'results'];
      this.response.next_orders =
        data[this.currentPage == 1 ? 'next_orders' : 'next'];
      this.loadingOrderId = null;
    });
  }

  deleteOrder(order_id: string) {
    this.loadingOrderId = Number(order_id);
    this.ordersService
      .deleteOrder(order_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.loadingOrderId = null;
        this.snackBar.open('Erro ao excluir pedido', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  confirmDelivery(order_id: string) {
    this.ordersService
      .deleteOrder(order_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.snackBar.open('Erro ao excluir pedido', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      });
  }

  openModal(orderId): void {
    const data = {order_id: orderId}
    const dialogRef = this.dialog.open(OrderModalComponent, {
      data: data,
    });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    }
    else {
      return '';
    }
  }

  displayedColumns = [
    'sent',
    'partAdded',
    'compAdded',
    'created',
    'updated',
    'oderItems',
    'deleteOrder',
    'confirmation',
  ];
}
