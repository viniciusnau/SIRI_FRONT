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
  entries: Entries[] = [];
  stockItemId: string;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockItemId = params['id'];
    });
    this.getStockEntries(this.stockItemId);
  }

  getStockEntries(orderId: string) {
    this.ordersService.getStockEntries(orderId).subscribe((data) => {
      this.entries = data.results;
    });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    }
    else {
      return '';
    }
  }

  displayedColumns = ['quantity', 'date'];
}
