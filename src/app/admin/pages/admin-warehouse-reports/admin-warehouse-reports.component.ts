import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { HttpClient } from '@angular/common/http';

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
  providers: [PriceFormatPipe],
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

  constructor(
    private stockService: StocksService,
    private priceFormatPipe: PriceFormatPipe,
    private http: HttpClient
  ) {}

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
    const imagePath = 'assets/logo_defensoria_sc_preferencial_colorido.png';

    this.http.get(imagePath, { responseType: 'blob' }).subscribe((imageBlob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;

        const docDefinition = {
          pageMargins: [20, 70, 20, 20],
          header: {
            columns: [
              {
                image: imageDataUrl,
                width: 200,
                alignment: 'left',
              },
              { text: currentDate, alignment: 'right', margin: [20, 10] },
            ],
          },
          content: [
            { text: 'Inventário do Almoxarifado', style: 'header', alignment: 'center' },
            '\n\n',
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', 'auto', 'auto', 'auto', 'auto'],
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
                    this.priceFormatPipe.transform(Number(report.price)),
                    this.priceFormatPipe.transform(report.averagePrice),
                  ]),
                ],
                layout: 'lightHorizontalLines',
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
      };

      reader.readAsDataURL(imageBlob);
    });
  }
}
