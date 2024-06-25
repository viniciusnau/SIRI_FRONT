import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Helper } from 'src/helper';

interface Category {
  id: number;
  name: string;
  code: number;
  sector: number[];
}

@Component({
  selector: 'user-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  categories: Category[] = [];
  currentPage = 1;
  page = 'next_stock_items';
  response: any;
  loading = false;
  stock: number;
  displayedColumns = [];

  constructor(
    public userService: UserService,
    private router: Router,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getCategories();
    this.getContent();
  }

  getCategories() {
    this.userService.getUser().subscribe((data) => {
      this.categories = data.categories;
    });
  }

  getContent(category = 1) {
    this.userService.getUser().subscribe((data) => {
      this.response = data;
      this.stock = this.response.client.stock;
      this.loading = false;
      if (this.stock !== 1) {
        this.displayedColumns = [
          'name',
          'description',
          'quantity',
          'measure',
          'entries',
          'withdrawals',
        ];
      } else {
        this.displayedColumns = ['name', 'description', 'quantity', 'measure'];
      }
    });
  }

  navToStockItemEntries(stock_item_id: number) {
    this.router.navigate([`estoque/entradas/${stock_item_id}`]);
  }

  navToStockItemWithdrawals(stock_item_id: number) {
    this.router.navigate([`estoque/saidas/${stock_item_id}`]);
  }
}
