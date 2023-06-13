import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from 'src/app/services/stocks.service';

interface AdminStockItems {
  id: number;
  product: string;
  quantity: number;
}

@Component({
  selector: 'app-admin-stock-items',
  templateUrl: './admin-stock-items.component.html',
  styleUrls: ['./admin-stock-items.component.scss'],
})
export class AdminStockItemsComponent {
  stockItems: AdminStockItems[] = [];
  stockId = '';

  constructor(
    public stocksService: StocksService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockId = params['id'];
    });
    this.getStockItems(this.stockId);
  }

  getStockItems(orderId: string) {
    this.stocksService.getStockItems(orderId).subscribe((data) => {
      this.stockItems = data.results;
    });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  displayedColumns = ['id', 'product', 'quantity'];
}
