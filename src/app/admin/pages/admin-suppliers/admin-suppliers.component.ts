import { StocksService } from 'src/app/services/stocks.service';
import { SuppliersService } from '../../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuppliersModalComponent } from './modal/suppliers-modal.component';
import { CreateSuppliersModalComponent } from './createModal/createSuppliers-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-suppliers',
  templateUrl: './admin-suppliers.component.html',
  styleUrls: ['./admin-suppliers.component.scss'],
})
export class AdminSuppliersComponent implements OnInit {
  loading: boolean = false;
  loadingSupplierId: number | null = null;

  constructor(
    public suppliersService: SuppliersService,
    private stocksService: StocksService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  currentPage = 1;
  response: any;
  categories = [];

  ngOnInit(): void {
    this.loading = true;
    this.getContent();
    this.getAllCategories();
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
    this.suppliersService
      .getSuppliers(this.currentPage.toString())
      .subscribe((data) => {
        const sortedData = this.sortContentTableAlphabetically(data);
        this.response = new MatTableDataSource(sortedData.results);
        this.response.next = data?.next;
        this.response.count = data?.count;
        this.loadingSupplierId = null;
        this.loading = false;
      });
  }

  getAllCategories() {
    this.stocksService.getAllCategories().subscribe((data) => {
      this.categories = this.sortAlphabetically(data);
    });
  }

  deleteSupplier(supplier_id: string) {
    this.loadingSupplierId = Number(supplier_id);
    this.stocksService
      .deleteSupplier(supplier_id)
      .toPromise()
      .then((data: any) => {
        this.getContent();
      })
      .catch((error: any) => {
        this.loadingSupplierId = null;
      });
  }

  navToSupplierOrders(supplier_id: number) {
    this.router.navigate([`fornecedor/pedidos/${supplier_id}`]);
  }

  openModal(suppliers): void {
    const dialogRef = this.dialog.open(SuppliersModalComponent, {
      data: { suppliers: suppliers, categories: this.categories },
    });
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateSuppliersModalComponent, {
      data: { categories: this.categories },
    });
  }

  displayedColumns = [
    'id',
    'name',
    'agent',
    'address',
    'email',
    'contact',
    'cnpj',
    'cpf',
    'rg',
    'ordersSuppliers',
    'editSuppliers',
    'deleteSuppliers',
  ];
}
