import { StocksService } from 'src/app/services/stocks.service';
import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import snackbarConsts from 'src/snackbarConsts';
import { MatSnackBar } from '@angular/material/snack-bar';

interface iSupplier {
  id: number;
  name: string;
}

interface iPublicDefense {
  id: number;
  name: string;
}

export interface CreateInvoiceModalData {
  suppliers: iSupplier[];
  public_defenses: iPublicDefense[];
}

@Component({
  selector: 'create-invoice-modal',
  templateUrl: 'create-invoice-modal.component.html',
  styleUrls: ['./create-invoice-modal.component.scss'],
})
export class InvoiceModalComponent implements OnInit {
  formInvoice: FormGroup;
  selectedFile: File;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<InvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateInvoiceModalData,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formInvoice = this.formBuilder.group({
      code: ['', [Validators.required]],
      supplier: ['', [Validators.required]],
      public_defense: ['', [Validators.required]],
      total_value: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange() {
    this.selectedFile = (
      this.fileInput.nativeElement as HTMLInputElement
    ).files[0];
  }

  handlePriceFormat(field: string) {
    return field.replace('R$', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  onClick(): void {
    const { code, supplier, public_defense, total_value } =
      this.formInvoice.getRawValue();

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('code', code);
    formData.append('supplier', supplier);
    formData.append('public_defense', public_defense);
    formData.append(
      'total_value',
      this.handlePriceFormat(total_value).toString(),
    );

    this.stocksService.postInvoice(formData).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.invoice.create.success,
          snackbarConsts.close,
          {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          },
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.snackBar.open(
          snackbarConsts.admin.invoice.create.error,
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
}
