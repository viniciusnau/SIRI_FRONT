import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.protocolId = params['id'];
      this.modalData.protocolId = parseInt(params['id']);
    });
    this.getContent();
    this.getAllProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.description?.localeCompare(b?.description));
  }

  getContent(disableLoading= false) {
    this.stockService
      .getProtocolItems(this.protocolId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = null;
        if (disableLoading) {
          this.snackBar.open('Item excluído!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }

  getAllProducts() {
    this.stockService.getAllProducts(this.protocolId).subscribe((data) => {
      this.modalData.products = this.sortAlphabetically(data);
    });
  }

  openCreateModal(): void {
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
