import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../../../services/products.service';
import { DispatchReportsModalComponent } from './modal/dispatch-reports-modal.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment/moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface DispatchReport {
  id: number;
  public_defense: {
    id: number;
    name: string;
  };
  product: {
    id: number;
  };
  quantity: number;
  file: string;
  description: string;
  created: string;
  updated: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  code: string;
  price: number;
  measure: {
    id: number;
    name: string;
  };
}

interface DispatchReports {
  id: number;
  product: {
    id: number;
    name: string;
    measure: {
      name: string;
    };
  };
  quantity: number;
  publicDefense: {
    id: number;
    name: string;
    district: string;
    address: string;
  };
  file: null;
  description: string;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-admin-dispatch-reports',
  templateUrl: './admin-dispatch-reports.component.html',
  styleUrls: ['./admin-dispatch-reports.component.scss'],
})
export class AdminDispatchReportsComponent implements OnInit {
  currentPage = 1;
  response: any;

  constructor(
    private stocksService: StocksService,
    private productsService: ProductsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getContent();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getContent();
  }

  getContent() {
    this.stocksService
      .getDispatchReports(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
      });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  openModal(id): void {
    const dialogRef = this.dialog.open(DispatchReportsModalComponent, {
      data: id,
    });
  }

  downloadDispatchReports(file) {
    window.open(file, '_blank');
  }

  generateDispatchReports(dispatchReport: DispatchReport) {
    const currentDate = moment(dispatchReport.created).format('DD/MM/YYYY');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    this.productsService
      .getProductById(dispatchReport.product.id)
      .subscribe((product: Product) => {
        const reportData = {
          id: dispatchReport.id,
          publicDefense: dispatchReport.public_defense.name,
          name: product.name,
          description: product.description,
          code: product.code,
          measure: product.measure.name,
          quantity: dispatchReport.quantity,
          price: product.price,
        };

        const total = reportData.quantity * reportData.price;

        const docDefinition = {
          content: [
            {
              layout: 'noBorders',
              table: {
                widths: ['*', 'auto'],
                body: [
                  [
                    {
                      text: 'S.I.R.I',
                      alignment: 'left',
                      margin: [20, 5],
                      fontSize: 14,
                      bold: true,
                    },
                  ],
                ],
              },
            },
            {
              text: 'Guia de Saída',
              style: 'header',
              alignment: 'center',
              margin: [0, 10],
            },
            {
              text: `Guia: ${reportData.id}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Data: ${currentDate}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Núcleo: ${reportData.publicDefense}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Produto: ${reportData.name}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Descrição: ${reportData.description}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Código: ${reportData.code}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Medida: ${reportData.measure}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Quantidade: ${reportData.quantity}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Preço: ${reportData.price.toFixed(2)}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Total: ${total.toFixed(2)}`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: '\n',
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: 'Obs:',
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
          ],
          styles: {
            header: {
              fontSize: 16,
              bold: true,
            },
            line: {
              fontSize: 12,
              bold: false,
              margin: [20, 5],
              decoration: 'underline',
            },
          },
          defaultStyle: {
            fontSize: 12,
          },
        };

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.download(`DispatchReport_${dispatchReport.id}.pdf`);

        pdfDocGenerator.getBlob((blob) => {
          const formData = new FormData();
          formData.append(
            'file',
            blob,
            `DispatchReport_${dispatchReport.id}.pdf`,
          );

          this.stocksService
            .updateDispatchReportFile(dispatchReport.id, formData)
            .subscribe(
              (response) => {
                window.location.reload();
              },
              (error) => {},
            );
        });
      });
  }

  displayedColumns = [
    'id',
    'publicDefense',
    'product',
    'productDescription',
    'quantity',
    'file',
    'description',
    'created',
    'updated',
    'editDescription',
  ];
}
