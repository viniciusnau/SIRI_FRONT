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
  adminProtocols: adminProtocols[] = [];

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
    this.getProtocols();
    this.getCategories();
    this.getSuppliers();
  }

  getProtocols() {
    this.protocolService.getProtocols().subscribe((data) => {
      this.adminProtocols = data.results;
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
      .then((data: any) => this.getProtocols());
  }

  navToProtocolItems(protocolId: number) {
    this.router.navigate([`/admin/atas/itens/${protocolId}`]);
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
