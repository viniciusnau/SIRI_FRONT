import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductModalComponent } from './createModal/create-product-modal.component';
import { EditProductModalComponent } from './editModal/edit-product-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import snackbarConsts from 'src/snackbarConsts';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  loadingProductId: number | null = null;
  currentPage = 1;
  response: any;
  categories = [];
  measures = [];

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getAllCategories();
    this.getAllMeasures();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  sortContentTableAlphabetically(list) {
    const sortedResults = list.results.sort((a, b) =>
      a?.name?.localeCompare(b?.name),
    );
    return { ...list, results: sortedResults };
  }

  getContent() {
    this.stocksService
      .getProducts(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.next = data?.next;
        this.response.count = data?.count;
        this.loadingProductId = null;
        this.loading = false;
      });
  }

  getAllCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.categories = this.sortAlphabetically(data);
    });
  }

  getAllMeasures() {
    this.stocksService.getAllMeasures().subscribe((data) => {
      this.measures = this.sortAlphabetically(data);
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

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  deleteItem(id: string) {
    this.loadingProductId = Number(id);
    this.stocksService.deleteProduct(id).subscribe({
      next: (result) => {
        this.snackBar.open(
          snackbarConsts.admin.products.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        this.getContent();
      },
      error: (error) => {
        this.loadingProductId = null;
        this.snackBar.open(
          snackbarConsts.admin.products.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
    });
  }

  openEditModal(product_id: string, product: any) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      data: {
        product,
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
