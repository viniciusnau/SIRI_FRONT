import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { StocksService } from 'src/app/services/stocks.service';
import { ProductsService } from 'src/app/services/products.service';
import { DispatchReportsModalComponent } from './editModal/edit-dispatch-reports-modal.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment/moment';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface iDispatchReport {
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

@Component({
  selector: 'app-dispatch-reports',
  templateUrl: './dispatch-reports.component.html',
  styleUrls: ['./dispatch-reports.component.scss'],
  providers: [PriceFormatPipe],
})
export class DispatchReportsComponent implements OnInit {
  currentPage = 1;
  response: any;
  loading = false;

  constructor(
    private stocksService: StocksService,
    private productsService: ProductsService,
    public dialog: MatDialog,
    private priceFormatPipe: PriceFormatPipe,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.loading = true;
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
        this.loading = false;
      });
  }

  firstLetterOnCapital(text: string) {
    if (text.length === 0) return '';
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

  generateDispatchReports(dispatchReport: iDispatchReport) {
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
        const formattedPrice = this.priceFormatPipe.transform(reportData.price);
        const formattedTotal = this.priceFormatPipe.transform(total);
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
                    layout: 'noBorders',
                    table: {
                      widths: ['*', 'auto'],
                      body: [[]],
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
                    text: `Preço: ${formattedPrice}`,
                    style: 'line',
                    alignment: 'left',
                    margin: [20, 5],
                  },
                  {
                    text: `Total: ${formattedTotal}`,
                    style: 'line',
                    alignment: 'left',
                    margin: [20, 5],
                  },
                  {
                    text: '\n',
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
              pdfDocGenerator.download(
                `DispatchReport_${dispatchReport.id}.pdf`,
              );

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
            };

            reader.readAsDataURL(imageBlob);
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
