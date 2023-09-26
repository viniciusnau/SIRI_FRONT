import { StocksService } from 'src/app/services/stocks.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReceivingReportsModalComponent } from './editModal/edit-receiving-reports-modal.component';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ProductsService } from '../../../services/products.service';
import { PriceFormatPipe } from '../../pipes/price-format.pipe';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-receiving-reports',
  templateUrl: './receiving-reports.component.html',
  styleUrls: ['./receiving-reports.component.scss'],
  providers: [PriceFormatPipe],
})
export class ReceivingReportsComponent implements OnInit {
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
      .getReceivingReports(this.currentPage.toString())
      .subscribe((data) => {
        this.response = data;
        this.loading = false;
      });
  }

  formatDate(date: string) {
    if (date) {
      const originalDate = new Date(date);

      const day = originalDate.getUTCDate().toString().padStart(2, '0');
      const month = (originalDate.getUTCMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year = originalDate.getUTCFullYear().toString();

      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
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
                `ReceivingReport_${receivingReport.id}.pdf`,
              );

              pdfDocGenerator.getBlob((blob) => {
                const formData = new FormData();
                formData.append(
                  'file',
                  blob,
                  `ReceivingReport_${receivingReport.id}.pdf`,
                );
                formData.append(
                  'description',
                  receivingReport.description || '',
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
            };
            reader.readAsDataURL(imageBlob);
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
