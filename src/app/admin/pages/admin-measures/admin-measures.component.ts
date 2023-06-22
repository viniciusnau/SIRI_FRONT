import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditMeasureModalComponent } from './editModal/edit-measure-modal.component';
import { CreateMeasureModalComponent } from './createModal/create-measure-modal.component';

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

  getContent() {
    this.stocksService
      .getAllMeasures(this.currentPage.toString())
      // is getAllMeasures or getMeasures?
      .subscribe((data) => {
        this.response = data;
      });
  }

  deleteMeasure(measure_id: string) {
    this.stocksService
      .deleteMeasure(measure_id)
      .toPromise()
      .then((data: any) => this.getContent());
  }

  openEditModal(measure_id: string) {
    const dialogRef = this.dialog.open(EditMeasureModalComponent, {
      data: { measure_id },
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(CreateMeasureModalComponent);
  }

  displayedColumns = ['id', 'name', 'editMeasure', 'deleteMeasure'];
}
