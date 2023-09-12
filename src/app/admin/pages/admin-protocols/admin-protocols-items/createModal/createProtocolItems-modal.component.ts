import { StocksService } from 'src/app/services/stocks.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ProtocolsModalData {
  products: [];
  protocolId;
}

@Component({
  selector: 'createProtocolItems-modal',
  templateUrl: 'createProtocolItems-modal.component.html',
  styleUrls: ['./createProtocolItems-modal.component.scss'],
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

  firstLetterOnCapital(text: string) {
    if (text.length == 0) return '';
    return text[0].toUpperCase() + text.substring(1);
  }

  createForm() {
    this.formCreateProtocolItems = this.formBuilder.group({
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
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
    this.stocksService.createProtocolItem(modifiedItem).subscribe(
      (response) => {
        window.location.reload();
      },
      (error) => {
        this.snackBar.open('Erro ao criar item!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      },
    );
  }
}
