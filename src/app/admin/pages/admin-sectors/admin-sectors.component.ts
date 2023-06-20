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
  sectors: AdminSectors[] = [];

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {
    this.getSectors();
  }

  getSectors() {
    this.stocksService.getSectors().subscribe((data) => {
      this.sectors = data.results;
    });
  }

  displayedColumns = ['id', 'name', 'public_defense'];
}
