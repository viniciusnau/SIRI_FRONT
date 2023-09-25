import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from 'src/app/services/stocks.service';

interface iStockBySectorItems {
  id: number;
  product: string;
  quantity: number;
}

@Component({
  selector: 'app-stock-by-sector-items',
  templateUrl: './stock-by-sector-items.component.html',
  styleUrls: ['./stock-by-sector-items.component.scss'],
})
export class StockBySectorItemsComponent {
  stockItems: iStockBySectorItems[] = [];
  stockId = '';
  currentPage = 1;
  response: any;

  constructor(
    public stocksService: StocksService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockId = params['id'];
    });
    this.getContent(this.stockId);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent(this.stockId);
  }

  getContent(orderId: string) {
    this.stocksService
      .getStockItems(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data.results.filter((item) => item.quantity > 0);
        this.response.next = data?.next;
        this.response.count = data?.count;
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  displayedColumns = ['id', 'product', 'description', 'quantity'];
}
