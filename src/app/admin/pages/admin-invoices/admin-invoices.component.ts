import { SuppliersService } from './../../../services/suppliers.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  InvoiceModalComponent,
  InvoiceModalData,
} from './modal/invoice-modal.component';

interface AdminInvoices {
  id: number;
  code: string;
  supplier: string;
  public_defense: string;
  total_value: string;
  file: string;
}

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss'],
})
export class AdminInvoicesComponent implements OnInit {
  adminInvoices: AdminInvoices[] = [];

  modalData: InvoiceModalData = {
    suppliers: [],
    public_defenses: [],
  };

  constructor(
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getInvoices();
    this.getSuppliers();
    this.getPublicDefenses();
  }

  getInvoices() {
    this.stocksService.getInvoices().subscribe((data) => {
      this.adminInvoices = data.results;
    });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = data;
    });
  }

  getPublicDefenses() {
    this.stocksService.getAllPublicDefenses().subscribe((data) => {
      this.modalData.public_defenses = data;
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(InvoiceModalComponent, {
      data: this.modalData,
    });
  }

  deleteInvoice(invoice_id) {
    this.stocksService
      .deleteInvoice(invoice_id)
      .toPromise()
      .then((data: any) => this.getInvoices());
  }

  downloadInvoice(file) {
    window.open(file, '_blank');
  }

  displayedColumns = [
    'id',
    'code',
    'supplier',
    'public_defense',
    'total_value',
    'file',
    'deleteInvoice',
  ];
}
