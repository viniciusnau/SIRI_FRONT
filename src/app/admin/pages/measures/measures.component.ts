import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMeasureModalComponent } from './editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './createModal/create-measure-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

interface iAdminMeasures {
  id: number;
  name: string;
}

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.scss'],
})
export class MeasuresComponent implements OnInit {
  loading: number | null = null;
  currentPage = 1;
  response: any;

  constructor(
    private stocksService: StocksService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit(): void {
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
      .getMeasures(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.next = data?.next;
        this.response.count = data?.count;
        this.loading = null;
      });
  }

  deleteItem(id: string) {
    this.loading = Number(id);
    this.stocksService
      .deleteMeasure(id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
        this.snackBar.open(
          snackbarConsts.admin.measures.exclude.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        this.getContent();
      })
      .catch((error: any) => {
        this.loading = null;
        this.snackBar.open(
          snackbarConsts.admin.measures.exclude.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      });
  }

  openEditModal(measure: string) {
    const dialogRef = this.dialog.open(EditMeasureModalComponent, {
      data: { measure },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateMeasureModalComponent);
  }

  displayedColumns = ['id', 'name', 'editMeasure', 'deleteMeasure'];
}
