import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProtocolService } from '../../../services/protocol.service';

import { CreateProtocolsModalComponent } from './createModal/create-protocols-modal.component';
import { StocksService } from '../../../services/stocks.service';
import { SuppliersService } from '../../../services/suppliers.service';
import {
  EditProtocolsModalComponent,
  ProtocolsModalData,
} from './editModal/edit-protocols-modal.component';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

@Component({
  selector: 'app-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss'],
})
export class ProtocolsComponent implements OnInit {
  loading: boolean = false;
  loadingProtocolId: number | null = null;
  currentPage = 1;
  response: any;

  modalData: ProtocolsModalData = {
    suppliers: [],
    categories: [],
  };

  constructor(
    private protocolService: ProtocolService,
    private stockService: StocksService,
    private supplierService: SuppliersService,
    public dialog: MatDialog,
    private router: Router,
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

  getContent() {
    this.protocolService
      .getProtocols(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loadingProtocolId = null;
        this.loading = false;
      });
  }

  getAllCategories() {
    this.stockService.getAllCategories().subscribe((data) => {
      this.modalData.categories = this.Helper.sortAlphabetically(data);
    });
  }

  getSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((data) => {
      this.modalData.suppliers = this.Helper.sortAlphabetically(data);
    });
  }

  openModal(protocolId: number): void {
    const dialogRef = this.dialog.open(EditProtocolsModalComponent, {
      data: {
        suppliers: this.modalData.suppliers,
        categories: this.modalData.categories,
        protocolId: protocolId,
      },
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateProtocolsModalComponent, {
      data: this.modalData,
    });
  }

  downloadProtocols(file) {
    window.open(file, '_blank');
  }

  deleteItem(id: string) {
    this.loadingProtocolId = Number(id);
    this.protocolService
      .deleteProtocol(id)
      .toPromise()
      .then((data: any) => {
        this.snackBar.open(
          snackbarConsts.admin.protocols.exclude.success,
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
        this.loadingProtocolId = null;
        this.snackBar.open(
          snackbarConsts.admin.protocols.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }

  navToProtocolItems(protocolId: number) {
    this.router.navigate([`/atas/itens/${protocolId}`]);
  }

  displayedColumns = [
    'id',
    'code',
    'supplier',
    'category',
    'start_date',
    'final_date',
    'file',
    'protocolItems',
    'editProtocols',
    'deleteProtocol',
  ];
}
