import { StocksService } from './../../../services/stocks.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface AdminStock {
  id: number;
  sector: number;
}

@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.scss'],
})
export class AdminStockComponent implements OnInit {
  stocks: AdminStock[] = [];

  constructor(private stocksService: StocksService, private router: Router) {}

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    this.stocksService.getStocks().subscribe((data) => {
      this.stocks = data.results;
    });
  }

  navToStockItems(stock_id: number) {
    this.router.navigate([`/admin/estoque/itens/${stock_id}`]);
  }

  displayedColumns = ['id', 'sector'];
}
