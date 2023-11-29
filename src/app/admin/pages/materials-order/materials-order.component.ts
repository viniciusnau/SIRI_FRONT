import { SuppliersService } from '../../../services/suppliers.service';
import { StocksService } from 'src/app/services/stocks.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateMaterialsConfirmOrderModalComponent,
  iMaterialsOrderModalData,
} from './createModal/create-materials-order-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

@Component({
  selector: 'app-materials-order',
  templateUrl: './materials-order.component.html',
  styleUrls: ['./materials-order.component.scss'],
})
export class MaterialsOrderComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading: boolean = false;
  loadingMaterialOrder: number | null = null;

  modalData: iMaterialsOrderModalData = {
    suppliers: [],
    categories: [],
  };

  constructor(
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getAllCategories();
    this.getSuppliers();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent(disableLoading = false) {
    this.ordersService
      .getMaterialsOrder(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loadingMaterialOrder = null;
        this.loading = false;
        if (disableLoading) {
          this.snackBar.open('Pedido excluído!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }

  getAllCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.modalData.categories = this.Helper.sortAlphabetically(data);
    });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = this.Helper.sortAlphabetically(data);
    });
  }

  deleteItem(id: string) {
    this.loadingMaterialOrder = Number(id);
    this.ordersService
      .deleteMaterialOrder(id)
      .toPromise()
      .then(
        (data: any) => {
          this.snackBar.open(
            snackbarConsts.admin.materialsOrder.exclude.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
          this.getContent();
        },
        (error) => {
          this.snackBar.open(
            snackbarConsts.admin.materialsOrder.exclude.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
      );
  }

  openModal(): void {
    const dialogRef = this.dialog.open(
      CreateMaterialsConfirmOrderModalComponent,
      {
        data: this.modalData,
      },
    );

    dialogRef.afterClosed().subscribe((result) => {});
  }

  formatRange(dateRange: string) {
    let [startDate, endDate] = dateRange.split(' - ');
    const startYear = startDate.split('-')[0];
    const startMonth = startDate.split('-')[1];
    const startDay = startDate.split('-')[2];
    const endYear = endDate.split('-')[0];
    const endMonth = endDate.split('-')[1];
    const endDay = endDate.split('-')[2];

    const formattedStartDate = `${startDay}/${startMonth}/${startYear} `;
    const formattedEndDate = `${endDay}/${endMonth}/${endYear} `;
    return `${formattedStartDate} - ${formattedEndDate}`;
  }

  downloadMaterialsOrder(file) {
    window.open(file, '_blank');
  }

  displayedColumns = [
    'id',
    'supplier',
    'date_range',
    'created',
    'file',
    'deleteMaterialOrder',
  ];
}
