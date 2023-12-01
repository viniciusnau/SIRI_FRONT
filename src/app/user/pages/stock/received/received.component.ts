import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Helper } from 'src/helper';

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
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stockItemId = params['id'];
    });
    this.getContent(this.stockItemId);
  }

  getContent(id: string) {
    this.ordersService
      .getStockEntries(id, this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  displayedColumns = ['quantity', 'date'];
}
