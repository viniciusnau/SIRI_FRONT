import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProtocolService } from '../../../services/protocol.service';

import { CreateProtocolsModalComponent } from './createModal/createProtocols-modal.component';
import { StocksService } from '../../../services/stocks.service';
import { SuppliersService } from '../../../services/suppliers.service';
import {
  ProtocolsModalComponent,
  ProtocolsModalData,
} from './modal/protocols-modal.component';

interface adminProtocols {
  id: number;
  code: number;
  supplier: string;
  category: string;
  file: string;
}

@Component({
  selector: 'app-admin-protocols',
  templateUrl: './admin-protocols.component.html',
  styleUrls: ['./admin-protocols.component.scss'],
})
export class AdminProtocolsComponent implements OnInit {
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
    this.protocolService
      .getProtocols(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  getCategories() {
    this.stockService.getAllCategories().subscribe((data) => {
      this.modalData.categories = data.results;
    });
  }

  getSuppliers() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.modalData.suppliers = data.results;
    });
  }

  openModal(protocolId: number): void {
    const dialogRef = this.dialog.open(ProtocolsModalComponent, {
      data: {
        suppliers: this.modalData.suppliers,
        categories: this.modalData.categories,
        protocolId: protocolId, // Pass the protocolId in the data object
      },
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateProtocolsModalComponent, {
      data: this.modalData,
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  downloadProtocols(file) {
    window.open(file, '_blank');
  }

  deleteProtocol(protocol_id: string) {
    this.protocolService
      .deleteProtocol(protocol_id)
      .toPromise()
      .then((data: any) => this.getContent());
  }

  navToProtocolItems(protocolId: number) {
    this.router.navigate([`/admin/atas/itens/${protocolId}`]);
  }

  displayedColumns = [
    'id',
    'code',
    'supplier',
    'category',
    'file',
    'protocolItems',
    'editProtocols',
    'deleteProtocol',
  ];
}
