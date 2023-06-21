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
  selectedProducts: any;
  client: number;

  constructor(
    public userService: UserService,
    public productsService: ProductsService,
    public ordersService: OrdersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  onPageChange(page: number) {
    this.saveFields();
    this.currentPage = page;
    this.getContent([this.selectedCategoryId]);
    // this.populateFields();
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
        this.populateFields();
      });
  }

  firstLetterOnCapital(text: string): string {
    if (text.length === 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  saveFields() {
    if (!this.selectedProducts) {
      this.selectedProducts = [];
    }

    const newSelectedProducts = this.apiResponse?.results.filter(
      (product) => product.option,
    );

    this.selectedProducts = this.selectedProducts.concat(newSelectedProducts);
  }

  populateFields() {
    this.apiResponse?.results?.forEach((product) => {
      const matchingProduct = this.selectedProducts?.find((selectedProduct) => {
        return selectedProduct.id === product.id;
      });
      if (matchingProduct) {
        product.quantity = matchingProduct.quantity;
        product.option = matchingProduct.option;
      }
    });
  }

  order(): void {
    const order = {
      is_sent: false,
      partially_added_to_stock: false,
      completely_added_to_stock: false,
      client: this.client,
    };

    this.ordersService.createOrder(order).subscribe(
      (orderResponse) => {
        this.selectedProducts = this.selectedProducts =
          this.selectedProducts.concat(this.apiResponse?.results);
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
