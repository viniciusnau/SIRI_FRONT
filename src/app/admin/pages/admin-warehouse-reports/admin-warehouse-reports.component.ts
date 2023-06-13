import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface WarehouseReport {
  productCode: string;
  productName: string;
  productMeasure: string;
  quantity: string;
  price: string;
  averagePrice: number;
}

@Component({
  selector: 'app-admin-warehouse-reports',
  templateUrl: './admin-warehouse-reports.component.html',
  styleUrls: ['./admin-warehouse-reports.component.scss'],
})
export class AdminWarehouseReportsComponent implements OnInit {
  warehouseReports: WarehouseReport[] = [];
  displayedColumns = [
    'productCode',
    'productName',
    'productMeasure',
    'quantity',
    'price',
    'averagePrice',
  ];

  constructor(private stockService: StocksService) {}

  ngOnInit() {
    this.fetchWarehouseReports();
  }

  fetchWarehouseReports() {
    this.stockService.getWarehouseReports().subscribe(
      (data) => {
        this.warehouseReports = data.map((item) => ({
          productCode: item.product_code,
          productName: item.product_name,
          productMeasure: item.product_measure,
          quantity: item.quantity,
          price: item.price,
          averagePrice: item.average_price,
        }));
      },
      (error) => {},
    );
  }

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  generatePDF() {
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    const docDefinition = {
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
        {
          text: 'Inventário do Almoxarifado',
          style: 'header',
          alignment: 'center',
        },
        '\n\n',
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                'Código',
                'Produto',
                'Medida',
                'Quantidade',
                'Valor Total',
                'Valor Médio',
              ],
              ...this.warehouseReports.map((report) => [
                report.productCode,
                this.firstLetterOnCapital(report.productName),
                report.productMeasure,
                report.quantity,
                report.price,
                report.averagePrice,
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
