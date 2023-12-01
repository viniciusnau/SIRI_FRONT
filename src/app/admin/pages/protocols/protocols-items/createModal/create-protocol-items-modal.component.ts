import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import snackbarConsts from 'src/snackbarConsts';

export interface ProtocolsModalData {
  products: [];
  protocolId;
}

@Component({
  selector: 'create-protocol-items-modal',
  templateUrl: 'create-protocol-items-modal.component.html',
  styleUrls: ['./create-protocol-items-modal.component.scss'],
})
export class CreateProtocolItemsModalComponent implements OnInit {
  formCreateProtocolItems: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProtocolItemsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocolsModalData,
    private formBuilder: FormBuilder,
    public stocksService: StocksService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  handlePriceFormat(field: string) {
    return field?.replace('R$ ', '').replace(/[.]/g, '').replace(/[,]/g, '.');
  }

  createForm() {
    this.formCreateProtocolItems = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    const createProtocolItemData = this.formCreateProtocolItems.getRawValue();
    const modifiedItem = { ...createProtocolItemData };

    modifiedItem.protocol = this.data.protocolId;
    modifiedItem.quantity = Number(
      createProtocolItemData.quantity.toString().slice(0, 6),
    );
    modifiedItem.original_quantity = Number(
      createProtocolItemData.quantity.toString().slice(0, 6),
    );
    modifiedItem.price = this.handlePriceFormat(modifiedItem.price);
    this.stocksService.createProtocolItem(modifiedItem).subscribe(
      (response) => {
        this.snackBar.open(
          snackbarConsts.admin.protocols.itens.create.success,
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
          snackbarConsts.admin.protocols.itens.create.error,
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
