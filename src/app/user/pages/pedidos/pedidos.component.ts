import { OrdersService } from 'src/app/services/orders.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Order {
  id: number;
  is_sent: boolean;
  partially_added_to_stock: boolean;
  completely_added_to_stock: boolean;
  created: string;
  updated: string;
  client: number;
}

@Component({
  selector: 'user-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent implements OnInit, AfterViewInit {
  currentPage = 1;
  response: any = [];
  page = 'next_orders';

  constructor(
    public userService: UserService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
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
    });
  }

  deleteOrder(order_id: string) {
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

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  displayedColumns = [
    'sent',
    'partAdded',
    'compAdded',
    'created',
    'updated',
    'oderItems',
    'deleteOrder',
  ];
}
