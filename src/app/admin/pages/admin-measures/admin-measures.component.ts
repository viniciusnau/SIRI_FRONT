import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMeasureModalComponent } from './editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './createModal/create-measure-modal.component';
import { MatTableDataSource } from '@angular/material/table';

interface AdminMeasures {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-measures',
  templateUrl: './admin-measures.component.html',
  styleUrls: ['./admin-measures.component.scss'],
})
export class AdminMeasuresComponent implements OnInit {
  loading: number | null = null;
  currentPage = 1;
  response: any;

  constructor(private stocksService: StocksService, public dialog: MatDialog) {}

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
      .getMeasures(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.next = data?.next;
        this.response.count = data?.count;
        this.loading = null;
      });
  }

  deleteMeasure(measure_id: string) {
    this.loading = Number(measure_id);
    this.stocksService
      .deleteMeasure(measure_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.loading = null;
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
