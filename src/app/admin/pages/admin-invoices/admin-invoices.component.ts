import { SuppliersService } from './../../../services/suppliers.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  InvoiceModalComponent,
  InvoiceModalData,
} from './modal/invoice-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-invoices',
  templateUrl: './admin-invoices.component.html',
  styleUrls: ['./admin-invoices.component.scss'],
})
export class AdminInvoicesComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading: number | null = null;
  protected readonly Number = Number;

  modalData: InvoiceModalData = {
    suppliers: [],
    public_defenses: [],
  };

  constructor(
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getContent();
    this.getSuppliers();
    this.getPublicDefenses();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent(disableLoading = false) {
    this.stocksService
      .getInvoices(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
        if (disableLoading) {
          this.snackBar.open('Nota excluída!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = this.sortAlphabetically(data);
    });
  }

  getPublicDefenses() {
    this.stocksService.getAllPublicDefenses().subscribe((data) => {
      this.modalData.public_defenses = this.sortAlphabetically(data);
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(InvoiceModalComponent, {
      data: this.modalData,
    });
  }

  deleteInvoice(invoice_id) {
    this.loading = Number(invoice_id);
    this.stocksService
      .deleteInvoice(invoice_id)
      .toPromise()
      .then((data: any) => this.getContent(true));
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
