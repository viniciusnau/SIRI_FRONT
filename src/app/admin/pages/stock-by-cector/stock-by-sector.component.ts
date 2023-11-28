import { StocksService } from '../../../services/stocks.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface AdminStock {
  id: number;
  sector: number;
}

@Component({
  selector: 'app-stock-by-sector',
  templateUrl: './stock-by-sector.component.html',
  styleUrls: ['./stock-by-sector.component.scss'],
})
export class StockBySectorComponent implements OnInit {
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
        this.response.next = data?.next;
        this.response.count = data?.count;
      });
  }

  navigateToStockItems(stock_id: number) {
    this.router.navigate([`/estoque-por-setor/itens/${stock_id}`]);
  }

  displayedColumns = ['id', 'sector', 'itens'];
}
