import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

interface Category {
  id: number;
  name: string;
  code: number;
  sector: number[];
}

@Component({
  selector: 'user-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.scss'],
})
export class EstoqueComponent implements OnInit {
  categories: Category[] = [];
  currentPage = 1;
  page = 'next_stock_items';
  count: number;
  apiResponse: any;
  displayedColumns = [
    'name',
    'description',
    'quantity',
    'measure',
    'entries',
    'withdrawals',
  ];

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getCategories() {
    this.userService.getUser().subscribe((data) => {
      this.categories = data.categories;
    });
  }

  getContent(category = 1) {
    this.userService.getUser().subscribe((data) => {
      this.apiResponse = data;
      console.log('api: ', this.apiResponse);
      this.count = this.apiResponse.stock_items.length;
    });
  }

  navToStockItemEntries(stock_item_id: number) {
    this.router.navigate([`estoque/entradas/${stock_item_id}`]);
  }

  navToStockItemWithdrawals(stock_item_id: number) {
    this.router.navigate([`estoque/saidas/${stock_item_id}`]);
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }
}
