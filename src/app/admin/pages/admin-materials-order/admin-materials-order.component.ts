import { SuppliersService } from './../../../services/suppliers.service';
import { StocksService } from 'src/app/services/stocks.service';
import { OrdersService } from 'src/app/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MaterialsOrderModalComponent,
  MaterialsOrderModalData,
} from './modal/materials-order-modal.component';

interface MaterialsOrder {
  id: number;
  supplier: number;
  file_url: string;
  date_range: string;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-admin-materials-order',
  templateUrl: './admin-materials-order.component.html',
  styleUrls: ['./admin-materials-order.component.scss'],
})
export class AdminMaterialsOrderComponent implements OnInit {
  currentPage = 1;
  response: any;

  modalData: MaterialsOrderModalData = {
    suppliers: [],
    categories: [],
  };

  constructor(
    private ordersService: OrdersService,
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.getCategories();
    this.getSuppliers();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent() {
    this.ordersService
      .getMaterialsOrder(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  getCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.modalData.categories = data;
    });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = data;
    });
  }

  deleteMaterialOrder(order_id: string) {
    this.ordersService
      .deleteMaterialOrder(order_id)
      .toPromise()
      .then((data: any) => this.getContent());
  }

  openModal(): void {
    const dialogRef = this.dialog.open(MaterialsOrderModalComponent, {
      data: this.modalData,
    });

    dialogRef.afterClosed().subscribe((result) => {});
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
