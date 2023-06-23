import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface AdminSectors {
  id: number;
  name: string;
  public_defense: string;
}

@Component({
  selector: 'app-admin-sectors',
  templateUrl: './admin-sectors.component.html',
  styleUrls: ['./admin-sectors.component.scss'],
})
export class AdminSectorsComponent implements OnInit {
  currentPage = 1;
  response: any;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortContentTableAlphabetically(list) {
    const sortedResults = list.results.sort((a, b) =>
      a?.name?.localeCompare(b?.name),
    );
    return { ...list, results: sortedResults };
  }

  getContent() {
    this.stocksService
      .getSectors(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.count = data.next;
      });
  }

  displayedColumns = ['id', 'name', 'public_defense'];
}
