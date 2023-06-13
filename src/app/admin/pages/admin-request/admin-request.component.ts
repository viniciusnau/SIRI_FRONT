import { SuppliersService } from './../../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';

interface Request {
  supplier: number;
  protocol: number;
  public_defense: number;
  client: number;
  received: boolean;
}

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss'],
})
export class AdminRequestComponent implements OnInit {
  request: Request;

  suppliers = [];
  protocols = [];
  public_defenses = [];

  constructor(
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.getProtocols();
    this.getPublicDefenses();
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data) => {
      this.suppliers = data.results;
    });
  }

  getProtocols() {
    this.stocksService.getProtocols().subscribe((data) => {
      this.protocols = data.results;
    });
  }

  getPublicDefenses() {
    this.stocksService.getPublicDefenses().subscribe((data) => {
      this.public_defenses = data.results;
    });
  }

  displayedColumns = ['supplier', 'protocol', 'public_defense'];
}
