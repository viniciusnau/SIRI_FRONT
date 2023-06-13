import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment/moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface StockReport {
  productCode: string;
  productName: string;
  entryQuantity: string;
  withdrawalQuantity: string;
  entryPrice: number;
  withdrawalPrice: string;
  core: string;
  sector: string;
}

interface Category {
  id: number;
  name: string;
  code: string;
}

interface Measure {
  id: number;
  name: string;
}

interface Product {
  id: number;
  category: Category;
  measure: Measure;
  price: number;
  name: string;
  description: string;
  code: string;
  is_available: boolean;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-admin-stock-reports',
  templateUrl: './admin-stock-reports.component.html',
  styleUrls: ['./admin-stock-reports.component.scss'],
})
export class AdminStockReportsComponent implements OnInit {
  startDate: string;
  finalDate: string;
  stockReports: StockReport[] = [];
  displayedColumns = [
    'productCode',
    'productName',
    'entryQuantity',
    'withdrawalQuantity',
    'entryPrice',
    'withdrawalPrice',
    'core',
    'sector',
  ];

  categories: Category[] = [];
  products: Product[] = [];
  publicDefenses: string[] = [];
  sectors: string[] = [];

  selectedCategories: number[] = [];
  selectedProducts: number[] = [];
  selectedPublicDefenses: string[] = [];
  selectedSectors: string[] = [];

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
    this.fetchPublicDefenses();
    this.fetchSectors();
  }

  fetchCategories() {
    this.stockService.getAllCategories().subscribe((categories) => {
      this.categories = categories.results;
    });
  }

  fetchProducts() {
    this.stockService.getAllProducts().subscribe((products) => {
      this.products = products.results;
    });
  }

  fetchPublicDefenses() {
    this.stockService.getPublicDefenses().subscribe((publicDefenses) => {
      this.publicDefenses = publicDefenses.results;
    });
  }

  fetchSectors() {
    this.stockService.getAllSectors().subscribe((sectors) => {
      this.sectors = sectors.results;
    });
  }

  onSave() {
    const queryParams = [];

    if (this.startDate) {
      queryParams.push(`initial_date=${this.formatDate(this.startDate)}`);
    }

    if (this.finalDate) {
      queryParams.push(`final_date=${this.formatDate(this.finalDate)}`);
    }

    this.selectedCategories.forEach((categoryId) => {
      queryParams.push(`category=${encodeURIComponent(categoryId)}`);
    });

    this.selectedProducts.forEach((productId) => {
      queryParams.push(`product=${encodeURIComponent(productId)}`);
    });

    this.selectedPublicDefenses.forEach((publicDefense) => {
      queryParams.push(`public_defense=${encodeURIComponent(publicDefense)}`);
    });

    this.selectedSectors.forEach((sector) => {
      queryParams.push(`sector=${encodeURIComponent(sector)}`);
    });

    const queryString = queryParams.join('&');

    this.stockService.getStockReports(queryString).subscribe((reports) => {
      this.stockReports = reports.map((report) => ({
        productCode: report.product_code,
        productName: report.product_name,
        entryQuantity: report.entry_quantity,
        withdrawalQuantity: report.withdrawal_quantity,
        entryPrice: report.entry_price,
        withdrawalPrice: report.withdrawal_price,
        core: report.public_defense,
        sector: report.sector,
      }));
    });
  }

  formatDate(dateString: string): string {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}/${month}/${year}`;
  }

  generatePDF() {
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    const docDefinition = {
      header: {
        columns: [
          { text: 'S.I.R.I', alignment: 'left', margin: [20, 10], fontSize: 14, bold: true },
          { text: currentDate, alignment: 'right', margin: [20, 10] },
        ],
      },
      content: [
        { text: 'Relatório de Estoque', style: 'header', alignment: 'center' },
        '\n\n',
        {
          table: {
            layout: 'autoTable',
            body: [
              [
                { text: 'Código', alignment: 'center' },
                { text: 'Produto', alignment: 'center' },
                { text: 'Quantidade de Entrada', alignment: 'center' },
                { text: 'Quantidade de Saída', alignment: 'center' },
                { text: 'Valor de Entrada', alignment: 'center' },
                { text: 'Valor de Saída', alignment: 'center' },
                { text: 'Núcleo', alignment: 'center' },
                { text: 'Setor', alignment: 'center' }
              ],
              ...this.stockReports.map((report) => [
                { text: report.productCode, alignment: 'center' },
                { text: report.productName, alignment: 'center' },
                { text: report.entryQuantity, alignment: 'center' },
                { text: report.withdrawalQuantity, alignment: 'center' },
                { text: parseFloat(String(report.entryPrice)).toFixed(2), alignment: 'center' },
                { text: parseFloat(String(report.withdrawalPrice)).toFixed(2), alignment: 'center' },
                { text: report.core, alignment: 'center' },
                { text: report.sector, alignment: 'center' }
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
