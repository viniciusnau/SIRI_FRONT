import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../../services/stocks.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { HttpClient } from '@angular/common/http';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Helper } from 'src/helper';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface iWarehouseReport {
  productCode: string;
  productName: string;
  productMeasure: string;
  quantity: string;
  price: string;
  averagePrice: number;
}

@Component({
  selector: 'app-warehouse-reports',
  templateUrl: './warehouse-reports.component.html',
  styleUrls: ['./warehouse-reports.component.scss'],
  providers: [PriceFormatPipe],
})
export class WarehouseReportsComponent implements OnInit {
  loading: boolean = false;
  warehouseReports: iWarehouseReport[] = [];
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
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public Helper: Helper,
  ) {}

  ngOnInit() {
    this.loading = true;
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
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.snackBar.open(
          snackbarConsts.admin.warehouseReports.error,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
      },
    );
  }

  generatePDF() {
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    const imagePath = 'assets/logo_defensoria_sc_preferencial_colorido.png';

    this.http
      .get(imagePath, { responseType: 'blob' })
      .subscribe((imageBlob: Blob) => {
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
              {
                text: 'Inventário do Almoxarifado',
                style: 'header',
                alignment: 'center',
              },
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
                      this.Helper.firstLetterOnCapital(report.productName),
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
