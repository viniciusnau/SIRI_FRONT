import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductModalComponent } from './createModal/create-product-modal.component';
import { EditProductModalComponent } from './editModal/edit-product-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface AdminProducts {
  id: number;
  price: number;
  name: string;
  description: string;
  code: number;
  is_available: boolean;
  created: string;
  updated: string;
  category: number;
  measure: number;
}

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products: AdminProducts[] = [];
  categories = [];
  measures = [];

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getMeasures();
  }

  getProducts() {
    this.stocksService.getProducts().subscribe((data) => {
      this.products = data.results;
    });
  }

  getCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getMeasures() {
    this.stocksService.getAllMeasures().subscribe((data) => {
      this.measures = data;
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

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  deleteProduct(product_id: string) {
    this.stocksService.deleteProduct(product_id).subscribe({
      next: (result) => {
        this.getProducts();
        this.snackBar.open(
          'Tudo certo!',
          'O produto foi excluído com sucesso!',
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
      error: (error) => {
        this.snackBar.open('Ops!', 'Houve um erro ao excluir o produto!', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    });
  }

  openEditModal(product_id: string) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      data: {
        product_id,
        categories: this.categories,
        snackBar: this.snackBar,
      },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateProductModalComponent, {
      data: {
        categories: this.categories,
        measures: this.measures,
        snackBar: this.snackBar,
      },
    });
  }

  displayedColumns = [
    'id',
    'name',
    'description',
    'code',
    'measure',
    'category',
    'price',
    'available',
    'created',
    'updated',
    'editProduct',
    'deleteProduct',
  ];
}
