import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../../../services/orders.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { StocksService } from '../../../../services/stocks.service';
import { SuppliersService } from '../../../../services/suppliers.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'admin-orders-modal',
  templateUrl: 'admin-orders-modal.component.html',
  styleUrls: ['./admin-orders-modal.component.scss'],
})
export class AdminOrdersModalComponent implements OnInit {
  formOrder: FormGroup;
  fileData: SafeResourceUrl;
  confirmFileData: SafeResourceUrl;
  decodedFileData: Blob;
  decodedConfirmFileData: Blob;
  suppliers: any;
  public_defenses: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdminOrdersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ordersService: OrdersService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private stocksService: StocksService,
    private suppliersService: SuppliersService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.getPublicDefenses();
    this.createForm();
    this.decodeFileData();
  }

  createForm() {
    this.formOrder = this.formBuilder.group({
      code: ['', Validators.required],
      supplier: [null, Validators.required],
      public_defense: [null, Validators.required],
      total_value: ['', Validators.required],
    });
  }

  handlePriceFormat(field: string) {
    return field.replace('R$', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  sortAlphabetically(list) {
    return list.sort((a, b) => a?.name?.localeCompare(b?.name));
  }

  getSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe((data) => {
      this.suppliers = this.sortAlphabetically(data);
    });
  }

  getPublicDefenses() {
    this.stocksService.getAllPublicDefenses().subscribe((data) => {
      this.public_defenses = this.sortAlphabetically(data);
    });
  }

  decodeFileData(): void {
    const base64Data = this.data.file;
    const confirmBase64Data = this.data.confirm_file;
    const byteCharacters = atob(base64Data);
    const confirmByteCharacters = atob(confirmBase64Data);

    const byteNumbers = new Array(byteCharacters.length);
    const confirmByteNumbers = new Array(confirmByteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    for (let i = 0; i < confirmByteCharacters.length; i++) {
      confirmByteNumbers[i] = confirmByteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const confirmByteArray = new Uint8Array(confirmByteNumbers);

    this.decodedFileData = new Blob([byteArray], { type: 'application/pdf' });
    this.decodedConfirmFileData = new Blob([confirmByteArray], {
      type: 'application/pdf',
    });

    this.fileData = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(this.decodedFileData),
    );

    this.confirmFileData = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(this.decodedConfirmFileData),
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(): void {
    this.loading = true;
    if (
      this.formOrder.invalid ||
      !this.decodedFileData ||
      !this.decodedConfirmFileData
    ) {
      this.loading = false;
      return;
    }
    const { code, supplier, public_defense, total_value } =
      this.formOrder.getRawValue();

    const formData: FormData = new FormData();
    formData.append('file', this.decodedFileData);
    formData.append('code', code);
    formData.append('supplier', supplier);
    formData.append('public_defense', public_defense);
    formData.append(
      'total_value',
      this.handlePriceFormat(total_value).toString(),
    );

    // this.stocksService.postInvoice(formData).subscribe(
    //   (response) => {
    //     this.loading = false;
    //     window.location.reload();
    //   },
    //   (error) => {
    //     this.loading = false;
    //     this.snackBar.open('Erro ao salvar', 'Fechar', {
    //       duration: 3000,
    //       panelClass: ['snackbar-error'],
    //       horizontalPosition: this.horizontalPosition,
    //       verticalPosition: this.verticalPosition,
    //     });
    //   },
    // );
    console.log('a: ', total_value === 'R$ ');
  }
}
