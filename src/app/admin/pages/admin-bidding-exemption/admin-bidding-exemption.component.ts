import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BiddingExemptionModalComponent } from './modal/bidding-exemption-modal.component';
import { StocksService } from 'src/app/services/stocks.service';

interface Stock {
  id: number;
  sector: string;
}

interface BiddingExemption {
  id: number;
  quantity: number;
  product: string;
  stock: string;
  invoice: string;
}

@Component({
  selector: 'app-admin-bidding-exemption',
  templateUrl: './admin-bidding-exemption.component.html',
  styleUrls: ['./admin-bidding-exemption.component.scss'],
})
export class AdminBiddingExemptionComponent {
  loading: boolean = false;
  loadingBiddingExemptionId: number | null = null;
  currentPage = 1;
  response: any;
  products = [];
  stocks: Stock[] = [];
  invoices = [];

  constructor(private stocksService: StocksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getStocks();
    this.getInvoices();
    this.getProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  getContent() {
    this.stocksService
      .getBiddingExemption(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loadingBiddingExemptionId = null;
        this.loading = false;
      });
  }

  getStockSector(stockId: number): string {
    const stock = this.stocks.find((item) => item.id === stockId);
    return stock ? stock.sector : '';
  }

  getProducts() {
    this.stocksService?.getAllProducts().subscribe((data) => {
      this.products = this.sortAlphabetically(data);
    });
  }

  getStocks() {
    this.stocksService?.getAllStocks().subscribe((data) => {
      this.stocks = this.sortAlphabetically(data);
    });
  }

  getInvoices() {
    this.stocksService?.getAllInvoices().subscribe((data) => {
      this.invoices = this.sortAlphabetically(data);
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(BiddingExemptionModalComponent, {
      data: {
        products: this.products,
        stocks: this.stocks,
        invoices: this.invoices,
      },
    });
  }

  deleteBiddingExemption(row: BiddingExemption) {
    this.loadingBiddingExemptionId = row.id;
    this.stocksService
      .deleteBiddingExemption(row.id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.loadingBiddingExemptionId = null;
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
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

  displayedColumns = [
    'id',
    'quantity',
    'product',
    'description',
    'stock',
    'invoice',
    'actions',
  ];
}
