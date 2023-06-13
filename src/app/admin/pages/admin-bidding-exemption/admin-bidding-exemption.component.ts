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
  adminBiddingExemption: BiddingExemption[] = [];
  products = [];
  stocks: Stock[] = [];
  invoices = [];

  constructor(private stocksService: StocksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBiddingExemption();
    this.getStocks();
    this.getInvoices();
    this.getProducts();
  }

  getBiddingExemption() {
    this.stocksService.getBiddingExemption().subscribe((data) => {
      this.adminBiddingExemption = data.results;
    });
  }

  getStockSector(stockId: number): string {
    const stock = this.stocks.find((item) => item.id === stockId);
    return stock ? stock.sector : '';
  }

  getProducts() {
    this.stocksService.getAllProducts().subscribe((data) => {
      this.products = data.results;
    });
  }

  getStocks() {
    this.stocksService.getStocks().subscribe((data) => {
      this.stocks = data.results;
    });
  }

  getInvoices() {
    this.stocksService.getInvoices().subscribe((data) => {
      this.invoices = data.results;
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
    this.stocksService.deleteBiddingExemption(row.id).subscribe(() => {
      this.adminBiddingExemption = this.adminBiddingExemption.filter(item => item.id !== row.id);
    }, (error) => {});
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  displayedColumns = ['id', 'quantity', 'product', 'stock', 'invoice', 'actions'];
}
