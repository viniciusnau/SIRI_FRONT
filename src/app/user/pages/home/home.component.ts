import { Component, OnInit } from '@angular/core';
import {
  GetProductDto,
  ProductsService,
} from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import { Category, Product } from '../../../interfaces/stock/interfaces';
import { OrdersService } from 'src/app/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentPage = 1;
  apiResponse: any;
  page = 'next';
  categories: Category[] = [];
  products: Product[] = [];
  displayedColumns = ['name', 'description', 'quantity', 'measure', 'option'];
  selectedCategoryId: number;
  selectedProducts = this.getItems('selectedProducts');
  client: number;

  constructor(
    public userService: UserService,
    public productsService: ProductsService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.getUserData();
  }

  onPageChange(page: number) {
    this.saveItems(this.selectedProducts, 'selectedProducts');
    this.currentPage = page;
    this.getContent([this.selectedCategoryId]);
    this.getItems('selectedProducts');
    this.populateFields();
    console.log('selectedProducts on pageChange: ', this.selectedProducts);
  }

  getUserData(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.categories = data.categories;
        this.client = data.client.id;
        this.getContent(this.categories.map((category) => category.id));
      },
      (error) => {},
    );
  }

  updateProducts(): void {
    if (this.selectedCategoryId) {
      this.getContent([this.selectedCategoryId]);
    } else {
      this.products = [];
    }
  }

  getContent(categoryIds: number[]): void {
    const getProductDto: GetProductDto = { categories: categoryIds };
    this.productsService
      .getProducts(getProductDto, this.currentPage.toString())
      .subscribe((data) => {
        this.apiResponse = data;
      });
  }

  firstLetterOnCapital(text: string): string {
    if (text.length === 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  saveItems(items, code: string): void {
    items = this.apiResponse.results.filter((product) => product.option);
    localStorage.setItem(code, JSON.stringify(items));
  }

  getItems(code: string): any {
    console.log('getItems: ', JSON.parse(localStorage.getItem(code)));
    code = JSON.parse(localStorage.getItem(code));
  }

  populateFields(): void {
    const selectedProducts = JSON.parse(
      localStorage.getItem('selectedProducts'),
    );
    if (selectedProducts) {
      this.apiResponse.results.forEach((product) => {
        const selectedProduct = selectedProducts.find(
          (p) => p.id === product.id,
        );
        console.log('selected: ', selectedProduct);
        if (selectedProduct) {
          product.option = true;
          product.quantity = selectedProduct.quantity;
        }
      });
    }
  }

  order(): void {
    console.log(
      'selectedProducts on Order',
      JSON.parse(localStorage.getItem('selectedProducts')),
    );
    this.selectedProducts += JSON.parse(
      localStorage.getItem('selectedProducts'),
    );
    const order = {
      is_sent: false,
      partially_added_to_stock: false,
      completely_added_to_stock: false,
      client: this.client,
    };

    this.ordersService.createOrder(order).subscribe(
      (orderResponse) => {
        const orderItems = this.selectedProducts.map((product) => {
          return {
            product: product.id,
            quantity: product.quantity,
            added_quantity: 0,
            order: orderResponse.id,
          };
        });

        this.ordersService.createOrderItems(orderItems).subscribe(
          (orderItemsResponse) => {
            this.snackBar.open('Pedido feito!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
          (error) => {
            this.snackBar.open('Erro ao criar itens do pedido.', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            });
          },
        );
      },
      (error) => {
        this.snackBar.open('Erro ao criar pedido.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    );
  }
}
