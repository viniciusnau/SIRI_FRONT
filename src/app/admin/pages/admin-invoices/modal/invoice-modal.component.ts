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

interface Supplier {
  id: number;
  name: string;
}

interface PublicDefense {
  id: number;
  name: string;
}

export interface InvoiceModalData {
  suppliers: Supplier[];
  public_defenses: PublicDefense[];
}

@Component({
  selector: 'invoice-modal',
  templateUrl: 'invoice-modal.component.html',
  styleUrls: ['./invoice-modal.component.scss'],
})
export class InvoiceModalComponent implements OnInit {
  formInvoice: FormGroup;
  selectedFile: File;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<InvoiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InvoiceModalData,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
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
        window.location.reload();
      },
      (error) => {},
    );
  }
}
