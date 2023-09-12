import { Component, OnInit } from '@angular/core';
import {
  GetProductDto,
  ProductsService,
} from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { Category, Product } from '../../../interfaces/stock/interfaces';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { HomeModalComponent } from './modal/home-modal.component';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  displayedColumns = ['name', 'description', 'measure', 'quantity'];
  selectedCategoryId: number;
  client: number;
  chosenProducts: any[] = [];
  loading = false;
  currentPage = 1;
  response: any;

  constructor(
    public userService: UserService,
    public productsService: ProductsService,
    public ordersService: OrdersService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getUserData();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateProducts();
  }

  getUserData(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.categories = data.categories;
        this.client = data.client.id;
        this.getProducts(
          this.categories.map((category) => category.id),
          this.currentPage,
        );
      },
      (error) => {},
    );
  }

  updateProducts(returnToFirstPage = false): void {
    if (returnToFirstPage) {
      this.currentPage = 1;
    }

    this.loading = false;
    let categoryIds: number[] = [];

    if (Number(this.selectedCategoryId) === 0) {
      categoryIds = this.categories.map((category) => category.id);
    } else if (this.selectedCategoryId) {
      categoryIds = [this.selectedCategoryId];
    } else {
      categoryIds = this.categories.map((category) => category.id);
    }

    this.getProducts(categoryIds, this.currentPage);
  }

  updateQuantity(product: Product): void {
    const index = this.chosenProducts.findIndex(
      (chosenProduct) => chosenProduct.id === product.id,
    );

    if (index !== -1) {
      this.chosenProducts.splice(index, 1);
    }

    if (Number(product.quantity) !== 0) {
      this.chosenProducts.push(product);
    }
  }

  getProducts(categoryIds, pageChange) {
    this.loading = true;
    const getProductDto: GetProductDto = { categories: categoryIds };
    this.productsService.getProducts(getProductDto, pageChange).subscribe(
      (data) => {
        this.response = data;
        this.products = this.sortAlphabetically(data.results);
        const chosenProductIds = this.chosenProducts.map(
          (chosenProduct) => chosenProduct.id,
        );
        this.products.forEach((product) => {
          if (chosenProductIds.includes(product.id)) {
            const chosenProduct = this.chosenProducts.find(
              (chosenProduct) => chosenProduct.id === product.id,
            );
            product.quantity = `${chosenProduct.quantity}`;
          } else {
            product.quantity = '0';
          }
        });
        this.loading = false;
      },
      (error) => {},
    );
  }

  firstLetterOnCapital(text: string): string {
    if (text.length === 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  openModal(data): void {
    const value = { chosenProducts: data, client: `${this.client}` };
    const dialogRef = this.dialog.open(HomeModalComponent, {
      data: value,
    });
  }

  order(): void {
    const products = this.chosenProducts.map((product) => {
      const modifiedProduct = { ...product };
      const slicedQuantity = product.quantity.toString().slice(0, 3);
      modifiedProduct.quantity = parseInt(slicedQuantity, 10);
      return modifiedProduct;
    });

    this.openModal(products);
  }
}
