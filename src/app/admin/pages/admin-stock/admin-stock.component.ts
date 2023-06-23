import { StocksService } from './../../../services/stocks.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
  currentPage = 1;
  response: any;

  constructor(private stocksService: StocksService, private router: Router) {}

  ngOnInit(): void {
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortContentTableAlphabetically(list) {
    const sortedResults = list.results?.sort((a, b) =>
      a?.name?.localeCompare(b?.name),
    );
    return { ...list, results: sortedResults };
  }

  getContent() {
    this.stocksService
      .getStocks(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(data?.results);
        this.response.count = data?.next;
      });
  }

  navigateToStockItems(stock_id: number) {
    this.router.navigate([`/admin/estoque/itens/${stock_id}`]);
  }

  displayedColumns = ['id', 'sector'];
}
