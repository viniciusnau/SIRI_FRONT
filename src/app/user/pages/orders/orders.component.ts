import { OrdersService } from 'src/app/services/orders.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOrderModalComponent } from './confirmModal/confirm-order-modal.component';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'user-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
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
    this.loading = true;
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

  getContent(disableLoading = false) {
    this.userService.getUser(this.currentPage.toString()).subscribe(
      (data) => {
        this.response = data[this.currentPage == 1 ? 'orders' : 'results'];
        this.response.next_orders =
          data[this.currentPage == 1 ? 'next_orders' : 'next'];
        this.loadingOrderId = null;
        this.loading = false;
        if (disableLoading) {
          this.snackBar.open(
            snackbarConsts.user.orders.exclude.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        }
      },
      (error) => {
        if (disableLoading) {
          this.snackBar.open(
            snackbarConsts.user.orders.exclude.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        }
      },
    );
  }

  deleteOrder(order_id: string) {
    this.loadingOrderId = Number(order_id);
    this.ordersService
      .deleteOrder(order_id)
      .toPromise()
      .then((data: any) => {
        this.getContent(true);
        this.snackBar.open(
          snackbarConsts.user.orders.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      })
      .catch((error: any) => {
        this.loadingOrderId = null;
        this.snackBar.open(
          snackbarConsts.user.orders.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }

  openModal(orderId): void {
    const data = { order_id: orderId };
    const dialogRef = this.dialog.open(ConfirmOrderModalComponent, {
      data: data,
    });
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
