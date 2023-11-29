import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProtocolItemsModalComponent } from './createModal/create-protocol-items-modal.component';
import { StocksService } from '../../../../services/stocks.service';
import { ActivatedRoute } from '@angular/router';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-protocol-items',
  templateUrl: './protocol-items.component.html',
  styleUrls: ['./protocol-items.component.scss'],
})
export class ProtocolItemsComponent implements OnInit {
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
    this.getAllProducts();
    this.getContent();
    this.removeItems();
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
      const responseProductIds = this.response.results.map(
        (result) => result.product.name,
      );
      this.modalData.products = this.modalData.products.filter(
        (product) => !responseProductIds.includes(product.name),
      );
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
    this.removeItems();
    const dialogRef = this.dialog.open(CreateProtocolItemsModalComponent, {
      data: this.modalData,
    });
  }

  firstLetterOnCapital(text: string) {
    if (text && text.length > 0) {
      return text[0].toUpperCase() + text.substring(1);
    }
    return '';
  }

  deleteItem(id: string) {
    this.loading = Number(id);
    this.stockService
      .deleteProtocolItem(id)
      .toPromise()
      .then(
        (data: any) => {
          this.snackBar.open(
            snackbarConsts.admin.protocols.itens.exclude.success,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
          this.getContent();
        },
        (error) => {
          this.loading = null;
          this.snackBar.open(
            snackbarConsts.admin.protocols.itens.exclude.error,
            snackbarConsts.close,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            },
          );
        },
      );
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
