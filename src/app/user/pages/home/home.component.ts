import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category, Product } from '../../../interfaces/stock/interfaces';
import {
  GetProductDto,
  ProductsService,
} from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentPage = 1;
  response: any;
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

  onPageChange(page: number): void {
    this.saveFields();
    this.currentPage = page;
    this.getContent([this.selectedCategoryId]);
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
      .subscribe(
        (data) => {
          this.response = data;
          this.populateFields();
        },
        (error) => {},
      );
  }

  firstLetterOnCapital(text: string): string {
    if (text.length === 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  saveFields(): void {
    if (!this.selectedProducts) {
      this.selectedProducts = [];
    }

    const newSelectedProducts = this.response?.results.filter(
      (product) => product.option,
    );

    this.selectedProducts = this.selectedProducts.concat(newSelectedProducts);
  }

  populateFields(): void {
    this.response?.results?.forEach((product) => {
      const matchingProduct = this.selectedProducts?.find(
        (selectedProduct) => selectedProduct.id === product.id,
      );
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
        this.saveFields();
        this.selectedProducts = [
          ...this.selectedProducts,
          ...this.response?.results,
        ].filter(
          (product, index, self) =>
            product.option &&
            index ===
              self.findIndex(
                (p) => p.id === product.id && p.option === product.option,
              ),
        );
        const orderItems = this.selectedProducts?.map((product) => ({
          product: product.id,
          quantity: product.quantity,
          added_quantity: 0,
          order: orderResponse.id,
        }));

        this.ordersService.createOrderItems(orderItems).subscribe(
          (orderItemsResponse) => {
            this.showSnackBar('Pedido feito!');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          (error) => {
            this.showSnackBar('Erro ao criar itens do pedido.');
          },
        );
      },
      (error) => {
        this.showSnackBar('Erro ao criar pedido.');
      },
    );
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
