import { SuppliersService } from '../../../services/suppliers.service';
import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  InvoiceModalComponent,
  CreateInvoiceModalData,
} from './createModal/create-invoice-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading: boolean = false;
  loadingInvoiceId: number | null = null;
  protected readonly Number = Number;

  modalData: CreateInvoiceModalData = {
    suppliers: [],
    public_defenses: [],
  };

  constructor(
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getSuppliers();
    this.getPublicDefenses();
  }

  getContent() {
    this.stocksService
      .getInvoices(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loadingInvoiceId = null;
        this.loading = false;
      });
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = this.Helper.sortAlphabetically(data);
    });
  }

  getPublicDefenses() {
    this.stocksService.getAllPublicDefenses().subscribe((data) => {
      this.modalData.public_defenses = this.Helper.sortAlphabetically(data);
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(InvoiceModalComponent, {
      data: this.modalData,
    });
  }

  deleteItem(id: string) {
    this.loadingInvoiceId = Number(id);
    this.stocksService
      .deleteInvoice(id)
      .toPromise()
      .then((data: any) => {
        this.snackBar.open(
          snackbarConsts.admin.invoice.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        this.getContent();
      })
      .catch((error) => {
        this.snackBar.open(
          snackbarConsts.admin.invoice.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
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
