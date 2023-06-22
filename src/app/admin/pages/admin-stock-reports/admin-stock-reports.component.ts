import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment/moment';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

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
  providers: [PriceFormatPipe],
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

  constructor(
    private stockService: StocksService,
    private priceFormatPipe: PriceFormatPipe,
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
    this.fetchPublicDefenses();
    this.fetchSectors();
  }

  fetchCategories() {
    this.stockService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  fetchProducts() {
    this.stockService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  fetchPublicDefenses() {
    this.stockService.getAllPublicDefenses().subscribe((publicDefenses) => {
      this.publicDefenses = publicDefenses;
    });
  }

  fetchSectors() {
    this.stockService.getAllSectors().subscribe((sectors) => {
      this.sectors = sectors;
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
    if (dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear());

      return `${day}/${month}/${year}`;
    }
    return '';
  }

  generatePDF() {
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    const docDefinition = {
      pageMargins: [20, 70, 20, 20],
      header: {
        columns: [
          {
            text: 'S.I.R.I',
            alignment: 'left',
            margin: [20, 10],
            fontSize: 14,
            bold: true,
          },
          { text: currentDate, alignment: 'right', margin: [20, 10] },
        ],
      },
      content: [
        { text: 'Relatório de Estoque', style: 'header', alignment: 'center' },
        '\n\n',
        {
          table: {
            widths: [
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
              'auto',
            ],
            body: [
              [
                { text: 'Código', alignment: 'center' },
                { text: 'Produto', alignment: 'center' },
                { text: 'Quantidade de Entrada', alignment: 'center' },
                { text: 'Quantidade de Saída', alignment: 'center' },
                { text: 'Valor de Entrada', alignment: 'center' },
                { text: 'Valor de Saída', alignment: 'center' },
                { text: 'Núcleo', alignment: 'center' },
                { text: 'Setor', alignment: 'center' },
              ],
              ...this.stockReports.map((report) => [
                { text: report.productCode, alignment: 'center' },
                { text: report.productName, alignment: 'center' },
                { text: report.entryQuantity, alignment: 'center' },
                { text: report.withdrawalQuantity, alignment: 'center' },
                {
                  text: this.priceFormatPipe.transform(
                    Number(parseFloat(String(report.entryPrice)).toFixed(2)),
                  ),
                  alignment: 'center',
                },
                {
                  text: this.priceFormatPipe.transform(
                    Number(
                      parseFloat(String(report.withdrawalPrice)).toFixed(2),
                    ),
                  ),
                  alignment: 'center',
                },
                { text: report.core, alignment: 'center' },
                { text: report.sector, alignment: 'center' },
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
