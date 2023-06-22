import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface Entries {
  quantity: number;
  date: string;
}

@Component({
  selector: 'user-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss'],
})
export class EntradasComponent implements OnInit {
  currentPage = 1;
  response: any;
  stockItemId: string;
  page = 'next';

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockItemId = params['id'];
    });
    this.getContent(this.stockItemId);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent(this.stockItemId);
  }

  getContent(orderId: string) {
    this.ordersService
      .getStockEntries(orderId, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  displayedColumns = ['quantity', 'date'];
}
