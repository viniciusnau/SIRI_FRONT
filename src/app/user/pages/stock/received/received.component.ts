import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

interface Entries {
  quantity: number;
  date: string;
}

@Component({
  selector: 'user-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit {
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
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  displayedColumns = ['quantity', 'date'];
}
