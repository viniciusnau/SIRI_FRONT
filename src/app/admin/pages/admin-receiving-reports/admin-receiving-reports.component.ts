import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceivingReportsModalComponent } from './modal/receiving-reports-modal.component';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProductsService } from '../../../services/products.service';

interface ReceivingReport {
  id: number;
  supplier: {
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

interface ReceivingReports {
  id: number;
  supplier: string;
  product: string;
  quantity: number;
  file: string;
  description: string;
  created: string;
  updated: string;
}

@Component({
  selector: 'app-admin-receiving-reports',
  templateUrl: './admin-receiving-reports.component.html',
  styleUrls: ['./admin-receiving-reports.component.scss'],
})
export class AdminReceivingReportsComponent implements OnInit {
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
      .getReceivingReports(this.currentPage.toString())
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
    const dialogRef = this.dialog.open(ReceivingReportsModalComponent, {
      data: id,
    });
  }

  downloadReceivingReports(file) {
    window.open(file, '_blank');
  }

  generateReceivingReports(receivingReport: ReceivingReport) {
    const currentDate = moment(receivingReport.created).format('DD/MM/YYYY');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    this.productsService
      .getProductById(receivingReport.product.id)
      .subscribe((product: Product) => {
        const reportData = {
          id: receivingReport.id,
          supplier: receivingReport.supplier.name,
          name: product.name,
          description: product.description,
          code: product.code,
          measure: product.measure.name,
          quantity: receivingReport.quantity,
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
              text: 'Guia de Entrada',
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
              text: `Tipo de documento: Nota fiscal, devolução e outros`,
              style: 'line',
              alignment: 'left',
              margin: [20, 5],
            },
            {
              text: `Fornecedor: ${reportData.supplier}`,
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
        pdfDocGenerator.download(`ReceivingReport_${receivingReport.id}.pdf`);

        pdfDocGenerator.getBlob((blob) => {
          const formData = new FormData();
          formData.append(
            'file',
            blob,
            `ReceivingReport_${receivingReport.id}.pdf`,
          );

          this.stocksService
            .updateReceivingReportFile(receivingReport.id, formData)
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
    'supplier',
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
