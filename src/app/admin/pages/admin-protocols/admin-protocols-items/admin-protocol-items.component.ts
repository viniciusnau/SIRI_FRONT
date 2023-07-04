import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProtocolItemsModalComponent } from './createModal/createProtocolItems-modal.component';
import { StocksService } from '../../../../services/stocks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-protocol-items',
  templateUrl: './admin-protocol-items.component.html',
  styleUrls: ['./admin-protocol-items.component.scss'],
})
export class AdminProtocolItemsComponent implements OnInit {
  currentPage = 1;
  response: any;
  protocolId;
  loading: number | null = null;

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
    this.getAllProducts();
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.description?.localeCompare(b?.description));
  }

  removeItems() {
    if (this.response?.results?.length) {
      const responseProductIds = this.response.results.map(result => result.product.id);
      this.modalData.products = this.modalData.products.filter(product => !responseProductIds.includes(product.id));
    }
  }

  getContent(disableLoading = false) {
    this.stockService
      .getProtocolItems(this.protocolId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.removeItems();
        this.loading = null;
        if (disableLoading) {
          window.location.reload();
        }
      });
  }

  getAllProducts() {
    this.stockService.getAllProducts(this.protocolId).subscribe((data) => {
      this.modalData.products = this.sortAlphabetically(data);
    });
  }

  openCreateModal(): void {
    console.log(this.response);
    console.log(this.modalData);
    const dialogRef = this.dialog.open(CreateProtocolItemsModalComponent, {
      data: this.modalData,
    });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  firstLetterOnCapital(text: string) {
    if (text && text.length > 0) {
      return text[0].toUpperCase() + text.substring(1);
    }
    return '';
  }

  deleteProtocolItem(protocol_item_id: string) {
    this.loading = Number(protocol_item_id);
    this.stockService
      .deleteProtocolItem(protocol_item_id)
      .toPromise()
      .then((data: any) => this.getContent(true));
  }

  displayedColumns = [
    'id',
    'product',
    'productDescription',
    'quantity',
    'original_quantity',
    'delete',
  ];
}
