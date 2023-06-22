import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';

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

  getContent() {
    this.stocksService
      .getAllSectors(this.currentPage.toString())
      //  its getAllSectors or getSectors?
      .subscribe((data) => {
        this.response = data;
      });
  }

  displayedColumns = ['id', 'name', 'public_defense'];
}
