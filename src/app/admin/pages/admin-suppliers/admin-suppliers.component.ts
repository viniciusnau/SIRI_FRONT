import { StocksService } from 'src/app/services/stocks.service';
import { SuppliersService } from './../../../services/suppliers.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuppliersModalComponent } from './modal/suppliers-modal.component';
import { CreateSuppliersModalComponent } from './createModal/createSuppliers-modal.component';

interface AdminSuppliers {
  id: number;
  name: string;
  agent: string;
  address: string;
  email: string;
  phone: string;
  ein: number;
  ssn: number;
  nic: number;
  category: number[];
}

@Component({
  selector: 'app-admin-suppliers',
  templateUrl: './admin-suppliers.component.html',
  styleUrls: ['./admin-suppliers.component.scss'],
})
export class AdminSuppliersComponent implements OnInit {
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
    this.getContent();
    this.getCategories();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent() {
    this.suppliersService
      .getSuppliers(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  getCategories() {
    this.stocksService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteSupplier(supplier_id: string) {
    this.stocksService
      .deleteSupplier(supplier_id)
      .toPromise()
      .then((data: any) => this.getContent());
  }

  navToSupplierOrders(supplier_id: number) {
    this.router.navigate([`admin/fornecedor/pedidos/${supplier_id}`]);
  }

  openModal(suppliers_id): void {
    const dialogRef = this.dialog.open(SuppliersModalComponent, {
      data: { suppliers_id, categories: this.categories },
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
