import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StocksService } from 'src/app/services/stocks.service';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PriceFormatPipe } from '../../../pipes/price-format.pipe';
import { HttpClient } from '@angular/common/http';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Supplier {
  id: number;
  name: number;
}

interface Category {
  code: string;
  name: string;
  entry_value: string;
  output_value: string;
  balance: string;
  previous_balance: string;
  current_balance: string;
}

export interface AccountantReportsModalData {
  suppliers: Supplier[];
}

@Component({
  selector: 'accountant-reports-modal',
  templateUrl: 'accountant-reports-modal.component.html',
  styleUrls: ['./accountant-reports-modal.component.scss'],
  providers: [PriceFormatPipe],
})
export class AccountantReportsModalComponent implements OnInit {
  formAccountantReports: FormGroup;
  months: string[];
  years: number[];
  report: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<AccountantReportsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountantReportsModalData,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private priceFormatPipe: PriceFormatPipe,
    private http: HttpClient,
  ) {
    this.months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    this.years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formAccountantReports = this.formBuilder.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  onClick(): void {
    const monthIndex = this.formAccountantReports.get('month')?.value;
    const year = this.formAccountantReports.get('year')?.value;
    const formattedMonth = this.getMonthString(monthIndex);
    const inputValue = `${formattedMonth}-${year}`;

    this.stocksService
      .getAccountantReportsWithQueryString(inputValue)
      .subscribe((result) => {
        this.report = result.categories;
        this.generatePDF();
      });

    this.dialogRef.close();
  }

  getMonthString(monthName: string): string {
    switch (monthName) {
      case 'Janeiro':
        return '01';
      case 'Fevereiro':
        return '02';
      case 'Março':
        return '03';
      case 'Abril':
        return '04';
      case 'Maio':
        return '05';
      case 'Junho':
        return '06';
      case 'Julho':
        return '07';
      case 'Agosto':
        return '08';
      case 'Setembro':
        return '09';
      case 'Outubro':
        return '10';
      case 'Novembro':
        return '11';
      case 'Dezembro':
        return '12';
      default:
        return '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  generatePDF() {
    const month = this.formAccountantReports.get('month')?.value;
    const year = this.formAccountantReports.get('year')?.value;
    const currentDate = moment().format('DD/MM/YYYY HH:mm:ss');
    const imageFile = 'assets/logo_defensoria_sc_preferencial_colorido.png';

    let entrySum = 0;
    let outputSum = 0;
    let balanceSum = 0;
    let previousBalanceSum = 0;
    let currentBalanceSum = 0;

    this.report.forEach((report_item) => {
      entrySum += parseFloat(String(report_item.entry_value));
      outputSum += parseFloat(String(report_item.output_value));
      balanceSum += parseFloat(String(report_item.balance));
      previousBalanceSum += parseFloat(String(report_item.previous_balance));
      currentBalanceSum += parseFloat(String(report_item.current_balance));
    });

    const formattedEntrySum = entrySum.toFixed(2);
    const formattedOutputSum = outputSum.toFixed(2);
    const formattedBalanceSum = balanceSum.toFixed(2);
    const formattedPreviousBalanceSum = previousBalanceSum.toFixed(2);
    const formattedCurrentBalanceSum = currentBalanceSum.toFixed(2);

    const newFormattedEntrySum = this.priceFormatPipe.transform(
      Number(formattedEntrySum),
    );
    const newFormattedOutputSum = this.priceFormatPipe.transform(
      Number(formattedOutputSum),
    );
    const newFormattedBalanceSum = this.priceFormatPipe.transform(
      Number(formattedBalanceSum),
    );
    const newFormattedPreviousBalanceSum = this.priceFormatPipe.transform(
      Number(formattedPreviousBalanceSum),
    );
    const newFormattedCurrentBalanceSum = this.priceFormatPipe.transform(
      Number(formattedCurrentBalanceSum),
    );

    this.http.get(imageFile, { responseType: 'blob' }).subscribe((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;

        const docDefinition = {
          header: {
            columns: [
              {
                image: imageDataUrl,
                width: 200,
              },
              { text: currentDate, alignment: 'right', margin: [20, 10] },
            ],
          },
          content: [
            {
              text: 'Relatório do Contador',
              style: 'header',
              alignment: 'center',
            },
            { text: month + '/' + year, alignment: 'right' },
            '\n\n',
            {
              table: {
                layout: 'autoTable',
                body: [
                  [
                    { text: 'Código', alignment: 'center' },
                    { text: 'Categoria', alignment: 'center' },
                    { text: 'Quantidade de Entrada', alignment: 'center' },
                    { text: 'Quantidade de Saída', alignment: 'center' },
                    { text: 'Saldo', alignment: 'center' },
                    { text: 'Saldo Anterior', alignment: 'center' },
                    { text: 'Saldo Atual', alignment: 'center' },
                  ],
                  ...this.report.map((report_item) => [
                    { text: report_item.code, alignment: 'center' },
                    { text: report_item.name, alignment: 'center' },
                    {
                      text: this.priceFormatPipe.transform(
                        Number(
                          parseFloat(String(report_item.entry_value)).toFixed(
                            2,
                          ),
                        ),
                      ),
                      alignment: 'center',
                    },
                    {
                      text: this.priceFormatPipe.transform(
                        Number(
                          parseFloat(String(report_item.output_value)).toFixed(
                            2,
                          ),
                        ),
                      ),
                      alignment: 'center',
                    },
                    {
                      text: this.priceFormatPipe.transform(
                        Number(
                          parseFloat(String(report_item.balance)).toFixed(2),
                        ),
                      ),
                      alignment: 'center',
                    },
                    {
                      text: this.priceFormatPipe.transform(
                        Number(
                          parseFloat(
                            String(report_item.previous_balance),
                          ).toFixed(2),
                        ),
                      ),
                      alignment: 'center',
                    },
                    {
                      text: this.priceFormatPipe.transform(
                        Number(
                          parseFloat(
                            String(report_item.current_balance),
                          ).toFixed(2),
                        ),
                      ),
                      alignment: 'center',
                    },
                  ]),
                  [
                    { text: '', colSpan: 1 },
                    { text: 'Total:', alignment: 'right', bold: true },
                    {
                      text: newFormattedEntrySum,
                      alignment: 'center',
                      bold: true,
                    },
                    {
                      text: newFormattedOutputSum,
                      alignment: 'center',
                      bold: true,
                    },
                    {
                      text: newFormattedBalanceSum,
                      alignment: 'center',
                      bold: true,
                    },
                    {
                      text: newFormattedPreviousBalanceSum,
                      alignment: 'center',
                      bold: true,
                    },
                    {
                      text: newFormattedCurrentBalanceSum,
                      alignment: 'center',
                      bold: true,
                    },
                  ],
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

        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        const monthIndex = this.formAccountantReports.get('month')?.value;
        const formattedMonth = this.getMonthString(monthIndex);

        pdfDocGenerator.getBlob((pdfBlob) => {
          const formData = new FormData();
          formData.append('file', pdfBlob, 'accountant_report.pdf');
          formData.append('month', formattedMonth);
          formData.append(
            'total_previous_value',
            previousBalanceSum.toFixed(2),
          );
          formData.append('total_entry_value', entrySum.toFixed(2));
          formData.append('total_output_value', outputSum.toFixed(2));
          formData.append('total_current_value', currentBalanceSum.toFixed(2));

          this.stocksService.postAccountantReports(formData).subscribe(
            (response) => {
              window.location.reload();
            },
            (error) => {},
          );
        });
      };
    });
  }
}
