import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { EditCategoryModalComponent } from './editModal/edit-category-modal.component';
import { CreateCategoryModalComponent } from './createModal/create-category-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  loading: number | null = null;
  currentPage = 1;
  response: any;

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  sortContentTableAlphabetically(list) {
    const sortedResults = list.results.sort((a, b) =>
      a?.name?.localeCompare(b?.name),
    );
    return { ...list, results: sortedResults };
  }

  getContent() {
    this.stocksService
      .getCategories(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.next = data?.next;
        this.response.count = data?.count;
        this.loading = null;
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  deleteItem(category_id: string) {
    this.loading = Number(category_id);
    this.stocksService
      .deleteCategory(category_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
        this.snackBar.open(
          snackbarConsts.admin.category.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      })
      .catch(() => {
        this.loading = null;
        this.snackBar.open(
          snackbarConsts.admin.category.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }

  openEditModal(category: string) {
    const dialogRef = this.dialog.open(EditCategoryModalComponent, {
      data: { category },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent);
  }

  displayedColumns = ['id', 'name', 'code', 'editCategory', 'deleteCategory'];
}
