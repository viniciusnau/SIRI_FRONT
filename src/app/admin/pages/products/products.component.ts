import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductModalComponent } from './createModal/create-product-modal.component';
import { EditProductModalComponent } from './editModal/edit-product-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import snackbarConsts from 'src/snackbarConsts';
import { Helper } from 'src/helper';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  loading: boolean = false;
  loadingProductId: number | null = null;
  response: any;
  categories = [];
  measures = [];

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getAllCategories();
    this.getAllMeasures();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.response.filter = filterValue;
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  sortContentTableAlphabetically(list) {
    const sortedResults = list.sort((a, b) => a?.name?.localeCompare(b?.name));
    return sortedResults;
  }

  getContent() {
    this.stocksService.getAllProducts().subscribe((data) => {
      const sortedData = this.sortContentTableAlphabetically(data);
      this.response = new MatTableDataSource(sortedData);
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
