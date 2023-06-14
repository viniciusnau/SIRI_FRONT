import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateProtocolItemsModalComponent } from './createModal/createProtocolItems-modal.component';
import { StocksService } from '../../../../services/stocks.service';
import { ActivatedRoute } from '@angular/router';

interface adminProtocols {
  id: number;
  code: number;
  supplier: string;
  category: string;
  file: string;
}

@Component({
  selector: 'app-admin-protocol-items',
  templateUrl: './admin-protocol-items.component.html',
  styleUrls: ['./admin-protocol-items.component.scss'],
})
export class AdminProtocolItemsComponent implements OnInit {
  adminProtocolItems: adminProtocols[] = [];
  protocolId;

  modalData = {
    products: [],
    protocolId: 0,
  };

  constructor(
    private stockService: StocksService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.protocolId = params['id'];
      this.modalData.protocolId = parseInt(params['id']);
    });
    this.getProtocolItems();
    this.getProducts();
  }

  getProtocolItems() {
    this.stockService.getProtocolItems(this.protocolId).subscribe((data) => {
      this.adminProtocolItems = data.results;
    });
  }

  getProducts() {
    this.stockService.getAllProducts().subscribe((data) => {
      this.modalData.products = data.results;
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateProtocolItemsModalComponent, {
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

  deleteProtocolItem(protocol_item_id: string) {
    this.stockService
      .deleteProtocolItem(protocol_item_id)
      .toPromise()
      .then((data: any) => this.getProtocolItems());
  }

  displayedColumns = [
    'id',
    'product',
    'quantity',
    'original_quantity',
    'delete',
  ];
}