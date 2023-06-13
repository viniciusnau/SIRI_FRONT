import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { EditCategoryModalComponent } from './editModal/edit-category-modal.component';
import { CreateCategoryModalComponent } from './createModal/create-category-modal.component';
import { MatDialog } from '@angular/material/dialog';

interface AdminCategories {
  id: number;
  name: string;
  code: number;
  sector: number[];
}

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: AdminCategories[] = [];

  constructor(private stocksService: StocksService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.categories = data.results;
    });
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  deleteCategory(category_id: string) {
    this.stocksService
      .deleteCategory(category_id)
      .toPromise()
      .then((data: any) => this.getCategories());
  }

  openEditModal(category_id: string) {
    const dialogRef = this.dialog.open(EditCategoryModalComponent, {
      data: { category_id },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateCategoryModalComponent);
  }

  displayedColumns = ['id', 'name', 'code', 'editCategory', 'deleteCategory'];
}
